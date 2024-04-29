import React, { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import { useStore } from './main.jsx';

function MapDisplay() {
  const { results } = useStore(); // Assuming `results` contains the graph data
  const [graph, setGraph] = useState({
    nodes: [
      { id: 'node-1', label: 'Node 1', title: 'node 1 tooltip text', shape: 'box' },
      { id: 'node-2', label: 'Node 2', title: 'node 2 tooltip text', shape: 'box' },
      { id: 'node-3', label: 'Node 3', title: 'node 3 tooltip text', shape: 'box' },
      { id: 'node-4', label: 'Node 4', title: 'node 4 tooltip text', shape: 'box' },
      { id: 'node-5', label: 'Node 5', title: 'node 5 tooltip text', shape: 'box' },
    ],
    edges: [
      { from: 'node-1', to: 'node-2' },
      { from: 'node-1', to: 'node-3' },
      { from: 'node-2', to: 'node-4' },
      { from: 'node-2', to: 'node-5' },
    ],
  });

  useEffect(() => {
    // Optionally update the graph when `results` changes
    if (graph) {
      setGraph(graph);
    }

    // Cleanup code to clear the graph during unmount
    return () => {
      console.log('Component unmounted, clearing graph data');
      setGraph({ nodes: [], edges: [] }); // Clear graph data
    };
  }, [graph]); // Re-run if `results` changes

  const options = {
    layout: {
      hierarchical: true,
    },
    edges: {
      color: '#000000',
    },
    height: '400px',
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
