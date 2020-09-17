import React, { useState, useEffect } from "react";

import "./css/body.css";
import Product from "./common/Product";
import { db } from "../firebase";

function Body() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    db.collection("products")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) =>
        setProducts(
          snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))
        )
      );
  }, []);

  return (
    <div className="body">
      <div className="body__container">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/01/kindle/comic/cu60days/Amazon_GRD_DesktopHero_TheBoys_1500x600._CB407151277_.jpg"
          alt="Background"
          className="body__container__image"
        />
        <div className="body__row">
          {products.map(({ id, title, image, price, rating }) => (
            <div className="body__product" key={id}>
              <Product
                id={id}
                title={title}
                price={price}
                image={image}
                rating={rating}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Body;
