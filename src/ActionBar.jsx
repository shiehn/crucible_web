import React, {useState, useEffect} from 'react';
import {store} from "./main.jsx";
import {useStore} from "./main.jsx";
import {toast} from "react-toastify";
import {abortRequest, getGameMap, getGameInventory} from "./api.js";
import {FaStop} from "react-icons/fa6";
import {FaPlay} from "react-icons/fa";

function ActionBar({}) {
  const {connection_token,uuid, connected, currentOutputView, game_state, server_ip} = useStore();

  const handleAbort = async () => {
    await abortRequest(server_ip, connection_token);
    store.setState({isConnecting: false});
    store.setState({isLoading: false});
    
    // if (connected) {
    //   store.setState({isConnecting: false});
    //   store.setState({isLoading: true});
    //   await abortRequest(server_ip, connection_token);
    //   store.setState({isLoading: false});
    // } else {
    //   store.setState({isLoading: false});
    //   toast.error("Not connected!");
    // }
  };

  const submitForm = async () => {
    if (connected) {
      store.setState({submitForm: true});
      store.setState({currentOutputView: 'show_output_component'});
    } else {
      toast.error("Not connected!");
    }
  };

  const handleNavigation = async (outputView) => {
    if (outputView === 'show_map_component') {
      console.log("game_state: ", game_state)
      if (game_state && game_state.map_id) {

        const game_map = await getGameMap(server_ip, game_state.map_id);
        console.log("GAME_MAP: ", game_map)
        if (game_map.map_graph) {
          store.setState({currentOutputView: outputView, game_map: game_map.map_graph});
        } else {
          store.setState({currentOutputView: outputView});
        }
      } else {
        store.setState({currentOutputView: outputView});
      }
    } else if (outputView === 'show_inventory_component') {
      const inventory = await getGameInventory(server_ip, uuid);
      console.log("INVENTORY: ", inventory)
      if(inventory) {
        store.setState({currentOutputView: outputView, game_inventory: inventory});
      }
    } else {
      store.setState({currentOutputView: outputView});
    }
  };

  return (
    <div className="w-full max-w-[460px] h-[35px] pt-2 bg-sas-background-light flex justify-between items-center overflow-hidden">
      <div class="w-2/3 ml-2 text-white">
        {/*<button className={`h-[28px] rounded text-white text-sm hover:bg-gray-500 active:bg-gray-400 px-4 ${currentOutputView === 'show_output_component' ? 'bg-gray-600 hover:bg-gray-600' : ''}`}*/}
        {/*        onClick={() => handleNavigation('show_output_component')}>OUTPUT*/}
        {/*</button>*/}
        <button
          className={`h-[28px] rounded text-white text-sm hover:bg-gray-500 active:bg-gray-400 px-4 ml-2 ${currentOutputView === 'show_output_logs_component' ? 'bg-gray-600 hover:bg-gray-600' : ''}`}
          onClick={() => handleNavigation('show_output_logs_component')}>Dialogue
        </button>
        <button
          className={`h-[28px] rounded text-white text-sm hover:bg-gray-500 active:bg-gray-400 px-4 ml-2 ${currentOutputView === 'show_inventory_component' ? 'bg-gray-600 hover:bg-gray-600' : ''}`}
          onClick={() => handleNavigation('show_inventory_component')}>Inventory
        </button>
        <button
          className={`h-[28px] rounded text-white text-sm hover:bg-gray-500 active:bg-gray-400 px-4 ml-2 ${currentOutputView === 'show_map_component' ? 'bg-gray-600 hover:bg-gray-600' : ''}`}
          onClick={() => handleNavigation('show_map_component')}>Map
        </button>
      </div>
      <div className="w-1/3 flex justify-end">
        {/*<button*/}
        {/*  className="h-[28px] w-[60px] mr-2 bg-sas-green rounded-lg text-sas-background-light hover:text-white text-sm hover:sas-green active:sas-green"*/}
        {/*  onClick={submitForm}><FaPlay className="h-full w-full p-1"/></button>*/}
        {/*<button*/}
        {/*    className="h-[28px] w-[60px] mr-2 bg-red-400 rounded-lg text-sas-background-light hover:text-white text-sm hover:sas-green active:sas-green"*/}
        {/*  onClick={handleAbort}><FaStop className="h-full w-full p-1"/></button>*/}
      </div>
    </div>

  );
}

export default ActionBar;
