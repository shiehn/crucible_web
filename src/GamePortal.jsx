import React, { useState, useEffect } from 'react';
import {store, useStore} from "./main.jsx";
import { sendGameEngineQuery } from "./api.js"; // Import the new function

function GamePortal({ isVisible }) {
  const { embedded, uuid, connected, server_ip } = useStore();
  const [text, setText] = useState(""); // State for tracking the text input
  const [typingTimeout, setTypingTimeout] = useState(null); // State for the typing timeout

  const handleClick = () => {
    setText(""); // Clear text on click
  };

  const handleChange = (e) => {
    setText(e.target.value); // Update text state

    // Clear any existing typing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new typing timeout
    setTypingTimeout(
      setTimeout(async () => {
        const response = await sendGameEngineQuery(text, server_ip); // Call the new function
        if (response) {
          store.setState({results: {'response': { 'logs': response.response }}});
          // alert("Response data: " + response)
          console.log("ResponseData:", response); // Log the response
        }
      }, 1000) // Timeout duration (1 second after the user stops typing)
    );
  };

  useEffect(() => {
    if (isVisible) {
      // Placeholder for fetch data
    }
  }, [isVisible]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <input
        className="w-[80%] p-2 bg-sas-background-dark border text-sas-text-grey rounded
            border-sas-text-grey
            {/*focus:border-green-400*/}
            {/*hover:border-green-400*/}
            {/*active:border-green-400*/}
        "
        value={text} // Set the input value to the text state
        onClick={handleClick} // Clear text when input is clicked
        onChange={handleChange} // Detect changes to the input
      />
    </div>
  );
}

export default GamePortal;
