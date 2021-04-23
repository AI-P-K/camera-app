const canvas = document.querySelector('#canvas');
const cameraView = document.querySelector('#camera--view');
const ctx = canvas.getContext('2d');
const constraints = { video: { facingMode:{ exact: "environment" }}, audio: false };


ctx.beginPath();
ctx.lineWidth = 5;
ctx.strokeStyle = 'green';
ctx.moveTo(72,193);
ctx.lineTo(256, 195);
ctx.lineTo(255, 517);
ctx.lineTo(86,541);
ctx.closePath();
ctx.stroke();


function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function (error) {
            console.error("Oops. Caca program", error);
        });
}

window.addEventListener("load", cameraStart, false);
