import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

import Header from "./components/Header";
import Body from "./components/Body";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Orders from "./components/Orders";
import Login from "./components/Login";
import { auth } from "./firebase";
import { useItemValue } from "./components/context/itemContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import DefaultRoute from "./components/common/DefaultRoute";

const promise = loadStripe(
  "pk_test_51HPvTkHIvZBXIFxPsnbbLmFUTPPBkGylmMkU7pyCI6O2zfPlqqBRMHnWl7IRxoE9yvnoz0yZK5s6NzBYyMDLjRRM00ASRmYAxF"
);

function App() {
  const [{ cart }, dispatch] = useItemValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) dispatch({ type: "SET_USER", user: authUser });
      else dispatch({ type: "SET_USER", user: null });
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <ToastContainer hideProgressBar autoClose={1000} />
        <Switch>
          <Route path="/login" component={Login} />
          <DefaultRoute path="/checkout" Component={Checkout} />
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <DefaultRoute path="/orders" Component={Orders} />
          <DefaultRoute path="/" Component={Body} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
