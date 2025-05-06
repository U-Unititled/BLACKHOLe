class Splash {

 constructor() {
   
  this.splashBorder = 100;
  fill(0);
  stroke(10, 10, 255);
  rect(this.splashBorder, this.splashBorder, windowWidth-this.splashBorder*2, windowHeight-this.splashBorder*2);
  // draw a rectangle like this in a 3D enviornment
  // rect(this.splashBorder-(windowWidth/2), this.splashBorder-(windowHeight/2), windowWidth-this.splashBorder*2, windowHeight-this.splashBorder*2);
  fill(0, 0, 0);
  strokeWeight(5);
   
  line(windowWidth-this.splashBorder-40, this.splashBorder+20,windowWidth-this.splashBorder-20, this.splashBorder+40)
   line(windowWidth-this.splashBorder-20, this.splashBorder+20,windowWidth-this.splashBorder-40, this.splashBorder+40)
   
  this.title = createDiv("Dots on a Black Plate");
  this.title.style('color:white');
  this.title.style('font-family: Arial, Helvetica, sans-serif');
  this.title.position(this.splashBorder+20, this.splashBorder+20);
  
  this.name = createDiv("Zexin Wnag");
    this.name.style('color:white');
  
  this.name.position(this.splashBorder+20, this.splashBorder+60);
  
  this.info = createDiv("It is a generative arts with responsive audio. It displays as morphing dots on a black plate. It's such an incredable joy to be coding in p5js and also so amazing to be learning from such a skilled teacher like Bryan Jacobs. <p> It is hard to go on and on and on. <p> <a href=https://editor.p5js.org/_Untitled/sketches/foQEqlOQz>view code</a>");
   this.info.style('color:white');
  
  this.info.position(this.splashBorder+20, this.splashBorder+100);
  this.info.size(windowWidth-this.splashBorder*2-50, windowHeight-this.splashBorder*2-50)
   

  
}
  
  update(){
       if(mouseX > windowWidth-this.splashBorder-40 && 
          mouseX < windowWidth-this.splashBorder-20 
          && mouseY < this.splashBorder+40 
          && mouseY > this.splashBorder+20
     ){
     return true
   }
  }
 
  hide(){
    this.title.remove()
    this.name.remove()
    this.info.remove()
  }
}


