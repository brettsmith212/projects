import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../auth-context";
import "./Navbar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import lightning from "../icons/flash-outline.svg";

function Navbar() {
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <div className="navbar">
        <Link to="/" className="logoLink">
          <div className="logo-container">
            <h1 className="logo">Lightning Ledger</h1>
            <img src={lightning} alt="lightning" className="lightning" />
          </div>
        </Link>
        {!ctx.isLoggedIn && (
          <button className="header-login" onClick={() => ctx.signIn()}>
            Sign In Now!
          </button>
        )}
        {ctx.isLoggedIn && (
          <div className="topbarIconContainer">
            <NotificationsNoneIcon className="iconBadge" />
            <SettingsRoundedIcon className="iconBadge" />
            <img src={ctx.user.photoURL} alt="Profile" className="topAvatar" />
          </div>
        )}
        {ctx.isLoggedIn && (
          <p className="login-email">{`Logged in as ${ctx.user.email}`}</p>
        )}
      </div>

      {ctx.isLoggedIn && (
        <div className="login-container">
          {ctx.isLoggedIn && (
            <button className="login" onClick={() => ctx.signOut()}>
              Sign Out
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default Navbar;
