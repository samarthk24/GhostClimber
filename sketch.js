  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  spookySound.loop();
  tower = createSprite(width/2,height/2);
  tower.addImage("tower",towerImg);
  tower.velocityY = 7;
  tower.scale = 2;
  
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(width/2, 100, 50, 50);
  ghost.scale = 0.5;
  ghost.addImage("ghost", ghostImg);
}


function draw() {
  background(0);

    //write a condition for infinte scrolling tower
  if(tower.y > 600){
      tower.y = 300
    } 
  
  if (gameState === "play") {
    
    if(keyDown("LEFT_ARROW")){
        ghost.x = ghost.x - 3;

      // write a code to move left when left arrow is pressed
    }
    if(keyDown("RIGHT_ARROW")){
  
          ghost.x = ghost.x + 3;

      // write a code to move right when right arrow is pressed
      
    }
    if(keyDown("space") || touches.length>0){
  
         ghost.velocityY = -10;
      touches = [];

      // write a code to move up when space arrow is pressed
      
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
   
    
      spawnDoors();

    
  //write a code to make invisibleBlockGroup collide with ghost destroy the ghost and make gamestate to end.
      if(climbersGroup.isTouching(ghost)){
        ghost.velocityY = 0;
      }
      if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
        ghost.visible = false;
        gameState = "end";
      }
      
    
    drawSprites();
  }
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", width/2-100,height/2);
    
    if(touches.length>0){
      reset();
      touches = [];
    }
  }
}

function spawnDoors(){
  //write code here to spawn the windows
  if (frameCount % 80 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //add the random function
    //

    door.x = Math.round(random(200, width-200));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 7;
    climber.velocityY = 7;
    invisibleBlock.velocityY = 7;

    door.scale = 1.2;
    climber.scale = 1.2;

    //change the depth of the ghost and door
    door.depth = ghost.depth;
    ghost.depth += 1;
    
    //assign lifetime for the  door, climber and invisible block
    door.lifetime = 300;
    climber.lifetime = 300;
    invisibleBlock.lifetime = 300;

    //add each obstacle to the group obstaclesGroup.add(obstacle);here  obstacle are door, climber and invisible block
    
    doorsGroup.add(door);
    //invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    invisibleBlock.visible = false;
  }
}

function reset() {
  gameState = "play"
  doorsGroup.destroyEach();
  climbersGroup.destroyEach();
  invisibleBlockGroup.destroyEach();
  ghost.visible = true;
  ghost.y = 100;
  ghost.velocityY = 0;
}
