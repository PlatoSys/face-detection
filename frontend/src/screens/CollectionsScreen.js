import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthTokenContext, UserDataContext } from "../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Row, Card } from "react-bootstrap";
import { saveAs } from "file-saver";
import Loader from "../components/Loader";

function CollectionsScreen() {
  const navigate = useNavigate();
  const [userData] = useContext(UserDataContext);
  const [authToken] = useContext(AuthTokenContext);
  const [loader, setLoader] = useState(false);
  const [collection, setCollection] = useState([]);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
  };

  useEffect(() => {
    if (!userData) {
      navigate(`/login`);
    } else {
      setLoader(true);
      axios.get("/api/collections/", config).then((response) => {
        setCollection(response.data);
        setLoader(false);
      });
    }
  }, [navigate]);

  const downloadImage = (name, url) => {
    url = `http://192.168.16.103:8000${url}`;
    saveAs(url, name);
  };

  const downloadAllProcessedImage = () => {
    collection.forEach((element) => {
      downloadImage(element.filename, element.processed_image);
    });
  };

  const deleteAllImages = () => {
    if (window.confirm("Delete All Images?")) {
      axios.delete("/api/collections/", config).then((response) => {
        setCollection([]);
      });
    }
  };

  const deleteImage = (id, filename) => {
    if (window.confirm(`Delete ${filename}?`)) {
      axios.delete(`/api/collections/${id}`, config).then((response) => {
        let filtered = collection.filter((x) => x.id !== id);
        setCollection(filtered);
      });
    }
  };

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <div>
            <Button
              type="button"
              variant="light"
              style={{ marginBottom: "15px" }}
              className="btn btn-outline-success"
              onClick={downloadAllProcessedImage}
            >
              Download Processed Images
            </Button>
            <Button
              type="button"
              variant="light"
              className="btn btn-outline-danger"
              style={{ marginBottom: "15px", marginLeft: "10px" }}
              onClick={deleteAllImages}
            >
              Delete Images
            </Button>
          </div>
          {console.log(collection)}
          {collection.map((x) => (
            <Row key={x.filename} style={{ marginBottom: "15px" }}>
              <Card style={{ width: "50%" }}>
                <Card.Img variant="top" src={`${x.image}`} />
                <Card.Body
                  className="d-flex justify-content-between"
                  style={{ alignItems: "center" }}
                >
                  <Card.Title>Original Image</Card.Title>
                  {/* <Button onClick={() => downloadImage(x.filename, x.image)}>
                Download
              </Button> */}
                </Card.Body>
              </Card>
              <Card style={{ width: "50%" }}>
                <Card.Img variant="top" src={`${x.processed_image}`} />
                <Card.Body
                  className="d-flex justify-content-between"
                  style={{ alignItems: "center" }}
                >
                  <Card.Title>Processed Image</Card.Title>
                  <Button
                    onClick={() => deleteImage(x.id, x.filename)}
                    variant="light"
                    className="btn btn-outline-danger"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="light"
                    className="btn btn-outline-success"
                    onClick={() => downloadImage(x.filename, x.processed_image)}
                  >
                    Download
                  </Button>
                </Card.Body>
              </Card>
            </Row>
          ))}
        </div>
      )}
    </div>
  );
}

export default CollectionsScreen;
