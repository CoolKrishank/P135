let objectDetector;
let status = "Initializing";
let video;
let objects = [];

function setup() {
  createCanvas(480, 380);
  video = createCapture(VIDEO);
  video.size(480, 380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status: " + status;
}

function draw() {
  image(video, 0, 0, 480, 380);
  if (status === "Object Detection in Progress") {
    objectDetector.detect(video, gotResult);
  }

  for (let i = 0; i < objects.length; i++) {
    fill("#00E4FF");
    let percent = nf(objects[i].confidence * 100, 2, 2);
    text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 15);
    noFill();
    stroke("#00E4FF");
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
  }

  // Update status and number of objects detected outside the loop
  document.getElementById("status").innerHTML = "Status: " + status;
  document.getElementById("number_of_objects_detected").innerHTML = "Number of objects detected: " + objects.length;
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    status = "Error: Object Detection Failed";
  } else {
    objects = results;
    status = "Object Detected";
  }
}

function startObjectDetection() {
  status = "Object Detection in Progress";
}

function modelLoaded() {
  console.log("Model Loaded!");
  status = "Model Loaded";
}
