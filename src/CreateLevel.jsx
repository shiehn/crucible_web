import React, { useState, useEffect } from 'react';
import { DEFAULT_SERVER_IP, DEFAULT_STORAGE_PATH, store, useStore } from "./main.jsx";
import { createGameState, deleteGameState, getGameState, renderGameAssets } from "./api.js";

function CreateLevel({ isVisible }) {
  const { game_setting_and_lore, game_art_style, uuid, server_ip, open_ai_key } = useStore();
  const [isKeyVisible, setIsKeyVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Load values from local storage
      const storedOpenAIKey = localStorage.getItem('open_ai_key');
      const storedGameSettingAndLore = localStorage.getItem('game_setting_and_lore');
      const storedGameArtStyle = localStorage.getItem('game_art_style');

      if (storedOpenAIKey) {
        store.setState({ open_ai_key: storedOpenAIKey });
      }
      if (storedGameSettingAndLore) {
        store.setState({ game_setting_and_lore: storedGameSettingAndLore });
      }
      if (storedGameArtStyle) {
        store.setState({ game_art_style: storedGameArtStyle });
      }
    }
  }, [isVisible, uuid]);

  function handleOpenAIKey(value) {
    store.setState({ open_ai_key: value });
    localStorage.setItem('open_ai_key', value);
  }

  function handleGameSettingAndLore(value) {
    store.setState({ game_setting_and_lore: value });
    localStorage.setItem('game_setting_and_lore', value);
  }

  function handleGameArtStyle(value) {
    store.setState({ game_art_style: value });
    localStorage.setItem('game_art_style', value);
  }

  const handleReset = () => {
    // Clear the local storage
    localStorage.clear();
    store.setState({ server_ip: DEFAULT_SERVER_IP });
    store.setState({ open_ai_key: '' });
    store.setState({ game_setting_and_lore: '' });
    store.setState({ game_art_style: '' });
  };

  const createNewGame = async () => {
    try {
      const gameState = await getGameState(server_ip, uuid);
      if (gameState) {
        console.log("gameState", gameState);
        const deleteState = await deleteGameState(server_ip, gameState.id);
      }
    } catch (e) {
      console.log("Error deleting game state", e);
    }

    const createdGameState = await createGameState(server_ip, uuid, open_ai_key, game_setting_and_lore + ". " + game_art_style);
    console.log("createGameState", createdGameState);
    store.setState({ game_state: createdGameState });
  };

  return (
    <div className="w-full h-full p-4 text-sas-text-grey">
      <div className="flex justify-end w-full border-b-2 border-gray-200 mb-4">
        <h1 className="w-full font-bold">GENERATE LEVEL</h1>
        <span
          className="text-xs text-sas-green-800 hover:text-red-700 hover:cursor-pointer"
          onClick={handleReset}>
          reset
        </span>
      </div>

      <div className="w-full text-sm flex mb-4 items-center">
        <label htmlFor="open_ai_key" className="w-1/3 text-left pr-2">OPEN AI KEY:</label>
        <input
          type={isKeyVisible ? "text" : "password"}
          id="open_ai_key"
          name="open_ai_key"
          value={open_ai_key}
          className="w-2/3 border-2 border-gray-300 rounded text-left pl-2 text-xs h-8 bg-sas-background-light text-sas-text-grey"
          onChange={(e) => handleOpenAIKey(e.target.value)}
        />
        <button
          type="button"
          className="ml-2"
          onClick={() => setIsKeyVisible(!isKeyVisible)}
        >
          {isKeyVisible ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className="w-full text-sm flex mb-4 items-center">
        <label htmlFor="game_setting_and_lore" className="w-1/3 text-left pr-2">GAME SETTING & LORE:</label>
        <textarea
          id="game_setting_and_lore"
          name="game_setting_and_lore"
          value={game_setting_and_lore}
          className="w-2/3 border-2 border-gray-300 rounded text-left pl-2 text-xs h-8 bg-sas-background-light text-sas-text-grey"
          onChange={(e) => handleGameSettingAndLore(e.target.value)}
        />
      </div>

      <div className="w-full text-sm flex mb-4 items-center">
        <label htmlFor="game_art_style" className="w-1/3 text-left pr-2">GAME ART STYLE:</label>
        <textarea
          id="game_art_style"
          name="game_art_style"
          value={game_art_style}
          className="w-2/3 border-2 border-gray-300 rounded text-left pl-2 text-xs h-8 bg-sas-background-light text-sas-text-grey"
          onChange={(e) => handleGameArtStyle(e.target.value)}
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
