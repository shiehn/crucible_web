import React, { useEffect, useState } from 'react';
import { XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import Knob from './Knob.jsx';
import NetworkTest from './NetworkTest.jsx';
import { useStore } from "./main.jsx";
import ActionBar from "./ActionBar.jsx";
import { Bars } from 'react-loader-spinner';
import Settings from "./Settings.jsx";
import LogsDisplay from "./LogsDisplay.jsx";
import GamePortal from "./GamePortal.jsx";
import MapDisplay from "./MapDisplay.jsx";
import InventoryDisplay from "./InventoryDisplay.jsx";
import CreateLevel from "./CreateLevel.jsx";
import LoadingLevel from "./LoadingLevel.jsx";
import TopBanner from "./TopBanner.jsx";

// The interface of our plugin, exported here as a React.js function component.
export default function Interface(props) {
  const { currentOutputView } = useStore();
  const isLoading = useStore(state => state.isLoading);
  const showSettings = useStore(state => state.showSettings);

  return (
    <div className="w-screen max-w-[460px] h-[100dvh] flex flex-col justify-between overflow-hidden bg-sas-background-light relative">
      <div className="h-3/5 overflow-hidden relative">
        {isLoading && (
          <div
            className="absolute h-[360px] w-full top-12 left-0 right-0 bottom-8 flex items-center justify-center z-50">
            {/* Loading animation */}
            <Bars
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}

        <TopBanner props={props} />

        <div className="w-full max-w-[460px] h-full overflow-hidden">
          {showSettings && (
            <Settings isVisible={true}/>
          )}

          {props.navigation === 'game_portal' && !showSettings && (
            <GamePortal isVisible={true}/>
          )}

          {props.navigation === 'game_portal' && !showSettings && (
            <LogsDisplay/>
          )}

          {props.navigation === 'create_level' && !showSettings && (
            <CreateLevel isVisible={true}/>
          )}

          {props.navigation === 'loading_level' && !showSettings && (
            <LoadingLevel isVisible={true}/>
          )}
        </div>
      </div>
      <div className="h-2/5 flex flex-col overflow-hidden w-full max-w-[460px]">
        <div
          className="w-full h-1/2 text-xs text-sas-text-grey rounded-md overflow-y-auto overflow-x-hidden custom-scrollbar p-2">
          {(currentOutputView === 'show_inventory_component') && (
            <InventoryDisplay/>
          )}
          {(currentOutputView === 'show_map_component') && (
            <MapDisplay/>
          )}
        </div>
        <ActionBar/>
      </div>
    </div>
  );
}
