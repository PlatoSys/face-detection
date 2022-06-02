import React from "react";
import { Card } from "react-bootstrap";

function PrepareAppDoc() {
  return (
    <Card style={{ border: "none", marginLeft: "25px" }}>
      <Card.Body style={{ padding: 0 }}>
        <Card.Title className="fs-1" style={{ textTransform: "none" }}>
          Prepare the app
        </Card.Title>
        <Card.Text>
          Now Let's see different language examples of using API.
        </Card.Text>
        <Card.Text className="fs-2">HTML snippet</Card.Text>
        <div style={{ backgroundColor: "rgb(120, 120, 120)", padding: "20px" }}>
          <code style={{ color: "#ffffff" }}>
            <div>{`<html>`}</div>
            <div>&#160;&#160;{`<head>`}</div>
            <div>&#160;&#160;&#160;&#160;{`<title>Sampla API</title>`}</div>
            <div>&#160;&#160;&#160;&#160;{`<meta charset="utf-8" />`}</div>
            <div>
              &#160;&#160;&#160;&#160;
              {`<meta http-equiv="Content-type" content="text/html; charset=utf-8" />`}
            </div>
            <div>
              &#160;&#160;&#160;&#160;
              {`<meta name="viewport" content="width=device-width, initial-scale=1" />`}
            </div>
            <div>&#160;&#160;&#160;&#160;{`<styla type="text/css">`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;{`.images-div {`}</div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
              {`display: flex;`}
            </div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;{`}`}</div>
            <div>&#160;&#160;&#160;&#160;{`</style>`}</div>
            <div>&#160;&#160;&#160;&#160;{`<link`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;{`rel="stylesheet"`}</div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;
              {`href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"`}
            </div>
            <div>&#160;&#160;&#160;&#160;{`/>`}</div>
            <div>&#160;&#160;{`</head>`}</div>
            <div>&#160;&#160;{`<body>`}</div>
            <div>&#160;&#160;&#160;&#160;{`<div class="container">`}</div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;
              {`<div class="mb-3 my-5">`}
            </div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
              {`<label for="formFileLg" class="form-label">Upload File</label>`}
            </div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`<input`}
            </div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
              {`class="form-control form-control-lg"`}
            </div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
              {`id="fileupload"`}
            </div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
              {`type="file"`}
            </div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`/>`}</div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`<button`}
            </div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
              {`type="button"`}
            </div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
              {`onclick="APIRequest()"`}
            </div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
              {`class="btn btn-primara my-2"`}
            </div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`>`}</div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
              {`Process`}
            </div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`</button>`}
            </div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;{`</div>`}</div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;
              {`<div class="images-div">`}
            </div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
              {`<img id="before" width="50%" />`}
            </div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
              {`<img id="after" width="50%" />`}
            </div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;{`</div>`}</div>
            <div>&#160;&#160;&#160;&#160;{`</div>`}</div>
            <div>
              &#160;&#160;&#160;&#160;{`<script src="app.js"></script>`}
            </div>
            <div>&#160;&#160;{`</body>`}</div>
            <div>{`</html>`}</div>
          </code>
        </div>
        <hr />
        <Card.Text className="fs-2">JavaScript snippet</Card.Text>
        <div style={{ backgroundColor: "rgb(120, 120, 120)", padding: "20px" }}>
          <code style={{ color: "#ffffff" }}>
            <div>{`const authToken=null`}</div>
            <div>{`const beforeImage = document.querySelector('#before');`}</div>
            <div>{`const afterImage = document.querySelector('#after');`}</div>
            <div>{``}</div>
            <div>{`async function APIRequest() {`}</div>
            <div>
              &#160;&#160;&#160;&#160;
              {`let formData = new FormData();`}
            </div>
            <div>
              &#160;&#160;&#160;&#160;
              {`formData.append("filllename", fileupload.files[0]);`}
            </div>
            Text
            <div>{``}</div>
            <div>
              &#160;&#160;&#160;&#160;
              {`await fetch('https://face-detection-backend-app.herokuapp.com/api/detect/', {`}
            </div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;{`method: "POST", `}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;{`body: formData,`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;{`headers: {`}</div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
              {`"Authorization": authToken,`}
            </div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;{`},`}</div>
            <div>&#160;&#160;&#160;&#160;{`})`}</div>
            <div>&#160;&#160;&#160;&#160;{`.then(resp => resp.json())`}</div>
            <div>&#160;&#160;&#160;&#160;{`.then(data => {`}</div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;{`const image = data[0];`}
            </div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;{`console.log(image)`}
            </div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;
              {`beforeImage.src = image.original;`}
            </div>
            <div>
              &#160;&#160;&#160;&#160;&#160;&#160;
              {`afterImage.src = image.processed;`}
            </div>
            <div>{``}</div>
            <div>&#160;&#160;&#160;&#160;{`})`}</div>
            <div>{``}</div>
            <div>{`}`}</div>
          </code>
        </div>
        <hr />
        <Card.Text className="fs-2">Response Example</Card.Text>
        <div style={{ backgroundColor: "rgb(120, 120, 120)", padding: "20px" }}>
          <code style={{ color: "#ffffff" }}>
            <div>{`[`}</div>
            <div>&#160;&#160;&#160;&#160;{`{`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"name": "FILENAME",`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"original": "URL_OF_ORIGINAL_IMAGE",`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"processed": "URL_TO_PROCESSED_IMAGE",`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"landmarks": [`}</div>

            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`{`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"box": {`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"x": 247,`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"y": 193,`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"width": 545,`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"height": 734`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`},`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"landmarks": {`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"left_eye": {`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"x": 386,`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"y": 481`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`},`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"right_eye": {`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"x": 639,`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"y": 484`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`},`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"mouth_left": {`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"x": 385,`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"y": 723`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`},`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"mouth_right": {`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"x": 630,`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"y": 735`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`},`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"nose": {`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"x": 498,`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`"y": 628`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`}`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`}`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`}`}</div>
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;{`]`}</div>
            <div>&#160;&#160;&#160;&#160;{`},`}</div>
            <div>&#160;&#160;{`]`}</div>
          </code>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PrepareAppDoc;
