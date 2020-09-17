import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { toast } from "react-toastify";

import "./css/payment.css";
import CartItem from "./common/CartItem";
import { useItemValue } from "./context/itemContext";
import instance from "./services/paymentService";
import { db } from "../firebase";

function Payment() {
  const [error, setError] = useState(null);
  const [disable, setDisable] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const [{ cart, user }, dispatch] = useItemValue();

  const totalPrice =
    cart.length !== 0 ? cart.map((c) => c.price).reduce((a, c) => c + a) : 0;

  useEffect(() => {
    const getClientSecret = async (e) => {
      if (totalPrice > 0) {
        const response = await instance({
          method: "post",
          url: `/payments/create?total=${totalPrice * 100}`,
        });
        if (response) setClientSecret(response.data.clientSecret);
      }
    };
    getClientSecret();
  }, [cart]);

  if (!user) history.push("/login");

  if (cart.length === 0) return <h1>No items in cart</h1>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (paymentIntent) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          cart,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({ type: "EMPTY_CART" });
      toast("Your order was successfully completed", { type: "success" });
      history.replace("/orders");
    } else {
      toast("Recheck your card details", { type: "error" });
      setProcessing(false);
    }
  };

  const handleChange = (e) => {
    setDisable(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <div className="payment__header">
          <h1>Checkout ({cart.length} items)</h1>
        </div>
        <div className="payment__address">
          <h2>Delivery Address</h2>
          <div>
            <p>{user?.email}</p>
            <p>2020 React way</p>
            <p>MD, Laurel</p>
          </div>
        </div>
        <div className="payment__address">
          <h2>Review item and delivery</h2>
          <div className="payment__items">
            {cart.map((i) => (
              <div className="payment__item">
                <CartItem
                  id={i.id}
                  image={i.image}
                  title={i.title}
                  price={i.price}
                  rating={i.rating}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="payment__address">
          <h2>Payment Method</h2>
          <form onSubmit={handleSubmit} className="payment__stripe">
            <div className="payment__stripe__card">
              <CardElement onChange={handleChange} />
            </div>
            <div className="price__container">
              <CurrencyFormat
                renderText={(value) => <h3>Order Total: {value}</h3>}
                decimalScale={2}
                value={totalPrice}
                displayType="text"
                thousandSeperator
                prefix="$"
              />
              <button disabled={processing || disable || succeeded || error}>
                Purchase
              </button>
              <span>{processing ? <p>Processing</p> : <p>Buy now</p>}</span>
            </div>
            {error && <div>{error}</div>}
          </form>
        </div>

        <div className="payment__section"></div>
      </div>
    </div>
  );
}

export default Payment;
