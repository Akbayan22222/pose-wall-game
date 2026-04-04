const video = document.getElementById("video");

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 640, height: 480 }
  });
  video.srcObject = stream;
}

async function init() {
  await setupCamera();

  const detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet
  );

  detect(detector);
}

async function detect(detector) {
  const poses = await detector.estimatePoses(video);

  if (poses.length > 0) {
    const keypoints = poses[0].keypoints;

    // 👉 отправляем данные в realtime
    sendPose(keypoints);
  }

  requestAnimationFrame(() => detect(detector));
}

init();
