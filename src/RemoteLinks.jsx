import React, { useState, useEffect } from 'react';
import { useStore } from "./main.jsx";
import {API_URLS} from "./apiUrls.js";

function RemoteLinks({ isVisible }) {
  const { uuid, connected, server_ip } = useStore();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isVisible) {
      // Fetch data when isVisible is true or on component mount if isVisible is initially true
      fetch(API_URLS.REMOTE_SOURCES(server_ip))
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const transformedData = data.map(item => ({
            name: item.remote_name,
            description: item.remote_description,
            hyperlink: item.source_url
          }));
          setLinks(transformedData);
          setLoading(false);
        })
        .catch(error => {
          setError(error.toString());
          setLoading(false);
        });
    }
  }, [isVisible]);

  const handleHyperLink = async (url) => {
    if (typeof globalThis.__postNativeMessage__ === 'function') {
      globalThis.__postNativeMessage__(JSON.stringify({ action: 'HYPERLINK', payload: url + '?DAWNET_TOKEN=' + uuid }));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full h-full pt-2">
      {links.map((link, index) => (
        <div key={index} className="p-2">
          <div className="w-full p-2 rounded-md bg-gray-200 hover:bg-gray-300 hover:cursor-pointer" onClick={() => handleHyperLink(link.hyperlink)}>
            <div className="w-full text-md font-bold">{link.name}</div>
            <div className="text-sm">{link.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RemoteLinks;
