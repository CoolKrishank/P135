objects = [];
objectDetector = "";
status = "";
video = "";
function setup()
{
    canvas = createCanvas(480 , 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}
function draw()
{
    image(video , 0 , 0 , 480 , 380);
    if (status !="")
    {
        objectDetector.detect(video , gotResult);
        for(var i=0; i < objects.length ; i++)
        {
            document.getElementById("status").innerHTML = "Status : Person Detected";
            document.getElementById("number_of_objects_detected").innerHTML = "Number of objects detected are : "+ objects.length;

            fill("#00E4FF");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15 );
            noFill();
            stroke("#00E4FF");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}
function gotResult(error , results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Objects Detected";
}
function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}
