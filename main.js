var scoreLeftwrist = 0;
var music = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload(){
    music = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(650,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("model is loaded");
}
function gotPoses(result){
    if (result.length > 0){
        console.log(result);
        leftWristY = result[0].pose.leftWrist.y;
        leftWristX = result[0].pose.leftWrist.x;
        rightWristY = result[0].pose.rightWrist.y;
        rightWristX = result[0].pose.rightWrist.x;
        console.log("left wrist y = "+leftWristY);
        console.log("left wrist x = "+leftWristX);
        console.log("right wrist x = "+rightWristX);
        console.log("right wrist y = "+rightWristY);
        scoreLeftwrist = result[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = "+scoreLeftwrist); 
    }
}
function draw(){
    image(video,0,0,650,500);
        fill('#0000ff')
    circle(leftWristX,leftWristY,50);
    InNumberLeftWristY = Number(leftWristY);
    remover_decimal = floor(InNumberLeftWristY);
    volume = remover_decimal / 500;
    document.getElementById("volume").innerHTML = "Volume = "+volume;
    music.setVolume(volume);
    fill('green');
    circle(rightWristX,rightWristY,50);
    if (rightWristY > 0 && rightWristY <= 100)
    {
        music.rate(0.5)
        document.getElementById("speed").innerHTML = "Speed = 0.5x"
    }
    else if (rightWristY > 100 && rightWristY <= 200)
    {
        music.rate(1)
        document.getElementById("speed").innerHTML = "Speed = normal";
    }
    else if (rightWristY > 200 && rightWristY <= 300)
    {
        music.rate(1.5)
        document.getElementById("speed").innerHTML = "Speed = 1.5x"
    }
    else if (rightWristY > 300 && rightWristY <= 400)
    {
        music.rate(2)
        document.getElementById("speed").innerHTML = "Speed = 2x";
    }
    else if (rightWristY > 400 && rightWristY <= 500)
    {
        music.rate(2.5)
        document.getElementById("speed").innerHTML = "Speed = 2.5x"
    }
}
function PlaySong(){
    music.play();
    music.setVolume(0.7);//the range for volume is between 0.1 to 1, 0.1 being the lowest and 1 is full volume
    music.rate(1);//the range of the rate is 0.5 - very slow, 1-normal, 1.5 - little fast, 2 - twice fast, 2.5 - very fast
}
function stopSong(){
    music.stop();
}