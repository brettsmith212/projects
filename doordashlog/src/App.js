import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Summary from "./components/Summary";
import Table from "./components/Table";

function App(props) {
  const [clicked, setClicked] = useState(false);
  const [dashes, setDashes] = useState([]);

  const clickedFunction = () => {
    setClicked(!clicked);
    // console.log(`App js triggered and click set to ${clicked}`);
  };

  const onSaveFormHandler = (dashesList) => {
    setDashes(dashesList);
    // console.log(dashesList);
  };

  return (
    <div>
      <Navbar />
      <Summary dashes={dashes} />
      <Form clicked={clickedFunction} />
      <Table clicked={clicked} onSaveForm={onSaveFormHandler} />
    </div>
  );
}

export default App;
