let gameseq=[];
let userseq=[];
let started=false;
let level=0;
let h2=document.querySelector("h2");
let btns=["yellow","red","purple","green"];
let beforescore=0;

document.addEventListener("keypress",function(){
     if(started==false){
        console.log("game is started");
        started=true;
        levelup();
     }
});
function levelup(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randomidx=Math.floor(Math.random()*4);
    let randcolor=btns[randomidx];
    let randombtn=document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    gameflash(randombtn);
}
function gameflash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },500);
}
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },500);
}
function check(idx){
    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelup,1000);
        }
        console.log("same value");
    }
    else{
        const body = document.querySelector("body");
        body.style.background = "linear-gradient(to bottom, #ff0000, #8b0000)"; 
        setTimeout(function () {
            body.style.background = "linear-gradient(to bottom right, #ff8d70, #d453b4)"; // Original gradient
        }, 1000);

        if (level < beforescore) {
            h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to start again.<br> Highest score till now is ${beforescore}`;
        } else if (level >= beforescore) {
            beforescore = level;
            h2.innerHTML = `Your new high score is <b>${level}</b> <br>Press any key to start again.`;
        }

        reset();
    }
}
function btnpress(){
    let btn=this;
    userflash(btn);
    usercolor=btn.getAttribute('id');
    userseq.push(usercolor);
    check(userseq.length-1);
}
let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}
function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}
