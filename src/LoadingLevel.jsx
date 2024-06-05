import React, {useState, useEffect} from 'react';
import {DEFAULT_SERVER_IP, DEFAULT_STORAGE_PATH, store, useStore} from "./main.jsx";
import {createGameState, deleteGameState, getConnectionMappings, getGameState, renderGameAssets} from "./api.js";


function LoadingLevel({isVisible}) {

  const {game_setting_and_lore, game_art_style, uuid, connected, server_ip, storage_path, open_ai_key} = useStore();

  useEffect(() => {
    if (isVisible) {
      //perform action on show
    }
  }, [isVisible, uuid]);


  return (
    <div className="w-full h-full p-4 text-sas-text-grey">
      <div className="flex justify-end w-full border-b-2 border-gray-200 mb-4">
        <h1 className="w-full font-bold">Loading Level</h1>
        <h1>Generating New Level.  One sec ...</h1>
      </div>
    </div>
  );
}

export default LoadingLevel;
