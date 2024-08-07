// Settings.jsx

import React, {useState, useEffect} from 'react';
import {DEFAULT_STORAGE_PATH, useStore} from "./main.jsx";
import {createGameState, deleteGameState, getGameState} from "./api.js";
import {removeToken} from "./token.js";

function Settings({isVisible}) {
  const game_setting_and_lore = useStore((state) => state.game_setting_and_lore);
  const game_art_style = useStore((state) => state.game_art_style);
  const server_ip = useStore((state) => state.server_ip);
  const open_ai_key = useStore((state) => state.open_ai_key);

  const setGameSettingAndLore = useStore((state) => state.setGameSettingAndLore);
  const setGameArtStyle = useStore((state) => state.setGameArtStyle);
  const setOpenAIKey = useStore((state) => state.setOpenAIKey);
  const setStoragePath = useStore((state) => state.setStoragePath);
  const setGameState = useStore((state) => state.setGameState);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const setShowSettings = useStore((state) => state.setShowSettings);

  const [isKeyVisible, setIsKeyVisible] = useState(false);


  function handleOpenAIKey(value) {
    localStorage.setItem('open_ai_key', value);
    setOpenAIKey(value);
  }

  function handleGameSettingAndLore(value) {
    localStorage.setItem('game_setting_and_lore', value);
    setGameSettingAndLore(value);
  }

  function handleGameArtStyle(value) {
    localStorage.setItem('game_art_style', value);
    setGameArtStyle(value);
  }

  const handleReset = () => {
    // Clear the local storage
    localStorage.clear();
    setStoragePath(DEFAULT_STORAGE_PATH);
    setOpenAIKey('');
    setGameSettingAndLore('');
    setGameArtStyle('');
  };

  const handleLogout = () => {
    removeToken();
    window.location.href = `${server_ip}/accounts/logout/`;
  }

  const createNewGame = async () => {
    try {
      // TRY TO GET AN EXISTING GAME
      setIsLoading(true);
      const gameState = await getGameState(server_ip, '00000000-0000-0000-0000-000000000000');
      setIsLoading(false);
      if (gameState) {
        console.log("gameState", gameState);
        // IF IT EXISTS THEN DELETE IT
        await deleteGameState(server_ip, gameState?.user_id);
      } else {
        console.log("No game state found in SETTINGS")
        setShowSettings(true);
      }

      // CREATE A NEW GAME

      const createdGameState = await createGameState(server_ip, '00000000-0000-0000-0000-000000000000', open_ai_key, game_setting_and_lore, game_art_style);
      console.log("createGameState", createdGameState);
      setGameState(createdGameState);

      setShowSettings(false);
    } catch (e) {
      console.log("Error managing game state", e);
    }
  };

  return (
    <div className="w-full h-full p-4 text-sas-text-grey z-50 overflow-y-scroll">
      <div className="flex justify-end w-full border-b-2 border-gray-200 mt-12 mb-4">
        <h1 className="w-full font-bold">SETTINGS</h1>
        <span
          className="text-xs text-sas-green-800 hover:text-red-700 hover:cursor-pointer"
          onClick={handleReset}>
          reset
        </span>
      </div>


      <div className="w-full text-sm flex mb-4 items-center">
        <label htmlFor="build_num" className="w-1/3 text-left pr-2">BUILD:</label>
        <input type="text" id="build" name="build_num" value="0.10.1" readOnly
               className="w-2/3 border-2 border-gray-300 rounded text-left pl-2 text-xs h-8 bg-sas-background-light text-sas-text-grey"/>
      </div>

      <div className="w-full text-sm flex mb-4 items-center">
        <label htmlFor="open_ai_key" className="w-1/3 text-left pr-2">OPEN AI KEY:</label>
        <div className="w-2/3 flex items-center">
          <input
            type={isKeyVisible ? "text" : "password"}
            id="open_ai_key"
            name="open_ai_key"
            value={open_ai_key} // Use open_ai_key from the global state
            className="w-full border-2 border-gray-300 rounded text-left pl-2 text-xs h-8 bg-sas-background-light text-sas-text-grey"
            onChange={(e) => handleOpenAIKey(e.target.value)}
          />
          <button
            type="button"
            className="ml-2 h-8 border-2 border-gray-300 rounded text-xs bg-sas-background-light text-sas-text-grey px-2"
            onClick={() => setIsKeyVisible(!isKeyVisible)}
          >
            {isKeyVisible ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div className="w-full text-sm flex mb-4 items-center">
        <label htmlFor="game_setting_and_lore" className="w-1/3 text-left pr-2">GAME SETTING & LORE:</label>
        <textarea
          id="game_setting_and_lore"
          name="game_setting_and_lore"
          value={game_setting_and_lore} // Use game_setting_and_lore from the global state
          className="w-2/3 border-2 border-gray-300 rounded text-left pl-2 text-xs h-8 bg-sas-background-light text-sas-text-grey"
          onChange={(e) => handleGameSettingAndLore(e.target.value)}
        />
      </div>

      <div className="w-full text-sm flex mb-4 items-center">
        <label htmlFor="game_art_style" className="w-1/3 text-left pr-2">GAME ART STYLE:</label>
        <textarea
          id="game_art_style"
          name="game_art_style"
          value={game_art_style} // Use game_art_style from the global state
          className="w-2/3 border-2 border-gray-300 rounded text-left pl-2 text-xs h-8 bg-sas-background-light text-sas-text-grey"
          onChange={(e) => handleGameArtStyle(e.target.value)}
        />
      </div>

      <button className="w-full bg-green-800 hover:bg-green-500 text-white rounded p-2 text-sm mb-4"
              onClick={createNewGame}>
        START NEW GAME
      </button>

      <button className="w-full bg-red-800 hover:bg-red-500 text-white rounded p-2 text-sm mb-4"
              onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
}

export default Settings;
