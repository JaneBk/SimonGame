
let buttonColors=["red", "blue", "green", "yellow"];
let gamePattern=[];
let userClickedPattern=[];
let start=0;
let level=0;
let index=0;
let f=0;
for(let i=0 ; i<4 ; i++) {
    $(".btn")[i].addEventListener("click", function(){
        let userColor=this.id;
        userClickedPattern.push(userColor);
        playSound(userColor)
        index=userClickedPattern.length-1;
        checkAns(index)
    });
}


$(document).keydown(function(e){
    let k=e.key;
    if(start==0){
        if(k == "A" || k == "a")
            nextSequence();
    } 
    start=1;
})


function nextSequence(){
    document.getElementById("level-title").innerHTML="Level "+(++level);
    let randomNum=Math.floor(Math.random() * 4);
    let color=buttonColors[randomNum];
    gamePattern.push(color); 
    playSound(color)  ;
}

function gameOver(){
    document.getElementById("level-title").innerHTML="Game Over, Press any key to restart";
    gamePattern=[];
    userClickedPattern=[]; 
    level=0;
    let wrongAudio=new Audio("./sounds/wrong.mp3");
    wrongAudio.play();
    over();
    $(document).keydown(function(e){
        if(f==1){
            f=0;
            nextSequence();
        }
    }) 
  }


function playSound(name){
    var audio= new Audio("./sounds/"+name+".mp3");
    audio.play();
    animate(name);
}

function animate(key){
    let activebtn=document.querySelector("."+key);
    activebtn.classList.add("pressed");
    setTimeout(function() {
        activebtn.classList.remove("pressed");
    },100);
}

function checkAns(currentLevel){    
        if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
            console.log("success");
        }
        else{
            console.log("fail")
            f=1;
            gameOver();
        }       
    let gamelevel=gamePattern.length-1;  
    if(currentLevel==gamelevel){
        setTimeout(function() { nextSequence(); },1000);
        userClickedPattern=[];
    } 
}
    
function over(){
    let abtn=document.querySelector("body");
    abtn.classList.add("game-over");
    setTimeout(function() {
        abtn.classList.remove("game-over");
    },100);
}