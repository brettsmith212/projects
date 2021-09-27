import "./App.css";
import { animate } from "motion";
import { useState } from "react";

function App() {
  const [isAnimated, setIsAnimated] = useState(false);
  const animateHandler = () => {
    setIsAnimated(!isAnimated);
    if (isAnimated === false) {
      animate("#box", { x: 100, rotate: 45 }, { duration: 0.5 });
    } else {
      animate("#box", { x: 0, rotate: -90 }, { duration: 0.5 });
    }
  };

  return (
    <div>
      <h1>Animate Motion</h1>
      <div id="box"></div>
      <button type="submit" className="btn" onClick={animateHandler}>
        Roll Box
      </button>
    </div>
  );
}

export default App;
