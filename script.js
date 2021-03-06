const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const video = document.querySelector("video");

// initalizing recorder and stream
let recorder, stream;


// function to start recording
let startRecording = async () => {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" }
  });
  recorder = new MediaRecorder(stream);

  const chunks = [];
  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = e => {
    const completeBlob = new Blob(chunks, { type: chunks[0].type });
    video.src = URL.createObjectURL(completeBlob);
  };

  recorder.start();
}

 
// event listener for start btn
startBtn.addEventListener("click", () => {
//   startBtn.setAttribute("disabled", true);
  stopBtn.removeAttribute("disabled");

  startRecording();
});


// event listener for stop btn
stopBtn.addEventListener("click", () => {
  stopBtn.setAttribute("disabled", true);
//   startBtn.removeAttribute("disabled");

  recorder.stop();
  stream.getVideoTracks()[0].stop();
});