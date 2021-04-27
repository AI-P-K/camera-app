const cameraSensor = document.querySelector('#canvas');
const cameraView = document.querySelector('#camera--view');
const cameraOutput = document.querySelector("#camera--output");
const cameraTrigger = document.querySelector("#camera--trigger");

const ctx = cameraSensor.getContext('2d');
const constraints = { video: { facingMode: {exact:"environment"} }, audio: false };

function calculateCoordinates(screenHeight, screenWidth) {
    // Lets say that screen (0,0) is at top left hand side of the screen
    // I started with a fresh photo where the L=432 and l=357 so ratio of 1.21
    var ratio1 = 432/357;
    // Width in perpective of 250 so aspect ratio of 0.57
    var aspectRatio = 250/432

    // Lets start at 10% from the edges P1 and P2 define the first line, parallel to the longest edge of the screen (camera)
    var x1 = screenHeight * 0.2;
    var y1 = screenWidth * 0.2;

    var x2 = screenHeight * 0.2;
    var y2 = screenWidth * 0.8;

    var realP1P2length = y2-y1;
    var realP3P4length = realP1P2length / ratio1;
    var scalingFactor2original = realP1P2length / 432;

    // P3 lower right corner
    var x3 = x2 + (aspectRatio * realP1P2length);
    var y3 = y2 - ((realP1P2length-realP3P4length)/2);

    // P4 upper right corner
    var x4 = x3;
    var y4 = y1 + ((realP1P2length-realP3P4length)/2);

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'green';
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4,y4);
    ctx.closePath();
    ctx.stroke();
}
calculateCoordinates(screen.width, screen.height)

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
