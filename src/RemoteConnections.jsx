import React, {useState, useEffect} from 'react';
import {DEFAULT_SERVER_IP, DEFAULT_STORAGE_PATH, store, useStore} from "./main.jsx";
import {getConnectionMappings, isTokenConnectedToRemote, removeConnectionMapping} from "./api.js";
import {FaPlugCircleCheck, FaPlugCircleMinus} from "react-icons/fa6";
import { IoMdRefreshCircle } from "react-icons/io";
import {toast} from "react-toastify";

function RemoteConnections({isVisible}) {
  const {uuid, connected, server_ip} = useStore();
  const [connectionMappings, setConnectionMappings] = useState([]);
  const [isConnectedArray, setIsConnectedArray] = useState([]);
  const [isPolling, setIsPolling] = useState(false);
  const [isHighlight, setIsHighlight] = useState(false);


  useEffect(() => {
    let intervalId;

    async function fetchData() {
      try {
        const mappings = await getConnectionMappings(server_ip, uuid);
        setConnectionMappings(mappings);
        setIsHighlight(true); // Highlight the icon on data fetch
        setTimeout(() => setIsHighlight(false), 1000); // Revert back after 1 sec
      } catch (error) {
        console.error('Error fetching connection mappings', error);
      }
    }


    if (isVisible) {
      setIsPolling(true); // Start polling
      fetchData(); // Initial fetch
      intervalId = setInterval(fetchData, 5000); // Set up polling every 5 seconds
    } else {
      setIsPolling(false); // Stop polling
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Clear interval on component unmount or when isVisible becomes false
      }
      // Moved outside cleanup function to avoid setting state when component might be unmounted
    };
  }, [isVisible, uuid, server_ip]);


  const handlerClick = async (mapping) => {
    if (mapping.connection_token) {
      store.setState({connection_token: mapping.connection_token, connected: false});
      const isConnected = await isTokenConnectedToRemote(server_ip, mapping.connection_token);
      if (!isConnected) {
        toast.warn('Remote is not connected')
      }
    }
  };

  const handlerHyperLink = async (url, event) => {
    event.preventDefault(); // Prevent the default behavior
    if (typeof globalThis.__postNativeMessage__ === 'function') {
      globalThis.__postNativeMessage__(JSON.stringify({action: 'HYPERLINK', payload: url + '?DAWNET_TOKEN=' + uuid}));
    }
  };

  useEffect(() => {
    async function fetchIsConnected() {
      const isConnectedPromises = connectionMappings.map(async (mapping) => {
        if (mapping.connection_token) {
          const isConnected = await isTokenConnectedToRemote(server_ip, mapping.connection_token);
          return isConnected;
        }
        return false;
      });

      const isConnectedResults = await Promise.all(isConnectedPromises);
      console.log('isConnectedResults', isConnectedResults);
      setIsConnectedArray(isConnectedResults);
    }

    fetchIsConnected();
  }, [connectionMappings]);

  const handleRemove = async (mapping) => {
    if (mapping && mapping.master_token && mapping.connection_token) {
      await removeConnectionMapping(server_ip, mapping.master_token, mapping.connection_token)
    }
  };

  const refreshConnections = async () => {
    async function fetchData() {
      try {
        const mappings = await getConnectionMappings(server_ip, uuid);
        setConnectionMappings(mappings);
      } catch (error) {
        console.error('Error fetching connection mappings', error);
      }
    }

    await fetchData();
  }

  return (
    <div className="w-full h-full pt-2 bg-sas-background-grey">
      <div className="flex w-full justify-end hover:cursor-pointer">
        <div className={`flex items-center pr-2`} onClick={() => refreshConnections()}>
          <IoMdRefreshCircle
            className={`h-8 w-8 ${isHighlight ? 'text-green-500' : 'text-green-800'} hover:text-green-500 pr-2`}
            onMouseEnter={() => setIsHighlight(true)}
            onMouseLeave={() => setIsHighlight(false)}
            onClick={() => refreshConnections()}
          />
        </div>
      </div>
      {connectionMappings && connectionMappings.length > 0 ? (
        connectionMappings.map((mapping, index) => (
          <div className="p-2" key={index}>
            <div
              className="flex w-full justify-between p-2 rounded-md bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
              onClick={() => handlerClick(mapping)}
            >
              <div className="w-7/8">
                <div className="w-full text-md font-bold">{mapping.connection_name}</div>
                <div className="text-sm">{mapping.description}</div>
              </div>
              <div className="w-1/8 flex items-center justify-center">
                {isConnectedArray[index] ? (
                  <FaPlugCircleCheck className="h-8 w-8 text-green-600"/>
                ) : (
                  <FaPlugCircleMinus className="h-8 w-8 text-red-600"/>
                )}
              </div>
            </div>
            <div className="flex justify-end w-full">
              <span className="text-xxs text-red-800 pr-2 hover:cursor-pointer hover:text-red-400"
                    onClick={() => handleRemove(mapping)}>
                remove
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full text-xs">
          <div className="text-center text-sas-text-grey px-12">
            No connection mappings found. To learn how to create or connect to DAWNet remotes visit the &nbsp;
            <a
              href="https://dawnet.tools/"
              className="text-green-600 hover:text-green-800"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => handlerHyperLink("https://dawnet.tools/", event)} // Handle the default href behavior here as well
            >
              documentation
            </a>
            .
          </div>
        </div>
      )}
    </div>
  );
}

export default RemoteConnections;
