import React, {useEffect, useState} from 'react';
import {XCircleIcon, XMarkIcon} from '@heroicons/react/20/solid'

import Knob from './Knob.jsx';
import NetworkTest from './NetworkTest.jsx'; // <- Import added here
import Lockup from './Lockup_Dark2.svg';

import manifest from '../manifest.json';
import UUIDButton from './UUIDButton.jsx';
import ContractDisplay from './ContractDisplay.jsx';
import ResultsDisplay from "./ResultsDisplay.jsx";
import {sendResponse} from "./api.js";
import {store, useStore} from "./main.jsx";
import {toast} from "react-toastify";
import ActionBar from "./ActionBar.jsx";
import {FaPlugCircleMinus} from "react-icons/fa6";


import {FaPlugCircleCheck} from "react-icons/fa6";
import FileDropComponent from "./FileDropComponent.jsx";

import {Bars} from 'react-loader-spinner';
import RemoteLinks from "./RemoteLinks.jsx";
import RemoteConnections from "./RemoteConnections.jsx";
import {IoMdSettings} from "react-icons/io";
import Settings from "./Settings.jsx";
import LogsDisplay from "./LogsDisplay.jsx";
import GamePortal from "./GamePortal.jsx";
import MapDisplay from "./MapDisplay.jsx";
import InventoryDisplay from "./InventoryDisplay.jsx";
import CreateLevel from "./CreateLevel.jsx";
import LoadingLevel from "./LoadingLevel.jsx";
import TopBanner from "./TopBanner.jsx";


function ErrorAlert({message, reset}) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true"/>
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
              <XMarkIcon className="h-5 w-5" aria-hidden="true"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// The interface of our plugin, exported here as a React.js function
// component.
//
// We use the `props.requestParamValueUpdate` callback provided by the parent
// component to propagate new parameter values to the host.
export default function Interface(props) {

  const {isLoading, isConnecting, currentOutputView, embedded } = useStore();

  const colorProps = {
    meterColor: '#EC4899',
    knobColor: '#64748B',
    thumbColor: '#F8FAFC',
  };

  let params = manifest.parameters.map(({paramId, name, min, max, defaultValue}) => {
    let currentValue = props[paramId] || 0;

    return {
      paramId,
      name,
      value: currentValue,
      readout: `${Math.round(currentValue * 100)}%`,
      setValue: (v) => props.requestParamValueUpdate(paramId, v),
    };
  });

  const [inputValue, setInputValue] = useState(props.uuid);
  const [originalValue, setOriginalValue] = useState(props.uuid);

  // Update inputValue and originalValue when props.uuid changes
  useEffect(() => {
    setInputValue(props.uuid);
    setOriginalValue(props.uuid);
  }, [props.uuid]);

  function validateUUID(uuid) {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-(3|4|5)[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(uuid);
  }

  const validateInput = () => {
    if (validateUUID(inputValue)) {
      props.setUUID(inputValue); // Update the UUID only if it's valid
      setOriginalValue(inputValue); // Update originalValue as the current valid UUID
      localStorage.setItem('token', inputValue); // Save new token to local storage
    } else {
      setInputValue(originalValue); // Revert to the last valid UUID
      props.resetErrorState();
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
    if (!(props && props.uuid)) {
      return;
    }

    navigator.clipboard.writeText(props.uuid)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch(err => {
        toast.error('Failed to copy!');
      });
  };

  function updateNavigation(navigate_to) {
    //console.log('navigate_to', navigate_to)
    store.setState({navigation: navigate_to});

    //RESET THE CONNECTION TOKEN
    store.setState({connection_token: null, connected: false});
  }

  // Use state to track the visibility of your components
  const [isVisible, setIsVisible] = useState(false);

  // useEffect to handle the visibility state
  // useEffect(() => {
  //   // Implement your logic to determine when components become visible
  //   // You can use Intersection Observer or any other method to track visibility
  //   // For simplicity, I'm setting isVisible to true when connected is true
  //   setIsVisible(props.connected);
  // }, [props.connected]);



  const pluginTitle = embedded === 'web' ? 'Crucible Web' : 'Crucible Audio';

  return (
    <div className="w-screen max-w-[460px] h-full justify-between overflow-hidden bg-sas-background-light  relative">

      {/*START TITLE BAR HERE*/}

      {/*END TITLE BAR HERE*/}

      {/*START SUB NAV HERE*/}
      {/*<div className="flex w-full h-6 bg-sas-background-dark drop-shadow-md overflow-hidden">*/}
      {/*  <button*/}
      {/*    className={`w-1/3 rounded-t-lg text-xs drop-shadow-md hover:bg-sas-red-500 ${props.navigation === 'game_portal' ? 'bg-sas-text-grey text-bg-sas-background-dark' : 'bg-sas-background-light text-sas-text-grey'}`}*/}
      {/*    onClick={() => updateNavigation('game_portal')}*/}
      {/*  >*/}
      {/*    Game Portal*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    className={`w-1/3 rounded-t-lg text-xs drop-shadow-md hover:bg-sas-red-500 ${props.navigation === 'connected_remotes' ? 'bg-sas-text-grey text-bg-sas-background-dark' : 'bg-sas-background-light text-sas-text-grey'}`}*/}
      {/*    onClick={() => updateNavigation('connected_remotes')}*/}
      {/*  >*/}
      {/*    Connected Runes*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    className={`w-1/3 rounded-t-lg text-xs drop-shadow-md ${props.navigation === 'available_remotes' ? 'bg-sas-text-grey text-bg-sas-background-dark' : 'bg-sas-background-light text-sas-text-grey'}`}*/}
      {/*    onClick={() => updateNavigation('available_remotes')}*/}
      {/*  >*/}
      {/*    Launch Colabs*/}
      {/*  </button>*/}
      {/*</div>*/}
      {/*END SUB NAV HERE*/}

      {/* Section between Nav Bar and Action Bar */}
      <div className="h-3/5 relative"> {/* Add a relative container for the section */}
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

        <LogsDisplay/>

        {/*'sas-background-dark': '#22272e', // Custom color name and its hex value*/}
        {/*'sas-background-light': '#37404c',*/}





        <TopBanner props={props}/>





        <div className="w-full max-w-[460px] h-full  overflow-y-auto overflow-x-hidden custom-scrollbar">
          {props.connected && props.navigation != 'game_portal' && (
            <ContractDisplay contract={props.contract} isVisible={true}/>
          )}

          {!props.connected && props.navigation == 'available_remotes' && (
            <RemoteLinks isVisible={true}/>
          )}

          {!props.connected && props.navigation == 'connected_remotes' && (
            <RemoteConnections isVisible={true}/>
          )}

          {props.navigation == 'game_portal' && (
            <GamePortal isVisible={true}/>
          )}

          {!props.connected && props.navigation == 'settings' && (
            <Settings isVisible={true}/>
          )}

          {!props.connected && props.navigation == 'create_level' && (
            <CreateLevel isVisible={true}/>
          )}

          {!props.connected && props.navigation == 'loading_level' && (
            <LoadingLevel isVisible={true}/>
          )}
        </div>
      </div>
      {/* End of Section between Nav Bar and Action Bar */}


      <div className="h-2/5 flex flex-col p-2 w-full max-w-[460px]">
        <div
          className="w-full h-1/2 text-xs bg-sas-background-dark text-sas-text-grey rounded-md overflow-y-auto overflow-x-hidden custom-scrollbar">

          {/*{(currentOutputView === 'show_output_logs_component') && (*/}
          {/*  <LogsDisplay />*/}
          {/*)}*/}

          {(currentOutputView === 'show_inventory_component') && (
            <InventoryDisplay />
          )}
          {(currentOutputView === 'show_map_component') && (
            <MapDisplay />
          )}

          {/*<MapDisplay/>*/}
          {/*<InventoryDisplay/>*/}
        </div>
        <ActionBar/>
      </div>

    </div>
  );
}
