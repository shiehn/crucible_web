import {API_URLS} from './apiUrls.js';
import {toast} from "react-toastify";

async function sendRequest(server_ip, formattedRequestBody) {
  try {
    //console.log('SERVER_IP_A', server_ip)
    const url = API_URLS.MESSAGE_SEND(server_ip);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedRequestBody)
    });

    if (!response.ok) {
      //TODO - check if response messages
      toast.error("MESSAGE already processing!");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in network request:", error);
  }
}


async function sendResponse(server_ip, id, connection_token, responseData) {
  const status = 'completed';
  const url = API_URLS.MESSAGE_SEND_RESPONSE(server_ip);

  console.log('SERVER_IP_B', server_ip)
  console.log('TOKEN_B', connection_token)

  try {
    const response = await fetch(url, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        token: connection_token,
        response: {data: responseData},
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
    // console.log('SERVER_IP_C', server_ip)
    // console.log('TOKEN_C', connection_token)
    const url = API_URLS.MESSAGE_ABORT(server_ip, connection_token);
    const response = await fetch(url, {
      credentials: 'include',
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

  // console.log('SERVER_IP_D', server_ip)
  const url = API_URLS.ADD_CONNECTION_MAPPING(server_ip);

  try {
    const response = await fetch(url, {
      credentials: 'include',
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

  // console.log('SERVER_IP_E', server_ip)

  try {
    const response = await fetch(url, {
      credentials: 'include',
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


  // console.log('SERVER_IP_F', server_ip)

  try {
    const response = await fetch(url, {
      credentials: 'include',
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

    // console.log('SERVER_IP_G', server_ip)

    const url = API_URLS.CONNECTION_STATUS(server_ip, connection_token);
    const response = await fetch(url,{credentials: 'include',});

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

    // console.log('SERVER_IP_H', server_ip)

    const url = API_URLS.CONNECTION_STATUS(server_ip, connection_token);
    const response = await fetch(url,{credentials: 'include',});

    if (!response.ok) {
      console.log('Network response was not ok');
      return {compute: false, loaded: false};
    }

    const data = await response.json();

    // Return an object containing both boolean values
    return {
      compute: data.compute,
      loaded: data.loaded
    };
  } catch (error) {
    console.error('Error:', error);
    // Return false for both in case of error
    return {compute: false, loaded: false};
  }
}

async function isTokenConnectedToPlugin(server_ip, connection_token) {
  try {

    // console.log('SERVER_IP_I', server_ip)
    const url = API_URLS.CONNECTION_STATUS(server_ip, connection_token);
    const response = await fetch(url,{credentials: 'include',});

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

async function sendGameEngineQuery(text, master_token, server_ip, api_key) {
  try {

    // console.log('SERVER_IP_J', server_ip)
    // console.log('TOKEN_J', master_token)

    const response = await fetch(API_URLS.GAME_ENGINE_QUERY(server_ip), {
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "token": master_token,
        "query": text,
        "api_key": api_key,
      }), // Send the text as JSON
    });

    if (!response.ok) {
      console.error("Error sending request"); // Handle error
      return null;
    }

    return await response.json(); // Return the parsed JSON response
  } catch (error) {
    console.error("Error in sendGameEngineQuery:", error); // Handle error
    return null;
  }
}

async function getGameMap(server_ip, game_map_id) {
  try {
    // console.log('SERVER_IP_K', server_ip)
    const url = API_URLS.GAME_MAP_GET(server_ip, game_map_id);
    const response = await fetch(url,{credentials: 'include',});

    if (!response.ok) {
      console.log('Network response was not ok');
      return false;
    }

    return await response.json(); // Return the boolean value
  } catch (error) {
    console.error('Error:', error);
    return false; // Handle errors and return false or another suitable value
  }
}

async function getGameState(server_ip, user_id) {
  try {
    // console.log('SERVER_IP_L', server_ip)
    const url = API_URLS.GAME_STATE_GET(server_ip, user_id);
    const response = await fetch(url,{credentials: 'include',});

    if (!response.ok) {
      //toast.error('No game state found for user_id: ' + user_id);
      return false;
    }

    return await response.json(); // Return the boolean value
  } catch (error) {
    console.error('Error:', error);
    return false; // Handle errors and return false or another suitable value
  }
}

async function deleteGameState(server_ip, game_id) {
  try {
    // console.log('SERVER_IP_M', server_ip)
    const url = API_URLS.GAME_STATE_DELETE(server_ip, game_id);
    const response = await fetch(url, {
      credentials: 'include',
      method: 'DELETE'
    });

    if (!response.ok) {
      toast.error('Failed to delete game state by id: ' + game_id);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error:', error);
    return false; // Handle errors and return false or another suitable value
  }
}

async function generateLevelMap(server_ip, user_id, open_ai_key) {
  // console.log('SERVER_IP_N', server_ip)
  try {
    const url = API_URLS.GAME_MAP_GENERATE(server_ip, user_id, open_ai_key);
    const response = await fetch(url,{
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "api_key": open_ai_key
      }),
    });

    if (!response.ok) {
      //toast.error('No game state found for user_id: ' + user_id);
      return false;
    }

    return await response.json(); // Return the boolean value
  } catch (error) {
    console.error('Error:', error);
    return false; // Handle errors and return false or another suitable value
  }
}

async function createGameState(server_ip, user_id, open_ai_key, aesthetic) {
  // console.log('SERVER_IP_O', server_ip)
  try {
    const response = await fetch(API_URLS.GAME_STATE_CREATE(server_ip, open_ai_key), {
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user_id": user_id,
        "level": 1,
        "aesthetic": aesthetic,
        "map_id": "123e4567-e89b-12d3-a456-426614174001",
        "environment_id": "00000000-0000-0000-0000-000000000000",
        "environment_img": "https://storage.googleapis.com/byoc-file-transfer/img_placeholder.png"
      }), // Send the text as JSON
    });

    if (!response.ok) {
      console.error("Error sending request"); // Handle error
      return null;
    }

    return await response.json(); // Return the parsed JSON response
  } catch (error) {
    console.error("Error in sendGameEngineQuery:", error); // Handle error
    return null;
  }
}

async function renderGameAssets(server_ip, user_id, aesthetic) {
  try {
    // console.log('SERVER_IP_P', server_ip)
    const response = await fetch(API_URLS.GAME_ASSETS_RENDER(server_ip, user_id), {
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "aesthetic": aesthetic
      }), // Send the text as JSON
    });

    if (!response.ok) {
      console.error("Error sending request"); // Handle error
      return false;
    }

    return true; // Return the parsed JSON response
  } catch (error) {
    console.error("Error in sendGameEngineQuery:", error); // Handle error
    return false;
  }
}


async function getGameInventory(server_ip, connection_token) {
  try {
    // console.log('SERVER_IP_Q', server_ip)
    // console.log('TOKEN_Q', connection_token)

    const url = API_URLS.GAME_INVENTORY_GET(server_ip, connection_token);
    const response = await fetch(url,{credentials: 'include',});

    if (!response.ok) {
      console.log('Network response was not ok');
      return false;
    }

    return await response.json(); // Return the boolean value
  } catch (error) {
    console.error('Error:', error);
    return false; // Handle errors and return false or another suitable value
  }
}


async function getGameEnvironment(server_ip, environment_id) {
  try {
    // console.log('SERVER_IP_R', server_ip)
    const url = API_URLS.GAME_ENVIRONMENT_GET(server_ip, environment_id);
    const response = await fetch(url,{credentials: 'include',});

    if (!response.ok) {
      console.log('Network response was not ok');
      return {};
    }

    return await response.json(); // Return the boolean value
  } catch (error) {
    console.error('Error:', error);
    return {}; // Handle errors and return false or another suitable value
  }
}

async function getGameQueueUpdate(server_ip, userId) {
  try {
    // console.log('SERVER_IP_S', server_ip)
    const url = API_URLS.GAME_QUEUE_UPDATE(server_ip, userId);
    const response = await fetch(url,{credentials: 'include',});

    if(response.status === 401){
      window.location.href = `${server_ip}/accounts/login/`;
    }

    if (!response.ok) {
      console.log('GameEvents - Network response was not ok');
      return {'status': 'game_not_found'};
    }

    return await response.json();
  } catch (error) {
    console.error('Error: GameEvents:', error);
    return {}; // Handle errors and return false or another suitable value
  }
}

async function getGameEvents(server_ip, userId) {
  try {
    // console.log('SERVER_IP_T', server_ip)
    const url = API_URLS.GAME_EVENTS(server_ip, userId);
    const response = await fetch(url,{credentials: 'include',});

    if(response.status === 401){
      window.location.href = `${server_ip}/accounts/login/`;
    }

    if (response.status === 404) {
      return {};
    }

    if (!response.ok) {
      return {};
    }

    return await response.json();
  } catch (error) {
    // Catch network errors or other unexpected errors
    console.error('Error: GameQueueUpdate:', error);
    return {}; // Handle errors and return false or another suitable value
  }
}

async function navigateTo(server_ip, userId, target_environment_id) {
  try {
    const url = API_URLS.GAME_NAVIGATE(server_ip, userId, target_environment_id);
    const response = await fetch(url,{credentials: 'include',});

    console.log('NAVIGATE_RESPONSE', response)

    return response.ok;
  } catch (error) {
    // Catch network errors or other unexpected errors
    console.error('Error: GameQueueUpdate:', error);
    return false; // Handle errors and return false or another suitable value
  }
}

async function sendCombatAttack(server_ip, user_id, item_id) {
  try {
    const response = await fetch(API_URLS.GAME_COMBAT(server_ip), {
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        item_id: item_id,
      }),
    });

    if (!response.ok) {
      console.error("Error sending request");
      return "encounter-error";
    }

    const data = await response.json();
    return data.message ? data.message : "encounter-error";
  } catch (error) {
    console.error("Error in sendCombatAttack:", error);
    return "encounter-error";
  }
}






//http://localhost:8081/api/game-environment/3cd9c84b-8b03-45be-af6a-a5a597662dd9/


export {
  sendRequest,
  sendResponse,
  abortRequest,
  addConnectionMapping,
  createGameState,
  deleteGameState,
  generateLevelMap,
  getConnectionMappings,
  getGameEnvironment,
  getGameEvents,
  getGameMap,
  getGameState,
  getGameInventory,
  getGameQueueUpdate,
  navigateTo,
  removeConnectionMapping,
  renderGameAssets,
  sendGameEngineQuery,
  sendCombatAttack,
  isTokenConnected,
  isTokenConnectedToRemote,
  isTokenConnectedToPlugin
};