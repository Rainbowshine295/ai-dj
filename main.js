song = "";

scoreLeftWrist = 0;


leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload() {
    song  = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function setup() {
    canvas = createCanvas(600, 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("poseNet is initialized! :)");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("score left wrist  = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x = " + leftWristX + " Left wrist y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist x = " + rightWristX + " Right wrist y = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 450);

    fill("#42f587");
    stroke("#42b3f5");

    if (scoreLeftWrist > 0.2) {

    circle(leftWristX , leftWristY, 20 );

    numberLeftWristY = Number(leftWristY);
    remove_decimal = floor(numberLeftWristY);

    volume = remove_decimal/450;
    document.getElementById("volume").innerHTML = "Volume: " + volume;
    song.setVolume(volume);
    }
}