import React, {useState, useEffect} from 'react';
import {DEFAULT_SERVER_IP, DEFAULT_STORAGE_PATH, store, useStore} from "./main.jsx";
import {createGameState, deleteGameState, getGameState} from "./api.js";
import {toast} from "react-toastify";
import UUIDButton from "./UUIDButton.jsx";

function Settings({isVisible, setUUID}) {
  const {game_setting_and_lore, game_art_style, uuid, server_ip, open_ai_key} = useStore();
  const [isKeyVisible, setIsKeyVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Load values from local storage
      const storedOpenAIKey = localStorage.getItem('open_ai_key');
      const storedGameSettingAndLore = localStorage.getItem('game_setting_and_lore');
      const storedGameArtStyle = localStorage.getItem('game_art_style');

      if (storedOpenAIKey) {
        store.setState({open_ai_key: storedOpenAIKey});
      }
      if (storedGameSettingAndLore) {
        store.setState({game_setting_and_lore: storedGameSettingAndLore});
      }
      if (storedGameArtStyle) {
        store.setState({game_art_style: storedGameArtStyle});
      }
    }
  }, [isVisible, uuid]);

  function handleServerIpChange(value) {
    store.setState({server_ip: value});
    localStorage.setItem('server_ip', value);
  }

  function handleOpenAIKey(value) {
    store.setState({open_ai_key: value});
    localStorage.setItem('open_ai_key', value);
  }

  function handleGameSettingAndLore(value) {
    store.setState({game_setting_and_lore: value});
    localStorage.setItem('game_setting_and_lore', value);
  }

  function handleGameArtStyle(value) {
    store.setState({game_art_style: value});
    localStorage.setItem('game_art_style', value);
  }

  const handleReset = () => {
    // Clear the local storage
    localStorage.clear();
    store.setState({server_ip: DEFAULT_SERVER_IP});
    store.setState({storage_path: DEFAULT_STORAGE_PATH});
    store.setState({open_ai_key: ''});
    store.setState({game_setting_and_lore: ''});
    store.setState({game_art_style: ''});
  };

  const createNewGame = async () => {
    try {

      // TRY TO GET AN EXISTING GAME
      const gameState = await getGameState(server_ip, uuid);
      if (gameState) {
        console.log("gameState", gameState);
        // IF IT EXISTS THEN DELETE IT
        const deleteState = await deleteGameState(server_ip, gameState.id);
      }

      // CREATE A NEW GAME
      const createdGameState = await createGameState(server_ip, uuid, open_ai_key, game_setting_and_lore + ". " + game_art_style);
      console.log("createGameState", createdGameState);
      store.setState({game_state: createdGameState});
    } catch (e) {
      console.log("Error managing game state", e);
    }
  }

  return (
    <div className="w-full h-full p-4 text-sas-text-grey">
      <div className="flex justify-end w-full border-b-2 border-gray-200 mt-12 mb-4">
        <h1 className="w-full font-bold">SETTINGS</h1>
        <span
          className="text-xs text-sas-green-800 hover:text-red-700 hover:cursor-pointer"
          onClick={handleReset}>
          reset
        </span>
      </div>

      <UUIDButton setUUID={setUUID}/>
      <div>{uuid}</div>

      <div className="w-full text-sm flex mb-4 items-center">
        <label htmlFor="server_id" className="w-1/3 text-left pr-2">BUILD:</label>
        <input type="text" id="build" name="server_id" value="0.8.3" readOnly
               className="w-2/3 border-2 border-gray-300 rounded text-left pl-2 text-xs h-8 bg-sas-background-light text-sas-text-grey"/>
      </div>

      <div className="w-full text-sm flex mb-4 items-center">
        <label htmlFor="server_ip" className="w-1/3 text-left pr-2">SERVER IP:</label>
        <input
          type="text"
          id="server_ip"
          name="server_ip"
          value={server_ip} // Use server_ip from the global state
          className="w-2/3 border-2 border-gray-300 rounded text-left pl-2 text-xs h-8 bg-sas-background-light text-sas-text-grey"
          onChange={(e) => {
            handleServerIpChange(e.target.value)
          }}
        />
      </div>

      <div className="w-full text-sm flex mb-4 items-center">
        <label htmlFor="open_ai_key" className="w-1/3 text-left pr-2">OPEN AI KEY:</label>
        <input
          type={isKeyVisible ? "text" : "password"}
          id="open_ai_key"
          name="open_ai_key"
          value={open_ai_key} // Use storage_path from the global state
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
          value={game_setting_and_lore} // Use storage_path from the global state
          className="w-2/3 border-2 border-gray-300 rounded text-left pl-2 text-xs h-8 bg-sas-background-light text-sas-text-grey"
          onChange={(e) => handleGameSettingAndLore(e.target.value)}
        />
      </div>

      <div className="w-full text-sm flex mb-4 items-center">
        <label htmlFor="game_art_style" className="w-1/3 text-left pr-2">GAME ART STYLE:</label>
        <textarea
          id="game_art_style"
          name="game_art_style"
          value={game_art_style} // Use storage_path from the global state
          className="w-2/3 border-2 border-gray-300 rounded text-left pl-2 text-xs h-8 bg-sas-background-light text-sas-text-grey"
          onChange={(e) => handleGameArtStyle(e.target.value)}
        />
      </div>

      <button className="w-full bg-green-800 hover:bg-green-500 text-white rounded p-2 text-sm mb-4"
              onClick={createNewGame}>
        START NEW GAME
      </button>
    </div>
  );
}

export default Settings;
