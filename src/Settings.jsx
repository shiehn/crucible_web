import React, {useState, useEffect} from 'react';
import {DEFAULT_SERVER_IP, DEFAULT_STORAGE_PATH, store, useStore} from "./main.jsx";
import {createGameState, deleteGameState, getConnectionMappings, getGameState} from "./api.js";


function Settings({isVisible}) {

  const {uuid, connected, server_ip, storage_path} = useStore();

  useEffect(() => {
    if (isVisible) {
      //perform action on show
    }
  }, [isVisible, uuid]);

  function handleServerIpChange(value) {
    store.setState({server_ip: value})
    localStorage.setItem('server_ip', value);
  }

  function handleStoragePath(value) {
    store.setState({storage_path: value})
    localStorage.setItem('storage_path', value);
  }

  const handleReset = () => {
    // Clear the local storage
    localStorage.clear();
    store.setState({server_ip: DEFAULT_SERVER_IP})
    store.setState({storage_path: DEFAULT_STORAGE_PATH})
  };

  const createNewGame = async () => {

    // TRY TO GET AN EXISTING GAME
    const gameState = await getGameState(server_ip, uuid);
    if (gameState) {
      console.log("gameState", gameState)
      //IF IT EXISTS THEN DELETE IT
      const deleteState = await deleteGameState(server_ip, gameState.id);
    }

    //CREATE A NEW GAME
    const createdGameState = await createGameState(server_ip, uuid, "aesthetic");
    console.log("createGameState", createdGameState);
    store.setState({game_state: gameState});
  }


  return (
    <div className="w-full h-full p-4 text-sas-text-grey">
      <div className="flex justify-end w-full border-b-2 border-gray-200 mb-4">
        <h1 className="w-full font-bold">SETTINGS</h1>
        <span
          className="text-xs text-sas-green-800 hover:text-red-700 hover:cursor-pointer"
          onClick={handleReset}>
        reset
    </span>
      </div>

      <div className="w-full text-sm flex mb-4 items-center">
        <label htmlFor="server_id" className="w-1/3 text-left pr-2">BUILD:</label>
        <input type="text" id="build" name="server_id" value="0.8.3" readOnly
               className="w-2/3 border-2 border-gray-300 rounded text-left pl-2 text-xs h-8 bg-sas-background-light text-sas-text-grey"/>
      </div>

      <div className="w-full text-sm flex mb-4 items-center">
        <label htmlFor="server_ip" className="w-1/3 text-left pr-2">SERVER IP:</label>
        <input
          type="text"
          id="build"
          name="server_id"
          value={server_ip} // Use server_ip from the global state
          className="w-2/3 border-2 border-gray-300 rounded text-left pl-2 text-xs h-8 bg-sas-background-light text-sas-text-grey"
          onChange={(e) => {
            handleServerIpChange(e.target.value)
          }}
        />
      </div>

      <div className="w-full text-sm flex mb-4 items-center">
        <label htmlFor="storage_path" className="w-1/3 text-left pr-2">STORAGE PATH:</label>
        <input
          type="text"
          id="build"
          name="storage_path"
          value={storage_path} // Use storage_path from the global state
          className="w-2/3 border-2 border-gray-300 rounded text-left pl-2 text-xs h-8 bg-sas-background-light text-sas-text-grey"
          onChange={(e) => {
            handleStoragePath(e.target.value)
          }}
        />
      </div>

      <button className="w-full bg-sas-green-800 text-white rounded p-2 text-sm" onClick={createNewGame}>NEW GAME
      </button>
    </div>
  );
}

export default Settings;
