import { useStore } from "./main.jsx";

function LogsDisplay() {
  const { msgHistory } = useStore();

  if (!msgHistory || msgHistory.length < 1) {
    return (
      <div className="w-full h-24 p-2">No media found.</div>
    );
  }

  // Reverse the order of messages to display newest on top
  const reversedMessages = msgHistory.slice().reverse();

  return (
    <div className="w-full h-24 p-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
      {reversedMessages.map((message, index) => (
        <div key={index}>
          <div
            className={`p-2 ${
              index === 0
                ? "text-white"
                : "text-sas-text-grey"
            }`}
          >
            {message}
          </div>

          {/* Add grey line separator between messages, but not after the last message */}
          {index < reversedMessages.length - 1 && (
            <hr className="my-2 border border-gray-400" />
          )}
        </div>
      ))}
    </div>
  );
}

export default LogsDisplay;
