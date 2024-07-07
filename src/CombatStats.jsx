// CombatStats.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from './main.jsx';
import { getGameEnvironment } from './api.js';
import submitMsg from './submitMsg.js'; // Import the refactored function

const CombatStats = ({ combatMode, combatStats }) => {
  const baseBarRef = useRef(null);
  const totalBarRef = useRef(null);
  const modBarRef = useRef(null);
  const modBarNameRef = useRef(null);
  const resultRef = useRef(null);
  const [result, setResult] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [bgColor, setBgColor] = useState('bg-gray-500');
  const [finalMessage, setFinalMessage] = useState('');
  const [finalPulse, setFinalPulse] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [finalBgColor, setFinalBgColor] = useState('');
  const server_ip = useStore((state) => state.server_ip);
  const gameState = useStore((state) => state.game_state);

  const setCombatMode = useStore((state) => state.setCombatMode);
  const setCombatStats = useStore((state) => state.setCombatStats);
  const setCurrentBgImage = useStore((state) => state.setCurrentBgImage);
  const addMessage = useStore((state) => state.addMessage);
  const incrementMsgHistoryIndex = useStore((state) => state.incrementMsgHistoryIndex);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const setGameState = useStore((state) => state.setGameState);

  const combatComplete = (outcome) => {
    if (outcome === 'victory') {
      setTimeout(async () => {
        setCombatStats({});
        setCombatMode(false);

        // RESET BG IMAGE FROM COMBAT TO NORMAL
        const environment = await getGameEnvironment(server_ip, gameState.environment_id);
        if (environment && environment.game_info.environment.aesthetic.image) {
          setCurrentBgImage(environment.game_info.environment.aesthetic.image);
        }
      }, 4000); // 4000 milliseconds = 4 seconds
    } else if (outcome === 'loss') {
      setTimeout(() => {
        setCombatMode(false);

        // CALL submitMsg with the text "After losing combat, where am I now?"
        submitMsg({
          text: "After losing combat, where am I now?",
          setText: () => {}, // No-op function since we don't need to set text in this context
          uuid: '00000000-0000-0000-0000-000000000000',
          server_ip: useStore.getState().server_ip,
          open_ai_key: useStore.getState().open_ai_key,
          addMessage,
          incrementMsgHistoryIndex,
          setCurrentBgImage,
          setGameState,
          setIsLoading
        });

      }, 3000);
    }
  };

  useEffect(() => {
    if (combatMode && baseBarRef.current) {
      baseBarRef.current.style.width = '0';
      requestAnimationFrame(() => {
        baseBarRef.current.style.width = `${combatStats.chance_of_success_base}%`;
      });
    }

    if (combatMode && totalBarRef.current) {
      totalBarRef.current.style.width = '0';
      requestAnimationFrame(() => {
        totalBarRef.current.style.width = `${combatStats.chance_of_success_total}%`;
      });
    }

    if (combatMode && modBarNameRef.current) {
      const modifierText = combatStats?.modifiers?.[0].item || '';
      const truncatedText = modifierText.length > 8 ? `${modifierText.substring(0, 8)}...` : modifierText;
      modBarNameRef.current.innerText = `+ ${truncatedText}`;
    }

    if (combatMode && modBarRef.current) {
      modBarRef.current.style.width = '0';
      requestAnimationFrame(() => {
        modBarRef.current.style.width = `${combatStats?.modifiers?.[0].modifier}%`;
      });
    }

    if (combatMode && resultRef.current) {
      setTimeout(() => {
        let currentResult = 0;
        const increment = Math.ceil(combatStats.result / 20);
        const interval = setInterval(() => {
          currentResult += increment;
          if (currentResult >= combatStats.result) {
            currentResult = combatStats.result;
            clearInterval(interval);
            setTimeout(() => {
              setPulse(true);
              const isVictory = combatStats.phase === 'encounter-victory';
              setBgColor(isVictory ? 'bg-green-500' : 'bg-red-500');
              setFinalBgColor(isVictory ? 'bg-green-500' : 'bg-red-500');
              setTimeout(() => {
                setShowFinalMessage(true);
                setFinalMessage(isVictory ? 'VICTORY!' : 'LOSS :(');
                setFinalPulse(true);
                combatComplete(isVictory ? 'victory' : 'loss');
              }, 200);
            }, 200);
          }
          setResult(currentResult);
        }, 100);
      }, 2000);
    }
  }, [combatMode, combatStats]);

  return (
    <div className="combat-stats flex flex-col justify-center absolute border border-white rounded bg-opacity-50 bg-gray-500 bottom-52 right-12 p-4">
      <div className="text-white m-2">
        Encounter Level: <span className="font-bold text-2xl">{combatStats.encounter}</span>
        <span className="text-xs"> /10</span>
      </div>

      <div className="w-full bg-red-800 rounded-full h-6 m-2 relative">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Base Success %
        </div>
        <div
          ref={baseBarRef}
          className="bg-green-600 h-6 rounded-full animate-bar"
        ></div>
      </div>

      {combatStats?.phase && combatStats.phase !== 'encounter-start' && (
        <div className="w-full bg-red-800 rounded-full h-6 m-2 relative">
          <div ref={modBarNameRef} className="absolute inset-0 flex items-center justify-center text-white"></div>
          <div
            ref={modBarRef}
            className="bg-green-600 h-6 rounded-full animate-bar"
          ></div>
        </div>
      )}

      {combatStats?.phase && combatStats.phase !== 'encounter-start' && (
        <div className="w-full bg-red-800 rounded-full h-6 m-2 relative">
          <div className="absolute inset-0 flex items-center justify-center text-white">
            Total Success %
          </div>
          <div
            ref={totalBarRef}
            className="bg-green-600 h-6 rounded-full animate-bar"
          ></div>
        </div>
      )}

      {combatStats?.phase && (combatStats.phase === 'encounter-victory' || combatStats.phase === 'encounter-loss') && (
        <div className="w-full flex items-center justify-center relative">
          <div
            ref={resultRef}
            className={`w-20 h-20 rounded-full m-2 flex items-center justify-center relative ${bgColor} ${
              pulse ? 'animate-pulse' : ''
            }`}
          >
            <div className="text-white text-3xl">{result}%</div>
          </div>
        </div>
      )}

      {showFinalMessage && (
        <div
          className={`w-full flex items-center justify-center relative text-3xl text-white rounded ${finalBgColor} ${
            finalPulse ? 'animate-pulse' : ''
          }`}
        >
          {finalMessage}
        </div>
      )}
    </div>
  );
};

export default CombatStats;
