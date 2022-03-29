import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import { useContext } from "react";
import { AuthTokenContext, UserDataContext } from "../store";

function RegisterScreen() {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const navigate = useNavigate();
  const [_, setAuthToken] = useContext(AuthTokenContext);
  const [userData, setUserData] = useContext(UserDataContext);

  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setLoading(true);
      axios
        .post(
          "/api/register/",
          {
            firstname,
            email,
            password,
          },
          config
        )
        .then((response) => {
          setMessage(
            `${response.data.firstname} has been Registered Successfully`
          );
          localStorage.setItem("token", `Bearer ${response.data.token}`);
          localStorage.setItem(
            "userData",
            JSON.stringify({
              email: response.data.email,
              firstname: response.data.firstname,
            })
          );
          setAuthToken(`Bearer ${response.data.access}`);
          setUserData({
            email: response.data.email,
            firstname: response.data.firstname,
          });
          navigate("/");
        })
        .catch((err) => setError(err.response.data.detail));
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <FormContainer>
        {loading && <Loader />}

        <h1>Sign Up</h1>
        {message && <Message variant="success">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="Firstname" className="my-2">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              required
              autoComplete={"off"}
              type="firstname"
              placeholder="Enter Firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              autoComplete={"off"}
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              autoComplete={"off"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="passwordConfirm" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              autoComplete="off"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-2">
            Sign up
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an Account? <Link to="/login">Sign In here</Link>
          </Col>
        </Row>
      </FormContainer>
    </React.Fragment>
  );
}

export default RegisterScreen;
