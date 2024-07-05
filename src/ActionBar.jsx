import React, {useState, useEffect} from 'react';
import AudioControls from "./AudioControls.jsx";
import MapInventoryToggle from "./MapInventoryToggle.jsx";
import AudioInput from "./AudioInput.jsx";

function ActionBar({}) {

  return (
    <div
      className="flex-col w-full max-w-[460px] h-1/2 bg-sas-background-light flex justify-between items-center overflow-hidden">

      <div className="flex w-full h-1/2 rounded p-2">
        <MapInventoryToggle/>

        <AudioControls />
      </div>

      <AudioInput />
    </div>

  );
}

export default ActionBar;
