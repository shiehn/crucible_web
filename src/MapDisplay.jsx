import React, { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import { useStore } from './main.jsx';
import {getGameEnvironment, getGameState, sendGameEngineQuery} from "./api.js";
import {toast} from "react-toastify";

function MapDisplay() {
  const game_state = useStore((state) => state.game_state);
  const uuid = useStore((state) => state.uuid);
  const server_ip = useStore((state) => state.server_ip);
  const open_ai_key = useStore((state) => state.open_ai_key);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const setCurrentBgImage = useStore((state) => state.setCurrentBgImage);
  const setGameState = useStore((state) => state.setGameState);
  const addMessage = useStore((state) => state.addMessage);
  const incrementMsgHistoryIndex = useStore((state) => state.incrementMsgHistoryIndex);
  const isLoading = useStore((state) => state.isLoading);

  const game_map = useStore((state) => state.game_map);

  const sanitizeGameMap = (map) => {
    if (!map || typeof map !== 'object' || !Array.isArray(map.nodes) || !Array.isArray(map.edges)) {
      return { nodes: [], edges: [] };
    }
    return map;
  };

  const [graph, setGraph] = useState(sanitizeGameMap(game_map));
  const [highlightedNodeId, setHighlightedNodeId] = useState(null);

  // let oldGraph = JSON.stringify(graph)

  // console.log('MAP', 'IS DISPLAYED');
  useEffect(() => {
    //console.log('MAP', 'game_map changed, should load');
    // console.log("BEFORE CRASH")

    // let newGraph = JSON.stringify(sanitizeGameMap(game_map))

    // console.log("OLD_G", oldGraph)
    // console.log("NEW_G", newGraph)

    setGraph({ nodes: [], edges: [] })
    //console.log('MAP', 'cleared map')
    const sanitizedMap = sanitizeGameMap(game_map);
    console.log('GAME_MAP', game_map)
    setGraph(sanitizedMap)
    //console.log('MAP', 'set map')

    // console.log("AFTER CRASH")
  }, [game_map]);

  // Automatically update the flashing node when game_state.environment_id changes
  useEffect(() => {
    //console.log('Environment ID changed:', game_state?.environment_id);
    if(game_state?.environment_id) {
      setHighlightedNodeId(game_state?.environment_id);
    }
    console.log("SELECTED NODE", highlightedNodeId)
  }, [game_state]);

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
              background: node.color.background === '#666' ? '#fff' : '#666', // Toggle color
            }
          };
        }
        return node;
      });
      if (foundNode) {
        console.log(`Flashing node ${highlightedNodeId}`);
      } else {
        //console.log(`Node ${highlightedNodeId} not found or missing color property`);
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
    physics: {
      enabled: true,
      barnesHut: {
        gravitationalConstant: -2000,
        centralGravity: 0.3,
        springLength: 95,
        springConstant: 0.04,
        damping: 0.09,
        avoidOverlap: 1, // This is important to avoid overlapping
      },
    },
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
    height: '100%',
    nodes: {
      shape: 'box',
      size: 20,
      color: {
        border: '#222222',
        background: '#666666',
        highlight: {
          border: '#222222',
          background: '#666666',
        },
      },
    },
  };



  const events = {
    select: async (event) => {

      if(isLoading){
        console.log("Loading, please wait");
        return;
      }


      let {nodes} = event;
      console.log('Selected event:', nodes);
      if (nodes.length > 0) {
        const nodeId = nodes[0];
        let copiedString = `Travel through door ${nodeId}`

        if (!uuid || !server_ip) {
          toast.error("UUID or Server IP is missing.");
          return;
        }

        try {
          setIsLoading(true);
          let response = await sendGameEngineQuery(copiedString, uuid, server_ip, open_ai_key);
          setIsLoading(false);

          let logs = response?.response;

          addMessage(logs);
          incrementMsgHistoryIndex();

          let encounter = response?.action?.encounter;
          if (encounter) {
            console.log('ENCOUNTER SET FROM AudioInput:', encounter.aesthetic.image);
            setCurrentBgImage(encounter.aesthetic.image);
          } else {
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
          console.error("Error submitting message:", error);
          toast.error("Failed to submit message. Please try again.");
        }
      }
    },
  };

  return (
    <div className="w-full h-full overflow-hidden">
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
