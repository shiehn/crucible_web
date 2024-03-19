import React, {useState, useEffect} from 'react';
import {store} from "./main.jsx";
import {useStore} from "./main.jsx";
import {toast} from "react-toastify";
import {abortRequest} from "./api.js";
import {FaStop} from "react-icons/fa6";
import {FaPlay} from "react-icons/fa";

function ActionBar({}) {
  const {connection_token, connected, currentOutputView, server_ip} = useStore();

  const handleAbort = async () => {
    if (connected) {
      store.setState({isConnecting: false});
      store.setState({isLoading: true});
      await abortRequest(server_ip, connection_token);
      store.setState({isLoading: false});
    } else {
      toast.error("Not connected!");
    }
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
    store.setState({currentOutputView: outputView});
  };

  return (
    <div className="w-[460px] h-[35px] pt-2 bg-sas-background-light flex justify-between items-center overflow-hidden">
      <div class="w-1/2 ml-2 text-white">
        <button className={`h-[28px] rounded text-white text-sm hover:bg-gray-800 px-4 ${currentOutputView === 'show_output_component' ? 'bg-gray-600 hover:bg-gray-600' : ''}`}
                onClick={() => handleNavigation('show_output_component')}>OUTPUT
        </button>
        <button className={`h-[28px] rounded text-white text-sm hover:bg-gray-800 px-4 ml-2 ${currentOutputView === 'show_output_logs_component' ? 'bg-gray-600 hover:bg-gray-600' : ''}`}
                onClick={() => handleNavigation('show_output_logs_component')}>LOGS
        </button>
      </div>
      <div className="w-1/2 flex justify-end">
        <button
          className="h-[28px] w-[60px] mr-2 bg-sas-green rounded-lg text-sas-background-light hover:text-white text-sm hover:sas-green active:sas-green"
          onClick={submitForm}><FaPlay className="h-full w-full p-1"/></button>
        <button
            className="h-[28px] w-[60px] mr-2 bg-red-400 rounded-lg text-sas-background-light hover:text-white text-sm hover:sas-green active:sas-green"
          onClick={handleAbort}><FaStop className="h-full w-full p-1"/></button>
      </div>
    </div>

  );
}

export default ActionBar;
