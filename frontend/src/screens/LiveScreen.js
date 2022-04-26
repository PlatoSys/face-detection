import React, { useContext, useState } from "react";
import Webcam from "react-webcam";
import { Button, Image } from "react-bootstrap";
import axios from "axios";
import { AuthTokenContext } from "../store";
import Loader from "../components/Loader";

function LiveScreen() {
  const [authToken] = useContext(AuthTokenContext);
  const [processedImage, setProcessedImage] = useState("");
  const [loader, setLoader] = useState(false);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    const formData = new FormData();
    formData.append("live_image", imageSrc);
    formData.append("filename", "live.jpg");

    setLoader(true);
    setProcessedImage("");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: authToken,
      },
    };
    axios.post("/api/detect/", formData, config).then((response) => {
      setProcessedImage(response.data.processed);
      setLoader(false);
    });
  }, [webcamRef, authToken]);

  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <div
        style={{ margin: "10px", display: "flex", justifyContent: "center" }}
      >
        <Button onClick={capture}>Capture photo</Button>
      </div>
      {loader && <Loader />}
      {processedImage && <Image src={processedImage} alt="face detection" />}
    </>
  );
}

export default LiveScreen;
