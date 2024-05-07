import { useStore } from "./main.jsx";

function InventoryDisplay() {
  const { game_inventory } = useStore();

  if (!game_inventory || game_inventory.length < 1) {
    return (
      <div className="w-full h-full p-2">No inventory found.</div>
    );
  }

  return (
    <div className="w-full h-full p-2">
      {game_inventory.map((item, index) => (
        <div key={index}>
          <div
            className='p-2 text-white'
          >
            {JSON.stringify(item)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default InventoryDisplay;
