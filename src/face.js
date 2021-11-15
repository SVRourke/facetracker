import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import { drawMesh, calculateAngles } from "./utilities";

export const runFacemesh = async (webcamRef, canvasRef) => {
  const net = await facemesh.load({
    inputResolution: { width: 640, height: 480, scale: 0.8 },
  });

  setInterval(() => {
    detect(net, webcamRef, canvasRef);
  }, 100);
};

const detect = async (net, webcamRef, canvasRef) => {
  if (
    typeof webcamRef.current !== "undefined" &&
    webcamRef.current !== null &&
    webcamRef.current.video.readyState === 4
  ) {
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set video width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
    const face = await net.estimateFaces(video, false, false, false);

    // drawing
    const ctx = canvasRef.current.getContext("2d");
    calculateAngles(face);
    drawMesh(face, ctx);
  }
};

// left-right
// use x coordinates to calculate the ratio segment ratio

// up down
// use y coordinate to calculate the ratio
