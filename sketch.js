var scene,sceneimg;
var spaceship,spaceshipimg; 
var laser;
var enemy1,enemy1img;
var enemy2,enemy2img; 
var enemy3,enemy3img;
var score=0;
var gamestate = "start";
var explosion1img;
var explosion3img,explosion2img;
var border;
var explosionSound,endSound,uparrowSound,lightyearsSound;
var gameover,gameoverimg;
var restart,restartimg;
var bomb,bombimg;
var fireball,fireballimg;

function preload(){
sceneimg=loadImage("scene.jpg");
spaceshipimg=loadImage("spaceship.png");
enemy1img=loadImage("enemy.png");
enemy2img=loadImage("enemy2.png");
enemy3img=loadImage("enemy3.png");
explosion1img=loadImage("explosion1.png");
explosion2img=loadImage("explosion2.png");
explosion3img=loadImage("explosion3.png");
explosionSound=loadSound("explosion.wav");
gameoverimg=loadImage("Gameover.png");
bombimg=loadImage("bomb.png");
restartimg=loadImage("restart.png");
fireballimg=loadImage("fireball.png");
endSound=loadSound("end.wav");
uparrowSound=loadSound("uparrow.wav");
lightyearsSound=loadSound("lightyears.mp3");
}

function setup(){
createCanvas(windowWidth,windowHeight);

scene = createSprite(windowWidth/1.4,windowHeight/8);
scene.addImage(sceneimg);

spaceship = createSprite(windowWidth/19,windowHeight/2);
spaceship.addImage(spaceshipimg);
spaceship.scale=0.3;

border = createSprite(windowWidth/10,windowHeight/2,0.01,windowHeight);
border.shapeColor = "black";

gameover = createSprite(windowWidth/2,windowHeight/3);
gameover.addImage(gameoverimg);

restart = createSprite(windowWidth/2,windowHeight/2);
restart.addImage(restartimg);

lightyearsSound.loop();

enemy1Group = new Group();
enemy2Group = new Group();
enemy3Group = new Group();
bombGroup = new Group();
fireballGroup = new Group();
laserGroup = new Group();
}

function draw(){
background("black");
drawSprites();

if(gamestate=="start"){
gameover.visible=false;
restart.visible=false;
score=0;
spaceship.x=windowWidth/19;
spaceship.y=windowHeight/2;
fill("yellow");
textSize(17);
text("Up arrow key to stay in air",windowWidth/3,windowHeight/5);
text("Space Bar to strike the aliens",windowWidth/3,windowHeight/4)
text("destroy the aliens before they reach your spaceship!",windowWidth/3,windowHeight/3.3);
text("Up arrow key to start",windowWidth/3,windowHeight/2.8);
if(keyDown("UP_ARROW")){
gamestate="play";
}
}

if(gamestate=="play"){
gameover.visible=false;
restart.visible=false;
scene.velocityX=-(3+ 1*score/200);
if (scene.x < windowWidth/3){
scene.x = scene.width/2;
}

if(keyDown("UP_ARROW")){
uparrowSound.play();
spaceship.velocityY=-10; 
}
spaceship.velocityY+=0.8;

if(keyDown("SPACE")){
laser = createSprite(windowWidth/19,windowHeight/2,100,5);
laser.shapeColor="red";
laser.velocityX=90;
laser.y=spaceship.y;
laser.lifetime=150;
spaceship.depth=laser.depth;
spaceship.depth+=1;
laserGroup.add(laser)
}

if(enemy1Group.isTouching(laserGroup)){
enemy1Group.destroyEach();
laserGroup.destroyEach();
enemy1=createSprite(enemy1.x,enemy1.y);
enemy1.addImage(explosion1img);
enemy1.scale=0.2;
enemy1.velocityX=-(3+ 1*score/200);
enemy1.lifetime=20;
explosionSound.play();
score+=10;
}

if(enemy2Group.isTouching(laserGroup)){
enemy2Group.destroyEach();
laserGroup.destroyEach();
enemy2=createSprite(enemy2.x,enemy2.y);
enemy2.addImage(explosion2img);
enemy2.scale=0.2;
enemy2.velocityX=-(3+ 1*score/200);
enemy2.lifetime=20;
explosionSound.play();
score+=10;
}

if(enemy3Group.isTouching(laserGroup)){
enemy3Group.destroyEach();
laserGroup.destroyEach();
enemy3=createSprite(enemy3.x,enemy3.y);
enemy3.addImage(explosion3img);
enemy3.scale=0.2;
enemy3.velocityX=-(3 + 1*score/200);
enemy3.lifetime=20;
explosionSound.play();
score+=10;
}

if(fireballGroup.isTouching(laserGroup)){
fireballGroup.destroyEach();
laserGroup.destroyEach();
score-=50;
}

if(enemy1Group.collide(border)||enemy2Group.collide(border)||enemy3Group.collide(border)||bombGroup.isTouching(laserGroup)||spaceship.y > windowHeight){
endSound.play();
gamestate="end";
}

if(score==1000){
gamestate="win";
}

createenemy1();
createenemy2();
createenemy3();
createbombs();
createfireballs();
}

if(gamestate=="end"){
scene.velocityX=0;
gameover.visible=true;
restart.visible=true;
spaceship.x=windowWidth/19;
spaceship.y=windowHeight/2;
enemy1Group.destroyEach();
enemy2Group.destroyEach();
enemy3Group.destroyEach();
bombGroup.destroyEach();
fireballGroup.destroyEach();
if(mousePressedOver(restart)){
gameover.visible = false;
restart.visible = false;    
gamestate="start";
score = 0;
}
}

if(gamestate=="win"){
gameover.visible=false;
restart.visible=false;
scene.velocityX=0;
spaceship.velocityX=12;
spaceship.velocityY=0;
enemy1Group.destroyEach();
enemy2Group.destroyEach();
enemy3Group.destroyEach();
bombGroup.destroyEach();
fireballGroup.destroyEach();
fireball.velocityX=100;
enemy1.velocityX=100;
enemy2.velocityX=100;
enemy3.velocityX=100;
bomb.velocityX=100;
fill("yellow");
textSize(30);
stroke("teal");
text("CONGRATULATIONS!!! We successfully defeated all the aliens",windowWidth/5,windowHeight/5)
}

fill("black");
textSize(20);
text("Score: "+score,windowWidth/120,windowHeight/20);
}


function createenemy1(){
if(frameCount%110==0){
enemy1 = createSprite(windowWidth/1,Math.round(random(100,windowHeight-100)));
enemy1.addImage(enemy1img);
enemy1.scale=0.2;
enemy1.velocityX=-(3+ 1*score/200);
enemy1Group.add(enemy1);
}
}

function createenemy2(){
if(frameCount%200==0){
enemy2 = createSprite(windowWidth/1,Math.round(random(100,windowHeight-100)));
enemy2.addImage(enemy2img);
enemy2.scale=0.2;
enemy2.velocityX=-(3+ 1*score/200);
enemy2Group.add(enemy2);
}
}

function createenemy3(){
if(frameCount%170==0){
enemy3 = createSprite(windowWidth/1,Math.round(random(100,windowHeight-100)));
enemy3.addImage(enemy3img);
enemy3.scale=0.2;
enemy3.velocityX=-(3+ 1*score/200);
enemy3Group.add(enemy3);
}
}

function createbombs(){
if(frameCount%350==0){
bomb = createSprite(windowWidth/1,Math.round(random(100,windowHeight-100)));
bomb.addImage(bombimg);
bomb.scale=0.2;
bomb.velocityX=-(3+ 1*score/200);
bombGroup.add(bomb);
}
}

function createfireballs(){
if(frameCount%450==0){
fireball = createSprite(windowWidth/1,Math.round(random(100,windowHeight-100)));
fireball.addImage(fireballimg);
fireball.scale=0.2;
fireball.velocityX=-(3+ 1*score/200);
fireballGroup.add(fireball);
}
}