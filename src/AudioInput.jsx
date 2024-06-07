import React, {useState, useEffect} from 'react';
import {store} from "./main.jsx";
import {useStore} from "./main.jsx";
import {toast} from "react-toastify";
import {
  abortRequest,
  getGameMap,
  getGameInventory,
  sendGameEngineQuery,
  getGameState,
  getGameEnvironment
} from "./api.js";
import {FaStop} from "react-icons/fa6";
import {FaPlay} from "react-icons/fa";
import AudioControls from "./AudioControls.jsx";
import MapInventoryToggle from "./MapInventoryToggle.jsx";

function AudioInput({}) {

  const {connection_token,uuid, connected, currentOutputView, game_state, server_ip} = useStore();

  const [text, setText] = useState(""); // State for tracking the text input

  const handleChange = (e) => {
    setText(e.target.value);
  }

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



  return (
      <div className="flex justify-center items-end w-full h-16  p-2">
        <input
          className="w-[80%] h-full bg-sas-background-dark border text-sas-text-grey rounded border-sas-text-grey"
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
          className="h-full w-[60px] ml-2 bg-sas-green rounded-lg text-sas-background-light hover:text-white text-sm hover:sas-green active:sas-green"
          onClick={submitMsg}><FaPlay className="h-full w-full p-2"/></button>
      </div>
  );
}

export default AudioInput;
