import React, {useState, useEffect} from 'react';
import {useStore} from "./main.jsx";
import {API_URLS} from "./apiUrls.js";

function RemoteLinks({isVisible}) {
  const {embedded, uuid, connected, server_ip} = useStore();
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
            hyperlink: item.colab_url
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
    const formattedUrl = url + '?DAWNET_TOKEN=' + uuid;
    if (embedded === 'vst') {
      if (typeof globalThis.__postNativeMessage__ === 'function') {
        globalThis.__postNativeMessage__(JSON.stringify({action: 'HYPERLINK', payload: formattedUrl}));
      }
    } else if (embedded === 'web') {
      window.open(formattedUrl, '_blank');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full h-full pt-2">
      {links.map((link, index) => (
        <div key={index} className="p-2">
          <div className="w-full p-2 rounded-md border-2 border-sas-background-dark hover:border-sas-text-grey text-sas-background-dark bg-sas-background-dark hover:bg-sas-background-dark hover:cursor-pointer"
               onClick={() => handleHyperLink(link.hyperlink)}>
            <div className="w-full text-md font-bold text-sas-green">{link.name}</div>
            <div className="text-sm text-sas-text-grey">{link.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RemoteLinks;
