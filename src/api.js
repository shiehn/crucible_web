import { API_URLS } from './apiUrls.js';
import {toast} from "react-toastify";
import {store} from "./main.jsx";


async function sendResponse(server_ip, id, connection_token, responseData) {
  const status = 'completed';
  const url = API_URLS.MESSAGE_SEND_RESPONSE(server_ip);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        token: connection_token,
        response: { data: responseData },
        status,
      }),
    });

    if (!response.ok) {
      toast.error('Error sending response');
    }

    return await response.json();
  } catch (error) {
    toast.error('Error sending response');
  }
}

const abortRequest = async (server_ip, connection_token) => {
  try {
    const url = API_URLS.MESSAGE_ABORT(server_ip, connection_token);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "token": connection_token
      })
    });

    if (response.ok) {
      toast.success('Request aborted');
    } else {
      toast.error('Error aborting request');
    }
  } catch (error) {
    console.log('ABORT_ERROR', error);
    toast.error('Error aborting request');
  }
};

async function addConnectionMapping(server_ip, master_token, connection_token, connection_name, description) {
  const url = API_URLS.ADD_CONNECTION_MAPPING(server_ip);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        master_token,
        connection_token,
        connection_name,
        description
      }),
    });

    if (response.ok) {
      const result = await response.json();
      toast.success('Connection Mapping Added');
      return result;
    } else {
      toast.error('Error adding connection mapping');
      return await response.text();
    }
  } catch (error) {
    console.log('error', error);
    toast.error('Error adding connection mapping');
  }
}

async function getConnectionMappings(server_ip, masterToken) {
  const url = API_URLS.GET_CONNECTION_MAPPINGS(server_ip, masterToken);

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow'
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      toast.error('Error fetching connection mappings');
      return [];
    }
  } catch (error) {
    console.log('error', error);
    toast.error('Error fetching connection mappings');
    return [];
  }
}

async function removeConnectionMapping(server_ip, masterToken, connectionToken) {
  const url = API_URLS.REMOVE_CONNECTION_MAPPING(server_ip, masterToken, connectionToken);

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      redirect: 'follow'
    });

    if (response.ok) {
      toast.success('Connection mapping removed successfully');
      return await response.text();  // or .json() depending on the response format
    } else {
      toast.error('Error removing connection mapping');
      return await response.text();
    }
  } catch (error) {
    console.log('error', error);
    toast.error('Error removing connection mapping');
  }
}

async function isTokenConnected(server_ip, connection_token) {
  try {
    const url = API_URLS.CONNECTION_STATUS(server_ip, connection_token);
    const response = await fetch(url);

    if (!response.ok) {
      console.log('Network response was not ok');
      return false;
    }

    const data = await response.json();
    const isConnected = data.plugin && data.compute;

    return isConnected; // Return the boolean value
  } catch (error) {
    console.error('Error:', error);
    return false; // Handle errors and return false or another suitable value
  }
}

async function isTokenConnectedToRemote(server_ip, connection_token) {
  try {
    const url = API_URLS.CONNECTION_STATUS(server_ip, connection_token);
    const response = await fetch(url);

    if (!response.ok) {
      console.log('Network response was not ok');
      return false;
    }

    const data = await response.json();
    const isConnected = data.compute;

    return isConnected; // Return the boolean value
  } catch (error) {
    console.error('Error:', error);
    return false; // Handle errors and return false or another suitable value
  }
}

async function isTokenConnectedToPlugin(server_ip, connection_token) {
  try {
    const url = API_URLS.CONNECTION_STATUS(server_ip, connection_token);
    const response = await fetch(url);

    if (!response.ok) {
      console.log('Network response was not ok');
      return false;
    }

    const data = await response.json();
    const isConnected = data.plugin;

    //console.log('Token: ' + connection_token + ', IsConnected:' + isConnected);

    return isConnected; // Return the boolean value
  } catch (error) {
    console.error('Error:', error);
    return false; // Handle errors and return false or another suitable value
  }
}




export { sendResponse, abortRequest, addConnectionMapping, getConnectionMappings, removeConnectionMapping, isTokenConnected, isTokenConnectedToRemote, isTokenConnectedToPlugin };