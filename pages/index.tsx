import React from "react";
import LoginForm from "./components/LoginForm";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";

function Home() {
  const firebaseConfig = {
    apiKey: "AIzaSyD91gRzVf5LBfaqcYptvJzKed_Q8hVmpnQ",
    authDomain: "fir-nextjs-test-4160e.firebaseapp.com",
    projectId: "fir-nextjs-test-4160e",
    storageBucket: "fir-nextjs-test-4160e.appspot.com",
    messagingSenderId: "1012462415595",
    appId: "1:1012462415595:web:f64e64de80cede33f058ae",
  };
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Initialize firebase app
  const app = initializeApp(firebaseConfig);

  // Initialize firebase db
  const db = getFirestore();

  // Declare variables
  const [userDetails, setUserDetails] = useState({
    userName: "Unknown",
    passWord: "Unknown",
  });
  const [loginDetails, setLoginDetails] = useState("Please Login Above");

  // **** Helper Functions
  // TODO BREAK THIS INTO A COMPONENT
  async function handleSubmitLogin(usrnm: string, psswrd: string) {
    setLoginDetails("Connecting to database....");
    // Connect to the users db, then query if the username field
    // is the same as the inputted name.
    // Firestore is a document database, meaning its basically a huge json object. nosql
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", usrnm));
    const querySnapshot = await getDocs(q);
    // Check if any data is returned. If not user is not found
    if (querySnapshot.empty) {
      console.log("No such document!");
      setLoginDetails("User Not Found In the database");
      return;
    }
    // Check if the password is correct
    console.log("Document data:", querySnapshot.docs[0].data());
    if (querySnapshot.docs[0].data().password === psswrd) {
      setLoginDetails("SUCCESSFULLY LOGGED IN TO " + usrnm);
    } else {
      setLoginDetails("Incorrect Password");
      return;
    }

    // Set this Idk why lmao
    setUserDetails({
      userName: usrnm,
      passWord: psswrd,
    });
  }
  // **** Helper Functions

  return (
    <div>
      <h1>Home Page</h1>

      <LoginForm handleSubmitLogin={handleSubmitLogin} />
      <h1>{loginDetails}</h1>
      <p>Valid logins:</p>
      <p>tylerquast: 123abc</p>
      <p>ryan: 456def</p>
    </div>
  );
}

export default Home;
