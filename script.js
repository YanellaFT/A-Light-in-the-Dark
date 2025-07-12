/* VARIABLES */

/* PRELOAD LOADS FILES */
function preload(){
  
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  background("black");
  
  player = new Sprite();
  player.width = 20;
  player.height = 20;
  player.physics = "kinematic";
  player.layer = "2";
    
  light = new Sprite(player.x, player.y);
  light.diameter = 50;
  light.color = "white";
  light.physics = "kinematic";
  light.layer = "0";
}

/* DRAW LOOP REPEATS */
function draw() {
}

/* FUNCTIONS */