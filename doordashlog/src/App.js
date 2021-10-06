import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AuthContext from "./auth-context";
import Navbar from "./components/navbar/Navbar";
import LoggedIn from "./components/loggedIn/LoggedIn";
import SignInPage from "./components/hero/SignInPage";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      {!ctx.isLoggedIn && <SignInPage />}
      {ctx.isLoggedIn && <LoggedIn />}
    </Router>
  );
}

export default App;
