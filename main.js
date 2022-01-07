status="";
objects=[];

function preload(){

}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("ostatus").innerHTML="Status: Detecting Objects";
    object_name=document.getElementById("input_object_name").value;
}

function modelLoaded(){
    console.log("Model is Loaded😱");
    status=true;
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(video,0,0,480,320);
    if(status !=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("ostatus").innerHTML="Status: Detecting Objects";
            document.getElementById("found").innerHTML="Number of objects are💀💀: "+objects.length;
            noFill("#FF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+" % ",objects[i].x+15,objects[i].y+15);
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label==object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("ostatus").innerHTML=object_name+" found ";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name+" found ");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("ostatus").innerHTML="Not found";
            }
        }
    }
}