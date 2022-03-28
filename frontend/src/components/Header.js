import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Header() {

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand href="/">0xDETECT</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to="/">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Home
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/live">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Live
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/about">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> About
                </Nav.Link>
              </LinkContainer>

            </Nav>
          </Navbar.Collapse>
          <LinkContainer to="/register" style={{marginRight: "20px"}}>
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Register
                </Nav.Link>
          </LinkContainer>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;