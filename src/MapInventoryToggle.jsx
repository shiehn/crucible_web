import React, {useState, useEffect} from 'react';
import {store} from "./main.jsx";
import {useStore} from "./main.jsx";

import { GiLockedChest } from "react-icons/gi";
import { GiCompass } from "react-icons/gi";

import {
  getGameMap,
  getGameInventory,
} from "./api.js";

function MapInventoryToggle({}) {

  const { currentOutputView,game_state, server_ip} = useStore();

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
      const inventory = await getGameInventory(server_ip, '00000000-0000-0000-0000-000000000000');
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
            className={`h-[28px]`}
            onClick={() => handleNavigation('show_inventory_component')}>
            <GiLockedChest className="text-3xl text-sas-text-grey hover:text-white"/>
          </button>
        )}

        {(currentOutputView === 'show_inventory_component') && (
          <button
            className={`h-full`}
            onClick={() => handleNavigation('show_map_component')}><GiCompass className="text-3xl text-sas-text-grey hover:text-white"/>
          </button>
        )}
      </div>


  );
}

export default MapInventoryToggle;
