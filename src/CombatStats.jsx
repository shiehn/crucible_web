import React, { useEffect, useRef } from 'react';

const CombatStats = ({ combatMode, combatStats }) => {
  const baseBarRef = useRef(null);
  const totalBarRef = useRef(null);

  useEffect(() => {
    if (combatMode && baseBarRef.current && totalBarRef.current) {
      // Trigger reflow to restart the animation
      baseBarRef.current.style.width = '0';
      totalBarRef.current.style.width = '0';

      requestAnimationFrame(() => {
        baseBarRef.current.style.width = `${combatStats.chance_of_success_base}%`;
        totalBarRef.current.style.width = `${combatStats.chance_of_success_total}%`;
      });
    }
  }, [combatMode, combatStats]);

  return (
    <div
      className="combat-stats flex flex-col justify-center  absolute border border-white rounded bg-opacity-50 bg-gray-500 bottom-52 right-12 p-4">
      <div className="text-white m-2">
        Encounter Level: <span className="font-bold text-2xl">{combatStats.encounter}</span>
        <span className="text-xs"> /10</span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-6 m-2 relative">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Base Success %
        </div>
        <div
          ref={baseBarRef}
          className="bg-blue-500 h-6 rounded-full animate-bar"
        ></div>
      </div>


      <div className="text-white m-2">
        Mods:
        <ul>
          {combatStats.modifiers.map((mod, index) => (
            <li key={index} className="text-white">
              - {mod.item}: {mod.modifier}
            </li>
          ))}
        </ul>
      </div>


      <div className="w-full bg-gray-700 rounded-full h-6 m-2 relative">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Total Success %
        </div>
        <div
          ref={totalBarRef}
          className="bg-green-500 h-6 rounded-full animate-bar"
        ></div>
      </div>
    </div>
  );
};

export default CombatStats;