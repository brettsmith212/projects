import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../auth-context";
import "./Navbar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

function Navbar() {
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <div className="navbar">
        <Link to="/" className="logoLink">
          <h1 className="logo">DoorDash Log</h1>
        </Link>
        {!ctx.isLoggedIn && <h3 className="item-b">Sign In With Google</h3>}
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

      <div className="login-container">
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
