status="";
video="";
value="";

function preload(){

}

function setup(){
    canvas=createCanvas(480,320);
    canvas.center();
    video.hide();
    video.size()
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    document.getElementById("found").value;
}

function modelLoaded(){
    console.log("Model is Loaded😱");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw(){
    image(video,0,0,480,320);
}