import React, { useState } from "react";
import { Col, Row, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import BaseDoc from "../components/DocumentationComponents/BaseDoc";
import IntroductionDoc from "../components/DocumentationComponents/IntroductionDoc";
import PrepareAppDoc from "../components/DocumentationComponents/PrepareAppDoc";
import SetupDoc from "../components/DocumentationComponents/SetupDoc";

function DocumentationScreen() {
  const [activeComponent, setActiveComponent] = useState(<IntroductionDoc />);
  const [activeText, setActiveText] = useState("Introduction");

  const [menu] = useState([
    {
      text: "Introduction",
      component: <IntroductionDoc />,
    },
    {
      text: "Set Up",
      component: <SetupDoc />,
    },
    {
      text: "Prepare/Use the app",
      component: <PrepareAppDoc />,
    },
  ]);

  const setActiveData = (text, component) => {
    setActiveText(text);
    setActiveComponent(component);
  };

  return (
    <div>
      <Row>
        <Col xs={5} md={2}>
          {menu.map((x) => (
            <Row
              key={x.text}
              style={{ marginTop: "5px" }}
              className={
                x.text === activeText
                  ? "docMenuUnderlineBlack"
                  : "docMenuUnderlineLight"
              }
            >
              <LinkContainer to={``}>
                <Nav.Link onClick={() => setActiveData(x.text, x.component)}>
                  {`${x.text}`}
                </Nav.Link>
              </LinkContainer>
            </Row>
          ))}
        </Col>
        <Col>
          <BaseDoc>{activeComponent}</BaseDoc>
        </Col>
      </Row>
    </div>
  );
}

export default DocumentationScreen;
