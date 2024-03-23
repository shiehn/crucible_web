import {useStore} from "./main.jsx";

function LogsDisplay() {
  const {results} = useStore();

  if (!results || !results.response || !results.response.logs) {
    return <div className="w-full h-full p-2 media-container">No media found.</div>;
  }

  return (
    <div className="w-full h-full p-2 media-container">
      {results.response.logs}
    </div>
  );
}

export default LogsDisplay;