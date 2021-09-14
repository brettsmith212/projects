import React, { useContext } from "react";
import AuthContext from "../auth-context";
import "./Chart.css";

import { Line } from "react-chartjs-2";

import firebase from "../Firebase";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();
const auth = firebase.auth();

const Chart = () => {
  let chartDataset = {
    labels: [],
    datasets: [
      {
        label: "Total Pay",
        data: [],
        backgroundColor: "#51cf66",
        borderColor: "#51cf66",
      },
    ],
  };

  let firebaseFiltered = [];
  const ctx = useContext(AuthContext);

  // Pull Dashes for Current User from Firebase
  const dashesRef = firestore.collection("dashes");
  const query = dashesRef.orderBy("currentDate");
  const [firebaseDashes] = useCollectionData(query, { idField: "id" });

  if (ctx.isLoggedIn) {
    const { uid } = auth.currentUser;

    if (firebaseDashes) {
      firebaseFiltered = firebaseDashes.flatMap((dash) =>
        uid === dash.uid ? dash : []
      );
      for (let i = 0; i < firebaseFiltered.length; i++) {
        chartDataset.labels.push(firebaseFiltered[i].currentDate);
        chartDataset.datasets[0].data.push(firebaseFiltered[i].totalPay);
      }
    }
  }

  return (
    <div className="chart">
      <Line
        data={chartDataset}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Total Pay per Dash",
              fontSize: 25,
              position: "top",
            },
            legend: {
              display: false,
              position: "right",
            },
          },
          scales: {
            y: {
              suggestedMin: 0,
              suggestedMax: 100,
              grid: {
                display: false,
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        }}
      ></Line>
    </div>
  );
};

export default Chart;
