import React, { useEffect, useState } from "react";
import { useFirebaseContext } from "../contexts/firebaseContext";
import Card from "../components/Card";

const ViewOrder = () => {
  const firebase = useFirebaseContext();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    if (firebase.isLoggedIn) {
      firebase.fetchMyOrders(firebase.user.uid).then((book) => {
        // if(!book) return null;
        setBooks(book.docs);
      });
    }
  }, [firebase]);
  console.log("books", books);

  if (!firebase.isLoggedIn) return <h1>Please log in</h1>;
  return (
    <div>
      {books.map((books) => (
        <Card
          link={`/book/orders/${books.id}`}
          key={books.id}
          id={books.id}
          {...books.data()}
        />
      ))}
    </div>
  );
};

export default ViewOrder;
