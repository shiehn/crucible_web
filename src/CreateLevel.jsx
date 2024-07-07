import React, { useState, useEffect } from 'react';
import { DEFAULT_SERVER_IP, useStore } from "./main.jsx";
import {createGameState, deleteGameState, generateLevelMap, getGameState} from "./api.js";

function CreateLevel({ isVisible }) {
  const game_setting_and_lore = useStore((state) => state.game_setting_and_lore);
  const game_art_style = useStore((state) => state.game_art_style);
  const server_ip = useStore((state) => state.server_ip);
  const open_ai_key = useStore((state) => state.open_ai_key);


  const createNewGame = async () => {
    const generationResponse = await generateLevelMap(server_ip, '00000000-0000-0000-0000-000000000000', open_ai_key);
    console.log("generationResponse", generationResponse);
  };

  return (
    <div className="w-full h-full p-4 text-sas-text-grey">
      <div className="flex justify-end w-full border-b-2 border-gray-200 mt-12 mb-4">
        <h1 className="w-full font-bold">GENERATE LEVEL</h1>
      </div>

      <div className="w-full text-sm flex mb-4 items-center">
        <label htmlFor="game_setting_and_lore" className="w-1/3 text-left pr-2">GAME SETTING & LORE:</label>
        <textarea readOnly
          id="game_setting_and_lore"
          name="game_setting_and_lore"
          value={game_setting_and_lore}
          className="w-2/3 border-2 border-gray-300 rounded text-left pl-2 text-xs h-8 bg-sas-background-light text-sas-text-grey"
        />
      </div>

      <div className="w-full text-sm flex mb-4 items-center">
        <label htmlFor="game_art_style" className="w-1/3 text-left pr-2">GAME ART STYLE:</label>
        <textarea readOnly
          id="game_art_style"
          name="game_art_style"
          value={game_art_style}
          className="w-2/3 border-2 border-gray-300 rounded text-left pl-2 text-xs h-8 bg-sas-background-light text-sas-text-grey"
        />
      </div>

      <button className="w-full bg-green-800 hover:bg-green-500 text-white rounded p-2 text-sm mb-4"
              onClick={createNewGame}>
        Generate Level
      </button>
    </div>
  );
}

export default CreateLevel;
