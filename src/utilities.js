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
    console.log(bridge, left, right, center, bottom1, bottom2);
    drawPoint(bridge, ctx);
    drawPoint(left, ctx);
    drawPoint(right, ctx);
    drawPoint(center, ctx);
    drawPoint(bottom1, ctx);
    drawPoint(bottom2, ctx);
  }
};
