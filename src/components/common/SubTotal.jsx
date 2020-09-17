import React from "react";
import CurrencyFormat from "react-currency-format";

import "./css/subTotal.css";
import { useItemValue } from "../context/itemContext";
import { useHistory } from "react-router-dom";

function SubTotal() {
  const history = useHistory();
  const [{ cart }] = useItemValue();
  if (cart.length === 0) return null;
  const total = cart.map((c) => c.price).reduce((a, c) => c + a);

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <div className="subtotal__container">
            <p>
              Subtotal ({cart.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </div>
        )}
        decimalScale={2}
        value={total}
        displayType="text"
        thousandSeperator
        prefix="$"
      />

      <button onClick={() => history.push("/payment")} type="submit">
        Proceed to checkout
      </button>
    </div>
  );
}

export default SubTotal;
