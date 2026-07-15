// ======================================
// Project Dystopia Chronicle
// script.js
// ======================================

// ---------- Canvas ----------
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
ctx.scale(dpr, dpr);

// ---------- 共通データ ----------
const roomNames = ["302", "303", "ロビー", "301"];

// ======================================
// メインループ
// ======================================
function init(){
    loadStage();
    resetPlayer();
    requestAnimationFrame(loop);
}

function update(){
    // 状態に基づいた更新処理
    if(gameState.mode === "EXPLORE") updatePlayer();
}

function draw(){
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // 描画はすべて ui.js (または今後作る render.js) に委譲
    switch(gameState.mode){
        case "EXPLORE": 
            drawExplore(ctx, roomNames[gameState.roomIndex]); 
            break;
        case "STORY":   
            // drawStory(); 
            break;
        case "HACKING": 
            drawHack(ctx, gameState.inputCode); 
            break;
    }
}

function loop(){
    update();
    draw();
    requestAnimationFrame(loop);
}

// 起動
init();
