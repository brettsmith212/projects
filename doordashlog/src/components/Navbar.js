import React, { useContext } from "react";
import AuthContext from "../auth-context";
import "./Navbar.css";

function Navbar() {
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <div className="navbar">
        <h1>DoorDash Log</h1>
        {!ctx.isLoggedIn && <h3>Welcome!</h3>}
        {ctx.isLoggedIn && <h3>{`Welcome, ${ctx.user.displayName}`}</h3>}
      </div>
      <div className="login-container">
        {!ctx.isLoggedIn && (
          <button className="login" onClick={() => ctx.signIn()}>
            Sign In
          </button>
        )}
        {ctx.isLoggedIn && (
          <button className="login" onClick={() => ctx.signOut()}>
            Sign Out
          </button>
        )}
      </div>
    </React.Fragment>
  );
}

export default Navbar;
