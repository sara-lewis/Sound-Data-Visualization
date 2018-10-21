var microphone; 
var finalCounter = 0;  
var repeat = false; 
var repeatRect = false; 
var valSum = 0; 
var iterations = 0; 

function setup() {
  createCanvas(1380,700); 
  microphone = new p5.AudioIn(); 
  microphone.start()
  background('#222222'); 
  frameRate(5); 
  noStroke(); 
}

function draw() {
  if(second()==0){
    fill('#222222'); 
    rect(0,0,1380,350); 
  }
  for(var i=0; i<60; i++){
    if(i == second()){
      // top graph 
      var micLevel = microphone.getLevel(); 
      var rectHeight = rectFeatures(micLevel); 
      rect(23*i, 0, 23, rectHeight); 
      valSum += micLevel; // sum all the vals to find average later 
      iterations ++; // for finding the average later 
      // Bottom graph 
      if((second()%12 == 0) || (second() == 59)){
        if(repeatRect == false){
           var averageLevel = valSum/iterations; 
           var averageHeight = rectFeatures(averageLevel); 
           rect(23*finalCounter, (700-averageHeight), 23, averageHeight); 
           valSum = 0; 
           iterations = 0; 
           repeatRect = true; 
        }
      }
      
      if((second()%12 > 0) || ((second() == 59) && (millis()%1000 > 970))){
        repeatRect = false; 
      }
      
      if((second() == 59)){
        if(repeat == false){
          finalCounter ++; 
          repeat = true; 
        }
      }
      if(second() == 1){
        repeat = false; 
      }
    }
  }
}

function rectFeatures(micLevel){
    var rectHeight = map(micLevel, 0, 1, 0, 600); 
    var blueval = map(micLevel, 0, 1, 0, 450); 
    blueval = 255-blueval; 
    fill(blueval,255,255,40); 
    return rectHeight; 
}