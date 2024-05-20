import React, { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import { useStore } from './main.jsx';

function MapDisplay() {
  const { game_map, game_state } = useStore(); // Get the game_map and game_state data from the store

  const sanitizeGameMap = (map) => {
    if (!map || typeof map !== 'object' || !Array.isArray(map.nodes) || !Array.isArray(map.edges)) {
      return { nodes: [], edges: [] };
    }
    return map;
  };

  const [graph, setGraph] = useState(sanitizeGameMap(game_map));
  const [highlightedNodeId, setHighlightedNodeId] = useState(null);

  let oldGraph = JSON.stringify(graph)

  useEffect(() => {
    console.log("BEFORE CRASH")

    let newGraph = JSON.stringify(graph)

    if(newGraph !== oldGraph){
      console.log("GRAPH NOT EQUAL, REDRAW")
      oldGraph = JSON.stringify(graph)
      setGraph({ nodes: [], edges: [] })
      setGraph(sanitizeGameMap(game_map))
    } else {
      console.log("GRAPH IS EQUAL")
    }

    console.log("AFTER CRASH")
  }, [game_map]);

  // Automatically update the flashing node when game_state.environment_id changes
  useEffect(() => {
    console.log('Environment ID changed:', game_state.environment_id);
    setHighlightedNodeId(game_state.environment_id);
  }, [game_state.environment_id]);

  useEffect(() => {
    const interval = highlightedNodeId ? setInterval(() => {
      let foundNode = false;
      const newNodes = graph.nodes.map(node => {
        // Check if the node exists and has a color property
        if (node.id === highlightedNodeId && node.color) {
          foundNode = true;
          return {
            ...node,
            color: {
              ...node.color,
              background: node.color.background === '#000' ? '#fff' : '#000', // Toggle color
            }
          };
        }
        return node;
      });
      if (foundNode) {
        console.log(`Flashing node ${highlightedNodeId}`);
      } else {
        console.log(`Node ${highlightedNodeId} not found or missing color property`);
      }
      setGraph(prevGraph => ({ ...prevGraph, nodes: newNodes }));
    }, 500) : null;

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [highlightedNodeId, graph]);


  const options = {
    physics: false,
    layout: {
      randomSeed: "random-seed-xyz",
    },
    interaction: {
      dragNodes: false,
      dragView: true
    },
    edges: {
      color: '#fff',
      arrows: {
        to: { enabled: false },
        middle: { enabled: false },
        from: { enabled: false }
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
    <div className="w-full h-full">
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network) => {
          console.log('Graph network instance:', network);
        }}
      />
    </div>
  );
}

export default MapDisplay;
