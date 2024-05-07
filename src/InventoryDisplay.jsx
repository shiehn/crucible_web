import { useStore } from "./main.jsx";

function InventoryDisplay() {
  const { game_inventory, dropItem, useItem } = useStore();  // Assuming you have these functions in your store

  if (!game_inventory || game_inventory.length < 1) {
    return (
      <div className="w-full h-full p-2">No inventory found.</div>
    );
  }

  // Function to handle item drop
  const handleDrop = (itemId) => {
    dropItem(itemId);
    console.log(`Dropped item with ID: ${itemId}`);
  };

  // Function to handle item use
  const handleUse = (itemId) => {
    useItem(itemId);
    console.log(`Used item with ID: ${itemId}`);
  };

  return (
    <div className="w-full h-full p-2">
      {game_inventory.map((item, index) => (
        <div key={index} className="flex items-center p-2 bg-gray-800 my-2">
          {/* Image on the left */}
          <div className="w-1/5">
            <img src={item.item_details.aesthetic.image} alt={item.item_details.aesthetic.description} className="w-full h-auto"/>
          </div>

          {/* Text and buttons on the right */}
          <div className="w-4/5 p-2 text-white flex flex-col justify-between">
            <div>
              <div>Item Type: {item.item_details.item_type}</div>
              <div>Item ID: {item.item_details.item_id}</div>
              <div>Size: {item.item_details.item_size}</div>
              <div>Description: {item.item_details.aesthetic.description}</div>
            </div>
            <div className="flex justify-end space-x-2 mt-2">
              <button onClick={() => handleUse(item.item_details.item_id)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Use</button>
              <button onClick={() => handleDrop(item.item_details.item_id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Drop</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InventoryDisplay;
