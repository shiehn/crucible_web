import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { store } from './main.jsx';
import { MdRefresh } from "react-icons/md";
import {IoMdSettings} from "react-icons/io";

function UUIDButton({ setUUID }) {
  useEffect(() => {
    // Check local storage for a saved token
    const savedUUID = localStorage.getItem('token');
    if (savedUUID) {
      setUUID(savedUUID);
    } else {
      generateAndSaveUUID();
    }
  }, []);

  const generateAndSaveUUID = () => {
    resetState();
    const newUUID = uuidv4();
    localStorage.setItem('token', newUUID); // Save new token to local storage
    setUUID(newUUID);
  };

  const resetState = () => {
    //TODO - reset all state, how do I keep this up to date with the store?
    store.setState({
      messageId: null,
      uuid: null,
      connected: false,
      contract: null,
      results: null,
      submitForm: false,
      dropTargetFileName: null,
      currentOutputView: 'show_process_component',
      isLoading: false,
    });
  };

  const handleGenerateUUID = () => {
    generateAndSaveUUID();
  };

  return (
    <div className="uuid-container w-[32px] h-[32px] bg-gray-600 rounded-l overflow-hidden">
      <button onClick={handleGenerateUUID} className="w-full h-full bg-gray-300 text-sas-background-dark">
        <MdRefresh className="w-full h-full text-sas-background-light hover:bg-sas-green hover:text-sas-background-light"/>
      </button>
    </div>
  );
}

export default UUIDButton;
