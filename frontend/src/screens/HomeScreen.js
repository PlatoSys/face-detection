import React from "react";
import { Row, Col, Image, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";

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
                  <Button className="btn" variant="primary">
                    Start Detecting
                  </Button>
                </Nav.Link>
              </LinkContainer>
            </Row>
          </Col>
          <Col>
            <Image
              src={"./images/detection_boy.avif"}
              style={{ aspectRatio: "attr(width) / attr(height)" }}
              alt="face detection"
              width="640"
              height="360"
              fluid
            />
          </Col>
        </Row>
        <hr />

        <Row>
          <Col>
            <Image
              src={"./images/team.avif"}
              style={{ aspectRatio: "attr(width) / attr(height)" }}
              alt="face detection"
              width="640"
              height="360"
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
                by date. It&apos;s free of use for certain amount of data.
              </p>
            </Row>
            <Row>
              <LinkContainer to="/collections">
                <Nav.Link>
                  <Button className="btn" variant="primary">
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
                  <Button className="btn" variant="primary">
                    Start Live
                  </Button>
                </Nav.Link>
              </LinkContainer>
            </Row>
          </Col>
          <Col>
            <Image
              style={{ aspectRatio: "attr(width) / attr(height)" }}
              src={"./images/draw.avif"}
              alt="face detection"
              width="640"
              height="360"
              fluid
            />
          </Col>
        </Row>
      </div>
    </React.Suspense>
  );
}

export default HomeScreen;
