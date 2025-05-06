var Num = 10;
var ParticleArray = Array(Num);
var time = 800;
var rel = 0;
var reltime = 1500;
var t = 0;
var mode = 0;
//let Splash;
var m = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  splash = new Splash();
  Num = (width * height) / 1300;

  noStroke();

}

function draw() {
  if (mouseIsPressed == true && splash.update() == true) {
    mode = 1;
  }
  if (mode == 1) {
    splash.hide();
  }

  if (mode == 1) {
    if (m == 0) {
      mouseIsPressed = false;
  setParticles();
      for (let p of ParticleArray) {
        p.start();
      }
    
      m = 1;
    }
    background(0);
    noStroke();
    frameRate(60);
    blendMode(ADD);
    count();

     for (let p of ParticleArray) {
       p.constent();
    }

    if (mouseIsPressed) {
      loadPixels();

      for (let p of ParticleArray) {
        p.update();
        p.fm();
      }
      updatePixels();
      rel = 1;
      t = millis();
    } else {
      if (rel == 1) {
        for (let p of ParticleArray) {
          p.release();
        }
        updatePixels();
        if (millis() > t + reltime) {
          rel = 0;
        }
      }
    }

    if (keyIsPressed) {

      for (i = 0; i < width; i++) {
        for (h = 0; h < height; h++) set(i, h, color(0, 0, 0));
        updatePixels();
      }
      h = 0;
      for(let p of ParticleArray){
       p.restart()
      }
    }
  }
}

function count() {
  let curtime = 0;

  if (millis() > time + curtime) {
    curtime = millis();
    for (let p of ParticleArray) {
     p.change();
    }
    time = random(1000, 5000);
  }
}

function setParticles() {
  for (let i = 0; i < Num; i++) {
    ParticleArray[i] = new Particle();
  }
}

class Particle {
  constructor() {
    this.posX = random(width);
    this.posY = random(height);
    this.r = random(0, 30);
    this.g = random(0, 30);
    this.b = random(100, 240);
    this.c = color(this.r, this.g, this.b);
    this.incr = 0.000128;
    this.theta = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.dis = 1;
    this.disrel = 1;
    this.dice = 0;
    this.mX = 0;
    this.mY = 0;
    this.rmovet = width * 0.153;

    this.fme = 0;
    this.oscincr = 0;
    this.oscposX = random(width);
    this.oscposY = random(height);
    this.pan = random(-1, 1);
    this.osc = new p5.Oscillator("sine");
    this.FM = new p5.Oscillator("sawtooth");
    this.pi = random(50, 1000);
    // this.osc.amp(1/Num);
    this.oscdice = 0;
    this.FM.start();
    this.FM.freq(1);
    this.FM.amp(1000);
    this.FM.disconnect();

    this.fmamp = 0;
    this.fmp = 1;
  }
  constent() {
    this.oscdice = int(random(1, 50));
    if (this.oscdice == 10) {
      for (let i = 0; i < 1000; i++) {
        this.pi += sin(noise(width, height, this.incr) - 0.5) / 100;
        this.osc.freq(this.pi);
      }
    }
  }
  change() {
    //this.pan += noise(width, height, this.incr) - 0.5;
    //this.osc.pan(this.pan);
  }
  start() {
    this.oscincr += 0.128;
    this.osc.freq(this.pi);
    this.osc.pan(this.pan);
    this.osc.start();
    this.osc.amp(0);
    this.osc.amp(1 / Num, 0.1);
  }
  fm() {
    this.FM.freq(int((this.dis *200*random(0.5,2)) / width));
    // console.log(int(70000 / (1 + int(this.dis))))
    this.fmamp = int(500000 / (1 + int(this.dis)));
    this.FM.amp(this.fmamp);
    this.osc.freq(this.FM)
  }
  update() {
    this.incr += 0.00000128;
    this.dice = int(random(1, 100));
    this.theta = (noise(this.posX, this.posY, this.incr) - 0.5) * TWO_PI;
    this.moveX = (mouseX - this.posX) / (width * 0.153);
    this.moveY = (mouseY - this.posY) / (width * 0.153);
    this.dis = sqrt(sq(this.posX - mouseX) + sq(this.posY - mouseY));
    if (this.dis > (width + height) / 4) {
      if (this.b < 255) {
        this.b += this.dis / ((width + height) / 15);
      }
      if (this.r > 0) {
        this.r += -this.dis / ((width + height) / 15);
      }
    }
    if (this.dis < (width + height) / 4) {
      if (this.r < 255) {
        this.r += (width + height) / (this.dis * 15);
      }
      if (this.b > 0) {
        this.b -= (width + height) / (this.dis * 15);
      }
    }
    //console.log((sin(this.theta) + cos(this.theta)))
    this.posX +=
      this.moveX +
      tan(this.theta) * this.dis * this.dis * this.moveY * 0.0001 +
      random(-0.1, 0.1) * PI; //
    this.posY +=
      this.moveY +
      tan(this.theta) * this.dis * this.dis * this.moveX * 0.0001 +
      random(-0.1, 0.1) * PI; //
    if (this.dice == 1) {
      this.c = color(random(180, 250));
    } else {
      this.c = color(this.r, this.g, this.b);
    }
    set(this.posX, this.posY, this.c);
    if (this.posX > width) {
      this.posX = 0;
    }
    if (this.posY > height) {
      this.posY = 0;
    }
    if (this.posX < 0) {
      this.posX = width;
    }
    if (this.posY < 0) {
      this.posY = height;
    }
    this.mX = mouseX;
    this.mY = mouseY;
    this.rmovet = width * 0.153 + (this.rmovet * 1.2) / width;
  }
  release() {
    this.incr += 0.00000128;
    this.theta = (noise(this.posX, this.posY, this.incr) - 0.5) * TWO_PI;
    this.disrel = sqrt(sq(this.posX - this.mX) + sq(this.posY - this.mY));
    this.rmovet = this.rmovet * 1.025;
    this.moveX = (this.mX - this.posX) / this.rmovet;
    this.moveY = (this.mY - this.posY) / this.rmovet;
    this.posX +=
      this.moveX +
      tan(this.theta) * this.dis * this.dis * this.moveY * 0.0001 +
      random(-0.1, 0.1) * PI; //
    this.posY +=
      this.moveY +
      tan(this.theta) * this.dis * this.dis * this.moveX * 0.0001 +
      random(-0.1, 0.1) * PI; //
    set(this.posX, this.posY, this.c);

    this.fmamp += -int(this.fmamp / 15);
    this.FM.amp(int(this.fmamp));
  }
  restart(){
    this.posX = random(width);
    this.posY = random(height);
    this.r = random(0, 30);
    this.g = random(0, 30);
    this.b = random(100, 240);
    this.c = color(this.r, this.g, this.b);
    this.incr = 0.000128;
    this.theta = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.dis = 1;
    this.disrel = 1;
    this.dice = 0;
    this.mX = 0;
    this.mY = 0;
    this.rmovet = width * 0.153;
  }
}
