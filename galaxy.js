var num = 200;
var noiseScale=500, noiseStrength=1;
var particles = [num];

var stars;

function Star() {
    this.pos = createVector(random(-width / 2, width / 2), random(-height / 2, height / 2), width);

    this.update = function() {
        // this.pos.z -= zSlider.value();
        this.pos.z -= 5;
    }
    this.show = function() {
        fill(this.color);
        noStroke();
        this.sx = map(this.pos.x / this.pos.z, 0, 1, 0, width);
        this.sy = map(this.pos.y / this.pos.z, 0, 1, 0, height * 2);
        ellipse(this.sx, this.sy, 2);
    }

    this.color = color(random(1, 255), random(1, 255), random(1, 255));
}

function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(1080, 720);
  noStroke();

  stars = new Array(500);
  for (let j = 0; j < stars.length; j++) {
    stars[j] = new Star();
  }

  for (let i=0; i<num; i++) {
    //x value start slightly outside the right of canvas, z value how close to viewer
    var loc = createVector(random(width*1.2), random(height), 2);
    var angle = 0; //any value to initialize
    var dir = createVector(cos(angle), sin(angle));
    var speed = random(0.5,2);
    // var speed = random(5,map(mouseX,0,width,5,20));   // faster
    particles[i]= new Particle(loc, dir, speed);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {
  
  fill(0, 10);
  noStroke();
  rect(0, 0, width, height);
  for (let i=0; i<particles.length; i++) {
    particles[i].run();
  }

  // background(0);
  translate(width / 2, height / 2);
  for (let j = 0; j < stars.length; j++) {
    stars[j].update();
    stars[j].show();
    if (abs(stars[j].sx) > width / 2 || abs(stars[j].sy) > height / 2) {
        stars[j] = new Star();
    }
  }

}

class Particle{
  constructor(_loc,_dir,_speed){
    this.loc = _loc;
    this.dir = _dir;
    this.speed = _speed;
  	// var col;
  }
  run() {
    this.move();
    this.checkEdges();
    this.update();
  }
  move(){
    let angle=noise(this.loc.x/noiseScale, this.loc.y/noiseScale, frameCount/noiseScale)*TWO_PI*noiseStrength; //0-2PI
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    var vel = this.dir.copy();
    var d =1;  //direction change 
    vel.mult(this.speed*d); //vel = vel * (speed*d)
    this.loc.add(vel); //loc = loc + vel
  }
  checkEdges(){
    //float distance = dist(width/2, height/2, loc.x, loc.y);
    //if (distance>150) {
    if (this.loc.x<0 || this.loc.x>width || this.loc.y<0 || this.loc.y>height) {    
      this.loc.x = random(width*1.2);
      this.loc.y = random(height);
    }
  }
  update(){
    fill(255);
    ellipse(this.loc.x, this.loc.y, this.loc.z);
  }
}