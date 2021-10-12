import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../auth-context";
import "./Navbar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { AddDashModal } from "../featuredInfo/AddDashModal";

function Navbar() {
  const ctx = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <React.Fragment>
      <div className="navbar">
        <Link to="/" className="logoLink">
          <div className="logo-container">
            <h1 className="logo">Lightning Ledger</h1>
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
            <>
              <button className="login" onClick={() => ctx.signOut()}>
                Sign Out
              </button>
              <button className="login" onClick={openModal}>
                Add Dash
              </button>
              <AddDashModal showModal={showModal} setShowModal={setShowModal} />
            </>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default Navbar;
