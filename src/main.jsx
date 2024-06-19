import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import Interface from './Interface.jsx';
import createHooks from 'zustand';
import createStore from 'zustand/vanilla';
import './index.css';
import { API_URLS } from './apiUrls';
import { ToastContainer, toast } from 'react-toastify';
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
export const DEFAULT_NAVIGATION = 'game_portal';
export const EMBEDDED = 'web';

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
  combatMode: false,
  setCombatMode: (combatMode) => set({combatMode}),
  combatStats: {},
  setCombatStats: (combatStats) => set({combatStats}),
  isLoading: false,
  setIsLoading: (isLoading) => set({isLoading}),
  isConnecting: false,
  navigation: DEFAULT_NAVIGATION,
  setNavigation: (navigation) => set({navigation}),
  server_ip: DEFAULT_SERVER_IP,
  setServerIp: (server_ip) => set({server_ip}),
  storage_path: DEFAULT_STORAGE_PATH,
  setStoragePath: (storage_path) => set({storage_path}),
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
  setGameSettingAndLore: (game_setting_and_lore) => set({ game_setting_and_lore }),
  game_art_style: '',
  setGameArtStyle: (game_art_style) => set({ game_art_style }),
  speechEnabled: false,
  setSpeechEnabled: (speechEnabled) => set({speechEnabled}),
  open_ai_key: 'xyz',
  setOpenAIKey: (open_ai_key) => set({ open_ai_key }),
}));
export const useStore = createHooks(store);

const errorStore = createStore(() => ({ error: null }));
const useErrorStore = createHooks(errorStore);

const serverIpFromLocalStorage = localStorage.getItem('server_ip' || DEFAULT_SERVER_IP);
const storagePathFromLocalStorage = localStorage.getItem('storage_path' || DEFAULT_STORAGE_PATH);

//localStorage.setItem('sas_user_id', '15afc625-9a7e-45d6-bc38-5bcc22700b52'); //HACK

//localStorage.setItem('sas_user_id', '900906e0-d40b-417f-82bb-5a1524137e61');

localStorage.setItem('sas_user_id', 'f7cd3174-7883-4f67-8dae-f7797dbb11cd');

const savedUUID = localStorage.getItem('sas_user_id');

//HACK
if (savedUUID) {
  store.setState({ uuid: savedUUID });
}

if (serverIpFromLocalStorage) {
  store.setState({ server_ip: serverIpFromLocalStorage });
}

if (storagePathFromLocalStorage) {
  store.setState({ storage_path: storagePathFromLocalStorage });
}

function App(props) {
  const state = useStore((state) => state);
  const { error } = useErrorStore();
  const uuid = useStore((state) => state.uuid);

  console.log('DUDE', uuid)

  const setUUID = useStore((state) => state.setUUID);
  const combatMode = useStore((state) => state.combatMode);
  const setCombatMode = useStore((state) => state.setCombatMode);
  const setCombatStats = useStore((state) => state.setCombatStats);
  const embedded = useStore((state) => state.embedded);
  const game_state = useStore((state) => state.game_state);
  const setGameState = useStore((state) => state.setGameState);
  const server_ip = useStore((state) => state.server_ip);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const addMessage = useStore((state) => state.addMessage);
  const incrementMsgHistoryIndex = useStore((state) => state.incrementMsgHistoryIndex);
  const setCurrentBgImage = useStore((state) => state.setCurrentBgImage);
  const setNavigation = useStore((state) => state.setNavigation);
  const navigation = useStore((state) => state.navigation);



  //setUUID('15afc625-9a7e-45d6-bc38-5bcc22700b52');

  const querySentRef = useRef(false);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const gqu = await getGameQueueUpdate(server_ip, uuid);
      if (gqu && gqu.status) {
        if (gqu.status === 'queued') {
          setNavigation('create_level');
        } else if (gqu.status === 'started') {
          setNavigation('loading_level');
        } else if (gqu.status === 'completed') {
          // console.log('FUCK', navigation)
          // if(navigation !== 'settings'){
            setNavigation('game_portal');
          // }
        } else if (gqu.status === 'error') {
          toast.error("Error: " + gqu.error);
        } else if (gqu.status === 'game_not_found'){
          toast.warn("game_not_found");
          setNavigation('settings');
        }
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [server_ip, uuid, setNavigation]);

  // useEffect(() => {
  //   console.log('NAVIGATING TO GAME PORTAL', navigation);
  // }, [navigation]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      /*
      ("level-up-ready", "LevelUpReady"),
        ("level-up-complete", "LevelUpComplete"),
        ("encounter-start", "EncounterStart"),
        ("encounter-victory", "EncounterVictory"),
        ("encounter-loss", "EncounterLoss"),
        ("inventory-update", "InventoryUpdate"),
       */

      const gameEvents = await getGameEvents(server_ip, uuid);

      console.log("GAME_EVENT:", gameEvents.event)

      if (gameEvents && gameEvents.event) {
        if(gameEvents.event === 'encounter-start'){
          const combatStats = {
            "phase": "encounter-start",
            "encounter": 6,
            "chance_of_success_base": 40,
          }
          setCombatStats(combatStats)
          setCombatMode(true)
        } else if(gameEvents.event === 'encounter-victory'){
          const combatStats = {
            "phase": "encounter-victory",
            "encounter": 6,
            "modifiers": [
              {
                "item": "jewel_dagger",
                "modifier": 32,
              },
            ],
            "chance_of_success_base": 40,
            "chance_of_success_total": 72,
            "result": 82,
          }
          setCombatStats(combatStats)
          setCombatMode(false)
        } else if(gameEvents.event === 'encounter-loss'){
          const combatStats = {
            "phase": "encounter-loss",
            "encounter": 6,
            "modifiers": [
              {
                "item": "jewel_dagger",
                "modifier": 32,
              },
            ],
            "chance_of_success_base": 40,
            "chance_of_success_total": 72,
            "result": 12,
          }
          setCombatStats(combatStats)
          setCombatMode(false)
        }else {
          toast.success("EVENT: " + gameEvents.event);
        }

        // if(game_state && game_state.environment_id) {
        //   const environment = await getGameEnvironment(server_ip, game_state.environment_id);
        //   console.log("EVENT Environment:", environment);
        // }
        // if (environment && environment.game_info.environment.aesthetic.image) {
        //   setCurrentBgImage(environment.game_info.environment.aesthetic.image);
        // }
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const setGameMap = useStore((state) => state.setGameMap);

  useEffect(() => {
    const delayCheck = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const loadInitialMapAndEnvQuery = async () => {
      let tries = 0;
      const maxTries = 1;
      const retryDelay = 2000;

      while (tries < maxTries) {
        tries += 1;

        const currentGameState = useStore.getState().game_state;
        if (currentGameState && currentGameState.map_id) {
          const game_map = await getGameMap(server_ip, currentGameState.map_id);
          if (game_map.map_graph) {
            setGameMap(game_map.map_graph);
            return;
          }
        }

        await delayCheck(retryDelay);
      }
    };

    const fetchGameState = async () => {
      let tries = 0;
      const maxTries = 1;
      const retryDelay = 2000;

      while (tries < maxTries) {
        tries += 1;

        const gameState = await getGameState(server_ip, uuid);
        if (gameState && Object.keys(gameState).length > 0) {
          setGameState(gameState);

          await loadInitialMapAndEnvQuery();

          if (!querySentRef.current) {
            querySentRef.current = true;

            try {
              setIsLoading(true);
              const response = await sendGameEngineQuery("What do I see when I look around?", uuid, server_ip);
              setIsLoading(false);

              const logs = response?.response;
              addMessage(logs);
              incrementMsgHistoryIndex();

              const encounter = response?.action?.encounter;
              if (encounter) {
                //toast.warn("Encounter: " + JSON.stringify(encounter));
                console.log('ENCOUNTER SET FROM MAIN:', encounter.aesthetic.image);
                setCurrentBgImage(encounter.aesthetic.image);
              } else {
                const gameState = await getGameState(server_ip, uuid);
                if (gameState) {
                  setGameState(gameState);

                  const environment = await getGameEnvironment(server_ip, gameState.environment_id);
                  if (environment && environment.game_info.environment.aesthetic.image) {
                    setCurrentBgImage(environment.game_info.environment.aesthetic.image);
                  }
                }
              }
            } catch (error) {
              setIsLoading(false);
              toast.error("Failed to submit message. Please try again.");
            }
          }

          return;
        } else {
          toast.error("Game Does Not Exist. Create a new game.");
          setNavigation('settings');
        }

        await delayCheck(retryDelay);
      }
    };

    if (!querySentRef.current) {
      fetchGameState();
    }
  }, []);

  const outerWrapper = embedded === 'web' ? "w-full h-full min-h-screen flex flex-row overflow-hidden " : "w-[460px] h-[465px] flex flex-row overflow-hidden";
  const outerColWidth = embedded === 'web' ? "w-full min-h-screen" : "w-[0px] h-[465px]";
  const centerCol = embedded === 'web' ? "w-full max-w-[460px] min-h-screen" : "w-[460px] h-[465px]";

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
          setUUID={(newUUID) => store.setState({ uuid: newUUID })}
          error={error}
          resetErrorState={() => errorStore.setState({ error: null })}
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
  <App />,
);

if (typeof globalThis.__postNativeMessage__ === 'function') {
  globalThis.__postNativeMessage__("ready");
}
