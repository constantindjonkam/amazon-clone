import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./css/login.css";
import { auth } from "../firebase";
import { useItemValue } from "./context/itemContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [{ user }] = useItemValue();
  const history = useHistory();

  const signUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  if (user) history.push("/");

  return (
    <div className="login">
      <img
        src="https://bpng.subpng.com/dy/e43d1a94fbb058060e52a88b23982539/L0KzQYm3VcA2N6RwfZH0aYP2gLBuTfFuaat0hp9sb32wcb7omv9vNaF3gd9uLXzyd7E0gf1igpDzRdZqc3iwfbLrigNwdl5mhdNFb36wfLFuj702aZZpTKg6N3G5coeAVb4yPGU1UaIANEG4Qoa7Wck1OWY7UKQELoDxd1==/kisspng-amazon-com-amazon-prime-logo-amazon-dash-madison-amazon-logo-5aed4617a6b675.1440905415254994156829.png"
        className="login__image"
        alt="amazon"
      ></img>
      <div className="login__container">
        <h1>Sign-In</h1>
        <label htmlFor="email">Email</label>
        <div className="login__input">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="email"
            value={email}
          />
        </div>
        <label htmlFor="password">Password</label>
        <div className="login__input">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            value={password}
          />
        </div>
        <button onClick={signIn}>Continue</button>
        <p className="login__text">
          By continuing, you agree to Amazon's clone{" "}
          <span>Conditions of Use</span> and <span>Privacy Notice.</span>
        </p>
        <p className="login__textHelp">Need help?</p>
      </div>
      <p className="login__line">
        <div></div>New to Amazon?<div></div>
      </p>
      <button onClick={signUp}>Create your Amazon account</button>
    </div>
  );
}

export default Login;
