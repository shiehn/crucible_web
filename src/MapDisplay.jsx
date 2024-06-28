import React, { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import { useStore } from './main.jsx';
import {getGameEnvironment, getGameState, navigateTo, sendGameEngineQuery} from "./api.js";
import { toast } from "react-toastify";

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
  const [network, setNetwork] = useState(null); // State to store the network instance

  useEffect(() => {
    setGraph({ nodes: [], edges: [] });
    const sanitizedMap = sanitizeGameMap(game_map);
    setGraph(sanitizedMap);
  }, [game_map]);

  useEffect(() => {
    if (game_state?.environment_id) {
      setHighlightedNodeId(game_state?.environment_id);
    }
  }, [game_state]);

  useEffect(() => {
    const interval = highlightedNodeId ? setInterval(() => {
      const newNodes = graph.nodes.map(node => {
        if (node.id === highlightedNodeId && node.color) {
          return {
            ...node,
            color: {
              ...node.color,
              background: node.color.background === '#666' ? '#fff' : '#666',
            }
          };
        } else {
          return {
            ...node,
            color: {
              ...node.color,
              background: '#666',
            }
          };
        }
      });

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
        avoidOverlap: 1,
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
      borderWidth: 2,
      borderWidthSelected: 2,
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
      if (isLoading) {
        console.log("Loading, please wait");
        return;
      }

      let { nodes } = event;
      console.log('Selected event:', nodes);
      if (nodes.length > 0) {
        const nodeId = nodes[0];
        let cannedQuery = `After successfully changing environments, What do I see here?`;

        if (!uuid || !server_ip) {
          toast.error("UUID or Server IP is missing.");
          return;
        }

        //FIRST SET THE NAVIGATION MANUALLY
        let navResponse = await navigateTo(server_ip, uuid, nodeId);
        console.log('DUDE RES', navResponse)
        if(!navResponse){
          cannedQuery = `After failing to change environments, What do I see now?`;
        }
//game-navigate-to


        //THEN SEND THE QUERY TO THE GAME ENGINE


        try {
          setIsLoading(true);
          let response = await sendGameEngineQuery(cannedQuery, uuid, server_ip, open_ai_key);
          setIsLoading(false);

          let logs = response?.response;

          addMessage(logs);
          incrementMsgHistoryIndex();

          let encounter = response?.action?.encounter;
          if (encounter) {
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

          // Unselect the node after processing the request
          if (network) {
            network.unselectAll();
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
        getNetwork={networkInstance => {
          console.log('Graph network instance:', networkInstance);
          setNetwork(networkInstance); // Store the network instance
        }}
      />
    </div>
  );
}

export default MapDisplay;
