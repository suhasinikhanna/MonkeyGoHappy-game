var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var bg, bgImage, invisibleground;
var jail, jailImage;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var yahooSound, chewingSound, gameoverSound;

var gameover, gameoverImg, restart, restartImg;

function preload() {

  monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png");

  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");

  bgImage = loadImage("download (4).jpg");
  
  jailImage = loadImage("jail.jpg");
  
  yahooSound = loadSound("yahoo.mp3");
  
  chewingSound = loadSound("chewing.mp3");

  gameoverSound = loadSound("gameover.mp3");
  
  restartImg = loadImage("restart.jpg");
  
  gameoverImg = loadImage("gameOver.png");

}

function setup() {
  createCanvas(600, 400);

  bg = createSprite(0, 0, 600, 400);
  bg.addImage(bgImage);
  bg.scale = 5.4;
  
  jail = createSprite(80, 315, 20, 20);
  jail.addImage(jailImage);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.2;

  invisibleground = createSprite(400, 408, 900, 10);
  invisibleground.visible = false;
  
  gameover = createSprite(300, 160, 20, 20);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.7;
  gameover.visible = false;
  
  restart = createSprite(300, 300, 20, 20);
  restart.addImage(restartImg);
  restart.scale = 0.3;
  restart.visible = false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;

}

function draw() {

  background(255);

  monkey.collide(invisibleground);

  monkey.velocityY = monkey.velocityY + 0.8;

  if (keyDown("space") && monkey.y >= 159) {
    monkey.velocityY = -13;
  }
  
  if (keyDown("D")) {
     jail.visible = false;
     yahooSound.play();
     
  }
  
  if (bg.x < 0) {
      bg.x = bg.width / 2;
    }
  
    bg.velocityX = -3;
  
  if(mousePressedOver(restart)) {
    reset();
  }

  if (monkey.isTouching(FoodGroup)) {
    FoodGroup.destroyEach();
    monkey.scale = 0.2;
    chewingSound.play();
    score = score + 1;
  }

  spawnFood();
  spawnObstacles();

  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);


  if (obstaclesGroup.isTouching(monkey)) {
    bg.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    restart.visible = true;
    gameover.visible = true;
    
}

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate())
  text("Survival Time: " + survivalTime, 100, 50);
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.velocityX = -5;

    //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

    //add image of banana
    banana.addImage(bananaImage);
    banana.scale = 0.1;

    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(800, 370, 10, 40);
    obstacle.velocityX = -6;

    //add image to the obstacle 
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;

    //lifetime to the obstacle     
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
  }
}

function reset(){
  
gameState = PLAY;
  
gameover.visible=false;
  
restart.visible = false;
  
obstaclesGroup.destroyEach();
FoodGroup.destroyEach();
  
score = 0;
  
jail.visible = true;
  
}