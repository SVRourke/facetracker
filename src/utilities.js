const processPredictions = (predictions) => {
  if (predictions.length > 0) {
    const {
      midwayBetweenEyes,
      noseTip,
      leftCheek,
      rightCheek,
      lipsLowerOuter,
    } = predictions[0].annotations;
    return {
      bridge: midwayBetweenEyes[0],
      left: leftCheek[0],
      right: rightCheek[0],
      center: noseTip[0],
      bottom1: lipsLowerOuter[4],
      bottom2: lipsLowerOuter[5],
    };
  }
};
// draw points
const drawPoint = (point, color, ctx) => {
  const x = point[0];
  const y = point[1];
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, 3 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

export const calculateAngles = (predictions) => {
  const { bridge, left, right, center, bottom1 } =
    processPredictions(predictions);
  return {
    pitch: segmentRatio(bridge, center, bottom1, 1) * 100,
    yaw: segmentRatio(left, center, right, 0) * 100,
    roll: slope(bridge, center),
  };
};

export const drawMesh = (predictions, ctx) => {
  if (predictions.length > 0) {
    const { scaledMesh } = predictions[0];
    drawPoint(scaledMesh[2], "aqua", ctx);
    drawPoint(scaledMesh[5], "yellow", ctx);
    
    drawPoint(scaledMesh[9], "pink", ctx);
    
    drawPoint(scaledMesh[6], "red", ctx);
  }
};

const slope = (a, b) => (b[1] - a[1]) / (b[0] - a[0]);
const distance = (a, b) => Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2);
const midpoint = (a, b) => [a[0] + b[0], a[1] + b[1]];
// might not work for left right as it relies on y not x
const segmentRatio = (a, divisor, b, pos) =>
  (a[pos] - divisor[pos]) / (divisor[pos] - b[pos]);
