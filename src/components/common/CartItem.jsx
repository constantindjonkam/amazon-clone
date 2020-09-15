import React from "react";

import "./css/cartItem.css";
import { useItemValue } from "../context/itemContext";

function CartItem({ id, image, title, price, rating, hideButton }) {
  const [item, dispatch] = useItemValue();

  const removeFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  return (
    <div className="cartItem">
      <div className="cartItem__container">
        <div className="cartItem__image">
          <img src={image} alt="CartItem" />
        </div>
        <div className="cartItem__info">
          <div className="cartItem__title">
            <h4>{title}</h4>
          </div>
          <p>In Stock</p>
          <p>
            {Array(rating)
              .fill()
              .map((_, i) => "⭐")}
          </p>
          {!hideButton && <button onClick={removeFromCart}>Delete</button>}
        </div>
        <p>
          <strong>${price}</strong>
        </p>
      </div>
    </div>
  );
}

export default CartItem;
