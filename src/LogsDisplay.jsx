import {useStore} from "./main.jsx";

function LogsDisplay() {
  // if (!results) {
  //   // If there is no contract, don't render anything
  //   return null;
  // }
  const {results} = useStore();



  if (!results || !results.response || !results.response.logs) {
    return <div>No media found.</div>;
  }

  return (
    <div className="whitespace-normal break-words w-[460px] p-2">
      {results.response.logs}
    </div>
  );
}

export default LogsDisplay;