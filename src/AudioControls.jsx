import React, {useState, useEffect, useRef} from 'react';
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
import {FaBackward, FaForward, FaPlay} from "react-icons/fa";
import TextToSpeech from "./TextToSpeech.js";

function AudioControls({}) {
  const { msgHistory } = useStore();

  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const tts = useRef(new TextToSpeech());




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
    } else {
      toast.info("No more messages");
    }
  };

  const handlePreviousMessage = () => {
    if (currentMessageIndex > 0) {
      setCurrentMessageIndex(currentMessageIndex - 1);
    } else {
      toast.info("No previous messages");
    }
  };

  return (
    <div className="flex w-4/5 h-full p-2 justify-center items-center bg-orange-500">
      <button onClick={handleEnableSpeech} className="w-18 h-full mr-4 px-2 bg-blue-500 text-sm text-white rounded">Sound On
      </button>
      <button onClick={handleStopSpeech} className="w-12 h-full mr-4  bg-red-500 text-white rounded"><FaStop/>
      </button>
      <button onClick={handlePreviousMessage} className="w-12 h-full mr-4  bg-yellow-500 text-white rounded">
        <FaBackward/></button>
      <button onClick={handleNextMessage} className="w-12 h-full bg-green-500 text-white rounded"><FaForward/>
      </button>
    </div>

  );
}

export default AudioControls;
