import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebaseContext } from '../contexts/firebaseContext';
import Spinner from 'react-bootstrap/Spinner';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Detail = () => {
  
  const [qty, setQty] = useState(1);
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const firebase = useFirebaseContext();
  const params = useParams();
  useEffect(()=>{
    firebase.getBookById(params.bookId).then((book) =>setData(book.data()));  
    // console.log("Book",res);
  },[]);
  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      firebase.getImageURL(imageURL).then((url) => setURL(url));
    }
  }, [data]);
  if(data==null){
    return (
      <Spinner animation="border" role="status" variant="secondary" size='xl'>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const handleBuyNow = async(e) => {
    e.preventDefault();
    const result =await firebase.placeOrder(params.bookId,qty);
    console.log("Order Placed", result);
  };

  console.log("Detail", data);
  return (
    <div className="container mt-5">
      <h1>{data.name}</h1>
      <img src={url} width="30%" style={{ borderRadius: "10px" }} />
      <h1>Details</h1>
      <p>Price: Rs. {data.price}</p>
      <p>ISBN Number. {data.isbn}</p>
      <h1>Owner Details</h1>
      <p>Name: {data.userName}</p>
      <p>Email: {data.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Qty</Form.Label>
        <Form.Control
          onChange={(e) => setQty(e.target.value)}
          value={qty}
          type="Number"
          placeholder="Enter Qty"
        />
        </Form.Group>
      <Button onClick={handleBuyNow} variant="success">
        Buy Now
      </Button>
    
    </div>
  )
}

export default Detail