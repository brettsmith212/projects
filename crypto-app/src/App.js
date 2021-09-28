import "./App.css";
import React, { useState, useRef, useEffect } from "react";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [pair, setPair] = useState("");
  const [price, setPrice] = useState("0.00");
  const [pastData, setpastData] = useState({});
  const ws = useRef(null);

  let first = useRef(false);
  const url = "https://api.pro.coinbase.com";

  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

    let pairs = [];
    const apiCall = async () => {
      await fetch(url + "/products")
        .then((res) => res.json())
        .then((data) => (pairs = data));
      let filtered = pairs.filter((pair) => {
        if (
          (pair.quote_currency === "USD" && pair.base_currency === "BTC") ||
          (pair.quote_currency === "USD" && pair.base_currency === "ETH")
        ) {
          return pair;
        }
      });

      filtered = filtered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1;
        }
        if (a.base_currency > b.base_currency) {
          return 1;
        }
        return 0;
      });

      console.log(filtered);
      setCurrencies(filtered);

      first.current = true;
    };
    apiCall();
  }, []);

  useEffect(() => {
    if (!first.current) {
      console.log("returning on first render");
      return;
    }

    console.log("running pair change");
    let msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"],
    };
    let jsonMsg = JSON.stringify(msg);
    ws.current.send(jsonMsg);

    // let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
    // const fetchHistoricalData = async () => {
    //   let dataArr = [];
    //   await fetch(historicalDataURL)
    //     .then((res) => res.json())
    //     .then((data) => (dataArr = data));
    //   console.log(dataArr);
    // };

    // fetchHistoricalData();

    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.type !== "ticker") {
        return;
      }

      if (data.product_id === pair) {
        setPrice(data.price);
      }
    };
  }, [pair]);

  const handleSelect = (e) => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: ["ticker"],
    };
    let unsub = JSON.stringify(unsubMsg);

    ws.current.send(unsub);

    setPair(e.target.value);
  };

  console.log("pair: ", pair);

  return (
    <div>
      <h1>Crypto App</h1>
      <button value={"BTC-USD"} onClick={handleSelect}>
        BTC
      </button>
      <p>{price}</p>
    </div>
  );
}

export default App;
