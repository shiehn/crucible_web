import React, {useState, useEffect, useRef} from 'react';
import {store, useStore} from "./main.jsx";
import {
  getConnectionMappings, getGameEnvironment,
  getGameState,
  isTokenConnectedToRemote,
  sendRequest
} from "./api.js";
import {API_URLS} from "./apiUrls.js";
import {FaPlay, FaStop, FaForward, FaBackward} from "react-icons/fa";
import {toast} from "react-toastify";
import TextToSpeech from "./TextToSpeech.js";
import {Bars} from "react-loader-spinner"; // Import the new function
import CombatStats from "./CombatStats.jsx";

function GamePortal({isVisible}) {
  const results = useStore((state) => state.results);
  const [typingTimeout, setTypingTimeout] = useState(null); // State for the typing timeout
  const [backgroundImage, setBackgroundImage] = useState(null); // State for the latest background image


  const uuid = useStore((state) => state.uuid);
  const combatMode = useStore((state) => state.combatMode);
  const setCombatMode = useStore((state) => state.setCombatMode);
  const combatStats = useStore((state) => state.combatStats);
  const currentBgImage = useStore((state) => state.currentBgImage);
  const server_ip = useStore((state) => state.server_ip);

  // const combatStats = {
  //   "encounter": 6,
  //   "modifiers": [
  //     {
  //       "item": "jewel_dagger",
  //       "modifier": 32,
  //     },
  //   ],
  //   "chance_of_success_base": 40,
  //   "chance_of_success_total": 72,
  // }


  useEffect(() => {
    setBackgroundImage(currentBgImage)
  }, [currentBgImage]);

  useEffect(() => {

    if (combatMode) {
    //set bg image
    } else {
    //set bg image
    }

  }, [combatMode]);


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


  const resultsString = JSON.stringify(results, null, 2);


  return (
    <div
      className="w-full h-full flex-col justify-center overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : `url("https://storage.googleapis.com/byoc-file-transfer/img_placeholder.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {combatMode && <CombatStats combatMode={combatMode} combatStats={combatStats} />}

    </div>
  );
}

export default GamePortal;
