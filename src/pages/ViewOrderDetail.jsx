import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebaseContext } from "../contexts/firebaseContext";

const ViewOrderDetail = () => {
  const firebase = useFirebaseContext();
  const params = useParams();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    firebase.getOrderById(params.bookId).then((order) => {
      setOrders(order.docs);
    });
  }, []);
  console.log("viewOrderDetail", orders);
  return (
    <div className="container mt-3">
      <h1>Orders</h1>
      {orders.map((order) => {
        const data = order.data();
        return (
          <div
            key={order.id}
            className="mt-5"
            style={{ border: "1px solid", padding: "10px" }}
          >
            <h5>Order By: {data.userName}</h5>
            <h6>Qty: {data.qty}</h6>
            <p>Email: {data.userEmail}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ViewOrderDetail;
