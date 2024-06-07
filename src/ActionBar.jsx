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
import AudioInput from "./AudioInput.jsx";

function ActionBar({}) {
  const {connection_token,uuid, connected, currentOutputView, game_state, server_ip} = useStore();

  return (
    <div
      className="flex-col w-full max-w-[460px] h-[150px] pt-2 bg-sas-background-light flex justify-between items-center overflow-hidden">

      <div className="bg-red-400 flex w-full h-12">
        <MapInventoryToggle/>

        <AudioControls />
      </div>

      <AudioInput />
    </div>

  );
}

export default ActionBar;
