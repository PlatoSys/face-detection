import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { AuthTokenContext, UserDataContext } from "../store";

function DetectScreen() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [imagesCount, setImagesCount] = useState(1);
  const [uploadImages, setUploadImages] = useState([]);
  const [authToken] = useContext(AuthTokenContext);
  const [processedImages, setProcessedImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [userData] = useContext(UserDataContext);

  useEffect(() => {
    if (!userData) {
      navigate(`/login`);
    }
  }, [navigate, userData]);

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

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    setUploadImages(uploadImages.concat([file]));
    setImagesCount(imagesCount + 1);
  };

  const resetHandler = () => {
    setImagesCount(1);
    setProcessedImages([]);
    setUploadImages([]);
  };

  const downloadImage = (name, url) => {
    saveAs(url, name);
  };

  const downloadAllProcessedImage = () => {
    processedImages.forEach((element) => {
      downloadImage(element.name, element.processed);
    });
  };

  return (
    <div>
      {processedImages.length === 0 ? (
        <h1>Upload Images</h1>
      ) : (
        <div>
          <div className="d-flex">
            <Button
              style={{ marginBottom: "15px" }}
              onClick={downloadAllProcessedImage}
            >
              Download Processed Images
            </Button>
            <Button
              style={{ marginBottom: "15px", marginLeft: "15px" }}
              onClick={resetHandler}
            >
              Reset
            </Button>
          </div>

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
                <Card.Img variant="top" src={`${x.original}`} />
                <Card.Body
                  className="d-flex justify-content-between"
                  style={{ alignItems: "center" }}
                >
                  <Card.Title>Original Image</Card.Title>
                  <Button onClick={() => downloadImage(x.name, x.original)}>
                    Download
                  </Button>
                </Card.Body>
              </Card>
              <Card style={{ width: "50%" }}>
                <Card.Img variant="top" src={`${x.processed}`} />
                <Card.Body
                  className="d-flex justify-content-between"
                  style={{ alignItems: "center" }}
                >
                  <Card.Title>Processed Image</Card.Title>
                  <Button onClick={() => downloadImage(x.name, x.processed)}>
                    Download
                  </Button>
                </Card.Body>
              </Card>
            </Row>
          ))}{" "}
        </div>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="image" className="my-2">
            <Form.Control
              type="hidden"
              placeholder="Enter Image"
              value={image}
              onChange={(e) => setImage(e.target.value)} />
            <Form.Group controlId="image" className="mb-3">
              <Form.Control
                type="file"
                placeholder="Enter Image"
                onChange={(e) => uploadFileHandler(e)}
              />
            </Form.Group>
          </Form.Group>
          <div>
            {uploadImages.map((x) => (
              <Row key={x.name}>
                <p>{x.name}</p>
              </Row>
            ))}
          </div>

          <Button type="submit" variant="primary" className="my-2">
            Upload
          </Button>
        </Form>
      )}
    </div>
  );
}

export default DetectScreen;
