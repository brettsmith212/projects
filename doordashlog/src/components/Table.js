import React, { useState, useEffect, useContext, useMemo } from "react";
import AuthContext from "../auth-context";
import "./Table.css";

import firebase from "../Firebase";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();
const auth = firebase.auth();

const Table = () => {
  const [isAscending, setisAscending] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  let dashesList;

  let firebaseFiltered = [];
  const ctx = useContext(AuthContext);
  const loadedDashes = [];

  // const request = firestore.status.requesting;
  // console.log(request);

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

  if (ctx.isLoggedIn) {
    const { uid } = auth.currentUser;

    if (firebaseDashes) {
      firebaseFiltered = firebaseDashes.flatMap((dash) =>
        uid === dash.uid ? dash : []
      );

      for (let i = 0; i < firebaseFiltered.length; i++) {
        loadedDashes.push({
          currentDate: firebaseFiltered[i].currentDate,
          totalTime: firebaseFiltered[i].totalTime,
          totalOrders: firebaseFiltered[i].totalOrders,
          totalMiles: firebaseFiltered[i].totalMiles,
          totalMpg: firebaseFiltered[i].totalMpg,
          totalGasPrice: firebaseFiltered[i].totalGasPrice,
          gasCost: firebaseFiltered[i].gasCost,
          milesPerOrder: firebaseFiltered[i].milesPerOrder,
          costPerOrder: firebaseFiltered[i].costPerOrder,
          totalPay: firebaseFiltered[i].totalPay,
          costToOperate: firebaseFiltered[i].costToOperate,
          netPay: firebaseFiltered[i].netPay,
          netPayPerHour: firebaseFiltered[i].netPayPerHour,
        });
      }

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
    ctx.setDashes((previousDash) => {
      if (loadedDashes.length > 0) {
        previousDash = [];
        // console.log("DashesList: " + dashesList);
        // console.log("Previous Dash: " + previousDash);
        return previousDash.push(loadedDashes);
      }
    });
  }, [ctx, loadedDashes]);

  return (
    <React.Fragment>
      {!isLoading && (
        <div className="table-container">
          <div className="order-container">
            <button
              className="order"
              onClick={() => {
                setisAscending(!isAscending);
              }}
            >
              {isAscending ? "Oldest First" : "Newest First"}
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
      )}
      {isLoading && <h1>Loading</h1>}
    </React.Fragment>
  );
};

export default Table;
