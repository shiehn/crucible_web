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
import {
  getGameEnvironment,
  getGameEvents,
  getGameMap,
  getGameQueueUpdate,
  getGameState,
  sendGameEngineQuery
} from "./api.js";

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
  currentOutputView: 'show_map_component',
  isLoading: false,
  isConnecting: false,
  navigation: DEFAULT_NAVIGATION, //game_portal,available_remotes,connected_remotes,settings,create_level, loading_level
  server_ip: DEFAULT_SERVER_IP,
  storage_path: DEFAULT_STORAGE_PATH,
  embedded: EMBEDDED,
  game_state: {},
  game_map: {
    nodes: [],
    edges: [],
  },
  setGameMap: (map) => set({game_map: map}),
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
  const {
    uuid,
    embedded,
    game_state,
    server_ip
  } = state;

  const querySentRef = useRef(false); // Ref to track if the query has been sent

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const gqu = await getGameQueueUpdate(server_ip, uuid);
      //console.log("GameQueueUpdate", gqu)
      if (gqu && gqu.status) {
        if (gqu.status === 'queued') {
          if (gqu.level > 1) {
            store.setState({navigation: 'create_level'});
            //console.log("GameQueueUpdate", "LEVEL UP VIEW")
          } else {
            store.setState({navigation: 'create_level'});
            //console.log("GameQueueUpdate", "NEW GAME VIEW")
          }
        } else if (gqu.status === 'started') {
          store.setState({navigation: 'loading_level'});
          //console.log("GameQueueUpdate", "LOADING SCREEN")
        } else {

          store.setState({navigation: 'game_portal'});

          //console.log("GameQueueUpdate", "NORMAL GAME FLOW")
        }
      }
    }, 5000);  // Calls getGameQueueUpdate every 5 seconds

    return () => {
      clearInterval(intervalId);  // Clears the interval when the component unmounts
    };
  }, []);

  //PULL GAME EVENTS
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const gameEvents = await getGameEvents(server_ip, uuid);
      if (gameEvents && gameEvents.event) {

        /*
          ("level-up-ready", "LevelUpReady"),
          ("level-up-complete", "LevelUpComplete"),
          ("encounter-start", "EncounterStart"),
          ("encounter-victory", "EncounterVictory"),
          ("encounter-loss", "EncounterLoss"),
          ("inventory-update", "InventoryUpdate"),
         */

        toast.success("EVENT: " + gameEvents.event)
      }
    }, 3000);  // Calls getGameQueueUpdate every 5 seconds

    return () => {
      clearInterval(intervalId);  // Clears the interval when the component unmounts
    };
  }, []);

  const setGameMap = useStore((state) => state.setGameMap);

  useEffect(() => {
    const delayCheck = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const loadInitalMapAndEnvQuery = async () => {
      let tries = 0;
      const maxTries = 10;
      const retryDelay = 2000; // 2 seconds

      while (tries < maxTries) {
        tries += 1;

        // Load map
        const currentGameState = store.getState().game_state;
        console.log('FUCKING 2 STATE', currentGameState);
        console.log('FUCKING 2 MAP_ID', currentGameState?.map_id);

        if (currentGameState && currentGameState.map_id) {
          const game_map = await getGameMap(server_ip, currentGameState.map_id);
          console.log("MAP GAME_MAP: ", game_map);
          if (game_map.map_graph) {
            setGameMap(game_map.map_graph);
            console.log("MAP AUTO LOADED GAME_MAP");
            return; // Exit the function if successful
          }
        } else {
          console.log(`Attempt ${tries}: game_state or game_state.map_id not valid. Retrying...`);
        }

        // Wait for 2 seconds before retrying
        await delayCheck(retryDelay);
      }

      console.log("Max tries reached without successfully loading the map.");
    };

    // Define an asynchronous function
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const fetchGameState = async () => {
      let tries = 0;
      const maxTries = 10;
      const retryDelay = 2000; // 2 seconds

      while (tries < maxTries) {
        tries += 1;

        // Start by fetching the game state
        const gameState = await getGameState(server_ip, uuid);
        console.log('FUCKING GAME_STATE', gameState);
        console.log('FUCKING GAME_STATE_MAP_ID', gameState.map_id);

        if (gameState && Object.keys(gameState).length > 0) {
          console.log('FUCKING ENTERED');
          store.setState({ game_state: gameState });

          await loadInitalMapAndEnvQuery();

          store.setState({ isLoading: true });
          let response = await sendGameEngineQuery("Where am I?", uuid, server_ip)
          store.setState({ isLoading: false });

          let logs = response?.response;

          store.setState((prevState) => {
            const lastItem = prevState.msgHistory[prevState.msgHistory.length - 1];

            if (lastItem !== logs) {
              return {
                msgHistory: [...prevState.msgHistory, logs], // Append new item if it's different
              };
            }

            return prevState; // If the item is the same, return the current state unchanged
          });

          const environment = await getGameEnvironment(server_ip, gameState.environment_id);
          if (environment) {
            if (environment.game_info.environment.aesthetic.image) {
              store.setState({ currentBgImage: environment.game_info.environment.aesthetic.image });
            }
          }

          return; // Exit the function if successful
        } else {
          toast.error("Game Does Not Exist. Create a new game.");
          store.setState({ navigation: 'settings' });
        }

        // Wait for 2 seconds before retrying
        await delay(retryDelay);
      }

      console.log("Max tries reached without successfully fetching the game state.");
    };

// Call the asynchronous function
    if (!querySentRef.current) {
      fetchGameState();
    } else {
      console.log("Query already sent");
    }
  }, []);

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
