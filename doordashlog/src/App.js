import React, { useContext } from "react";
import "./App.css";
import AuthContext from "./auth-context";
import Navbar from "./components/Navbar";
import LoggedIn from "./components/LoggedIn";
import SignInPage from "./components/SignInPage";
import Chart from "./components/Chart";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <Chart />
      {!ctx.isLoggedIn && <SignInPage />}
      {ctx.isLoggedIn && <LoggedIn />}
    </div>
  );
}

export default App;
