import React from "react";
import "./LoggedOut.css";
import waves from "../icons/wave.svg";

function LoggedOut() {
  return (
    <main className="main">
      <div className="hero">
        <h1 className="title">Welcome to Delivery Log</h1>
        <h2 className="subtitle">
          Track your earnings in a simple and modern dashboard
        </h2>
        <img src={waves} alt="waves" className="waves" />
      </div>
      <div className="features">
        <h2 className="features-header">
          A delivery dashboard for everyone...
        </h2>
        <div className="features-images">
          <img
            src={require("../images/home.png")}
            alt="home screenshot"
            className="home-screenshot"
          />
          <img
            src={require("../images/analytics.png")}
            alt="analytics screenshot"
            className="analytics-screenshot"
          />
          <img
            src={require("../images/table.png")}
            alt="table screenshot"
            className="table-screenshot"
          />
        </div>
      </div>
    </main>
  );
}

export default LoggedOut;
