import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./css/product.css";
import { useItemValue } from "../context/itemContext";

function Product({ id, title, price, image, rating }) {
  const [item, dispatch] = useItemValue();

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: { id, title, price, image, rating },
    });
    toast(
      <div id="toast__product">
        <img src={image} width={48} alt="Cart" /> added to Cart
      </div>,
      { type: "dark" }
    );
  };

  return (
    <>
      {/* <ToastContainer hideProgressBar autoClose={1000} /> */}
      <div className="product">
        <div className="product__info">
          <p>{title}</p>
          <p className="product__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="product__rating">
            <p>
              {Array(rating)
                .fill()
                .map((_, i) => "⭐")}
            </p>
          </div>
        </div>
        <img src={image} alt={title} />
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </>
  );
}

export default Product;
