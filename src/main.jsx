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


export const DEFAULT_SERVER_IP = 'https://signalsandsorceryapi.com/';
export const DEFAULT_STORAGE_PATH = 'https://storage.googleapis.com/byoc-file-transfer/';
export const DEFAULT_NAVIGATION = 'available_remotes'

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
  results: null,
  submitForm: false,
  dropTargetFileName: null,
  currentOutputView: 'show_output_component',
  isLoading: false,
  isConnecting: false,
  navigation: DEFAULT_NAVIGATION, //connect_remotes
  server_ip: DEFAULT_SERVER_IP,
  storage_path: DEFAULT_STORAGE_PATH,
  embedded: EMBEDDED,
}));
export const useStore = createHooks(store);

const errorStore = createStore(() => ({error: null}));
const useErrorStore = createHooks(errorStore);

// Constants for interval times
const PLUGIN_REGISTER_INTERVAL_TIME = 1000;
const STATUS_CHECK_INTERVAL_TIME = 1000;
const RESPONSE_POLL_INTERVAL_TIME = 1000;
const CONTRACT_POLL_INTERVAL_TIME = 500;


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
  const {uuid, connection_token, connected, contract, embedded, messageId, currentOutputView, server_ip} = state;

  useEffect(() => {
    // console.log(`MasterToken in main: ${uuid}`);
  }, [uuid]);

  useEffect(() => {
    if (connection_token) {
      if (typeof globalThis.__postNativeMessage__ === 'function') {
        globalThis.__postNativeMessage__(JSON.stringify({action: 'SET_TOKEN', payload: connection_token}));
      }
    }
  }, [connection_token]);

  useEffect(() => {
    if (!currentOutputView) {
      return;
    }

    if(currentOutputView === 'show_remote_links'){
      //SHOW REMOTE LINKS IN THE WEB VIEW
      toast.warn("SHOW REMOTE LINKS")
    } else {
      //NAVIGATE TO THE CURRENT OUTPUT VIEW
      if (typeof globalThis.__postNativeMessage__ === 'function') {
        //"show_drop_component", "show_process_component", "show_output_component"
        globalThis.__postNativeMessage__(JSON.stringify({action: 'NAVIGATE_TO', payload: currentOutputView}));
      }
    }
  }, [currentOutputView]);

  useEffect(() => {
    let contractInterval = null;

    const registerThePluginToken = async (token, status) => {

      //console.log('register the plugin token')
      try {
        if (!token || !status) {
          return;
        }

        const url = API_URLS.PLUGIN_CONNECTION(server_ip, token, status);
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({status})
        });

        if (!response.ok) {
          throw new Error('Plugin connection status update failed');
        }

        const statusData = await response.json();
        if (statusData.success) {
          //clearInterval(pluginRegisterInterval);
        }
      } catch (error) {
        console.error("Error updating plugin connection status:", error);
      }
    };

    const fetchConnectionStatus = async () => {
      if (!connection_token) {
        return;
      }

      //GET SESSION INFO
      //NOTE: THIS DOESN'T NEED TO CALLED THIS OFTEN, BUT IT'S OKAY FOR NOW
      //BUT IT NEEDS TO BE CALLED IF THE SESSION CHANGES
      if (typeof globalThis.__postNativeMessage__ === 'function') {
        globalThis.__postNativeMessage__(JSON.stringify({action: 'GET_SESSION_INFO', payload: ""}));
      }

      try {
        const url = API_URLS.CONNECTION_STATUS(server_ip, connection_token);
        const response = await fetch(url);
        const data = await response.json();

        if (data.plugin && data.compute) {
          //TODO: would it be better to check connected status??
          store.setState({isConnecting: false})
        } else {
          store.setState({isConnecting: true})
        }

        store.setState({connected: data.plugin && data.compute});

        if (data.plugin && data.compute && !contractInterval && !state.contract) {
          contractInterval = setInterval(fetchContract, CONTRACT_POLL_INTERVAL_TIME);
        }
      } catch (error) {
        console.error("Error fetching connection status:", error);
        store.setState({connected: false});
      }
    };

    const fetchContract = async () => {
      if (connection_token && connected && !state.contract) {
        try {
          const url = API_URLS.COMPUTE_CONTRACT(server_ip, connection_token);
          const response = await fetch(url);
          if (response.ok) {
            const contractData = await response.json();
            store.setState({contract: contractData});
            clearInterval(contractInterval);
          }
        } catch (error) {
          console.error("Error fetching contract:", error);
        }
      }
    };

    const pollResponses = async () => {
      const currentState = store.getState();
      const {connection_token, messageId, connected, contract, results} = currentState;

      if (connection_token && connected && contract && messageId) {
        //console.log('Polling responses...');
        try {
          const url = API_URLS.MESSAGE_RESPONSES(server_ip, messageId, connection_token);
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to poll message responses');
          }

          const responseData = await response.json();
          // Check if the new results are different from the current results
          // This assumes that `responseData` is a JSON object or array.
          // For deep comparison, you might need a library like Lodash with its `_.isEqual` function
          if (JSON.stringify(responseData) !== JSON.stringify(results)) {
            store.setState({results: responseData});
            if (responseData && responseData.status === 'completed') {
              store.setState({isLoading: false});

              if(responseData?.response?.error){
                toast.error(responseData?.response?.error, {autoClose: 5000})
                return;
              }

              if(responseData?.response?.message){
                toast.success(responseData?.response?.message, {autoClose: 5000})
              } else {
                toast.success("Processing completed successfully")
              }

              //IF THERE ARE LOGS, SHOW THEM
              if (responseData?.response?.logs) {

                const logs = responseData.response.logs;
                console.log('LOGS:', logs);
                if (typeof globalThis.__postNativeMessage__ === 'function') {
                  globalThis.__postNativeMessage__(JSON.stringify({action: 'SET_OUTPUT_LOGS', payload: logs}));
                }
              }

              //BEFORE DOWNLOADING THE ASSETS, WE NEED TO CLEAR THE OUTPUT FOLDER
              if (typeof globalThis.__postNativeMessage__ === 'function') {
                globalThis.__postNativeMessage__(JSON.stringify({action: 'PREPARE_OUTPUT_DIR', payload: connection_token}));
              }

              //DOWNLOAD THE ASSETS
              if (responseData.response.files && responseData.response.files.length > 0) {
                responseData.response.files.forEach((file) => {
                  if (typeof globalThis.__postNativeMessage__ === 'function') {
                    globalThis.__postNativeMessage__(JSON.stringify({action: 'DOWNLOAD_ASSET', payload: file.url}));
                  }
                })

                //SHOW THE OUTPUT COMPONENT
                store.setState({currentOutputView: 'show_output_component'});
                // if (typeof globalThis.__postNativeMessage__ === 'function') {
                //   globalThis.__postNativeMessage__(JSON.stringify({action: 'NAVIGATE_TO', payload: "show_output_component"}));
                // }
              }
            } else if (responseData && responseData.status === 'error') {
              store.setState({isLoading: false});
              toast.error('ERROR', {autoClose: 5000})
            } else {
              store.setState({isLoading: true});
            }
          } else {
            // console.log('No changes in POLL RESPONSES');
          }
        } catch (error) {
          console.error("Error during polling:", error);
        }
      }
    };

    const pluginRegisterInterval = setInterval(() => {
      if(connection_token) {
        registerThePluginToken(connection_token, 1);
      }
    }, PLUGIN_REGISTER_INTERVAL_TIME);
    const statusInterval = setInterval(fetchConnectionStatus, STATUS_CHECK_INTERVAL_TIME);
    const pollInterval = setInterval(pollResponses, RESPONSE_POLL_INTERVAL_TIME);

    return () => {
      clearInterval(statusInterval);
      clearInterval(contractInterval);
      clearInterval(pluginRegisterInterval);
      clearInterval(pollInterval);
    };
  }, [connection_token, connected]);

  let outerWrapper = ''
  let outerColWidth = ''
  let centerCol = ''

  if (embedded === 'web') {
    outerWrapper = "w-full h-full flex flex-row min-h-screen overflow-hidden ";
    outerColWidth = "w-full min-h-screen";
    centerCol = "w-[460px] min-h-screen";
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
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
);

// Request initial processor state
if (typeof globalThis.__postNativeMessage__ === 'function') {
  globalThis.__postNativeMessage__("ready");
}
