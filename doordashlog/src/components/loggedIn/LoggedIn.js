import React from "react";
import "./LoggedIn.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Home from "../../components/pages/home/Home";
import Analytics from "../../components/pages/analytics/Analytics";
import Table from "../../components/pages/table/Table";
import { Switch, Route } from "react-router-dom";

function LoggedIn() {
  return (
    <div className="container">
      <Sidebar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/table" component={Table} />
      </Switch>
    </div>
  );
}

export default LoggedIn;
