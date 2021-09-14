import React, { useState, useContext } from "react";
import AuthContext from "../auth-context";

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
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  let firebaseFiltered = [];
  const ctx = useContext(AuthContext);

  const [chartData, setChartData] = useState(chartDataset);

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

  // setChartData(chartDataset);

  return (
    <div className="chart">
      <Line
        data={chartData}
        options={{
          title: {
            display: true,
            text: "Total Pay",
            fontSize: 25,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      ></Line>
    </div>
  );
};

export default Chart;
