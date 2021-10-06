import React, { useContext } from "react";
import AuthContext from "../../auth-context";
import "./FeaturedInfo.css";

import firebase from "../../Firebase";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();
const auth = firebase.auth();

function Summary() {
  let firebaseFiltered = [];
  const ctx = useContext(AuthContext);
  const loadedDashes = [];

  let payTotal = 0;
  let netPayTotal = 0;
  let minsDrivenTotal = 0;
  let netPayPerHourTotal = 0;
  let ordersTotal = 0;
  let dashesTotal = 0;

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
    }
  }

  // console.log("Dashes", loadedDashes);

  if (loadedDashes.length > 0) {
    payTotal = loadedDashes.reduce((acc, cur) => {
      return acc + parseFloat(cur.totalPay);
    }, 0);

    netPayTotal = loadedDashes.reduce((acc, cur) => {
      return acc + parseFloat(cur.netPay);
    }, 0);

    minsDrivenTotal = loadedDashes.reduce((acc, cur) => {
      return acc + parseFloat(cur.totalTime);
    }, 0);

    netPayPerHourTotal = loadedDashes.reduce((acc, cur) => {
      return acc + parseFloat(cur.netPayPerHour);
    }, 0);

    ordersTotal = loadedDashes.reduce((acc, cur) => {
      return acc + parseFloat(cur.totalOrders);
    }, 0);

    dashesTotal = loadedDashes.reduce((acc, cur) => {
      return acc + 1;
    }, 0);
  }

  const hoursDrivenTotal = minsDrivenTotal / 60;
  const netPayPerHourAverage = netPayPerHourTotal / dashesTotal;

  return (
    <div className="summary-container">
      <div className="summary-box">
        <h2>Total Pay</h2>
        <h3 className="summary-green">${payTotal.toFixed(2)}</h3>
      </div>
      <div className="summary-box">
        <h2>Total Net Pay</h2>
        <h3 className="summary-green">${netPayTotal.toFixed(2)}</h3>
      </div>
      <div className="summary-box">
        <h2>Average Net $ / Hr</h2>
        <h3 className="summary-green">${netPayPerHourAverage.toFixed(2)}</h3>
      </div>
      <div className="summary-box">
        <h2>Total Orders</h2>
        <h3>{ordersTotal.toFixed(0)}</h3>
      </div>
      <div className="summary-box">
        <h2>Total Hours Driven</h2>
        <h3>{hoursDrivenTotal.toFixed(2)} hrs</h3>
      </div>
    </div>
  );
}

export default Summary;

/*****  -- Object from API -- *****/

// costPerOrder: "2.61"
// costToOperate: "5.22"
// currentDate: "2021-08-14"
// gasCost: "2.37"
// id: "-MhuqbeOybVk3qAz6dxt"
// milesPerOrder: "7.50"
// netPay: "24.21"
// netPayPerHour: "24.21"
// totalGasPrice: "4.10"
// totalMiles: "15"
// totalMpg: "26"
// totalOrders: "2"
// totalPay: "29.43"
// totalTime: "60"

// import "./FeaturedInfo.css";
// import React from "react";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// function FeaturedInfo() {
//   return (
//     <div className="featured">
//       <div className="featuredItem">
//         <span className="featuredTitle">Revenue</span>
//         <div className="featuredMoneyContainer">
//           <span className="featuredMoney">$2,415</span>
//           <span className="featuredMoneyRate">
//             -11.4 <ArrowDownwardIcon />
//           </span>
//         </div>
//         <span className="featuredSub">Compared to last month</span>
//       </div>
//     </div>
//   );
// }

// export default FeaturedInfo;
