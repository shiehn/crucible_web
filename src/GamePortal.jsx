import React, {useState, useEffect} from 'react';
import {store, useStore} from "./main.jsx";
import {
  getConnectionMappings, getGameEnvironment,
  getGameState,
  isTokenConnectedToRemote,
  sendGameEngineQuery,
  sendRequest
} from "./api.js";
import {API_URLS} from "./apiUrls.js";
import {FaPlay} from "react-icons/fa";
import {toast} from "react-toastify"; // Import the new function

function GamePortal({isVisible}) {
  const {embedded, uuid, connected, currentBgImage, msgHistory, results, server_ip} = useStore();
  const [text, setText] = useState(""); // State for tracking the text input
  const [typingTimeout, setTypingTimeout] = useState(null); // State for the typing timeout

  const [backgroundImage, setBackgroundImage] = useState(null); // State for the latest background image

  useEffect(()=>{
    setBackgroundImage(currentBgImage)
  }, [currentBgImage])

  useEffect(() => {
    const fetchImages = async () => {
      if (msgHistory && msgHistory.length > 0) {
        let newMsg = msgHistory[msgHistory.length - 1];
        console.log('New item added:', newMsg);

        try {
          // Fetch connection mappings
          const mappings = await getConnectionMappings(server_ip, uuid);

          if (!mappings) {
            console.log("No mappings found");
            return;
          }

          const firstGameEngine = mappings.find(
            (item) => item.connection_type === 'image_engine'
          );

          if (!firstGameEngine) {
            console.log("No game engine found");
            return;
          }

          // Check if engine is connected
          let is_connected = false;
          if (firstGameEngine.connection_token) {
            const connectionStatus = await isTokenConnectedToRemote(server_ip, firstGameEngine.connection_token);

            if (!connectionStatus.compute) {
              toast.warn('Rune is not connected');
            } else if (connectionStatus.compute && !connectionStatus.loaded) {
              toast.warn('Rune is loading');
            } else {
              is_connected = true;
            }
          }

          if (is_connected) {
            // Get contract
            const url = API_URLS.COMPUTE_CONTRACT(server_ip, firstGameEngine.connection_token);
            const response = await fetch(url);

            if (response.ok) {
              const contract = await response.json();
              console.log('Contract:', contract);

              // Format contract and send request
              const formattedRequestBody = formatContractForSubmission(contract, newMsg);

              const sendRequestResponse = await sendRequest(server_ip, formattedRequestBody);

              store.setState({
                connection_token: firstGameEngine.connection_token,
                messageId: sendRequestResponse.id,
                submitForm: false,
              });

              console.log("ResponseData:", sendRequestResponse);
            } else {
              console.log("Contract request failed");
            }
          }
        } catch (error) {
          console.error("Error in fetchImages:", error);
        }
      }
    };

    fetchImages();
  }, [msgHistory]); // Dependency array


  const formatContractForSubmission = (contract, input) => {
    // Destructure relevant fields from the contract
    const {id, data} = contract;
    const {method_name, params} = data;

    // Create a new object to store the modified params
    const newParams = {};

    // Loop through the params to set the value if the type is "str"
    params.forEach((param) => {
      if (param.type === "str") {
        newParams[param.name] = {
          value: input,
          type: param.type
        };
      }
    });

    // Return the new object with the structure as described
    return {
      token: id,
      request: {
        token: id,
        type: "run_method",
        bpm: 0,
        sample_rate: 0,
        data: {
          method_name: method_name,
          params: newParams
        }
      }
    };
  }

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const resultsString = JSON.stringify(results, null, 2);

  const submitMsg = async () => {

    let copiedString = text + ""; // Creates a new reference with the same string
    if(copiedString === "") {
      return;
    }

    setText(""); // Clear the text input

    store.setState({isLoading: true});
    let response = await sendGameEngineQuery(copiedString, uuid, server_ip)
    store.setState({isLoading: false});

    console.log("ResponseData:", response);

    let logs = response?.response;

    store.setState((prevState) => {
      const lastItem = prevState.msgHistory[prevState.msgHistory.length - 1];

      console.log("Last item: " + logs)

      if (lastItem !== logs) {
        return {
          msgHistory: [...prevState.msgHistory, logs], // Append new item if it's different
        };
      }

      return prevState; // If the item is the same, return the current state unchanged
    });

    let encounter = response?.action?.encounter;
    if (encounter) {
      //toast.warn("Encounter: " + JSON.stringify(encounter));
      store.setState({currentBgImage: encounter.aesthetic.image})
    } else {
      //AFTER EVERY MESSAGE, GET THE GAME STATE, in case it has changed
      const gameState = await getGameState(server_ip, uuid);
      if (gameState) {
        store.setState({game_state: gameState});

        const environment = await getGameEnvironment(server_ip, gameState.environment_id);
        console.log("XXX Environment:", environment);
        if (environment) {
          if(environment.game_info.environment.aesthetic.image){
            store.setState({currentBgImage: environment.game_info.environment.aesthetic.image})
          }
        }
      }
    };
    }





  return (
    <div
      className="w-full h-full flex justify-center"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : `url("https://storage.googleapis.com/byoc-file-transfer/img_placeholder.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-center items-end w-full h-full p-4">
        <input
          className="w-[80%] p-2 bg-sas-background-dark border text-sas-text-grey rounded border-sas-text-grey"
          value={text}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();  // Prevent the default action to avoid submitting the form if wrapped in one
              submitMsg();
            }
          }}
        />
        <button
          className="h-[28px] w-[60px] mr-2 bg-sas-green rounded-lg text-sas-background-light hover:text-white text-sm hover:sas-green active:sas-green"
          onClick={submitMsg}><FaPlay className="h-full w-full p-1"/></button>
      </div>
    </div>
  );
}

export default GamePortal;