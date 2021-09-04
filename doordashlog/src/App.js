import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Summary from "./components/Summary";
import Table from "./components/Table";

// import firebase from "firebase/compat/app";
import firebase from "./Firebase";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";

const auth = firebase.auth();

function App(props) {
  const [clicked, setClicked] = useState(false);
  const [dashes, setDashes] = useState([]);

  const [user] = useAuthState(auth);

  const clickedFunction = () => {
    setClicked(!clicked);
    // console.log(`App js triggered and click set to ${clicked}`);
  };

  const onSaveFormHandler = (dashesList) => {
    setDashes(dashesList);
    // console.log(dashesList);
  };

  return (
    <div>
      <Navbar />
      {user ? <SignOut /> : <SignIn />}
      <Summary dashes={dashes} />
      <Form clicked={clickedFunction} />
      <Table clicked={clicked} onSaveForm={onSaveFormHandler} />
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

export default App;
