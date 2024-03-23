import {useStore} from "./main.jsx";
import {useEffect} from "react";
import LogsDisplay from "./LogsDisplay.jsx";

function MediaTypeDisplay({ url }) {
  const fileExtension = url.split('.').pop().toLowerCase();

  switch (fileExtension) {
    case 'mp3':
    case 'wav':
      return <audio controls src={url} className="w-full h-10" />;
    case 'mp4':
    case 'avi':
      return <video controls src={url} width="100%" />;
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
  const {results} = useStore();

  if (!results || !results.response || !results.response.files) {
    return <div className="w-full h-full p-2 media-container">No media found.</div>;
  }

  return (
    <div className="w-full h-full p-2 media-container">
      {results.response.files.map((file, index) => (
        <div key={index} className="media-item w-full" style={{margin: '10px 0'}}>
          <MediaTypeDisplay url={file.url}/>
          <div className="w-full mt-2">File name: {file.name}</div>
        </div>
      ))}
    </div>
  );
}

export default ResultsDisplay;