import React, { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { UserDataContext, AuthTokenContext } from "../store";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const [userData, setUserData] = useContext(UserDataContext);
  const [_, setAuthToken] = useContext(AuthTokenContext);

  const logoutHandler = () => {
    setAuthToken();
    setUserData();
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    navigate("/");
  };

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
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/detect">
                <Nav.Link>Detect</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/collections">
                <Nav.Link>Collections</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/live">
                <Nav.Link>Live</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/documentation">
                <Nav.Link>Documentation</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
          {userData ? (
            <NavDropdown title={userData.email} id="user">
              <LinkContainer to="/account">
                <NavDropdown.Item>Account</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          )}
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
