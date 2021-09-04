import React, { useState, useEffect } from "react";
import "./Table.css";

import firebase from "../Firebase";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();
const auth = firebase.auth();

const Table = (props) => {
  const [dashes, setDashes] = useState([]);
  const [isAscending, setisAscending] = useState(true);

  let dashesList = [];
  let firebaseFiltered = [];

  const deleteRow = (dashId) => {
    firestore.collection("dashes").doc(dashId).delete();
  };

  // Set order of dashes
  let order = "asc";
  if (!isAscending) {
    order = "desc";
  }

  // Pull Dashes for Current User from Firebase
  const dashesRef = firestore.collection("dashes");
  const query = dashesRef.orderBy("currentDate", order);
  const [firebaseDashes] = useCollectionData(query, { idField: "id" });

  if (auth.currentUser) {
    const { uid } = auth.currentUser;

    if (firebaseDashes) {
      firebaseFiltered = firebaseDashes.flatMap((dash) =>
        uid === dash.uid ? dash : []
      );

      dashesList = firebaseFiltered.map((dash) => {
        return (
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
            <td>
              <button
                className="remove"
                onClick={() => {
                  deleteRow(dash.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }
  }

  useEffect(() => {
    props.onSaveForm(dashes);
  }, [dashes, props]);

  return (
    <div className="table-container">
      <div className="order-container">
        <button
          className="order"
          onClick={() => {
            setisAscending(!isAscending);
          }}
        >
          {isAscending ? "Ascending" : "Descending"}
        </button>
      </div>
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
