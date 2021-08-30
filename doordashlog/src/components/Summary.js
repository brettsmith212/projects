import React from "react";
import "./Summary.css";

function Summary(props) {
  // console.log(props.dashes);

  const payTotal = props.dashes.reduce((acc, cur) => {
    return acc + parseFloat(cur.totalPay);
  }, 0);

  const netPayTotal = props.dashes.reduce((acc, cur) => {
    return acc + parseFloat(cur.netPay);
  }, 0);

  const minsDrivenTotal = props.dashes.reduce((acc, cur) => {
    return acc + parseFloat(cur.totalTime);
  }, 0);

  const netPayPerHourTotal = props.dashes.reduce((acc, cur) => {
    return acc + parseFloat(cur.netPayPerHour);
  }, 0);

  const ordersTotal = props.dashes.reduce((acc, cur) => {
    return acc + parseFloat(cur.totalOrders);
  }, 0);

  const dashesTotal = props.dashes.reduce((acc, cur) => {
    return acc + 1;
  }, 0);

  const hoursDrivenTotal = minsDrivenTotal / 60;
  const netPayPerHourAverage = netPayPerHourTotal / dashesTotal;

  // console.log(payTotal.toFixed(2));
  // console.log(netPayTotal.toFixed(2));
  // console.log(minsDrivenTotal.toFixed(2));
  // console.log(netPayPerHourTotal.toFixed(2));
  // console.log(dashesTotal.toFixed(2));

  return (
    <div className="summary-container">
      <div>
        <h2>Total Pay</h2>
        <h3 className="summary-green">${payTotal.toFixed(2)}</h3>
      </div>
      <div>
        <h2>Total Net Pay</h2>
        <h3 className="summary-green">${netPayTotal.toFixed(2)}</h3>
      </div>
      <div>
        <h2>Total Orders</h2>
        <h3>{ordersTotal.toFixed(0)}</h3>
      </div>
      <div>
        <h2>Total Hours Driven</h2>
        <h3>{hoursDrivenTotal.toFixed(2)} hrs</h3>
      </div>
      <div>
        <h2>Average Net $ / Hr</h2>
        <h3 className="summary-green">${netPayPerHourAverage.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default Summary;

// -- Object from API --
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
