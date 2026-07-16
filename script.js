// ======================================
// Project Dystopia Chronicle
// script.js
// ======================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
ctx.scale(dpr, dpr);

const roomNames = ["302", "303", "ロビー", "301"];

function loop(){
    if(gameState.mode === "EXPLORE") updatePlayer();
    
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    switch(gameState.mode){
        case "EXPLORE": 
            drawExplore(ctx, roomNames[gameState.roomIndex] || "UNKNOWN"); 
            break;
        case "HACKING": 
            drawHack(ctx, gameState.inputCode); 
            break;
    }
    requestAnimationFrame(loop);
}

function init(){
    loadStage();
    resetPlayer();
    requestAnimationFrame(loop);
}

init();
