import React, { useState, useEffect } from "react";
import "./Table.css";

import firebase from "../Firebase";
import "firebase/compat/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();

const Table = (props) => {
  const [dashes, setDashes] = useState([]);
  const [httpError, setHttpError] = useState(null);

  const dashesRef = firestore.collection("dashes");
  const query = dashesRef.orderBy("createdAt");

  const [firebaseDashes] = useCollectionData(query, { idField: "id" });
  // const { gasCost, milesPerOrder } = firebaseDashes;

  console.log(firebaseDashes);
  // console.log(gasCost);
  // console.log(milesPerOrder);

  const dashesList = dashes.map((dash) => (
    <tr key={dash.id}>
      <td>{dash.currentDate}</td>
      <td>{dash.totalTime}</td>
      <td>{dash.totalOrders}</td>
      <td>{dash.totalMiles}</td>
      <td>{dash.totalMpg}</td>
      <td>${dash.totalGasPrice}</td>
      <td>${dash.gasCost}</td>
      <td>{dash.milesPerOrder}</td>
      <td>${dash.costPerOrder}</td>
      <td className="positive">${dash.totalPay}</td>
      <td className="negative">${dash.costToOperate}</td>
      <td className="positive">${dash.netPay}</td>
      <td className="positive">${dash.netPayPerHour}</td>
      {/* {window.innerWidth > 900 && (
        <button className="ion-button">
          <ion-icon name="close-circle-outline"></ion-icon>
        </button>
      )}
      {window.innerWidth <= 900 && <button className="remove">Remove</button>} */}
      <td>
        <button
          className="remove"
          onClick={() => {
            // setRemoveDash(dash);
            // let index = dashes.findIndex((dash) => dash.id === removeDash.id);
            // if (index !== -1) {
            //   dashes.splice(index, 1);
            //   setRemoveDash("");
            // }
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  useEffect(() => {
    props.onSaveForm(dashes);
  }, [dashes, props]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      // console.log("Timeout started");
    }, 3000);

    const fetchDash = async () => {
      const response = await fetch(
        "https://react-http-3051a-default-rtdb.firebaseio.com/orders.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedDashes = [];

      for (const key in responseData) {
        loadedDashes.push({
          id: key,
          currentDate: responseData[key].currentDate,
          totalTime: responseData[key].totalTime,
          totalOrders: responseData[key].totalOrders,
          totalMiles: responseData[key].totalMiles,
          totalMpg: responseData[key].totalMpg,
          totalGasPrice: responseData[key].totalGasPrice,
          gasCost: responseData[key].gasCost,
          milesPerOrder: responseData[key].milesPerOrder,
          costPerOrder: responseData[key].costPerOrder,
          totalPay: responseData[key].totalPay,
          costToOperate: responseData[key].costToOperate,
          netPay: responseData[key].netPay,
          netPayPerHour: responseData[key].netPayPerHour,
        });
      }

      setDashes(loadedDashes);
    };

    fetchDash().catch((error) => {
      setHttpError(error.message);
    });
    clearTimeout(timeout);
    // console.log("Table js props.clicked triggered");
  }, [props.clicked]);

  if (httpError) {
    return (
      <section>
        <p> {httpError}</p>
      </section>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>Date</th>
            <th>Total Time (mins)</th>
            <th># of Orders</th>
            <th>Total Miles</th>
            <th>MPG</th>
            <th>Gas Price (est)</th>
            <th>Gas Cost</th>
            <th>Miles per Order</th>
            <th>Cost per Order</th>
            <th>Total Pay</th>
            <th>Cost to Operate</th>
            <th>Net Pay</th>
            <th>Net $ / Hr</th>
          </tr>
        </thead>
        <tbody className="table-body">{dashesList}</tbody>
      </table>
    </div>
  );
};

export default Table;
