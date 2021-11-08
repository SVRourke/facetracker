// triangulation metrics
export const TRIANGLUATION = [];
// draw triangle

// draw points
export const drawMesh = (predictions, ctx) => {
  const pointNames = [
    "midwayBetweenEyes",
    "leftEyeLower0",
    "leftCheek",
    "rightCheek",
    "noseTip",
    "noseBottom",
    "noseLeftCorner",
    "noseRightCorner",
  ];
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const keypoints = prediction.annotations;

      pointNames.forEach((location) => {
        console.log(
          location,
          keypoints[location][0][0],
          keypoints[location][0][1]
        );
        const x = keypoints[location][0][0];
        const y = keypoints[location][0][1];

        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 3 * Math.PI);
        ctx.fillStyle = "aqua";
        ctx.fill();
      });
    });
  }
};
// export const drawMesh = (predictions, ctx) => {
//   if (predictions.length > 0) {
//     predictions.forEach((prediction) => {
//       const keypoints = prediction.scaledMesh;

//       for (let i = 0; i < keypoints.length; i++) {
//         const x = keypoints[i][0];
//         const y = keypoints[i][1];
//         ctx.beginPath();
//         ctx.arc(x, y, 1, 0, 3 * Math.PI);
//         ctx.fillStyle = "aqua";
//         ctx.fill();
//       }
//     });
//   }
// };

// midwayBetweenEyes
// leftEyeLower0
// leftCheek
// rightCheek
// noseTip
// noseBottom
// noseLeftCorner
// noseRightCorner

// leftEyeLower1
// leftEyeLower2
// leftEyeLower3
// leftEyeUpper0
// leftEyeUpper1
// leftEyeUpper2
// leftEyebrowLower
// leftEyebrowUpper
// lipsLowerInner
// lipsLowerOuter
// lipsUpperInner
// lipsUpperOuter
// rightEyeLower0
// rightEyeLower1
// rightEyeLower2
// rightEyeLower3
// rightEyeUpper0
// rightEyeUpper1
// rightEyeUpper2
// rightEyebrowLower
// rightEyebrowUpper
// silhouette
