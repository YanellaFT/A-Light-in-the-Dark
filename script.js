/* VARIABLES */
let lightDiameter = 75;
let score = 0;

/* PRELOAD LOADS FILES */
function preload(){
  
}

function setup() {
  createCanvas(400,400);
  
  enterButton = new Sprite(200,300,60,30);
  enterButton.color = "#dae841"; 
  enterButton.text = "Enter";

  
    player = new Sprite(-200,-200);
    player.width = 20;
    player.height = 20;
    player.physics = "k";
    player.layer = "2";

    light = new Sprite(-200,-200);
    light.diameter = lightDiameter;
    light.color = "white";
    light.physics = "none";
    light.layer = "1";

    inspo = new Sprite(-200,-200);
    inspo.diameter = "20";
    inspo.color = "black";
    inspo.layer = "3";

    badLight = new Sprite(-200,-200);
    badLight.diameter = "25";
    badLight.color = "black";
    badLight.layer = "4";
    badLight.static = true;


  background("black");

  textSize(22);
  fill("Yellow");
  text("A Light In The Dark", 135, 100);

  textSize(18);
  fill("white");
  text("Find all the happy smiles to \nmake your light brighter. \nBut be carefull, there are dark lights \nhidden all over the room that \nwill limit your visibility again.",100,200);

  textAlign(CENTER,CENTER)

}


function draw() {

  if (enterButton.mouse.pressed()) {
    print("enter pressed");
    
    background("black");

    //move enter button
    enterButton.x = -200;
    enterButton.y = -200;
    

    //bring inspo into canvas
    inspo.x = 200;
    inspo.y = 132;

    //bring badLight into canvas
    badLight.x = 234;
    badLight.y = 320;

    //player moves towards mouse
    player.x = mouse.x;
    player.y = mouse.y;

    //light position
    light.x = player.x;
    light.y = player.y;

    //inspo visibility
    if (light.overlaps(inspo)) {
      inspo.color = "pink"; //if time permits add more colors
      print("inspo")
    } //add else statement to turn inspo to black if not overlap

    //inspo collect
    if (player.overlaps(inspo)) {
      inspo.x = random(20,400);
      inspo.y = random(30,400);
      inspo.color = "black";
      lightDiameter = lightDiameter + 25;
      light.diameter = lightDiameter;
      score = score + 1;
    };


    //badLight visibility
    if (light.overlaps(badLight)) {
      print("yes");
      setTimeout(2000); 
      badLight.x = random(20,400);
      badLight.y = random(30,400);

    }

    //if player touches badLight
    if (player.overlaps(badLight)) {
      lightDiameter = lightDiameter - 25;
      light.diameter = lightDiameter;
      score = score -1 ;
    }


    //score indicator
    fill("yellow")
    text("Inspo Collected: " + score,20,30);
    textSize(18);
  }
}


//functions
function homeScreen() {
 
}




function playScreen() {

}
