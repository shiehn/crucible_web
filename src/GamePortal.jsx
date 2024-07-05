import React, {useState, useEffect, useRef} from 'react';
import {store, useStore} from "./main.jsx";
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
