import React from "react";
import "./LoggedOut.css";
import waves from "../icons/wave.svg";

function LoggedOut() {
  return (
    <main className="main">
      <div className="hero">
        <h1 className="title">Welcome To Lightning Ledger!</h1>
        <img src={waves} alt="waves" className="waves" />
      </div>
      <div className="features"></div>
    </main>
  );
}

export default LoggedOut;
