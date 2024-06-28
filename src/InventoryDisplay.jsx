import { useStore } from "./main.jsx";
import {toast} from "react-toastify";
import {getGameEnvironment, getGameState, sendGameEngineQuery} from "./api.js";

function InventoryDisplay() {
  const { game_inventory } = useStore();  // Assuming you have these functions in your store
  const uuid = useStore((state) => state.uuid);
  const server_ip = useStore((state) => state.server_ip);
  const open_ai_key = useStore((state) => state.open_ai_key);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const setCurrentBgImage = useStore((state) => state.setCurrentBgImage);
  const setGameState = useStore((state) => state.setGameState);
  const addMessage = useStore((state) => state.addMessage);
  const incrementMsgHistoryIndex = useStore((state) => state.incrementMsgHistoryIndex);

  if (!game_inventory || game_inventory.length < 1) {
    return (
      <div className="w-full h-24 p-2">No inventory found.</div>
    );
  }

  // Function to handle item use
  const handleUse = async (itemId) => {
    let copiedString = `Attack encounter with item_id=${itemId}`

    if (!uuid || !server_ip) {
      toast.error("UUID or Server IP is missing.");
      return;
    }

    try {
      setIsLoading(true);
      let response = await sendGameEngineQuery(copiedString, uuid, server_ip, open_ai_key);
      setIsLoading(false);

      let logs = response?.response;

      addMessage(logs);
      incrementMsgHistoryIndex();

      let encounter = response?.action?.encounter;
      if (encounter) {
        console.log('ENCOUNTER SET FROM AudioInput:', encounter.aesthetic.image);
        setCurrentBgImage(encounter.aesthetic.image);
      } else {
        const gameState = await getGameState(server_ip, uuid);
        if (gameState) {
          setGameState(gameState);

          const environment = await getGameEnvironment(server_ip, gameState.environment_id);
          console.log("XXX Environment:", environment);
          if (environment && environment.game_info.environment.aesthetic.image) {
            setCurrentBgImage(environment.game_info.environment.aesthetic.image);
          }
        }
      }
    } catch (error) {
      console.error("Error submitting message:", error);
      toast.error("Failed to submit message. Please try again.");
    }
  };

  return (
    <div className="w-full h-[300px] overflow-y-auto overflow-x-hidden custom-scrollbar">
      {game_inventory.map((item, index) => (
        <div key={index} className="flex items-center p-2 bg-gray-800 my-2">
          {/* Image on the left */}
          <div className="w-1/5">
            <img src={item.item_details.aesthetic.image} alt={item.item_details.aesthetic.description}
                 className="w-full h-auto"/>
          </div>

          {/* Text and buttons on the right */}
          <div className="w-4/5 p-2 text-white flex flex-col justify-between">
            <div>
              <div>Item Type: {item.item_details.item_type}</div>
              <div>Item ID: {item.item_details.item_id}</div>
              {/*<div>Size: {item.item_details.item_size}</div>*/}
              {/*<div>Description: {item.item_details.aesthetic.description}</div>*/}
            </div>
            <div className="flex justify-end space-x-2 mt-2">
              <button onClick={() => handleUse(item.item_details.item_id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Use
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InventoryDisplay;
