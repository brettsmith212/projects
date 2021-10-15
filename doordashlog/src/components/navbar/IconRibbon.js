import React, { useContext, useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./IconRibbon.css";
import AuthContext from "../../auth-context";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

function IconRibbon() {
  const ctx = useContext(AuthContext);
  return (
    <div className="topbarIconContainer">
      <NotificationsNoneIcon className="iconBadge" />
      <SettingsRoundedIcon className="iconBadge" />
      <NavItem source={ctx.user.photoURL} alt={"Profile"} class={"topAvatar"}>
        <DropdownMenu />
      </NavItem>
    </div>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  console.log(open);

  return (
    <>
      <img
        src={props.source}
        className={props.class}
        alt={props.alt}
        onClick={() => {
          setOpen(!open);
        }}
      />

      {open && props.children}
    </>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const ctx = useContext(AuthContext);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="/#"
        className="menu-item"
        onClick={() => {
          props.goToMenu && setActiveMenu(props.goToMenu);
        }}
      >
        {props.children}
      </a>
    );
  }

  return (
    <div className="dropdown-menu" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
        onClick={() => ctx.signOut()}
      >
        <div className="menu">
          <DropdownItem>Sign Out</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default IconRibbon;
