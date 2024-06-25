import React, {useState, useEffect, useRef} from 'react';
import {useStore} from "./main.jsx";
import {toast} from "react-toastify";
import {FaStop, FaBackward, FaForward, FaPlay} from "react-icons/fa";
import {FaVolumeUp} from "react-icons/fa";
import {FaVolumeMute} from "react-icons/fa";

import TextToSpeech from "./TextToSpeech.js";
import InventoryDisplay from "./InventoryDisplay.jsx";
import {IoMdSettings} from "react-icons/io";

function TopBanner(props) {

  const gameState = useStore((state) => state.game_state);
  const setNavigation = useStore((state) => state.setNavigation);
  const navigation = useStore((state) => state.navigation);
  const showSettings = useStore((state) => state.showSettings);
  const setShowSettings = useStore((state) => state.setShowSettings);


  const handleClick = () => {
    // Redirect the user to the desired URL
    setNavigation('game_portal')
    //window.location.href = 'https://signalsandsorcery.com';
  };

  return (
    <div className="flex flex-row items-center justify-between h-[56px] w-full overflow-hidden absolute">
      <div className="flex items-center h-8 overflow-hidden bg-sas-background-dark rounded p-2 ml-2 bg-opacity-50">
        <IoMdSettings
          className={`h-6 w-6 text-sas-text-grey hover:text-sas-green ${props.navigation === 'settings' ? 'text-sas-green' : ''}`}
          onClick={() => setShowSettings(!showSettings)}
        />

        <div
          className="flex flex-col items-center justify-center cursor-pointer pl-2"
          onClick={handleClick}
        >
          <div className="flex items-center w-full justify-start text-white font-rye text-sm">
            Signals & Sorcery
          </div>
        </div>
      </div>
      <div className="flex flex-row h-[32px] overflow-hidden text-white">
          <div className="flex items-center justify-center w-24 mr-2 h-full bg-white bg-opacity-75 rounded">
            <p className="text-center text-black">Level: {gameState?.level}</p>
          </div>
      </div>
    </div>
  );
}

export default TopBanner;
