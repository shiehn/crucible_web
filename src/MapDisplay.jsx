import React, { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import { useStore } from './main.jsx';

function MapDisplay() {
  const { game_map } = useStore(); // Get the game_map data from the store
  // Function to validate and sanitize game_map data
  const sanitizeGameMap = (map) => {
    if (!map || typeof map !== 'object' || !Array.isArray(map.nodes) || !Array.isArray(map.edges)) {
      return { nodes: [], edges: [] };
    }
    return map;
  };

  // Initialize the graph state with validated game_map
  const [graph, setGraph] = useState(sanitizeGameMap(game_map));

  // useEffect to update the graph state when game_map changes
  useEffect(() => {
    console.log('Game Map:', game_map);
    setGraph(sanitizeGameMap(game_map));
  }, [game_map]);

  const options = {
    // layout: {
    //   hierarchical: true,
    // },
    physics: false,
    interaction: {
      dragNodes: false, // Disable node dragging
      dragView: true    // Allow dragging the view
    },
    edges: {
      color: '#fff',
      arrows: {
        to: {
          enabled: false
        },
        middle: {
          enabled: false
        },
        from: {
          enabled: false
        }
      },
    },
    height: '400px',
    nodes: {
      shape: 'box',
      size: 20,
      color: {
        border: '#222222',
        background: '#666666',
        highlight: {
          border: '#22ff22',
          background: '#44ff44',
        },
      },
    },

  };

  const events = {
    select: (event) => {
      console.log('Node selected', event.nodes);
    },
  };

  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={(network) => {
        console.log('Graph network instance:', network);
      }}
    />
  );
}

export default MapDisplay;
