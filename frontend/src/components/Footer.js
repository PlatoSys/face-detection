import React, { useRef } from "react";
import { Col, Row } from "react-bootstrap";

function Footer() {
  const footer = useRef();

  return (
    <footer ref={footer}>
      <Row>
        <Col
          style={{ backgroundColor: "#1a1a1a", width: "100%", color: "#fff" }}
          className="text-center py-3"
        >
          Copyright 0xDETECT{" "}
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
