import React, { useState, useEffect, useRef } from 'react';
import { useStore } from "./main.jsx";
import { toast } from "react-toastify";
import { FaStop, FaBackward, FaForward, FaPlay } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";

import TextToSpeech from "./TextToSpeech.js";
import InventoryDisplay from "./InventoryDisplay.jsx";

function AudioControls() {
  const msgHistory = useStore((state) => state.msgHistory);
  const msgHistoryIndex = useStore((state) => state.msgHistoryIndex);
  const incrementMsgHistoryIndex = useStore((state) => state.incrementMsgHistoryIndex);
  const decrementMsgHistoryIndex = useStore((state) => state.decrementMsgHistoryIndex);
  const getCurrentMsgHistoryItem = useStore((state) => state.getCurrentMsgHistoryItem);
  const speechEnabled = useStore((state) => state.speechEnabled);
  const setSpeechEnabled = useStore((state) => state.setSpeechEnabled);

  const tts = useRef(new TextToSpeech());

  useEffect(() => {
    if (msgHistory && msgHistory.length > 0 && speechEnabled) {
      tts.current.cancel(); // Cancel any ongoing speech

      setTimeout(() => {
        let newMsg = msgHistory[msgHistoryIndex];
        tts.current.speak(
          newMsg,
          () => console.log("Speaking started"),
          () => console.log("Speaking finished")
        );

        //fetchImages(newMsg);
      }, 1000); // Wait for 1 second before continuing
    }
  }, [msgHistoryIndex, speechEnabled]); // Dependency array

  const handleEnableSpeech = () => {
    if(speechEnabled) {
      setSpeechEnabled(false);
    } else {
      setSpeechEnabled(true);
    }
  };

  const handleStopSpeech = () => {
    tts.current.cancel();
    toast.info("Speech stopped");
  };

  const handleNextMessage = () => {
    if (msgHistoryIndex < msgHistory.length - 1) {
      tts.current.cancel(); // Cancel any ongoing speech
      incrementMsgHistoryIndex(); // Increment the index
    }
  };

  const handlePreviousMessage = () => {
    if (msgHistoryIndex > 0) {
      tts.current.cancel(); // Cancel any ongoing speech
      decrementMsgHistoryIndex(); // Decrement the index
    }
  };

  const handlePlayMessage = () => {
    // Play the current message at msgHistoryIndex
    tts.current.cancel(); // Cancel any ongoing speech

    setTimeout(() => {
      let newMsg = msgHistory[msgHistoryIndex];
      tts.current.speak(
        newMsg,
        () => console.log("Speaking started"),
        () => console.log("Speaking finished")
      );

      //fetchImages(newMsg);
    }, 1000); // Wait for 1 second before continuing
  };

  return (
    <div className="flex w-4/5 h-full justify-around items-center">
      <button onClick={handleEnableSpeech}
              className="h-full">
        {(speechEnabled) && (
          <FaVolumeMute className="text-3xl text-sas-text-grey hover:text-white"/>
        )}

        {(!speechEnabled) && (
          <FaVolumeUp className="text-3xl text-sas-text-grey hover:text-white"/>
        )}
      </button>
      <button onClick={handleStopSpeech} className="h-full">
        <FaStop className="text-3xl text-sas-text-grey hover:text-white"/>
      </button>
      <button onClick={handlePlayMessage} className="h-full"><FaPlay  className="text-3xl text-sas-text-grey hover:text-white"/>
      </button>
      <button onClick={handlePreviousMessage} className="h-full">
        <FaBackward className="text-3xl text-sas-text-grey hover:text-white"/>
      </button>
      <button onClick={handleNextMessage} className="h-full">
        <FaForward className="text-3xl text-sas-text-grey hover:text-white"/>
      </button>
    </div>
  );
}

export default AudioControls;
