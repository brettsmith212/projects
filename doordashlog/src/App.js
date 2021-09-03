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
// import { useCollectionData } from "react-firebase-hooks/firestore";

// firebase.initializeApp({
//   apiKey: "AIzaSyBdVrwmASEvxgoQBmiyd94luXR5G9BkFcU",
//   authDomain: "react-http-3051a.firebaseapp.com",
//   databaseURL: "https://react-http-3051a-default-rtdb.firebaseio.com",
//   projectId: "react-http-3051a",
//   storageBucket: "react-http-3051a.appspot.com",
//   messagingSenderId: "603568763820",
//   appId: "1:603568763820:web:5464b4115e37cdcdf4c009",
// });

const auth = firebase.auth();
const firestore = firebase.firestore();

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
