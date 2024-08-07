// InventoryDisplay.jsx
import { useStore } from "./main.jsx";
import { toast } from "react-toastify";
import { getGameEnvironment, getGameState, sendCombatAttack } from "./api.js";
import submitMsg from './submitMsg.js'; // Import the refactored function

function InventoryDisplay() {
  const { game_inventory } = useStore();  // Assuming you have these functions in your store
  const server_ip = useStore((state) => state.server_ip);
  const open_ai_key = useStore((state) => state.open_ai_key);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const setCurrentBgImage = useStore((state) => state.setCurrentBgImage);
  const setGameState = useStore((state) => state.setGameState);
  const addMessage = useStore((state) => state.addMessage);
  const incrementMsgHistoryIndex = useStore((state) => state.incrementMsgHistoryIndex);
  const setNavigation = useStore((state) => state.setNavigation);
  const setShowSettings = useStore((state) => state.setShowSettings);

  if (!game_inventory || game_inventory.length < 1) {
    return (
      <div className="w-full h-24">No inventory found.</div>
    );
  }

  // Function to handle item use
  const handleUse = async (itemId) => {
    let copiedString = `What is the encounters state after attacking it?`;

    if (!server_ip) {
      toast.error("Server IP is missing.");
      return;
    }

    let attackRes = await sendCombatAttack(server_ip, '00000000-0000-0000-0000-000000000000', itemId);
    console.log("Attack Response:", attackRes);
    if(attackRes && attackRes === "encounter-victory") {
      copiedString = `What do I see here after winning the encounter?`;
    } else if(attackRes && attackRes === "encounter-loss") {
      copiedString = `What do I see after losing the encounter?`;
    } else {
      toast.error("Failed to attack. Please try again.");
      return;
    }

    let emptyUuid = '00000000-0000-0000-0000-000000000000';
    // Use the refactored submitMsg function
    submitMsg({
      text: copiedString,
      setText: () => {}, // No-op function since we don't need to set text in this context
      emptyUuid,
      server_ip,
      open_ai_key,
      addMessage,
      incrementMsgHistoryIndex,
      setCurrentBgImage,
      setGameState,
      setNavigation,
      setShowSettings,
      setIsLoading
    });
  };

  return (
    <div className="w-full h-[300px] overflow-hidden">
      {game_inventory.map((item, index) => (
        <div key={index} className="flex items-center">
          {/* Image on the left */}
          <div className="w-1/5 p-2">
            <img src={item.item_details.aesthetic.image} alt={item.item_details.aesthetic.description}
                 className="w-full h-auto rounded-md"/>
          </div>

          {/* Text and buttons on the right */}
          <div className="w-3/5 text-white flex flex-col justify-between">
            <div>
              <div>Item Type: <span className="text-sas-text-grey">{item.item_details.item_type}</span></div>
              <div>Item ID: <span className="text-sas-text-grey">{item.item_details.item_id}</span></div>
              {/*<div>Size: {item.item_details.item_size}</div>*/}
              {/*<div>Description: {item.item_details.aesthetic.description}</div>*/}
            </div>

          </div>

          <div className="w-1/5">
            <button onClick={() => handleUse(item.item_details.item_id)}
                    className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-500">Use
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InventoryDisplay;
