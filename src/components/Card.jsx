import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebaseContext } from "../contexts/firebaseContext";
import { useNavigate } from "react-router-dom";
const CardPage = (props) => {
  const navigate = useNavigate();
  const [url,setUrl] = useState(null)
  const firebase = useFirebaseContext();
  useEffect(()=>{
    firebase.getImageURL(props.imageURL).then((url)=>setUrl(url))
  },[])

  // const handleView = (e)=>{
  //   e.preventDefault();
  //   console.log("hit handleView");
  // };

  return (
    <div>
      <Card style={{ width: "18rem", margin:"20px" }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            This book has a title {props.name} and this book is sold by{" "}
            {props.userName} and this book costs Rs.{props.price}
          </Card.Text>
          <Button onClick={()=>navigate(props.link) }variant="primary">View</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardPage;
