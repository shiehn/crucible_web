import React, {useEffect, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import Interface from './Interface.jsx';

import createHooks from 'zustand';
import createStore from 'zustand/vanilla';

import './index.css';
import {API_URLS} from './apiUrls'; // Import the URLs

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './custom-styles.css';
import {getGameEnvironment, getGameMap, getGameState, sendGameEngineQuery} from "./api.js";

export const DEFAULT_SERVER_IP = 'https://signalsandsorceryapi.com/';
export const DEFAULT_STORAGE_PATH = 'https://storage.googleapis.com/byoc-file-transfer/';
export const DEFAULT_NAVIGATION = 'game_portal'

export const EMBEDDED = 'web'; //vst, web


// Initial state management
export const store = createStore((set) => ({
  messageId: null,
  uuid: null, //master_token
  connection_token: null, //connection_token
  bpm: 0,
  sampleRate: 0,
  connected: false,
  contract: null,
  msgHistory: [],
  results: null,
  submitForm: false,
  dropTargetFileName: null,
  currentBgImage: null,
  currentOutputView: 'show_output_logs_component',
  isLoading: false,
  isConnecting: false,
  navigation: DEFAULT_NAVIGATION, //game_portal,available_remotes,connected_remotes,settings
  server_ip: DEFAULT_SERVER_IP,
  storage_path: DEFAULT_STORAGE_PATH,
  embedded: EMBEDDED,
  game_state: {
  },
  game_map: {
    nodes: [],
    edges: [],
  },
  game_map_old: {
    nodes: [],
    edges: [],
  },
  game_inventory: [],
  game_setting_and_lore: '',
  game_art_style: '',
  open_ai_key: 'xyz',
}));
export const useStore = createHooks(store);

const errorStore = createStore(() => ({error: null}));
const useErrorStore = createHooks(errorStore);

// Constants for interval times
const PLUGIN_REGISTER_INTERVAL_TIME = 5000;
const STATUS_CHECK_INTERVAL_TIME = 5000;
const RESPONSE_POLL_INTERVAL_TIME = 5000;
const CONTRACT_POLL_INTERVAL_TIME = 5000;


//SET VALUES FROM LOCAL STORAGE
const serverIpFromLocalStorage = localStorage.getItem('server_ip' || DEFAULT_SERVER_IP);
const storagePathFromLocalStorage = localStorage.getItem('storage_path' || DEFAULT_STORAGE_PATH);
//const navigationFromLocalStorage = localStorage.getItem('navigation' || DEFAULT_NAVIGATION);
const savedUUID = localStorage.getItem('token');

if (serverIpFromLocalStorage) {
  store.setState({server_ip: serverIpFromLocalStorage});
}

if (storagePathFromLocalStorage) {
  store.setState({storage_path: storagePathFromLocalStorage});
}

if (savedUUID) {
  store.setState({uuid: savedUUID});
}


// if (navigationFromLocalStorage) {
//   store.setState({navigation: navigationFromLocalStorage});
// }

// Interop bindings
function requestParamValueUpdate(paramId, value) {
  if (typeof globalThis.__postNativeMessage__ === 'function') {
    globalThis.__postNativeMessage__("setParameterValue", {
      paramId,
      value,
    });
  }
}

globalThis.__receiveStateChange__ = function (state) {
  const props = JSON.parse(state);
  //store.setState(props);

  if (props && props.samplerate) {
    store.setState({sampleRate: props.samplerate});
  }

  if (props && props.bpm) {
    store.setState({bpm: props.bpm});
  }

  //toast.success(`SampleRate: ${JSON.stringify(props.samplerate)}`);
};

globalThis.__receiveError__ = (err) => {
  errorStore.setState({error: err});
};

function App(props) {
  const state = useStore();
  const {error} = useErrorStore();
  const {uuid, connection_token, connected, contract, embedded, game_state, messageId, currentOutputView, server_ip} = state;


  useEffect(() => {

    const loadInitalMapAndEnvQuery = async () => {
      //LOAD MAP
      if (game_state && game_state.map_id) {
          const game_map = await getGameMap(server_ip, game_state.map_id);
          console.log("GAME_MAP: ", game_map)
          if (game_map.map_graph) {
            store.setState({game_map: game_map.map_graph});
            console.log("AUTO LOADED GAME_MAP")
          }
        }
    }

    // Define an asynchronous function
    const fetchGameState = async () => {
      console.log(`MasterToken in main: ${uuid}`);
      // Start by fetching the game state
      const gameState = await getGameState(server_ip, uuid);
      if (gameState) {
        store.setState({game_state: gameState});
        console.log("GET_STATE_SET")
        // Delay loading the initial query by 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));
        await loadInitalMapAndEnvQuery();

        store.setState({isLoading: true});
        let response = await sendGameEngineQuery("Where am I?", uuid, server_ip)
        store.setState({isLoading: false});

        console.log("ResponseData:", response);

        let logs = response?.response;

        store.setState((prevState) => {
          const lastItem = prevState.msgHistory[prevState.msgHistory.length - 1];

          console.log("Last item: " + logs)

          if (lastItem !== logs) {
            return {
              msgHistory: [...prevState.msgHistory, logs], // Append new item if it's different
            };
          }

          return prevState; // If the item is the same, return the current state unchanged
        });


        const environment = await getGameEnvironment(server_ip, gameState.environment_id);
        console.log("XXX Environment:", environment);
        if (environment) {
          if(environment.game_info.environment.aesthetic.image){
            store.setState({currentBgImage: environment.game_info.environment.aesthetic.image})
          }
        }


      } else {
        console.log("GET_STATE_NOT_SET")
        toast.error("Game Does Not Exist. Create a new game.")
        store.setState({navigation: 'settings'});

      }
    };

    // Call the asynchronous function
    fetchGameState();
  }, [uuid]);

  useEffect(() => {
    if (connection_token) {
      if (typeof globalThis.__postNativeMessage__ === 'function') {
        globalThis.__postNativeMessage__(JSON.stringify({action: 'SET_TOKEN', payload: connection_token}));
      }
    }
  }, [connection_token]);

  // useEffect(() => {
  //   if (!currentOutputView) {
  //     return;
  //   }
  //
  //   if (currentOutputView === 'show_remote_links') {
  //     //SHOW REMOTE LINKS IN THE WEB VIEW
  //     toast.warn("SHOW REMOTE LINKS")
  //   } else {
  //     //NAVIGATE TO THE CURRENT OUTPUT VIEW
  //     if (typeof globalThis.__postNativeMessage__ === 'function') {
  //       //"show_drop_component", "show_process_component", "show_output_component"
  //       globalThis.__postNativeMessage__(JSON.stringify({action: 'NAVIGATE_TO', payload: currentOutputView}));
  //     }
  //   }
  // }, [currentOutputView]);

  // useEffect(() => {
  //   let contractInterval = null;
  //
  //   const registerThePluginToken = async (token, status) => {
  //
  //     //console.log('register the plugin token')
  //     try {
  //       if (!token || !status) {
  //         return;
  //       }
  //
  //       const url = API_URLS.PLUGIN_CONNECTION(server_ip, token, status);
  //       const response = await fetch(url, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({status})
  //       });
  //
  //       if (!response.ok) {
  //         throw new Error('Plugin connection status update failed');
  //       }
  //
  //       const statusData = await response.json();
  //       if (statusData.success) {
  //         //console.log("Plugin connection status updated successfully")
  //         //clearInterval(pluginRegisterInterval);
  //       }
  //     } catch (error) {
  //       console.error("Error updating plugin connection status:", error);
  //     }
  //   };
  //
  //   const fetchConnectionStatus = async () => {
  //     if (!connection_token) {
  //       return;
  //     }
  //
  //     //GET SESSION INFO
  //     //NOTE: THIS DOESN'T NEED TO CALLED THIS OFTEN, BUT IT'S OKAY FOR NOW
  //     //BUT IT NEEDS TO BE CALLED IF THE SESSION CHANGES
  //     if (typeof globalThis.__postNativeMessage__ === 'function') {
  //       globalThis.__postNativeMessage__(JSON.stringify({action: 'GET_SESSION_INFO', payload: ""}));
  //     }
  //
  //     try {
  //       const url = API_URLS.CONNECTION_STATUS(server_ip, connection_token);
  //       const response = await fetch(url);
  //       const data = await response.json();
  //
  //       if (data.plugin && data.compute) {
  //         //TODO: would it be better to check connected status??
  //         store.setState({isConnecting: false})
  //       } else {
  //         store.setState({isConnecting: true})
  //       }
  //
  //       store.setState({connected: data.plugin && data.compute});
  //
  //       if (data.plugin && data.compute && !contractInterval && !state.contract) {
  //         contractInterval = setInterval(fetchContract, CONTRACT_POLL_INTERVAL_TIME);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching connection status:", error);
  //       store.setState({connected: false});
  //     }
  //   };
  //
  //   const fetchContract = async () => {
  //     if (connection_token && connected && !state.contract) {
  //       try {
  //         const url = API_URLS.COMPUTE_CONTRACT(server_ip, connection_token);
  //         const response = await fetch(url);
  //         if (response.ok) {
  //           const contractData = await response.json();
  //           store.setState({contract: contractData});
  //           console.log('CONTRACT:', contractData);
  //           clearInterval(contractInterval);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching contract:", error);
  //       }
  //     }
  //   };
  //
  //   const pollResponses = async () => {
  //     const currentState = store.getState();
  //     const {connection_token, messageId, connected, contract, results} = currentState;
  //
  //     //console.log('POLL STATUS', connection_token, connected, contract, messageId);
  //     if (connection_token && connected && contract && messageId) {
  //       //console.log('Polling responses...');
  //       try {
  //         const url = API_URLS.MESSAGE_RESPONSES(server_ip, messageId, connection_token);
  //         const response = await fetch(url, {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         });
  //
  //         if (!response.ok) {
  //           console.error('Failed to poll message responses');
  //           store.setState({
  //             isLoading: false,
  //             connection_token: null,
  //             connected: false,
  //             contract: null,
  //             messageId: null
  //           });
  //           //throw new Error('Failed to poll message responses');
  //         }
  //
  //         const responseData = await response.json();
  //         // Check if the new results are different from the current results
  //         // This assumes that `responseData` is a JSON object or array.
  //         // For deep comparison, you might need a library like Lodash with its `_.isEqual` function
  //         if (JSON.stringify(responseData) !== JSON.stringify(results)) {
  //           store.setState({results: responseData});
  //           if (responseData && responseData.status === 'completed') {
  //
  //             //console.log('Polled response:', responseData)
  //             store.setState({isLoading: false});
  //
  //             if (responseData?.response?.error) {
  //               toast.error(responseData?.response?.error, {autoClose: 5000})
  //               store.setState({
  //                 isLoading: false,
  //                 connection_token: null,
  //                 connected: false,
  //                 contract: null,
  //                 messageId: null
  //               });
  //               return;
  //             }
  //
  //             if (responseData?.response?.message) {
  //               toast.success(responseData?.response?.message, {autoClose: 5000})
  //             } else {
  //               toast.success("Processing completed successfully")
  //             }
  //
  //             //IF THERE ARE LOGS, SHOW THEM
  //             if (responseData?.response?.logs) {
  //
  //               const logs = responseData.response.logs;
  //
  //               // store.setState((prevState) => {
  //               //   const lastItem = prevState.msgHistory[prevState.msgHistory.length - 1];
  //               //
  //               //   if (lastItem !== logs) {
  //               //     return {
  //               //       msgHistory: [...prevState.msgHistory, logs], // Append new item if it's different
  //               //     };
  //               //   }
  //               //
  //               //   return prevState; // If the item is the same, return the current state unchanged
  //               // });
  //
  //               console.log('LOGS:', logs);
  //               if (typeof globalThis.__postNativeMessage__ === 'function') {
  //                 globalThis.__postNativeMessage__(JSON.stringify({action: 'SET_OUTPUT_LOGS', payload: logs}));
  //               }
  //             }
  //
  //             //BEFORE DOWNLOADING THE ASSETS, WE NEED TO CLEAR THE OUTPUT FOLDER
  //             if (typeof globalThis.__postNativeMessage__ === 'function') {
  //               globalThis.__postNativeMessage__(JSON.stringify({
  //                 action: 'PREPARE_OUTPUT_DIR',
  //                 payload: connection_token
  //               }));
  //             }
  //
  //             //DOWNLOAD THE ASSETS
  //             if (responseData.response.files && responseData.response.files.length > 0) {
  //               responseData.response.files.forEach((file) => {
  //                 if (typeof globalThis.__postNativeMessage__ === 'function') {
  //                   globalThis.__postNativeMessage__(JSON.stringify({action: 'DOWNLOAD_ASSET', payload: file.url}));
  //                 }
  //               })
  //
  //               //SHOW THE OUTPUT COMPONENT
  //               store.setState({currentOutputView: 'show_output_component'});
  //               // if (typeof globalThis.__postNativeMessage__ === 'function') {
  //               //   globalThis.__postNativeMessage__(JSON.stringify({action: 'NAVIGATE_TO', payload: "show_output_component"}));
  //               // }
  //             }
  //
  //             store.setState({
  //               isLoading: false,
  //               connection_token: null,
  //               connected: false,
  //               contract: null,
  //               messageId: null
  //             });
  //
  //           } else if (responseData && responseData.status === 'error') {
  //             store.setState({
  //               isLoading: false,
  //               connection_token: null,
  //               connected: false,
  //               contract: null,
  //               messageId: null
  //             });
  //             toast.error('ERROR', {autoClose: 5000})
  //           } else if (responseData && responseData.status === 'aborted') {
  //             store.setState({
  //               isLoading: false,
  //               connection_token: null,
  //               connected: false,
  //               contract: null,
  //               messageId: null
  //             });
  //             //toast.error('ERROR', {autoClose: 5000})
  //           } else {
  //             //store.setState({isLoading: true});
  //           }
  //         } else {
  //           // console.log('No changes in POLL RESPONSES');
  //         }
  //       } catch (error) {
  //         console.error("Error during polling:", error);
  //       }
  //
  //     }
  //   };
  //
  //   // const pluginRegisterInterval = setInterval(() => {
  //   //   if (connection_token) {
  //   //     registerThePluginToken(connection_token, 1);
  //   //   }
  //   // }, PLUGIN_REGISTER_INTERVAL_TIME);
  //   // const statusInterval = setInterval(fetchConnectionStatus, STATUS_CHECK_INTERVAL_TIME);
  //   // const pollInterval = setInterval(pollResponses, RESPONSE_POLL_INTERVAL_TIME);
  //
  //   return () => {
  //     // clearInterval(statusInterval);
  //     // clearInterval(contractInterval);
  //     // clearInterval(pluginRegisterInterval);
  //     // clearInterval(pollInterval);
  //   };
  // }, [connection_token, connected]);

  let outerWrapper = ''
  let outerColWidth = ''
  let centerCol = ''

  if (embedded === 'web') {
    outerWrapper = "w-full h-full min-h-screen flex flex-row  overflow-hidden ";
    outerColWidth = "w-full min-h-screen";
    centerCol = "w-full max-w-[460px] min-h-screen";
  } else if (embedded === 'vst') {
    outerWrapper = "w-[460px] h-[465px] flex flex-row overflow-hidden";
    outerColWidth = "w-[0px] h-[465px]";
    centerCol = "w-[460px] h-[465px]";
  }

  return (
    <div className={outerWrapper}>
      <div className={outerColWidth}>
        <div className="w-full h-[80px] bg-sas-background-dark"></div>
        <div className="w-full h-[350px] bg-sas-background-dark"></div>
        <div className="w-full h-[35px] bg-sas-background-dark"></div>
        <div className="w-full h-full bg-sas-background-dark"></div>
      </div>
      <div className={centerCol}>
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Interface
          {...state}
          setUUID={(newUUID) => store.setState({uuid: newUUID})}
          error={error}
          requestParamValueUpdate={requestParamValueUpdate}
          resetErrorState={() => errorStore.setState({error: null})}
        />
      </div>
      <div className={outerColWidth}>
        <div className="w-full h-[80px] bg-sas-background-dark"></div>
        <div className="w-full h-[350px] bg-sas-background-dark"></div>
        <div className="w-full h-[35px] bg-sas-background-dark"></div>
        <div className="w-full h-full bg-sas-background-dark"></div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App/>,
);

// Request initial processor state
if (typeof globalThis.__postNativeMessage__ === 'function') {
  globalThis.__postNativeMessage__("ready");
}
