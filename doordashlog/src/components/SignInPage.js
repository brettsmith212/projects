import React, { useContext } from "react";
import AuthContext from "../auth-context";
import "./SignInPage.css";

function SignInPage() {
  const ctx = useContext(AuthContext);

  return (
    <div className="main-login-container">
      <button className="main-login" onClick={() => ctx.signIn()}>
        Sign In with Google!
      </button>
    </div>
  );
}

export default SignInPage;
