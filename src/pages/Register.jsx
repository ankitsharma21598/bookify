import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebaseContext } from "../contexts/firebaseContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const firebase = useFirebaseContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log("firebase",firebase);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signing in...");
    var result = await firebase.signupUserWithEmailAndPassword(email, password);
    console.log("Successfully signed", result);
  };
  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;