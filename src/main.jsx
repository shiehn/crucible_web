// main.jsx
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
import TokenHandler from './TokenHandler';
import {
  getGameEnvironment,
  getGameEvents,
  getGameMap,
  getGameQueueUpdate,
  getGameState,
  sendGameEngineQuery
} from "./api.js";
import submitMsg from './submitMsg.js'; // Import the refactored function

export const DEFAULT_SERVER_IP = import.meta.env.VITE_DEFAULT_SERVER_IP;
export const DEFAULT_STORAGE_PATH = 'https://storage.googleapis.com/byoc-file-transfer/';
export const DEFAULT_NAVIGATION = 'game_portal';
export const EMBEDDED = 'web';

// Initial state management
export const store = createStore((set, get) => ({
  messageId: null,
  connection_token: null, // connection_token
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
      return { msgHistoryIndex: newIndex };
    }),
  decrementMsgHistoryIndex: () =>
    set((state) => {
      const newIndex = Math.max(state.msgHistoryIndex - 1, 0);
      return { msgHistoryIndex: newIndex };
    }),
  getCurrentMsgHistoryItem: () => {
    const state = get();
    return state.msgHistory[state.msgHistoryIndex] || null;
  },
  results: null,
  submitForm: false,
  dropTargetFileName: null,
  currentBgImage: null,
  setCurrentBgImage: (image) => set({ currentBgImage: image }),
  currentOutputView: 'show_map_component',
  combatMode: false,
  setCombatMode: (combatMode) => set({ combatMode }),
  combatStats: {},
  setCombatStats: (combatStats) => set({ combatStats }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  isConnecting: false,
  showSettings: false,
  setShowSettings: (showSettings) => set({ showSettings }),
  navigation: DEFAULT_NAVIGATION,
  setNavigation: (navigation) => set({ navigation }),
  server_ip: DEFAULT_SERVER_IP,
  storage_path: DEFAULT_STORAGE_PATH,
  setStoragePath: (storage_path) => set({ storage_path }),
  embedded: EMBEDDED,
  game_state: {},
  setGameState: (gameState) => set({ game_state: gameState }),
  game_map: {
    nodes: [],
    edges: [],
  },
  setGameMap: (map) => set({ game_map: map }),
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
  setSpeechEnabled: (speechEnabled) => set({ speechEnabled }),
  open_ai_key: 'placeholder_key',
  setOpenAIKey: (open_ai_key) => set({ open_ai_key }),
}));
export const useStore = createHooks(store);

const errorStore = createStore(() => ({ error: null }));
const useErrorStore = createHooks(errorStore);

function App(props) {
  const state = useStore((state) => state);
  const { error } = useErrorStore();
  const open_ai_key = useStore((state) => state.open_ai_key);
  const setOpenAIKey = useStore((state) => state.setOpenAIKey);
  const combatMode = useStore((state) => state.combatMode);
  const setCombatMode = useStore((state) => state.setCombatMode);
  const setCombatStats = useStore((state) => state.setCombatStats);
  const embedded = useStore((state) => state.embedded);
  const game_state = useStore((state) => state.game_state);
  const setGameState = useStore((state) => state.setGameState);
  const setGameArtStyle = useStore((state) => state.setGameArtStyle);
  const setGameSettingAndLore = useStore((state) => state.setGameSettingAndLore);
  const server_ip = useStore((state) => state.server_ip);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const addMessage = useStore((state) => state.addMessage);
  const incrementMsgHistoryIndex = useStore((state) => state.incrementMsgHistoryIndex);
  const setCurrentBgImage = useStore((state) => state.setCurrentBgImage);
  const setNavigation = useStore((state) => state.setNavigation);
  const navigation = useStore((state) => state.navigation);
  const storage_path = useStore((state) => state.storage_path);
  const setStoragePath = useStore((state) => state.setStoragePath);
  const setShowSettings = useStore((state) => state.setShowSettings);


  const querySentRef = useRef(false);

  useEffect(() => {
    // Load values from local storage
    const storedOpenAIKey = localStorage.getItem('open_ai_key');
    const storedGameSettingAndLore = localStorage.getItem('game_setting_and_lore');
    const storedGameArtStyle = localStorage.getItem('game_art_style');

    if (storedOpenAIKey) {
      setOpenAIKey(storedOpenAIKey);
    }
    if (storedGameSettingAndLore) {
      setGameSettingAndLore(storedGameSettingAndLore);
    }
    if (storedGameArtStyle) {
      setGameArtStyle(storedGameArtStyle);
    }
  }, []);

  // useEffect(() => {
  //
  //   const serverIpFromLocalStorage = localStorage.getItem('server_ip');
  //   if (serverIpFromLocalStorage) {
  //     setServerIp(serverIpFromLocalStorage);
  //   }
  //
  //   const storagePathFromLocalStorage = localStorage.getItem('storage_path') || DEFAULT_STORAGE_PATH;
  //   if (storagePathFromLocalStorage) {
  //     setStoragePath(storagePathFromLocalStorage);
  //   }
  // }, [setServerIp, setStoragePath]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const gqu = await getGameQueueUpdate(server_ip, '00000000-0000-0000-0000-000000000000');
      if (gqu && gqu.status) {
        if (gqu.status === 'queued') {
          setNavigation('create_level');
        } else if (gqu.status === 'started') {
          setNavigation('loading_level');
        } else if (gqu.status === 'completed') {
          setNavigation('game_portal');
        } else if (gqu.status === 'error') {
          toast.error("Error: " + gqu.error);
        } else if (gqu.status === 'game_not_found') {
          //toast.warn("game_not_found");
          setShowSettings(true);
        }
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [server_ip, setNavigation]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const gameEvents = await getGameEvents(server_ip, '00000000-0000-0000-0000-000000000000');
      if (gameEvents && gameEvents.event) {
        if (gameEvents.event === 'encounter-start'
          || gameEvents.event === 'encounter-victory'
          || gameEvents.event === 'encounter-loss'
        ) {
          setCombatStats(gameEvents.payload);
          setCombatMode(true);
        } else if (gameEvents.event === 'level-up-complete') {
          location.reload(); //TODO IDEALLY JUST LOAD NEW LEVEL not refresh
        } else {
          toast.success("EVENT: " + gameEvents.event);
        }
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [server_ip, setCombatMode, setCombatStats]);

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

        const gameState = await getGameState(server_ip, '00000000-0000-0000-0000-000000000000');
        if (gameState && Object.keys(gameState).length > 0) {
          setGameState(gameState);

          await loadInitialMapAndEnvQuery();

          if (!querySentRef.current) {
            querySentRef.current = true;

            const defaultQueries = [
              "What do I see when I look around?",
              "Describe my surroundings.",
              "What is around me?",
              "What do I see?",
              "What is in my vicinity?",
              "What is in my immediate area?",
              "Tell me about my current location.",
              "What is nearby?",
              "Describe my current environment.",
            ];

            const randomDefaultQuery = defaultQueries[Math.floor(Math.random() * defaultQueries.length)];

            let emptyUuid = '00000000-0000-0000-0000-000000000000';

            submitMsg({
              text: randomDefaultQuery,
              setText: () => {}, // No-op function since we don't need to set text in this context
              emptyUuid,
              server_ip,
              open_ai_key,
              addMessage,
              incrementMsgHistoryIndex,
              setCurrentBgImage,
              setGameState,
              setNavigation,
              setShowSettings,
              setIsLoading
            });
          }

          return;
        } else {
          //toast.error("Game Does Not Exist. Create a new game.");
          console.log("No game state found in MAIN.js")
          setShowSettings(true);
        }

        await delayCheck(retryDelay);
      }
    };

    if (!querySentRef.current) {
      fetchGameState();
    }
  }, [server_ip, setGameState, setGameMap, sendGameEngineQuery, open_ai_key, setIsLoading, addMessage, incrementMsgHistoryIndex, setCurrentBgImage, setNavigation]);

  return (
    <div className="fixed inset-0 w-full h-full flex flex-row overflow-hidden">
      <TokenHandler />
      <div className="w-full min-h-screen bg-sas-background-dark">
      </div>
      <div className="w-full max-w-[460px] min-h-screen">
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
          error={error}
          resetErrorState={() => errorStore.setState({error: null})}
        />
      </div>
      <div className="w-full min-h-screen bg-sas-background-dark">
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>,
);

if (typeof globalThis.__postNativeMessage__ === 'function') {
  globalThis.__postNativeMessage__("ready");
}
