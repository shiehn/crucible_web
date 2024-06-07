import React, { useState, useEffect, useRef } from 'react';
import { useStore } from "./main.jsx";
import { toast } from "react-toastify";
import { FaStop, FaBackward, FaForward, FaPlay } from "react-icons/fa";
import TextToSpeech from "./TextToSpeech.js";

function AudioControls() {
  const msgHistory = useStore((state) => state.msgHistory);
  const msgHistoryIndex = useStore((state) => state.msgHistoryIndex);
  const incrementMsgHistoryIndex = useStore((state) => state.incrementMsgHistoryIndex);
  const decrementMsgHistoryIndex = useStore((state) => state.decrementMsgHistoryIndex);
  const getCurrentMsgHistoryItem = useStore((state) => state.getCurrentMsgHistoryItem);

  const [speechEnabled, setSpeechEnabled] = useState(false);

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
    setSpeechEnabled(true);
    toast.info("Speech enabled for the session");
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
    <div className="flex w-4/5 h-full p-2 justify-center items-center bg-orange-500">
      <button onClick={handleEnableSpeech}
              className="w-18 h-full mr-4 px-2 bg-blue-500 text-sm text-white rounded">Sound On
      </button>
      <button onClick={handleStopSpeech} className="w-12 h-full mr-4  bg-red-500 text-white rounded"><FaStop/>
      </button>
      <button onClick={handlePlayMessage} className="w-12 h-full mr-4  bg-red-500 text-white rounded"><FaPlay/>
      </button>
      <button onClick={handlePreviousMessage} className="w-12 h-full mr-4  bg-yellow-500 text-white rounded">
        <FaBackward/></button>
      <button onClick={handleNextMessage} className="w-12 h-full bg-green-500 text-white rounded"><FaForward/>
      </button>
    </div>
  );
}

export default AudioControls;
