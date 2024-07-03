// InventoryDisplay.jsx
import { useStore } from "./main.jsx";
import { toast } from "react-toastify";
import { getGameEnvironment, getGameState, sendCombatAttack } from "./api.js";
import submitMsg from './submitMsg.js'; // Import the refactored function

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
      <div className="w-full h-24">No inventory found.</div>
    );
  }

  // Function to handle item use
  const handleUse = async (itemId) => {
    let copiedString = `What is the encounters state after attacking it?`;

    if (!uuid || !server_ip) {
      toast.error("UUID or Server IP is missing.");
      return;
    }

    let attackRes = await sendCombatAttack(server_ip, uuid, itemId);
    console.log("Attack Response:", attackRes);
    if(attackRes && attackRes === "encounter-victory") {
      copiedString = `What do I see here after winning the encounter?`;
    } else if(attackRes && attackRes === "encounter-loss") {
      copiedString = `What do I see after losing the encounter?`;
    } else {
      toast.error("Failed to attack. Please try again.");
      return;
    }


    // Use the refactored submitMsg function
    submitMsg({
      text: copiedString,
      setText: () => {}, // No-op function since we don't need to set text in this context
      uuid,
      server_ip,
      open_ai_key,
      addMessage,
      incrementMsgHistoryIndex,
      setCurrentBgImage,
      setGameState,
      setIsLoading
    });
  };

  return (
    <div className="w-full h-[300px] overflow-hidden">
      {game_inventory.map((item, index) => (
        <div key={index} className="flex items-center bg-gray-800">
          {/* Image on the left */}
          <div className="w-1/5">
            <img src={item.item_details.aesthetic.image} alt={item.item_details.aesthetic.description}
                 className="w-full h-auto"/>
          </div>

          {/* Text and buttons on the right */}
          <div className="w-4/5 text-white flex flex-col justify-between">
            <div>
              <div>Item Type: {item.item_details.item_type}</div>
              <div>Item ID: {item.item_details.item_id}</div>
              {/*<div>Size: {item.item_details.item_size}</div>*/}
              {/*<div>Description: {item.item_details.aesthetic.description}</div>*/}
            </div>
            <div className="flex justify-end space-x-2">
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
