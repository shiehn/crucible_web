import React, {useState, useEffect} from 'react';
import {DEFAULT_SERVER_IP, DEFAULT_STORAGE_PATH, store, useStore} from "./main.jsx";
import {Bars} from "react-loader-spinner";


function LoadingLevel({isVisible}) {

  useEffect(() => {

  }, [isVisible]);


  return (
    <div className="w-full h-full p-4 text-sas-text-grey">
      <div className="flex justify-end w-full border-b-2 border-gray-200 mt-12 mb-4">
        <h1 className="w-full font-bold">Loading Level</h1>
      </div>

      <div className="p-2">
        <h1>Generating a new level. This will take a min, hold on ...</h1>
      </div>

      <div
        className="absolute h-[360px] w-full top-18 left-0 right-0 bottom-8 flex items-center justify-center z-50">
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
    </div>
  );
}

export default LoadingLevel;
