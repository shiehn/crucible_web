import React, { useEffect, useState } from 'react';
import { XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import Knob from './Knob.jsx';
import NetworkTest from './NetworkTest.jsx'; // <- Import added here
import Lockup from './Lockup_Dark2.svg';
import manifest from '../manifest.json';
import UUIDButton from './UUIDButton.jsx';
import ContractDisplay from './ContractDisplay.jsx';
import ResultsDisplay from "./ResultsDisplay.jsx";
import { sendResponse } from "./api.js";
import { useStore } from "./main.jsx";
import { toast } from "react-toastify";
import ActionBar from "./ActionBar.jsx";
import { FaPlugCircleMinus } from "react-icons/fa6";
import { FaPlugCircleCheck } from "react-icons/fa6";
import FileDropComponent from "./FileDropComponent.jsx";
import { Bars } from 'react-loader-spinner';
import RemoteLinks from "./RemoteLinks.jsx";
import RemoteConnections from "./RemoteConnections.jsx";
import { IoMdSettings } from "react-icons/io";
import Settings from "./Settings.jsx";
import LogsDisplay from "./LogsDisplay.jsx";
import GamePortal from "./GamePortal.jsx";
import MapDisplay from "./MapDisplay.jsx";
import InventoryDisplay from "./InventoryDisplay.jsx";
import CreateLevel from "./CreateLevel.jsx";
import LoadingLevel from "./LoadingLevel.jsx";
import TopBanner from "./TopBanner.jsx";

function ErrorAlert({ message, reset }) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={reset}
              className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// The interface of our plugin, exported here as a React.js function component.
export default function Interface(props) {

  const uuid = useStore(state => state.uuid);
  const setUUID = useStore(state => state.setUUID);

  const { isConnecting, currentOutputView, embedded } = useStore();

  const isLoading = useStore(state => state.isLoading);

  const showSettings = useStore(state => state.showSettings);

  const colorProps = {
    meterColor: '#EC4899',
    knobColor: '#64748B',
    thumbColor: '#F8FAFC',
  };

  let params = manifest.parameters.map(({ paramId, name, min, max, defaultValue }) => {
    let currentValue = props[paramId] || 0;

    return {
      paramId,
      name,
      value: currentValue,
      readout: `${Math.round(currentValue * 100)}%`,
      setValue: (v) => props.requestParamValueUpdate(paramId, v),
    };
  });

  const [inputValue, setInputValue] = useState(uuid);
  const [originalValue, setOriginalValue] = useState(uuid);

  // Update inputValue and originalValue when uuid changes
  useEffect(() => {
    setInputValue(uuid);
    setOriginalValue(uuid);
  }, [uuid]);

  function validateUUID(uuid) {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-(3|4|5)[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(uuid);
  }

  const validateInput = () => {
    if (validateUUID(inputValue)) {
      setUUID(inputValue); // Update the UUID only if it's valid
      setOriginalValue(inputValue); // Update originalValue as the current valid UUID
      localStorage.setItem('token', inputValue); // Save new token to local storage
    } else {
      setInputValue(originalValue); // Revert to the last valid UUID
      toast.error('Invalid UUID!');
    }
  };

  const handleFocus = () => {
    setInputValue(''); // Clear the input field on focus
  };

  const handleChange = (event) => {
    setInputValue(event.target.value); // Update inputValue with the user input
  };

  const handleBlur = () => {
    validateInput();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      validateInput();
      event.target.blur(); // Optionally blur the input field
    }
  };

  const handleCopy = () => {
    if (!uuid) {
      return;
    }

    navigator.clipboard.writeText(uuid)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch(err => {
        toast.error('Failed to copy!');
      });
  };

  function updateNavigation(navigate_to) {
    store.setState({ navigation: navigate_to });
    //RESET THE CONNECTION TOKEN
    store.setState({ connection_token: null, connected: false });
  }

  const pluginTitle = embedded === 'web' ? 'Crucible Web' : 'Crucible Audio';

  return (
    <div className="w-screen max-w-[460px] h-full justify-between overflow-hidden bg-sas-background-light relative">

      {/* Section between Nav Bar and Action Bar */}
      <div className="h-3/5 relative"> {/* Add a relative container for the section */}
        {isLoading && (
          <div className="absolute h-[360px] w-full top-12 left-0 right-0 bottom-8 flex items-center justify-center z-50">
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

        <div className="w-full max-w-[460px] h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
          {showSettings && (
            <Settings isVisible={true} />
          )}

          {props.navigation === 'game_portal' && !showSettings && (
            <GamePortal isVisible={true} />
          )}

          {props.navigation === 'game_portal' && !showSettings && (
            <LogsDisplay />
          )}

          {props.navigation === 'create_level' && !showSettings && (
            <CreateLevel isVisible={true} />
          )}

          {props.navigation === 'loading_level' && !showSettings && (
            <LoadingLevel isVisible={true} />
          )}
        </div>
      </div>
      {/* End of Section between Nav Bar and Action Bar */}

      <div className="h-2/5 flex flex-col p-2 w-full max-w-[460px]">
        <div className="w-full h-1/2 text-xs bg-sas-background-dark text-sas-text-grey rounded-md overflow-y-auto overflow-x-hidden custom-scrollbar">
          {(currentOutputView === 'show_inventory_component') && (
            <InventoryDisplay />
          )}
          {(currentOutputView === 'show_map_component') && (
            <MapDisplay />
          )}
        </div>
        <ActionBar />
      </div>

    </div>
  );
}
