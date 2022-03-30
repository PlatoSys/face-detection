import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  const footer = useRef();

  // useEffect(() => {
  //   let rect = footer.current.getBoundingClientRect();
  //   console.log(window.innerHeight, rect.y);
  //   if (rect.y < 600) {
  //     footer.current.style.marginTop = `${window.innerHeight - rect.y}px`;
  //   }
  // }, []);

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
