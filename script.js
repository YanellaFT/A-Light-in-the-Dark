/* VARIABLES */
let lightDiameter = 75;
let score = 0;
let enterButton;
let playAgainButton;
let player;
let light;
let badLight;
let inspo;
let inspoImg;
let badLightImg;
let happyRoomImg;
let distractorImg;
let inspoAud;
let badLightAud;
let happyRoomAud;


/* PRELOAD LOADS FILES */
function preload(){
  inspoImg = loadImage("assets/inspo.png");
  badLightImg = loadImage("assets/badLight.png");
  happyRoomImg = loadImage("assets/happyroom.png");
  distractorImg = loadImage("assets/distractor.png");

  inspoAud = loadSound("assets/inspoAud.mp3");
  badLightAud = loadSound("assets/badLightAud.mp3");
  happyRoomAud = loadSound("assets/happyRoomAud.mp3");
}

function setup() {
  createCanvas(400,400);
  
  enterButton = new Sprite(200,300,60,30);
  enterButton.color = "#dae841"; 
  enterButton.text = "Enter";

  playAgainButton = new Sprite(-200,-300,70,30);
  playAgainButton.color = "#dae841";
  playAgainButton.text = "Play Again";
  
  player = new Sprite(-200, -200);
  player.width = 20;
  player.height = 20;
  player.physics = "k";
  player.layer = "2";

  light = new Sprite(-200,-20);
  light.diameter = lightDiameter;
  light.color = "white";
  light.physics = "none";
  light.layer = "1";

  inspo = new Sprite(-200,-200);
  inspo.image = inspoImg;   
  inspo.diameter = 20;
  inspo.layer = "3";
  inspo.visible = false;

  inspoImg.width = 20;
  inspoImg.height = 20;

  badLight = new Sprite(-200,-200);
  badLight.image = badLightImg;
  badLight.diameter = 25;
  badLight.layer = "4";
  badLight.static = true;
  badLight.visible = false;

  badLightImg.width = 25;
  badLightImg.height = 25;

  distractor = new Sprite(-200,-200);
  distractor.image = distractorImg;
  distractor.diameter = 30;
  distractor.layer = "5";
  distractor.static = true;
  distractor.visibile = false;

  distractorImg.width = 30;
  distractorImg.height = 30;


  background("black");

  textAlign(CENTER,CENTER);

  textSize(22);
  fill("Yellow");
  text("A Light In The Dark", 200, 100);

  textSize(18);
  fill("white");
  text("Find all the happy smiles to \nmake your light brighter. \nBut be carefull, there are frowns \nhidden all over the room that \nwill limit your visibility again.",200,200);

}


function draw() {

  if (enterButton.mouse.pressed()) {
    print("enter pressed");
    clear();
    background("black");

    //remove enter button
    enterButton.x = -200;
    enterButton.y = -200;

    //bring inspo into canvas
    inspo.x = 200;
    inspo.y = 132;
    inspo.visible = false;

    //bring badLight into canvas
    badLight.x = 334;
    badLight.y = 320;

    //bring in distractors
    distractor.x = 150;
    distractor.y = 180;
    distractor.visible = false;
  }
  
  if (enterButton.x == -200) {
    //player moves towards mouse
    player.pos = { x: mouseX, y: mouseY};

    //light position
    light.pos = { x: player.x, y: player.y};

    playScreen();
  }

  if (score == 10) {
    clear();
    background(happyRoomImg);
    //happyRoomAud.play();

    light.pos = { x: -150, y: -100};
    player.pos = { x: -100, y: -100};
    badLight.pos = { x: -100, y: -100};
    inspo.pos = { x: -100, y: -100};
    distractor.pos = { x: -100, y: -100};

    fill("yellow");
    textSize(22);
    text("You won!", 200, 100);

    fill("black");
    textSize(18);
    text("You collected all the \nhappy smiles to make the room \nbright again, even if there \nwere frowns and other \ndistractors in the way. \nYou had hope!",200,200);

    //show playAgainButton
    playAgainButton.pos = { x: 200, y: 300};
  }

  if (playAgainButton.mouse.pressed()) {
    //reset game
    score = 0;
    lightDiameter = 75;
    light.diameter = lightDiameter;
    player.pos = { x: mouseX, y: mouseY};
    light.pos = { x: player.x, y: player.y};
    inspo.pos = { x: 200, y: 132};
    inspo.visible = false;
    badLight.pos = { x: 334, y: 320};
    badLight.visible = false;
    distractor.pos = {x: 150, y: 180};
    distractor.visible = false;

    //hide playAgainButton
    playAgainButton.pos = { x: -200, y: -200};

    clear();
    playScreen();
  }
}


//functions


function playScreen() {
  background("black");

   //inspo visibility
   if (light.overlaps(inspo))  {
     inspo.visible = true;
     print("inspo");
   } //add else statement to turn inspo to black if not overlap

  
   //inspo collect
   if (player.overlaps(inspo)) {
     inspoAud.play();
     inspo.x = random(20,400);
     inspo.y = random(30,400);
     inspo.visible = false;
     lightDiameter = lightDiameter + 25;
     light.diameter = lightDiameter;
     score = score + 1;
   };


   //badLight visibility
   if (light.overlaps(badLight)) {
     badLight.visible = true;
     print("yes");
     setTimeout(() => {
       badLight.visible = false;

       badLight.x = random(20,400);

       badLight.y = random(30,400);

     }, 3000);

   }

   //if player touches badLight
   if (player.overlaps(badLight)) {
     badLightAud.play();
     badLight.visible = false;
     lightDiameter = lightDiameter - 25;
     light.diameter = lightDiameter;
     score = score - 1;
     badLight.x = random(20,400);
     badLight.y = random(30,400);
   }

   //distractors visibility
   if (light.overlaps(distractor)) {
     distractor.visible = true;
     setTimeout(() => {
       distractor.visible = false;

       distractor.x = random(20,400);

       distractor.y = random(30,400);

     }, 3000);

   }


   //score indicator
   fill("yellow")
   text("Smiles Collected: " + score,90,30);
   textSize(18);
  }

function winScreen() {

  fill("yellow");
  textSize(22);
  text("You won!", 200, 100);

  fill("white");
  textSize(18);
  text("You collected all the \nhappy smiles to make the room \nbright again, even if there \nwere dark lights in the way. \nYou had hope!",200,200);

  //show playAgainButton
  playAgainButton.pos = { x: 200, y: 300};
}
