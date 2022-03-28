import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col
            style={{ backgroundColor: "#1a1a1a", width: "100%", color: "#fff" }}
            className="text-center py-3"
          >
            Copyright 0xDETECT{" "}
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
