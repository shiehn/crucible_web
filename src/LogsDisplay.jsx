import React, { useEffect, useRef } from 'react';
import { useStore } from "./main.jsx";

function LogsDisplay() {
  const { msgHistory, msgHistoryIndex } = useStore((state) => ({
    msgHistory: state.msgHistory,
    msgHistoryIndex: state.msgHistoryIndex,
  }));
  const highlightedMessageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (highlightedMessageRef.current && containerRef.current) {
      containerRef.current.scrollTo({
        top: highlightedMessageRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  }, [msgHistoryIndex]);

  if (!msgHistory || msgHistory.length < 1) {
    return <div className="w-full h-24 p-2">No media found.</div>;
  }

  return (
    <div ref={containerRef} className="w-full h-32 p-2 absolute bottom-8 overflow-y-auto overflow-x-hidden custom-scrollbar bg-black bg-opacity-40">
      {msgHistory.map((message, index) => (
        <div key={index} ref={index === msgHistoryIndex ? highlightedMessageRef : null}>
          <div className={`p-2 ${index === msgHistoryIndex ? "text-white" : "text-sas-text-grey"}`}>
            {message}
          </div>

          {index < msgHistory.length - 1 && (
            <hr className="my-2 border border-gray-400" />
          )}
        </div>
      ))}
    </div>
  );
}

export default LogsDisplay;
