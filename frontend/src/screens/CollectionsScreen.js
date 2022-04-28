import axios from "axios";
import Loader from "../components/Loader";
import Filter from "../components/Filter";
import React, { useContext, useEffect, useState } from "react";
import { AuthTokenContext, UserDataContext } from "../store";
import { useNavigate } from "react-router-dom";
import { Button, Row, Card } from "react-bootstrap";
import { saveAs } from "file-saver";

function CollectionsScreen() {
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserDataContext);
  const [authToken, setAuthToken] = useContext(AuthTokenContext);
  const [loader, setLoader] = useState(false);
  const [collection, setCollection] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
      ImageType: typeFilter,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    },
  };

  useEffect(() => {
    if (!userData) {
      navigate(`/login`);
    } else {
      setLoader(true);
      axios
        .get("/api/collections/", config)
        .then((response) => {
          setCollection(response.data);
          setLoader(false);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setUserData();
            setAuthToken();
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
          }
        });
    }
  }, [navigate, setAuthToken, setUserData, userData, authToken, typeFilter]);

  const downloadImage = (name, url) => {
    saveAs(url, name);
  };

  const downloadAllProcessedImage = () => {
    collection.forEach((element) => {
      downloadImage(element.filename, element.processedImage);
    });
  };

  const deleteAllImages = () => {
    const deleteConfirm = window.confirm(`Delete ${typeFilter} Images?`)
    if (deleteConfirm) {
      axios.delete("/api/collections/", config).then(() => {
        setCollection([]);
      });
    }
  };

  const deleteImage = (id, filename) => {
    const deleteConfirm = window.confirm(`Delete ${filename}?`)
    if (deleteConfirm) {
      axios.delete(`/api/collections/${id}`, config).then(() => {
        const filtered = collection.filter((x) => x.id !== id);
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <Filter typeFilter={typeFilter} setTypeFilter={setTypeFilter} />
            </div>
          </div>
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
                <Card.Img variant="top" src={`${x.processedImage}`} />
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
                    onClick={() => downloadImage(x.filename, x.processedImage)}
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
