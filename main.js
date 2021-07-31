song=""

var right_wrist_confidence=0
var left_wrist_confidence=0

right_wrist_x=0
right_wrist_y=0


left_wrist_x=0
left_wrist_y=0

function preload(){
song = loadSound("music.mp3")
}
function setup(){
    canvas = createCanvas(600,500)
    canvas.position(470,250)
    video= createCapture(VIDEO)
    video.hide()
    posenet = ml5.poseNet(video,modelLoaded)
    posenet.on('pose',gotPoses)
}
function modelLoaded(){
    console.log("model loaded")
}
function gotPoses(results){
    if (results.length>0){
        console.log(results)
        right_wrist_confidence = results[0].pose.keypoints[10].score
        left_wrist_confidence = results[0].pose.keypoints[9].score


        right_wrist_x = results[0].pose.rightWrist.x
        right_wrist_y = results[0].pose.rightWrist.y

        left_wrist_x = results[0].pose.leftWrist.x
        left_wrist_y = results[0].pose.leftWrist.y

        console.log(right_wrist_x,right_wrist_y)
        console.log(left_wrist_x,left_wrist_y)
        console.log(right_wrist_confidence)
        console.log(left_wrist_confidence)
    }
}
function draw(){
    image(video,0,0,600,500)
    stroke("red")
    fill("red")

    circle(right_wrist_x, right_wrist_y, 25);
    circle(left_wrist_x, left_wrist_y, 25);

    if(left_wrist_confidence>0.02){
        volumenumber = Number(left_wrist_y)
        volumefloored = floor(volumenumber)
        volume = volumefloored/500
        document.getElementById("volumedisk").innerHTML = "volume:"+volume+""
        song.setVolume(volume)
    }
    if(right_wrist_confidence>0.02){
        if(right_wrist_y>20){
        song.rate(1)
        document.getElementById("speeddisk").innerHTML = "speed:"+ 1 +"X"
        }else(right_wrist_y)
    }
}
function play(){
    song.play()
    song.setVolume(1.5)
    song.rate(1)
}
