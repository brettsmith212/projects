import React, { useContext } from "react";
import AuthContext from "../auth-context";
import "./Navbar.css";

function Navbar() {
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <div className="navbar">
        <h1 className="item-a">DoorDash Log</h1>
        {!ctx.isLoggedIn && <h3 className="item-b">Welcome!</h3>}
        {ctx.isLoggedIn && (
          <h3 className="item-b">{`Welcome, ${ctx.user.displayName}`}</h3>
        )}
        {ctx.isLoggedIn && (
          <p className="item-c">{`Logged in as ${ctx.user.email}`}</p>
        )}
      </div>

      <div className="login-container">
        {/* {!ctx.isLoggedIn && (
          <button className="login" onClick={() => ctx.signIn()}>
            Sign In
          </button>
        )} */}
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
