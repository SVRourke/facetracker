const processPredictions = (predictions) => {
  if (predictions.length > 0) {
    const { scaledMesh } = predictions[0];
    return {
      top: scaledMesh[9],
      center: scaledMesh[6],
      bottom: scaledMesh[5],
      right: scaledMesh[22],
      left: scaledMesh[253],
    };
  }
};

const calculateHypotenuse = (a, b, height) =>
  Math.sqrt(distance(a, b) ** 2 + height ** 2);

// const simulateTriangle = ()

// find opposite and hypotenuse
// find arcsin of x

export const calculateAngles = (predictions) => {
  const { top, center, bottom, right, left } = processPredictions(predictions);
  const yaw = segmentRatio(left, center, right, 0);
  const pitch = segmentRatio(top, center, bottom, 1);
  // const roll = "not calculated";
  const roll = slope(top, bottom);

  console.log(`yaw: ${yaw}, pitch: ${pitch}, roll: ${roll}`);
};

const slope = (a, b) => (b[1] - a[1]) / (b[0] - a[0]);
const distance = (a, b) => Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2);
const midpoint = (a, b) => [a[0] + b[0], a[1] + b[1]];
// might not work for left right as it relies on y not x
const segmentRatio = (a, divisor, b, pos) =>
  (a[pos] - divisor[pos]) / (divisor[pos] - b[pos]);

// draw points
const drawPoint = (point, color, ctx) => {
  const x = point[0];
  const y = point[1];
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, 3 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

export const drawMesh = (predictions, ctx) => {
  if (predictions.length > 0) {
    const { scaledMesh } = predictions[0];
    drawPoint(scaledMesh[6], "red", ctx);
    // between eyes 9
    drawPoint(scaledMesh[9], "red", ctx);
    // bottom nose 5
    drawPoint(scaledMesh[5], "red", ctx);

    // bottom middle right eye 22
    drawPoint(scaledMesh[22], "red", ctx);
    // bottom middle left eye 253 or 254
    drawPoint(scaledMesh[253], "red", ctx);

    // right / left cheekbone 34
    drawPoint(scaledMesh[253], "red", ctx);
    // drawPoint(scaledMesh[264], "red", ctx);
  }
};
