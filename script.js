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
    inspo.diameter = "20";
    inspo.color = "black";
    inspo.layer = "3";

    badLight = new Sprite(-200,-200);
    badLight.diameter = "25";
    badLight.color = "black";
    badLight.layer = "4";
    badLight.static = true;


  background("black");

  textAlign(CENTER,CENTER);

  textSize(22);
  fill("Yellow");
  text("A Light In The Dark", 200, 100);

  textSize(18);
  fill("white");
  text("Find all the happy smiles to \nmake your light brighter. \nBut be carefull, there are dark lights \nhidden all over the room that \nwill limit your visibility again.",200,200);

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

    //bring badLight into canvas
    badLight.x = 334;
    badLight.y = 320;
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
    background("black");
    light.pos = { x: -100, y: -100};
    player.pos = { x: -100; y: -100};
    badlight.pos = { x: -100; y: -100};
    inspo.pos = { x: -100; y: -100};

    fill("yellow");
    textSize(22);
    text("You won!", 200, 100);

    fill("white");
    textSize(18);
    text("You collected all the \nhappy smiles to make the room \nbright again, even if there \nwere dark lights in the way. \nYou had hope!",200,200);
  }
}


//functions


function playScreen() {
  background("black");

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
     setTimeout(3000); 
     badLight.x = random(20,400);
     badLight.y = random(30,400);

   }

   //if player touches badLight
   if (player.overlaps(badLight)) {
     lightDiameter = lightDiameter - 25;
     light.diameter = lightDiameter;
     score = score - 1;
   }


   //score indicator
   fill("yellow")
   text("Inspo Collected: " + score,90,30);
   textSize(18);
  }

