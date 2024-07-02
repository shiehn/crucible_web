// submitMsg.js
import { toast } from "react-toastify";
import {
  sendGameEngineQuery,
  getGameState,
  getGameEnvironment
} from "./api.js";

const submitMsg = async ({
                           text,
                           setText,
                           uuid,
                           server_ip,
                           open_ai_key,
                           addMessage,
                           incrementMsgHistoryIndex,
                           setCurrentBgImage,
                           setGameState,
                           setIsLoading
                         }) => {
  let copiedString = text + ""; // Creates a new reference with the same string
  if (copiedString === "") {
    return;
  }

  setText(""); // Clear the text input

  if (!uuid || !server_ip) {
    toast.error("UUID or Server IP is missing.");
    return;
  }

  try {
    setIsLoading(true);
    let response = await sendGameEngineQuery(copiedString, uuid, server_ip, open_ai_key);
    setIsLoading(false);

    console.log("ResponseData:", response);

    let logs = response?.response;

    addMessage(logs);
    incrementMsgHistoryIndex();


    let encounter = response?.action?.encounter;
    const gameState = await getGameState(server_ip, uuid);
    if (gameState) {
      setGameState(gameState);

      if (encounter) {
        console.log('ENCOUNTER SET SEND MESSAGE:', encounter.aesthetic.image);
        setCurrentBgImage(encounter.aesthetic.image);
      }else{
        const environment = await getGameEnvironment(server_ip, gameState.environment_id);
        console.log("XXX Environment:", environment);
        if (environment && environment.game_info.environment.aesthetic.image) {
          setCurrentBgImage(environment.game_info.environment.aesthetic.image);
        }
      }
    }

    // if (encounter) {
    //   console.log('ENCOUNTER SET SEND MESSAGE:', encounter.aesthetic.image);
    //   setCurrentBgImage(encounter.aesthetic.image);
    // } else {
    //   const gameState = await getGameState(server_ip, uuid);
    //   if (gameState) {
    //     setGameState(gameState);
    //
    //     const environment = await getGameEnvironment(server_ip, gameState.environment_id);
    //     console.log("XXX Environment:", environment);
    //     if (environment && environment.game_info.environment.aesthetic.image) {
    //       setCurrentBgImage(environment.game_info.environment.aesthetic.image);
    //     }
    //   }
    // }
  } catch (error) {
    console.error("Error submitting message:", error);
    toast.error("Failed to submit message. Please try again.");
  }
};

export default submitMsg;
