import React from "react";
import "./LoggedOut.css";
import waves from "../icons/wave.svg";

function LoggedOut() {
  return (
    <div className="main">
      <img src={waves} alt="waves" className="waves" />
    </div>
  );
}

export default LoggedOut;
