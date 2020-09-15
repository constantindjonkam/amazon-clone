import React, { forwardRef } from "react";
import FlipMove from "react-flip-move";

import "./css/checkout.css";
import SubTotal from "./common/SubTotal";
import { useItemValue } from "./context/itemContext";
import CartItem from "./common/CartItem";
import Test from "./Test";

function Checkout() {
  const [{ cart, user }, dispatch] = useItemValue();

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img src={require("./images/ad.png")} alt="Ads" />
        <h4>Hello, {user?.email}</h4>
        <h3>Shopping Cart </h3>
        <p>Price</p>
        <div className="clear"></div>
        {/* <FlipMove> */}
        {cart.map((i) => (
          <CartItem
            id={i.id}
            image={i.image}
            title={i.title}
            price={i.price}
            rating={i.rating}
          />
        ))}
        {/* </FlipMove> */}
        {/* <Test items={cart} /> */}
        {/* {TopArticles} */}
      </div>

      <div className="checkout__right">
        <SubTotal />
      </div>
    </div>
  );
}

export default Checkout;
