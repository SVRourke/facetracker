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
const drawPoint = (point, ctx) => {
  const x = point[0];
  const y = point[1];
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, 3 * Math.PI);
  ctx.fillStyle = "aqua";
  ctx.fill();
};
export const drawMesh = (predictions, ctx) => {
  if (predictions.length > 0) {
    const { bridge, left, right, center, bottom1, bottom2 } =
      processPredictions(predictions);
    const midlip = midpoint(bottom1, bottom2);
    // console.log(distance(bridge, center), midlip);
    console.log(segmentRatio(left, center, right));

    drawPoint(bridge, ctx);
    drawPoint(left, ctx);
    drawPoint(right, ctx);
    drawPoint(center, ctx);
    drawPoint(bottom1, ctx);
    drawPoint(midlip, ctx);
    drawPoint(bottom2, ctx);
  }
};

const slope = (a, b) => (b[1] - a[1]) / (b[0] - a[0]);
const distance = (a, b) => Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2);
const midpoint = (a, b) => [a[0] + b[0], a[1] + b[1]];

const segmentRatio = (a, divisor, b) =>
  (a[1] - divisor[1]) / (divisor[1] - b[1]);
