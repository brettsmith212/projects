import React from "react";
import { StyledHeader, Navbar, Logo } from "./styles/Navbar.styled";

function NavBar() {
  return (
    <StyledHeader>
      <Navbar>
        <Logo>
          <a href="#">Flight App</a>
        </Logo>
      </Navbar>
    </StyledHeader>
  );
}

export default NavBar;
