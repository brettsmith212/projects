import React, { useContext } from "react";
import "./App.css";
import AuthContext from "./auth-context";
import Navbar from "./components/navbar/Navbar";
import LoggedIn from "./components/loggedIn/LoggedIn";
import SignInPage from "./components/hero/SignInPage";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <Navbar />
      {!ctx.isLoggedIn && <SignInPage />}
      {ctx.isLoggedIn && <LoggedIn />}
    </React.Fragment>
  );
}

export default App;
