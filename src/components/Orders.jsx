import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./css/orders.css";
import { db } from "../firebase";
import { useItemValue } from "./context/itemContext";
import Order from "./common/Order";

function Orders() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  const [{ user }] = useItemValue();

  useEffect(() => {
    if (user)
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          );
        });
    else setOrders([]);
  }, [user]);

  if (!user) {
    history.push("/login");
  }

  return (
    <div>
      <h1>Your Orders</h1>
      <div className="order__container">
        {orders.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
