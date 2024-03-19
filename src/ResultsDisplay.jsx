import {useStore} from "./main.jsx";
import {useEffect} from "react";
import LogsDisplay from "./LogsDisplay.jsx";

function MediaTypeDisplay({ url }) {
  const fileExtension = url.split('.').pop().toLowerCase();

  switch (fileExtension) {
    case 'mp3':
    case 'wav':
      return <audio controls src={url} />;
    case 'mp4':
    case 'avi':
      return <video controls src={url} width="320" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <img src={url} alt="Media content" style={{ maxWidth: '320px' }} />;
    case 'txt':
      // Assuming you have a way to fetch and display the text content
      return <iframe src={url} title="Text content" style={{ width: '320px', height: '240px' }} />;
    default:
      return <span>Unsupported file type</span>;
  }
}
function ResultsDisplay() {


  // if (!results) {
  //   // If there is no contract, don't render anything
  //   return null;
  // }

  const {results} = useStore();

  if (!results || !results.response || !results.response.files) {
    return <div className="">No media found.</div>;
  }

  return (
    <div className="p-2 media-container bg-sas-background-light min-h-[350px]">
      {results.response.files.map((file, index) => (
        <div key={index} className="media-item" style={{ margin: '10px 0' }}>
          <MediaTypeDisplay url={file.url} />
          <div>File name: {file.name}</div>
        </div>
      ))}
    </div>
  );
}

export default ResultsDisplay;