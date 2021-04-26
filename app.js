const cameraSensor = document.querySelector('#canvas');
const cameraView = document.querySelector('#camera--view');
const cameraOutput = document.querySelector("#camera--output");
const cameraTrigger = document.querySelector("#camera--trigger");

const ctx = cameraSensor.getContext('2d');
const constraints = { video: { facingMode: {exact:"environment"} }, audio: false };

ctx.beginPath();
ctx.lineWidth = 5;
ctx.strokeStyle = 'green';
ctx.moveTo(52,53);
ctx.lineTo(335, 100);
ctx.lineTo(327, 498);
ctx.lineTo(52,536);
ctx.closePath();
ctx.stroke();

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

cameraTrigger.onclick= e =>{
    takeASnap()
        .then(download)
};

function takeASnap(){
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    ctx.drawImage(cameraView, 0,0);
    return new Promise((res, rej)=>{
        cameraSensor.toBlob(res, 'image/jpeg');
    });
}

function download(blob){
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'screenshot.jpg';
    document.body.appendChild(a);
    a.click();
}

window.addEventListener("load", cameraStart, false);
