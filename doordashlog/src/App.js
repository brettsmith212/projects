import React from "react";
import "./App.css";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Summary from "./components/Summary";
import Table from "./components/Table";

function App() {
  return (
    <div>
      <Navbar />
      <Summary />
      <Form />
      <Table />
    </div>
  );
}

export default App;
