import React, { useContext } from "react";
import "./App.css";
import AuthContext from "./auth-context";
import Navbar from "./components/Navbar";
import LoggedIn from "./components/LoggedIn";
import SignInPage from "./components/SignInPage";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./components/pages/home/Home";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <div className="container">
        <Sidebar />
        <Home />
      </div>
      {!ctx.isLoggedIn && <SignInPage />}
      {ctx.isLoggedIn && <LoggedIn />}
    </div>
  );
}

export default App;
