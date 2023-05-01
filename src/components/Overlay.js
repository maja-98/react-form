import React from "react";

const Overlay = ({ message, handleClose }) => {
  return (
    <div className="overlay  d-flex-center flex-column">
      <div className="message-container  d-flex-center flex-column">
        <p>{message}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Overlay;
