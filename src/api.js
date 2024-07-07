import {API_URLS} from './apiUrls.js';
import {toast} from "react-toastify";

// utils/token.js
export const storeToken = (token) => {
  localStorage.setItem('jwtToken', token);
};

export const getToken = () => {
  return localStorage.getItem('jwtToken');
};

export const removeToken = () => {
  localStorage.removeItem('jwtToken');
};


async function makeRequest(server_ip, url, options = {}) {
  const token = getToken();

  if (!token) {
    // Redirect to login if token is not found
    window.location.href = `${server_ip}/accounts/login/`;
    return;
  }

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const finalOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, finalOptions);

    if (response.status === 401 || response.status === 403) {
      // Remove token and redirect to login if unauthorized
      removeToken();
      window.location.href = `${server_ip}/accounts/login/`;
      return;
    }

    return response;
  } catch (error) {
    console.error('Request failed', error);
    throw error;
  }
}

export default makeRequest;


// Example of refactoring sendGameEngineQuery function
async function sendGameEngineQuery(text, master_token, server_ip, api_key) {
  const options = {
    method: "POST",
    // headers: {
    //   SERVER_IP: server_ip, // Required if server_ip is used in makeRequest for redirection
    // },
    body: JSON.stringify({
      "token": master_token,
      "query": text,
      "api_key": api_key,
    })
  };

  const response = await makeRequest(server_ip, API_URLS.GAME_ENGINE_QUERY(server_ip), options);

  if (!response.ok) {
    console.error("Error sending request");
    return null;
  }

  return await response.json();
}


async function getGameMap(server_ip, game_map_id) {
  const url = API_URLS.GAME_MAP_GET(server_ip, game_map_id);
  const options = {
    method: 'GET', // Specifying GET as this seems to be a retrieval operation
  };

  try {
    const response = await makeRequest(server_ip, url, options);

    if (!response.ok) {
      console.log('Network response was not ok');
      return false; // Return false in case of non-OK responses
    }

    return await response.json(); // Parse and return JSON data if the response is ok
  } catch (error) {
    console.error('Error:', error);
    return false; // Handle errors and return false as fallback
  }
}


async function getGameState(server_ip, user_id) {
  const url = API_URLS.GAME_STATE_GET(server_ip, user_id);
  const options = {
    method: 'GET', // Specifying GET as the request type since we are retrieving data
  };

  try {
    const response = await makeRequest(server_ip, url, options);

    if (!response.ok) {
      // Assuming toast.error is globally accessible or imported as needed
      //toast.error('No game state found for user_id: ' + user_id);
      console.log('No game state found for user_id: ' + user_id); // Fallback to console if toast.error isn't available
      return false; // Return false in case of non-OK responses
    }

    return await response.json(); // Parse and return JSON data if the response is ok
  } catch (error) {
    console.error('Error:', error);
    return false; // Handle errors and return false as fallback
  }
}


async function deleteGameState(server_ip, game_id) {
  try {
    const url = API_URLS.GAME_STATE_DELETE(server_ip, game_id);
    const response = await makeRequest(server_ip, url, {
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
  const url = API_URLS.GAME_MAP_GENERATE(server_ip, user_id, open_ai_key);

  const options = {
    method: 'POST',
    body: JSON.stringify({
      'api_key': open_ai_key
    }),
  };

  try {
    const response = await makeRequest(server_ip, url, options);
    if (!response.ok) {
      //toast.error('No game state found for user_id: ' + user_id);
      return false;
    }
    return await response.json(); // Parse JSON response and return it
  } catch (error) {
    console.error('Error:', error);
    return false; // Handle errors and return false or another suitable value
  }
}


async function createGameState(server_ip, user_id, open_ai_key, aesthetic) {
  const postData = {
    "user_id": user_id,
    "level": 1,
    "aesthetic": aesthetic,
    "map_id": "123e4567-e89b-12d3-a456-426614174001",
    "environment_id": "00000000-0000-0000-0000-000000000000",
    "environment_img": "https://storage.googleapis.com/byoc-file-transfer/img_placeholder.png"
  };

  try {
    const response = await makeRequest(server_ip, API_URLS.GAME_STATE_CREATE(server_ip, open_ai_key), {
      method: "POST",
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      console.error("Error sending request"); // Handle error
      return null;
    }

    return await response.json(); // Return the parsed JSON response
  } catch (error) {
    console.error("Error in createGameState:", error); // Handle error
    return null;
  }
}

async function getGameInventory(server_ip, connection_token) {
  const url = API_URLS.GAME_INVENTORY_GET(server_ip, connection_token);
  const options = {
    method: 'GET', // Specifying GET as the request type since we are retrieving data
  };

  try {
    const response = await makeRequest(server_ip, url, options);

    if (!response.ok) {
      console.log('Network response was not ok');
      return false; // Return false in case of non-OK responses
    }

    return await response.json(); // Parse and return JSON data if the response is ok
  } catch (error) {
    console.error('Error:', error);
    return false; // Handle errors and return false as fallback
  }
}


async function getGameEnvironment(server_ip, environment_id) {
  const url = API_URLS.GAME_ENVIRONMENT_GET(server_ip, environment_id);
  const options = {
    method: 'GET', // Specifying GET as the request type since we are retrieving data
  };

  try {
    const response = await makeRequest(server_ip, url, options);

    if (!response.ok) {
      console.log('Network response was not ok');
      return {}; // Returning an empty object in case of non-OK responses
    }

    return await response.json(); // Parse and return JSON data if the response is ok
  } catch (error) {
    console.error('Error:', error);
    return {}; // Handle errors and return an empty object as fallback
  }
}


async function getGameQueueUpdate(server_ip, userId) {
  const url = API_URLS.GAME_QUEUE_UPDATE(server_ip, userId);
  const options = {
    method: 'GET', // Assuming GET since no body is sent and typical for retrieving data
  };

  try {
    const response = await makeRequest(server_ip, url, options);

    // Handle specific status codes as in original function
    // if (response.status === 401) {
    //   window.location.href = `${server_ip}/accounts/login/`;
    //   return {}; // Prevent further execution after redirection
    // }

    if (!response.ok) {
      console.log('GameEvents - Network response was not ok');
      return {'status': 'game_not_found'};
    }

    return await response.json(); // Parse and return JSON data if the response is ok
  } catch (error) {
    console.error('Error: GameEvents:', error);
    return {}; // Handle errors and return an empty object as fallback
  }
}


async function getGameEvents(server_ip, userId) {
  const url = API_URLS.GAME_EVENTS(server_ip, userId);
  const options = {
    method: 'GET', // Assuming GET since no body is sent and typical for retrieving data
  };

  try {
    const response = await makeRequest(server_ip, url, options);

    // Handle specific status codes as in original function
    // if (response.status === 401) {
    //   window.location.href = `${server_ip}/accounts/login/`;
    //   return {}; // Prevent further execution after redirection
    // }

    if (response.status === 404) {
      return {};
    }

    if (!response.ok) {
      return {};
    }

    return await response.json(); // Parse and return JSON data if the response is ok
  } catch (error) {
    console.error('Error: GameQueueUpdate:', error);
    return {}; // Handle errors and return an empty object as fallback
  }
}


async function navigateTo(server_ip, userId, target_environment_id) {
  const url = API_URLS.GAME_NAVIGATE(server_ip, userId, target_environment_id);
  const options = {
    method: 'GET',  // Specify GET explicitly if it's the intended method
  };

  try {
    const response = await makeRequest(server_ip, url, options);
    console.log('NAVIGATE_RESPONSE', response);

    return response.ok;  // Check if the HTTP response status code is in the range 200-299
  } catch (error) {
    console.error('Error: GameQueueUpdate:', error);
    return false;  // Handle errors and return false or another suitable value
  }
}

async function sendCombatAttack(server_ip, user_id, item_id) {
  const url = API_URLS.GAME_COMBAT(server_ip);
  const options = {
    method: 'POST',
    body: JSON.stringify({
      user_id: user_id,
      item_id: item_id,
    }),
  };

  try {
    const response = await makeRequest(server_ip, url, options);
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
  createGameState,
  deleteGameState,
  generateLevelMap,
  getGameEnvironment,
  getGameEvents,
  getGameMap,
  getGameState,
  getGameInventory,
  getGameQueueUpdate,
  navigateTo,
  sendGameEngineQuery,
  sendCombatAttack,
};