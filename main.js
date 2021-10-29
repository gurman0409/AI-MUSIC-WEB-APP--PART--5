scoreLeftWrist = 0;
scoreRightWrist = 0;
song = "";
song2 = "";
left_wrist_y = 0;
left_wrist_x = 0;
right_wrist_x = 0;
right_wrist_y = 0;

function setup()
{
    canvas = createCanvas(450,450);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(450,450);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);
}

function modelLoaded() {
    console.log('modelLoaded');
}

function gotposes(results)
{
  if (results.length>0)
  {
      scoreLeftWrist = results[0].pose.keypoints[9].score;
      console.log(scoreLeftWrist);
      scoreRightWrist = results[0].pose.keypoints[10].score;
      console.log(scoreRightWrist);
      console.log(results);
      left_wrist_x = results[0].pose.leftWrist.x;
      left_wrist_y = results[0].pose.leftWrist.y;
      console.log("left_wrist_x = " + left_wrist_x + "left_wrist_y = " + left_wrist_y);

      right_wrist_x = results[0].pose.rightWrist.x;
      right_wrist_y = results[0].pose.rightWrist.y;
      console.log("right_wrist_x = " + right_wrist_x + "right_wrist_y = " + right_wrist_y);
      console.log
  }
}

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function draw()
{
    image(video,0,0,450,450);
    fill(62, 103, 207);
    stroke(255, 255, 255);
if ( scoreLeftWrist > 0.2)
{
    circle(left_wrist_x,left_wrist_y,20);
    song2.stop();

    if ( song1.isPlaying() == false )
    {
        song1.play();
        document.getElementById("song_name").innerHTML = "Song playing: Harry poter song";  
    }
 }

 if ( scoreRightWrist > 0.2)
{
    circle(right_wrist_x,right_wrist_y,20);
    song1.stop();

    if ( song2.isPlaying() == false )
    {
        song2.play();
        document.getElementById("song_name").innerHTML = "Song playing: peter pan song";  
    }
 }

}
