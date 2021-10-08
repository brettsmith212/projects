import React, { useContext } from "react";
import AuthContext from "../../auth-context";
import "./SignInPage.css";
import waves from "../icons/wave.svg";

function SignInPage() {
  const ctx = useContext(AuthContext);

  return (
    <div className="hero">
      <div className="main-login-container">
        <button className="main-login" onClick={() => ctx.signIn()}>
          Sign In with Google!
        </button>
      </div>
      <img src={waves} alt="waves" className="waves" />
    </div>
  );
}

export default SignInPage;
