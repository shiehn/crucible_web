// AudioInput.jsx
import React, { useState } from 'react';
import { useStore } from "./main.jsx";
import { FaPlay } from "react-icons/fa";
import submitMsg from "./submitMsg.js"; // Import the refactored function

function AudioInput() {
  const [text, setText] = useState(""); // State for tracking the text input

  const server_ip = useStore((state) => state.server_ip);
  const open_ai_key = useStore((state) => state.open_ai_key);
  const addMessage = useStore((state) => state.addMessage);
  const incrementMsgHistoryIndex = useStore((state) => state.incrementMsgHistoryIndex);
  const setCurrentBgImage = useStore((state) => state.setCurrentBgImage);
  const setGameState = useStore((state) => state.setGameState);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const setNavigation = useStore((state) => state.setNavigation);
  const setShowSettings = useStore((state) => state.setShowSettings);

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleSubmitMsg = () => {
    let emptyUuid = '00000000-0000-0000-0000-000000000000';
    submitMsg({
      text,
      setText,
      emptyUuid,
      server_ip,
      open_ai_key,
      addMessage,
      incrementMsgHistoryIndex,
      setCurrentBgImage,
      setGameState,
      setNavigation,
      setShowSettings,
      setIsLoading
    });
  }

  return (
    <div className="flex justify-between items-end w-full h-1/2 p-2">
      <input
        className="w-[80%] h-full px-4 bg-sas-background-dark border text-sas-text-grey rounded border-sas-text-grey"
        value={text}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();  // Prevent the default action to avoid submitting the form if wrapped in one
            handleSubmitMsg();
          }
        }}
      />
      <button
        className="h-full w-[20%] ml-2 bg-sas-green rounded-lg text-sas-background-light hover:text-white text-sm hover:sas-green active:sas-green"
        onClick={handleSubmitMsg}><FaPlay className="h-full w-full p-2" /></button>
    </div>
  );
}

export default AudioInput;
