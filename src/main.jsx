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
  msgHistoryIndex: -1,
  addMessage: (message) =>
    set((state) => ({
      msgHistory: [...state.msgHistory, message],
      msgHistoryIndex: state.msgHistory.length,
    })),
  incrementMsgHistoryIndex: () =>
    set((state) => {
      const newIndex = Math.min(state.msgHistoryIndex + 1, state.msgHistory.length - 1);
      return {msgHistoryIndex: newIndex};
    }),
  decrementMsgHistoryIndex: () =>
    set((state) => {
      const newIndex = Math.max(state.msgHistoryIndex - 1, 0);
      return {msgHistoryIndex: newIndex};
    }),
  getCurrentMsgHistoryItem: () => {
    const state = get();
    return state.msgHistory[state.msgHistoryIndex] || null;
  },
  results: null,
  submitForm: false,
  dropTargetFileName: null,
  currentBgImage: null,
  setCurrentBgImage: (image) => set({currentBgImage: image}),
  currentOutputView: 'show_map_component',
  isLoading: false,
  setIsLoading: (isLoading) => set({isLoading}),
  isConnecting: false,
  navigation: DEFAULT_NAVIGATION, //game_portal,available_remotes,connected_remotes,settings,create_level, loading_level
  server_ip: DEFAULT_SERVER_IP,
  storage_path: DEFAULT_STORAGE_PATH,
  embedded: EMBEDDED,
  game_state: {},
  setGameState: (gameState) => set({game_state: gameState}),
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

function App(props) {
  const state = useStore((state) => state);
  const {error} = useErrorStore();
  const uuid = useStore((state) => state.uuid);
  const embedded = useStore((state) => state.embedded);
  const game_state = useStore((state) => state.game_state);
  const setGameState = useStore((state) => state.setGameState);
  const server_ip = useStore((state) => state.server_ip);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const addMessage = useStore((state) => state.addMessage);
  const incrementMsgHistoryIndex = useStore((state) => state.incrementMsgHistoryIndex);
  const setCurrentBgImage = useStore((state) => state.setCurrentBgImage);

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
        const currentGameState = useStore.getState().game_state;
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

    const fetchGameState = async () => {
      let tries = 0;
      const maxTries = 10;
      const retryDelay = 2000; // 2 seconds

      while (tries < maxTries) {
        tries += 1;

        // Start by fetching the game state
        const gameState = await getGameState(server_ip, uuid);
        if (gameState && Object.keys(gameState).length > 0) {
          setGameState(gameState);

          await loadInitalMapAndEnvQuery();

          if (!querySentRef.current) {
            querySentRef.current = true;

            try {
              setIsLoading(true);
              // let response = await sendGameEngineQuery("What do I see when I look around?", uuid, server_ip);
              let response = {}
              setIsLoading(false);

              console.log("ResponseData:", response);

              let logs = response?.response;
              addMessage(logs);
              incrementMsgHistoryIndex();

              let encounter = response?.action?.encounter;
              if (encounter) {
                toast.warn("Encounter: " + JSON.stringify(encounter));
                setCurrentBgImage(encounter.aesthetic.image);
              } else {
                // AFTER EVERY MESSAGE, GET THE GAME STATE, in case it has changed
                const gameState = await getGameState(server_ip, uuid);
                if (gameState) {
                  setGameState(gameState);

                  const environment = await getGameEnvironment(server_ip, gameState.environment_id);
                  console.log("XXX Environment:", environment);
                  if (environment && environment.game_info.environment.aesthetic.image) {
                    setCurrentBgImage(environment.game_info.environment.aesthetic.image);
                  }
                }
              }
            } catch (error) {
              setIsLoading(false);
              console.error("Error submitting message:", error);
              toast.error("Failed to submit message. Please try again.");
            }
          }

          return; // Exit the function if successful
        } else {
          toast.error("Game Does Not Exist. Create a new game.");
          setNavigation('settings');
        }

        // Wait for 2 seconds before retrying
        await delayCheck(retryDelay);
      }

      console.log("Max tries reached without successfully fetching the game state.");
    };

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
