import React, { useRef } from "react";
import Webcam from "react-webcam";

import "./App.css";

import { runFacemesh } from "./face";

function App() {
  // define references
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  runFacemesh(webcamRef, canvasRef);

  return (
    <div className="App">
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
}
export default App;
