import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import { AuthTokenContext, UserDataContext } from "../store";

function LoginScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [_, setAuthToken] = useContext(AuthTokenContext);
  const [userData, setUserData] = useContext(UserDataContext);

  useEffect(() => {
    if (userData) {
      navigate(`/`);
    }
  }, [navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", `Bearer ${response.data.access}`);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            email: response.data.email,
            firstname: response.data.firstname,
          })
        );
        setLoading(false);
        setAuthToken(`Bearer ${response.data.access}`);
        setUserData({
          email: response.data.email,
          firstname: response.data.firstname,
        });
        navigate("/");
      })
      .catch((err) => setError(err.response.data.detail));
  };

  return (
    <div>
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button type="submit" variant="primary" className="my-2">
            Sign in
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New to system? <Link to="/register">Register here</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}

export default LoginScreen;
