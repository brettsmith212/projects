import React from "react";
import "./LoggedOut.css";
import waves from "../icons/wave.svg";

function LoggedOut() {
  return (
    <main className="main">
      <div className="hero">
        <h1>Welcome to Delivery Log</h1>
        <h2>Track your earnings in a simple and modern dashboard</h2>
      </div>
      <a href="#features">Learn More</a>
      <div id="features">
        <div className="showcase">
          <h2>An easier way to monitor and calculate your earnings</h2>
          <video autoPlay loop>
            <source src={require("../images/tutorial.mov")} type="video/mp4" />
          </video>
          <img src={require("../images/home.png")} alt="home screenshot" />
          <img
            src={require("../images/analytics.png")}
            alt="analytics screenshot"
          />
          <img src={require("../images/table.png")} alt="table screenshot" />
        </div>
      </div>
    </main>
  );
}

export default LoggedOut;
