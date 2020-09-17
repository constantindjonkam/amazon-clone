import React from "react";
import FlipMove from "react-flip-move";
import { useHistory } from "react-router-dom";

import "./css/checkout.css";
import SubTotal from "./common/SubTotal";
import { useItemValue } from "./context/itemContext";
import CartItem from "./common/CartItem";

function Checkout() {
  const [{ cart, user }] = useItemValue();
  const history = useHistory();

  if (!user) {
    history.push("/login");
  }

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img src={require("./images/ad.png")} alt="Ads" />
        <h3>Shopping Cart </h3>
        <p>Price</p>
        <div className="clear"></div>
        <FlipMove
          enterAnimation="accordionVertical"
          leaveAnimation="accordionHorizontal"
        >
          {cart.map((i, index) => (
            <div key={i.id + index}>
              <CartItem
                id={i.id}
                image={i.image}
                title={i.title}
                price={i.price}
                rating={i.rating}
              />
            </div>
          ))}
        </FlipMove>
      </div>

      <div className="checkout__right">
        <SubTotal />
      </div>
    </div>
  );
}

export default Checkout;
