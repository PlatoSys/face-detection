import React, { useContext, useEffect, useState } from "react";
import { AuthTokenContext, UserDataContext } from "../store";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

function AccountScreen() {
  const navigate = useNavigate();
  const [userData] = useContext(UserDataContext);
  const [authToken] = useContext(AuthTokenContext);
  const [displayToken, setDisplayToken] = useState("");

  useEffect(() => {
    if (!userData) {
      navigate(`/login`);
    }
  }, [userData]);

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title className="fs-1">User Data</Card.Title>
          <Card.Title>Email: {userData.email}</Card.Title>
          <Card.Title>Firstname: {userData.firstname}</Card.Title>
          <Card.Title>{displayToken}</Card.Title>
          {
            !displayToken ? (<Button onClick={() => setDisplayToken(authToken)}>Reveal Token</Button>) : (<Button onClick={() => setDisplayToken("")}>Hide Token</Button>)

          }
        </Card.Body>
      </Card>

    </div>
  );
}

export default AccountScreen;
