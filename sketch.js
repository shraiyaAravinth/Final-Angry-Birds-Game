/*// different data types in javascript

//string data type
var str = "This is a string.";
console.log(str);

// number
var num = 657;
console.log(num);

//boolean
var bool = true;
console.log(bool);

// undefined data type;
var object;
console.log(object);

// null data type
// reassigning null to undefined object
object = null;
console.log(object);

// arrays
// array holding same data type
var arr1 = [54,876,476];
console.log(arr1);
console.log(arr1[1]);

//array holding diff data types
var arr2 = [6567, "Hello", true, null, 97676, 668];
console.log(arr2);

// array storing a list of arrays
var arr3 = [[1,2],["hello world", 653789, false], ["I am a simple text", "You are welcome"], [546,8768]];
console.log(arr3);
console.log(arr3[2]);
console.log(arr3[2][0]);

// add some text to an array
arr3.push("Shraiya");
console.log(arr3);

//delete something from the array
arr3.pop()
console.log(arr3);
*/


const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var log
var gameState="onSling"
var score = 0
var bg1;

function preload() {
    //getBackgroundImage()
    bg1 = loadImage("sprites/bg.png");
}
function setup(){
    
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    sling = new Slingshot(bird.body,{x:200,y:50 });   

    
    
}

function draw(){

 // if(backgroundImg){
      background(bg1)
    //}
    textSize(20)
    fill("white")
    text("score :"+score,1000,50); 
  Engine.update(engine);
    //console.log(box2.body.position.x);
    //console.log(box2.body.position.y);
    //console.log(box2.body.angle);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();

    
    sling.display();
    pig1.score();
    pig3.score();
}

function mouseDragged(){

     if(gameState!=="launched"){
        Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY})
    }
}

function mouseReleased(){
    sling.fly();
    gameState="lauched";
}
function keyPressed(){
        if (keyCode === 32){
            bird.trajectory = []
            Matter.Body.setPosition(bird.body,{x:200,y:50})
            sling.attach(bird.body);
        } 
          
}

async function getBackgroundImage(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata")
    var responseJson = await response.json();
    var dateTime = responseJson.datetime
    var hour = dateTime.slice(11,13)
    console.log(hour);
    // hour should be between 06 and 17, 
    if(hour>=06& hour<=17){
        bg="sprites/bg1.png"
    }    
    else{
        bg="sprites/bg2.jpg"
    }

    backgroundImg=loadImage(bg);
    
}