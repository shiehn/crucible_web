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
import InventoryDisplay from "./InventoryDisplay.jsx";

function MapInventoryToggle({}) {

  const { currentOutputView,game_state, server_ip , uuid} = useStore();

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

      <div class="flex justify-center items-center w-1/5 h-full text-white">
        {(currentOutputView !== 'show_inventory_component') && (
          <button
            className={`h-[28px] rounded text-white text-sm hover:bg-gray-500 active:bg-gray-400 px-4 ml-2 ${currentOutputView === 'show_inventory_component' ? 'bg-gray-600 hover:bg-gray-600' : ''}`}
            onClick={() => handleNavigation('show_inventory_component')}>Inventory
          </button>
        )}

        {(currentOutputView === 'show_inventory_component') && (
          <button
            className={`h-[28px] rounded text-white text-sm hover:bg-gray-500 active:bg-gray-400 px-4 ml-2 ${currentOutputView === 'show_map_component' ? 'bg-gray-600 hover:bg-gray-600' : ''}`}
            onClick={() => handleNavigation('show_map_component')}>Map
          </button>
        )}
      </div>


  );
}

export default MapInventoryToggle;
