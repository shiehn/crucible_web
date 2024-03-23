import React, { useState } from 'react';
import { toast } from 'react-toastify';

import {useStore} from "./main.jsx";

const TOKEN = 'myToken'; // Replace with your actual token

function FileDropComponent({ onResponse, id }) {
  const [fileData, setFileData] = useState(null);
  const [displayText, setDisplayText] = useState("Drag file here (Option + Click to drag from Ableton)");
  const {storage_path, server_ip} = useStore();

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow for drop
  };

  const getSignedUrl = async (server_ip, filename) => {
    try {
      const url = `${server_ip}/api/hub/get_signed_url/?token=${TOKEN}&filename=${filename}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data['signed_url'];
    } catch (error) {
      console.error("Error getting signed URL:", error);
    }
  };

  const uploadFileToGCP = async (file, signedUrl) => {
    const response = await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: {'Content-Type': file.type},
    });

    if (response.status === 200) {
      console.log(`File uploaded successfully to GCP Storage: ${JSON.stringify(response)}`);
      return true
    } else {
      console.error(`File upload to GCP Storage failed. Status: ${response.status}`);
    }

    return false
  };

  function pathJoin(prefix, suffix) {
    const cleanedPrefix = prefix.replace(/\/+$/, '');  // Remove trailing slashes from prefix
    const cleanedSuffix = suffix.replace(/^\/+/, '');  // Remove leading slashes from suffix
    const result = `${cleanedPrefix}/${cleanedSuffix}`;
    return result;
  }

  const handleFileDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    toast.info(`Uploading ${file.size} bytes`);

    // Replace white spaces in file name with underscores
    const fileNameWithUnderscores = file.name.replace(/\s/g, '_');
    const signedUrl = await getSignedUrl(server_ip, fileNameWithUnderscores);

    if (await uploadFileToGCP(file, signedUrl)) {
      const fileURL = pathJoin(storage_path, fileNameWithUnderscores);
      onResponse({ id, fileURL, error: null, fileName: fileNameWithUnderscores }); // Include the id in the response
      setDisplayText(fileNameWithUnderscores); // Update the displayed text
    } else {
      onResponse({ id, fileURL: null, error: "Upload failed", fileName: fileNameWithUnderscores });
      setDisplayText("Upload failed"); // Update the displayed text in case of an error
    }
  };

  return (
      <div onDragOver={handleDragOver} onDrop={handleFileDrop}
           className="appearance-none block w-full text-sas-text-grey text-xs border border-sas-text-grey rounded p-5 mt-1 mb-3">
        {displayText}
      </div>
  );
}

export default FileDropComponent;