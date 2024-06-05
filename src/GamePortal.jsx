import React, {useState, useEffect, useRef} from 'react';
import {store, useStore} from "./main.jsx";
import {
  getConnectionMappings, getGameEnvironment,
  getGameState,
  isTokenConnectedToRemote,
  sendGameEngineQuery,
  sendRequest
} from "./api.js";
import {API_URLS} from "./apiUrls.js";
import {FaPlay, FaStop, FaForward, FaBackward} from "react-icons/fa";
import {toast} from "react-toastify";
import TextToSpeech from "./TextToSpeech.js"; // Import the new function

function GamePortal({isVisible}) {
  const {embedded, uuid, connected, currentBgImage, game_state, msgHistory, results, server_ip} = useStore();
  const [text, setText] = useState(""); // State for tracking the text input
  const [typingTimeout, setTypingTimeout] = useState(null); // State for the typing timeout

  const [backgroundImage, setBackgroundImage] = useState(null); // State for the latest background image
  const [speechEnabled, setSpeechEnabled] = useState(false); // New state for controlling speech

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0); // State for tracking the current message index

  const tts = useRef(new TextToSpeech());

  useEffect(() => {
    setBackgroundImage(game_state?.level)
  }, [game_state?.level]);

  useEffect(() => {
    setBackgroundImage(currentBgImage)
  }, [currentBgImage]);

  useEffect(() => {
    if (msgHistory && msgHistory.length > 0 && speechEnabled) {
      tts.current.cancel(); // Cancel any ongoing speech

      setTimeout(() => {
        let newMsg = msgHistory[currentMessageIndex];
        console.log('New item added:', newMsg);

        tts.current.speak(
          newMsg,
          () => console.log("Speaking started"),
          () => console.log("Speaking finished")
        );

        fetchImages(newMsg);
      }, 1000); // Wait for 1 second before continuing
    }
  }, [msgHistory, currentMessageIndex, speechEnabled]); // Dependency array

  const fetchImages = async (newMsg) => {
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
  };

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
    if (copiedString === "") {
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
      toast.warn("Encounter: " + JSON.stringify(encounter));
      store.setState({currentBgImage: encounter.aesthetic.image})
    } else {
      //AFTER EVERY MESSAGE, GET THE GAME STATE, in case it has changed
      const gameState = await getGameState(server_ip, uuid);
      if (gameState) {
        store.setState({game_state: gameState});

        const environment = await getGameEnvironment(server_ip, gameState.environment_id);
        console.log("XXX Environment:", environment);
        if (environment) {
          if (environment.game_info.environment.aesthetic.image) {
            store.setState({currentBgImage: environment.game_info.environment.aesthetic.image})
          }
        }
      }
    }
  }

  const handleEnableSpeech = () => {
    setSpeechEnabled(true);
    toast.info("Speech enabled for the session");
  };

  const handleStopSpeech = () => {
    tts.current.cancel();
    toast.info("Speech stopped");
  };

  const handleNextMessage = () => {
    if (currentMessageIndex < msgHistory.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
      // let newMsg = msgHistory[currentMessageIndex];
      // tts.current.speak(
      //   newMsg,
      //   () => console.log("Speaking started"),
      //   () => console.log("Speaking finished")
      // );
    } else {
      toast.info("No more messages");
    }
  };

  const handlePreviousMessage = () => {
    if (currentMessageIndex > 0) {
      setCurrentMessageIndex(currentMessageIndex - 1);
      // let newMsg = msgHistory[currentMessageIndex];
      // tts.current.speak(
      //   newMsg,
      //   () => console.log("Speaking started"),
      //   () => console.log("Speaking finished")
      // );
    } else {
      toast.info("No previous messages");
    }
  };

  return (
    <div
      className="w-full h-full flex-col justify-center"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : `url("https://storage.googleapis.com/byoc-file-transfer/img_placeholder.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center w-full h-28 p-4">
        <button onClick={handleEnableSpeech} className="w-24 h-12 mr-4 p-2 bg-blue-500 text-white rounded">Enable
          Speech
        </button>
        <button onClick={handleStopSpeech} className="w-24 h-12 mr-4 p-2 bg-red-500 text-white rounded"><FaStop/>
        </button>
        <button onClick={handlePreviousMessage} className="w-24 h-12 mr-4 p-2 bg-yellow-500 text-white rounded">
          <FaBackward/></button>
        <button onClick={handleNextMessage} className="w-24 h-12 mr-4 p-2 bg-green-500 text-white rounded"><FaForward/>
        </button>


      </div>


      <div className="flex justify-center items-end w-full h-24 p-4">
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
