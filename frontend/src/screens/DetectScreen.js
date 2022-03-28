import React, { useState } from "react";
import { Form, Button, Row, Card } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import axios from "axios";
import { AuthTokenContext } from "../store";
import { useContext } from "react";

function DetectScreen() {
  const [image, setImage] = useState("");
  const [imagesCount, setImagesCount] = useState(1);
  const [uploadImages, setUploadImages] = useState([]);
  const [authToken] = useContext(AuthTokenContext);
  const [processedImages, setProcessedImages] = useState([]);
  const [loader, setLoader] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    uploadImages.forEach((element) => {
      formData.append(element.name, element);
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: authToken,
      },
    };
    setLoader(true);
    axios.post("/api/detect/", formData, config).then((response) => {
      setProcessedImages(response.data);
      setLoader(false);
    });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    setUploadImages(uploadImages.concat([file]));
    setImagesCount(imagesCount + 1);
  };

  const resetHandler = (e) => {
    setImagesCount(1);
    setProcessedImages([]);
    setUploadImages([]);
  };

  return (
    <div>
      {processedImages.length === 0 ? (
        <h1>Upload Images</h1>
      ) : (
        <div>
          <Button style={{ marginBottom: "15px" }} onClick={resetHandler}>
            Reset
          </Button>
          <Message variant="success">Images has Been Processed</Message>
        </div>
      )}

      {loader ? (
        <Loader />
      ) : processedImages.length !== 0 ? (
        <div>
          {processedImages.map((x) => (
            <Row key={x.original} style={{ marginBottom: "15px" }}>
              <Card style={{ width: "50%" }}>
                <Card.Img variant="top" src={`media/${x.original}`} fluid />
                <Card.Body
                  className="d-flex justify-content-between"
                  style={{ alignItems: "center" }}
                >
                  <Card.Title>Processed Image</Card.Title>
                  <Button>Download</Button>
                </Card.Body>
              </Card>
              <Card style={{ width: "50%" }}>
                <Card.Img variant="top" src={`media/${x.processed}`} fluid />
                <Card.Body
                  className="d-flex justify-content-between"
                  style={{ alignItems: "center" }}
                >
                  <Card.Title>Processed Image</Card.Title>
                  <Button>Download</Button>
                </Card.Body>
              </Card>
            </Row>
          ))}{" "}
        </div>
      ) : (
        <Form onSubmit={submitHandler}>
          {[...Array(imagesCount).keys()].map((x) => (
            <Form.Group key={x} controlId="image" className="my-2">
              <Form.Control
                type="hidden"
                placeholder="Enter Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Group controlId="image" className="mb-3">
                <Form.Control
                  type="file"
                  placeholder="Enter Image"
                  onChange={(e) => uploadFileHandler(e)}
                />
              </Form.Group>
            </Form.Group>
          ))}

          <Button type="submit" variant="primary" className="my-2">
            Upload
          </Button>
        </Form>
      )}
    </div>
  );
}

export default DetectScreen;
