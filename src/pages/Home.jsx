import React, { useEffect, useState } from "react";
import { useFirebaseContext } from "../contexts/firebaseContext";
import CardPage from "../components/Card";
import CardGroup from "react-bootstrap/CardGroup";
const Home = () => {
  const firebase = useFirebaseContext();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    firebase.listAllBooks().then((books) => {
      console.log("listAllBooks", books.docs[0].data());
      setBooks(books.docs);
    });
  }, []);
  return (
    <div className="container">
      <CardGroup>
        {books.map((book) => (
          <CardPage
            key={book.id}
            link={`/book/view/${book.id}`}
            {...book.data()}
          />
        ))}
      </CardGroup>
    </div>
  );
};

export default Home;
