import React, { useContext } from "react";
import "./App.css";
import AuthContext from "./auth-context";
import Navbar from "./components/Navbar";
import LoggedIn from "./components/LoggedIn";
import SignInPage from "./components/SignInPage";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      {!ctx.isLoggedIn && <SignInPage />}
      {ctx.isLoggedIn && <LoggedIn />}
    </div>
  );
}

export default App;
