import React from "react";
import { ListGroup, Card } from "react-bootstrap";

function IntroductionDoc() {
  return (
    <Card style={{ border: "none", marginLeft: "25px" }}>
      <Card.Body style={{ padding: 0 }}>
        <Card.Title className="fs-1" style={{ textTransform: "none" }}>
          Introduction
        </Card.Title>
        <Card.Text>
          This tutorial will help you to use Face Decetion App in minutes.
        </Card.Text>
        <Card.Text>The tutorial assumes that you have:</Card.Text>
        <ListGroup>
          <ListGroup.Item>Free 0xDetect Account</ListGroup.Item>
          <ListGroup.Item>Good Internet Connection</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default IntroductionDoc;
