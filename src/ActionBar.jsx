import React, {useState, useEffect} from 'react';
import {store} from "./main.jsx";
import {useStore} from "./main.jsx";
import {toast} from "react-toastify";
import {
  abortRequest,
  getGameMap,
  getGameInventory,
  getGameState,
  getGameEnvironment
} from "./api.js";
import {FaStop} from "react-icons/fa6";
import {FaPlay} from "react-icons/fa";
import AudioControls from "./AudioControls.jsx";
import MapInventoryToggle from "./MapInventoryToggle.jsx";
import AudioInput from "./AudioInput.jsx";

function ActionBar({}) {

  return (
    <div
      className="flex-col w-full max-w-[460px] py-4 h-1/2 bg-sas-background-light flex justify-between items-center overflow-hidden">

      <div className="flex w-full h-1/2 mb-2 bg-sas-background-dark rounded">
        <MapInventoryToggle/>

        <AudioControls />
      </div>

      <AudioInput />
    </div>

  );
}

export default ActionBar;
