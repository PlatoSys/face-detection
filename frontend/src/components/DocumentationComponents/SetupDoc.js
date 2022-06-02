import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function SetupDoc() {
  return (
    <Card style={{ border: "none", marginLeft: "25px" }}>
      <Card.Body style={{ padding: 0 }}>
        <Card.Title className="fs-1" style={{ textTransform: "none" }}>
          Set Up
        </Card.Title>
        <Card.Text className="fs-4" style={{ textTransform: "none" }}>
          In order to use API in your project you need{" "}
          <Link to="/account" target="_blank">
            Token
          </Link>{" "}
          for making API Requests
        </Card.Text>
        <Card.Text>
          Click Reveal Token
        </Card.Text>
        <Card.Img
        src="./images/docsetup2.avif">
        </Card.Img>
        <Card.Text>
          Copy It
        </Card.Text>
        <Card.Img
        src="./images/docsetup1.avif">
        </Card.Img>
      </Card.Body>
    </Card>
  );
}

export default SetupDoc;
