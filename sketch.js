var intensity = 0;
var maxIntesity = 100;
var p1 = 'Beavis';
var p2 = 'Butthead';
var currentPlayer = p1;
var canPass = false;
var butthead;
var beavis;
var titleCard;
var logo;
var gameover = false;
var bubbles = [];
var splash = true;
var mySong;

function preload(){
  butthead=loadImage('./assets/butt.png');
  beavis=loadImage('./assets/beavis.png');
  titleCard=loadImage('./assets/inizio.png');
  logo=loadImage('./assets/titolo.png');
  mySong = loadSound("./assets/beavbuttahh2.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setShakeThreshold(10);
}

function draw() {
  background(0,21,113);
  textFont('Amatic SC');
  textStyle(BOLD);

  if(splash){
    push();
    image(logo, width/2-logo.width/2, 50);
    textAlign(CENTER);
    push();
    textSize(100);
    fill(255);
    text('Shaking adventure', width/2, 300);
    pop();
    textSize(60);
    fill(255);
    text('1. Shake the can \n 2. Pass the can \n 3. Whoever reaches 100% loses \n 4. Don\'t do drugs \n 5. Tap to start', width/2, 400);
    image(titleCard, 0, height/2);
    pop();
  } else {

    for(i=0; i<bubbles.length; i++){
      bubbles[i].display();
    }

    image(butthead, width/2+100, 200);
    image(beavis,  width/2-250, 200);

    push();
    textSize(60);
    if(currentPlayer == p1){
      fill(255,0,0);
    } else {
      fill(255);
    }
    text('p1: ' + p1, width/2-250, 150);
    if(currentPlayer == p2){
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    text('p2: ' + p2, width/2+100, 150);
    pop();

    push();
    if(!gameover){
      textSize(100);
    } else {
      textSize(250);
    }
    fill(255);
    textAlign(CENTER);
    text(intensity + '%', width/2, height/2+30);
    pop();

    if(intensity >= maxIntesity){
      gameover = true;
      canPass=false;
      push();
      textSize(60);
      textAlign(CENTER);
      fill(255);
      text(currentPlayer + ' loses', width/2, height/2+100);
      text('- tap to restart -', width/2, height/2+550);
      pop();
    }

    if(canPass){
      push();
      textSize(40);
      fill(255);
      textAlign(CENTER);
      text('- tap to pass -', width/2, height/2+550);
      pop();
    }
  }
}

function deviceShaken() {
  if(!splash){
    if(!gameover){
      generateBubble();
      canPass = true;
      intensity += 1;
    }
  }
}

function pass(){
  canPass=false;
  if(currentPlayer == p1) {
    currentPlayer=p2;
  } else {
    currentPlayer=p1;
  }
}

function mousePressed() {
  if(splash){
    splash = false;
  } else {
    if(!gameover){
      if(canPass){
        pass();
        mySong.play();
      }
    } else {
      reset();
    }
  }
}

function bollicina(pX, pY, size, snowColor) {
  var x=pX;
  var y=pY;

  this.display = function() {
    stroke(255, 255, 255);
    noFill();
    ellipse(x + random(-5, 5), y + random(-10, 20), size, size);
  }
}

function generateBubble() {
  var currentObj = {
    pX: random(0, windowWidth),
    pY: random(0, windowHeight),
    size: random(0, 100),
    snowColor: random(100, 255)
  };
  var b = new bollicina (currentObj.pX, currentObj.pY, currentObj.size, currentObj.snowColor)
  bubbles.push(b);
}

function reset(){
  gameover=false;
  bubbles = [];
  intensity = 0;
  currentPlayer = p1;
}
