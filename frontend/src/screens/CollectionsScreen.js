import axios from "axios";
import Loader from "../components/Loader";
import Filter from "../components/Filter";
import React, { useContext, useEffect, useState } from "react";
import { AuthTokenContext, UserDataContext } from "../store";
import { useNavigate } from "react-router-dom";
import { Button, Row, Card } from "react-bootstrap";
import { saveAs } from "file-saver";
import { CSVLink } from "react-csv";

function CollectionsScreen() {
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserDataContext);
  const [authToken, setAuthToken] = useContext(AuthTokenContext);
  const [loader, setLoader] = useState(false);
  const [collection, setCollection] = useState([]);
  const [csvCollection, setCsvCollection] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [activeFaces, setActiveFaces] = useState([]);

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
          console.log(response.data)
          setCollection(response.data);
          setLoader(false);
          csvFormatter(response.data);
          loadFaceDetails(response.data);
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

  const loadFaceDetails = (data) => {
      let activeFacesCopy = []
      data.forEach((element) => {
          activeFacesCopy.push({
                id:element.id, ...element.landmarks[0]})
      });
      setActiveFaces(activeFacesCopy);
  }

  const csvFormatter = (data) => {
    const copy = JSON.parse(JSON.stringify(data));
    copy.forEach(element => {
        delete element.landmarks;
        element.user = userData.email;
    });
    setCsvCollection(copy);
}

  const downloadImage = (name, url) => {
    saveAs(url, name);
  };

  const downloadAllProcessedImage = () => {
    collection.forEach((element) => {
      downloadImage(element.filename, element.processedImage);
    });
  };

  const deleteAllImages = () => {
    const deleteConfirm = window.confirm(`Delete ${typeFilter} Images?`);
    if (deleteConfirm) {
      axios.delete("/api/collections/", config).then(() => {
        setCollection([]);
      });
    }
  };

  const deleteImage = (id, filename) => {
    const deleteConfirm = window.confirm(`Delete ${filename}?`);
    if (deleteConfirm) {
      axios.delete(`/api/collections/${id}`, config).then(() => {
        const filtered = collection.filter((x) => x.id !== id);
        setCollection(filtered);
      });
    }
  };

  const catchAspectRatio = (landmark, imageId, origWidth, origHeight) => {
    let img = document.getElementById(imageId);
    if (img){
      const aspectRatio = origWidth / origHeight
      const imgWidth = img.width;
      const imgHeight = img.width / aspectRatio;

      const widthAspectRatio = origWidth / imgWidth;
      const heightAspectRatio = origHeight / imgHeight;
      const resizedWidth = landmark.box.width / widthAspectRatio;
      const resizedHeight = landmark.box.height / heightAspectRatio
      
      const xPosition = (landmark.box.x / widthAspectRatio)
      const yPosition = landmark.box.y / heightAspectRatio

      let color = "";
      if (Object.keys(activeFaces).length !== 0){
        const activeFace = activeFaces.find(f => f.id === imageId)
        if (landmark.face_id === activeFace.face_id){
          color = 'white'
        }
      }

      return {
        width: `${resizedWidth}px`,
        height: `${resizedHeight}px`,
        top: `${yPosition}px`,
        left: `${xPosition}px`,
        opacity: "0.2",
        backgroundColor: color,
        border: "1px solid white",
        position: "absolute",
        cursor: "pointer"
      }
    }
  }

  const changeFace = (face, index) => {
    const data = {id: face.id, ...face.landmarks[index]}
    setActiveFaces([
      data,
      ...activeFaces.filter(f => f.id !== face.id)
    ])
  }


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
                className="btn btn-outline-info"
                style={{ marginBottom: "15px", marginLeft: "10px" }}
              >
                <CSVLink
                  style={{ textDecoration: "none", color: "inherit" }}
                  filename={`${new Date()}.csv`}
                  data={csvCollection}
                >
                  Download CSV
                </CSVLink>
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
          {collection.map((x, index) => (
            <Row key={x.filename} style={{ marginBottom: "15px" }}>

              <Card style={{ width: "60%", padding: 0 }}>
              <Card.Img variant="top" id={x.id} src={`${x.processedImage}`} />
                  {
                    x.landmarks.map((landmark, index) => (
                      <div onClick={() => changeFace(x, index)} key={landmark.box.x} style={catchAspectRatio(landmark, x.id, x.width, x.height)}></div>
                    ))
                  }
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
              <Card style={{ width: "40%" }}>
                <Card.Title className="fs-1 my-2" >Face Details</Card.Title>
                <Card.Body>
                  <Card.Text className="fs-4">
                    Gender: {Object.keys(activeFaces).length !== 0 && activeFaces.find(face => face.id === x.id).gender}
                  </Card.Text>
                  <Card.Text className="fs-4">
                    Age Range: {Object.keys(activeFaces).length !== 0 && activeFaces.find(face => face.id === x.id).age}
                  </Card.Text>
                  <Card.Text>
                  </Card.Text>
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
