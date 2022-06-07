var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghostImg, ghost;
var invisibleBlock, invisibleBlockGroup;
var spookySound;
var score;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  score = 0;
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200, 200, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(0);
  if (gameState === "play") {
    if (tower.y < 400) {
      tower.y = 300;
    }
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }
    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }
    if (keyDown("space")) {
      ghost.velocityY = -5;
    }

    spawnDoors();
    ghost.velocityY = ghost.velocityY + 0.8;

    if (ghost.isTouching(climbersGroup)) {
      ghost.velocityY = 0;
    }
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }
    console.log(frameCount);
    drawSprites();
  }
  if (gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);
  }
  score = score + Math.round(getFrameRate() / frameCount);
  stroke("yellow");
  fill("yellow");
  text("Score " + score, 500, 20);
}

function spawnDoors() {
  if (frameCount % 200 === 0) {
    door = createSprite(200, -50);
    door.addImage("door", doorImg);

    climber = createSprite(200, 10);
    climber.addImage("climber", climberImg);

    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.x = Math.round(random(120, 400));
    door.velocityY = 1;

    climber.x = door.x;
    climber.velocityY = 1;

    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;

    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

    door.lifetime = 800;
    climber.lifetime = 800;

    doorsGroup.add(door);
    climbersGroup.add(climber);

    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}
