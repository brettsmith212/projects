import React from "react";
import Form from "./Form";
import Summary from "./Summary";
import Table from "./Table";

function LoggedIn() {
  return (
    <React.Fragment>
      <Summary />
      <Form />
      <Table />
    </React.Fragment>
  );
}

export default LoggedIn;
