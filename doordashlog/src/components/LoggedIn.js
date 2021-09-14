import React from "react";
import Chart from "./Chart";
import Form from "./Form";
import Summary from "./Summary";
import Table from "./Table";

function LoggedIn() {
  return (
    <React.Fragment>
      <Summary />
      <Chart />
      <Form />
      <Table />
    </React.Fragment>
  );
}

export default LoggedIn;
