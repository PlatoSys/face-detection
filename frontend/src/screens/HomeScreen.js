import React from "react";
import Loader from "../components/Loader";
import { Row, Col, Image, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function HomeScreen() {
  return (
    <React.Suspense fallback={<Loader />}>
      <div>
        <Row>
          <Col
            style={{
              display: "flex",
              flexDirection: "Column",
              justifyContent: "center",
            }}
          >
            <Row>
              <h1>Machine Learning</h1>
            </Row>
            <Row>
              <p>
                Open Source API for detecting and analyzing faces from media
                using Machine Learning algorithms such as Convolutional Neural
                Networks. API is capable of matching a human face from digital
                image or video frame.
              </p>
            </Row>
            <Row>
              <LinkContainer to="/detect">
                <Nav.Link>
                  <Button class="btn btn-outline-primary" variant="primary">
                    Start Detecting
                  </Button>
                </Nav.Link>
              </LinkContainer>
            </Row>
          </Col>
          <Col>
            <Image
              loading="lazy"
              src={"./images/landing_page_image.png"}
              alt="face detection"
              fluid
            />
          </Col>
        </Row>
        <hr />

        <Row>
          <Col>
            <Image
              loading="lazy"
              src={"./images/database.png"}
              alt="face detection"
              fluid
            />
          </Col>
          <Col
            style={{
              display: "flex",
              flexDirection: "Column",
              justifyContent: "center",
            }}
          >
            <Row>
              <h1>Collections</h1>
            </Row>
            <Row>
              <p>
                User is able to keep collections for future uses and filter them
                by date. It's free of use for certain amount of data.
              </p>
            </Row>
            <Row>
              <LinkContainer to="/collections">
                <Nav.Link>
                  <Button class="btn btn-outline-primary" variant="primary">
                    Check out collections
                  </Button>
                </Nav.Link>
              </LinkContainer>
            </Row>
          </Col>
        </Row>

        <hr />
        <Row>
          <Col
            style={{
              display: "flex",
              flexDirection: "Column",
              justifyContent: "center",
            }}
          >
            <Row>
              <h1>Live Function</h1>
            </Row>
            <Row>
              <p>
                Guest Users have ability to go Live and check how algorithm
                works in realtime.
              </p>
            </Row>
            <Row>
              <LinkContainer to="/live">
                <Nav.Link>
                  <Button class="btn btn-outline-primary" variant="primary">
                    Start Live
                  </Button>
                </Nav.Link>
              </LinkContainer>
            </Row>
          </Col>
          <Col>
            <Image
              loading="lazy"
              src={"./images/landing_page_image.png"}
              alt="face detection"
              fluid
            />
          </Col>
        </Row>
      </div>
    </React.Suspense>
  );
}

export default HomeScreen;
