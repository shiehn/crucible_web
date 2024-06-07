import React, { useState } from 'react';
import { useStore } from "./main.jsx";
import { toast } from "react-toastify";
import {
  sendGameEngineQuery,
  getGameState,
  getGameEnvironment
} from "./api.js";
import { FaPlay } from "react-icons/fa";

function AudioInput() {

  const [text, setText] = useState(""); // State for tracking the text input

  const uuid = useStore((state) => state.uuid);
  const server_ip = useStore((state) => state.server_ip);
  const addMessage = useStore((state) => state.addMessage);
  const incrementMsgHistoryIndex = useStore((state) => state.incrementMsgHistoryIndex);

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const submitMsg = async () => {
    let copiedString = text + ""; // Creates a new reference with the same string
    if (copiedString === "") {
      return;
    }

    setText(""); // Clear the text input

    if (!uuid || !server_ip) {
      toast.error("UUID or Server IP is missing.");
      return;
    }

    try {
      useStore.setState({ isLoading: true });
      let response = await sendGameEngineQuery(copiedString, uuid, server_ip);
      useStore.setState({ isLoading: false });

      console.log("ResponseData:", response);

      let logs = response?.response;

      addMessage(logs);
      incrementMsgHistoryIndex();

      let encounter = response?.action?.encounter;
      if (encounter) {
        toast.warn("Encounter: " + JSON.stringify(encounter));
        useStore.setState({ currentBgImage: encounter.aesthetic.image });
      } else {
        //AFTER EVERY MESSAGE, GET THE GAME STATE, in case it has changed
        const gameState = await getGameState(server_ip, uuid);
        if (gameState) {
          useStore.setState({ game_state: gameState });

          const environment = await getGameEnvironment(server_ip, gameState.environment_id);
          console.log("XXX Environment:", environment);
          if (environment && environment.game_info.environment.aesthetic.image) {
            useStore.setState({ currentBgImage: environment.game_info.environment.aesthetic.image });
          }
        }
      }
    } catch (error) {
      //useStore.setState({ isLoading: false });
      console.error("Error submitting message:", error);
      toast.error("Failed to submit message. Please try again.");
    }
  }

  return (
    <div className="flex justify-center items-end w-full h-16 p-2">
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
        onClick={submitMsg}><FaPlay className="h-full w-full p-2" /></button>
    </div>
  );
}

export default AudioInput;
