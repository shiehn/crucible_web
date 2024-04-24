// Helper function to remove trailing slashes
const formatBaseUrl = (url) => url.endsWith('/') ? url.slice(0, -1) : url;

export const API_URLS = {
  //MASTER TOKEN MAPPING
  ADD_CONNECTION_MAPPING: (apiBaseUrl) => `${formatBaseUrl(apiBaseUrl)}/api/hub/connection_mappings/`,
  GET_CONNECTION_MAPPINGS: (apiBaseUrl, masterToken) => `${formatBaseUrl(apiBaseUrl)}/api/hub/connection_mappings/${masterToken}/`,
  REMOVE_CONNECTION_MAPPING: (apiBaseUrl, masterToken, connectionToken) => `${formatBaseUrl(apiBaseUrl)}/api/hub/connection_mappings/${masterToken}/${connectionToken}/`,

  //REMOTE CONNECTIONS
  PLUGIN_CONNECTION: (apiBaseUrl, token, status) => `${formatBaseUrl(apiBaseUrl)}/api/hub/connection/plugin/${token}/${status}/`,
  CONNECTION_STATUS: (apiBaseUrl, uuid) => `${formatBaseUrl(apiBaseUrl)}/api/hub/connections/${uuid}/`,
  COMPUTE_CONTRACT: (apiBaseUrl, uuid) => `${formatBaseUrl(apiBaseUrl)}/api/hub/compute/contract/${uuid}/`,

  //MESSAGE API
  MESSAGE_SEND: (apiBaseUrl) => `${formatBaseUrl(apiBaseUrl)}/api/hub/send_message/`,
  MESSAGE_SEND_RESPONSE: (apiBaseUrl) => `${formatBaseUrl(apiBaseUrl)}/api/hub/reply_to_message/`,
  MESSAGE_ABORT: (apiBaseUrl, token) => `${formatBaseUrl(apiBaseUrl)}/api/hub/abort_messages/${token}/`,
  MESSAGE_RESPONSES: (apiBaseUrl, message_id, token) => `${formatBaseUrl(apiBaseUrl)}/api/hub/get_response/${message_id}/${token}/`,

  //GCP STORAGE
  STORAGE_GET_SIGNED_URL: (apiBaseUrl, filename, token) => `${formatBaseUrl(apiBaseUrl)}/api/hub/get_signed_url/?token=${token}&filename=${encodeURIComponent(filename)}`,

  //REMOTE SOURCES
  REMOTE_SOURCES: (apiBaseUrl) => `${formatBaseUrl(apiBaseUrl)}/api/hub/remote-sources/`,

  //GAME PORTAL
  GAME_ENGINE_QUERY: (apiBaseUrl) => `${formatBaseUrl(apiBaseUrl)}/api/game-engine/query/`
};
