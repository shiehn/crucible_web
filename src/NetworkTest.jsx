import React, {useState} from 'react';
import {API_URLS} from "./apiUrls.js";
import {el} from '@elemaudio/core';
import {default as core} from '@elemaudio/plugin-renderer';

import {store, store as globalStore} from './main.jsx';

function formatSendRequestBody(inputObject) {
  if (typeof inputObject !== 'object' || inputObject === null) {
    throw new Error('Input must be an object');
  }

  const uuid = inputObject.id;
  if (!uuid) {
    throw new Error('ID is missing from the input');
  }

  const data = inputObject.data;
  if (!data) {
    throw new Error('Data is missing from the input');
  }

  const methodName = data.method_name;
  if (!methodName) {
    throw new Error('Method name is missing from the data');
  }

  const paramsArray = data.params;
  if (!Array.isArray(paramsArray)) {
    throw new Error('Params are missing from the data');
  }

  const outputParams = paramsArray.reduce((params, param) => {
    if (typeof param !== 'object' || param === null || !param.name || !param.type) {
      return params;
    }

    const value = param.default_value !== null ? param.default_value
      : param.type === 'int' ? 999
        : param.type === 'str' ? 'super-moon'
          : undefined;

    params[param.name] = {value: value, type: param.type};
    return params;
  }, {});

  return {
    token: uuid,
    request: {
      token: uuid,
      type: 'run_method',
      data: {
        method_name: methodName,
        params: outputParams
      }
    }
  };
}

function NetworkTest() {
  const [response, setResponse] = useState('');

  // Access state directly from the store
  const globalState = globalStore.getState();
  const {uuid, connected, contract, messageId, server_ip} = globalState;

  const sendRequest = async () => {
    try {
      const url = API_URLS.MESSAGE_SEND(server_ip);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formatSendRequestBody(contract))
      });

      if (!response.ok) {
        alert('MESSAGE ALREADY PENDING OR PROCESSING, ABORTING REQUEST')
        throw new Error('Plugin connection status update failed');
      }

      const responseData = await response.json();
      if (responseData) {
        store.setState({messageId: responseData.id});
        // setMessageId(responseData.id)
        console.log('SEND MSG RESPONSE', responseData.id)
      }
    } catch (error) {
      console.error("Error updating plugin connection status:", error);
    }
  };





  const logToFile = async (message) => {
    if (typeof globalThis.__postNativeMessage__ === 'function') {
      globalThis.__postNativeMessage__(message);
    }
  }

  const pollResponses = async () => {
    const globalState = globalStore.getState();
    const { uuid, connected, contract, messageId } = globalState;

    //console.log('poll responses')
    try {
      const url = API_URLS.MESSAGE_RESPONSES(server_ip, messageId, uuid);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Plugin connection status update failed');
      }

      const responseData = await response.json();
      if (responseData) {
        // console.log('POLL RESPONSES', responseData)
      }
    } catch (error) {
      console.error("Error updating plugin connection status:", error);
    }
  };

  const loadAudio = async () => {
    if (typeof globalThis.__postNativeMessage__ === 'function') {
      globalThis.__postNativeMessage__('LOAD_AUDIO');
    }
  }

  const playAudio = async () => {
    if (typeof globalThis.__postNativeMessage__ === 'function') {
      globalThis.__postNativeMessage__(JSON.stringify({
        'action': 'PLAY_AUDIO',
        'payload': '/Users/stevehiehn/Downloads/425556__t_roy_920__rock-808-beat.mp3'
      }));
    }
  }

  return (
    <div className="network-test text-red-500">
      <button onClick={loadAudio}>LOAD AUDIO</button>
      <br/><br/>
      <button onClick={playAudio}>PLAY AUDIO</button>
      <br/><br/>
      <button onClick={pollResponses}>POLL RESP</button>
      <br/><br/>
      <div>{response}</div>


      <div className="network-test text-white">
        {/* Display data from the store */}
        <div>UUID: {uuid}</div>
        <div>Connected: {connected ? 'Yes' : 'No'}</div>
        {/* ... */}
      </div>
    </div>


  );
}

export default NetworkTest;

/*
{
'token': uuid,
'type': 'results',
'data': {
          "id": id,
          "token": uuid,
          "response": {
            "files": [
            {
              'name': 'file1',
              'type': 'wav',
              'url': 'https://www.google.com'
            }],
            "error": "This is a reply."
            "message": "This is a reply.
          },
          "status": 'completed',
        }
}
*/