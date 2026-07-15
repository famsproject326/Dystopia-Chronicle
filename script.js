// ======================================
// Project Dystopia Chronicle
// script.js
// Ver1.1 Part 2 (Refactored)
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

// ---------- Room ----------
const roomNames = ["302", "303", "ロビー", "301"];

// ---------- JoyStick ----------
let joy = { active: false, startX: 0, startY: 0 };

// ======================================
// 初期化
// ======================================
function init(){
    loadStage();
    resetPlayer();
    requestAnimationFrame(loop);
}

// ======================================
// タッチ・入力系 (今後 input.js へ分割予定)
// ======================================
window.addEventListener("touchstart",(e)=>{
    const touch = e.touches[0];
    if(isTalking()){ closeTalk(); return; }

    // 左移動
    if(touch.clientX < UI.roomButtonWidth){
        gameState.roomIndex = (gameState.roomIndex - 1 + roomNames.length) % roomNames.length;
        return;
    }
    // 右移動
    if(touch.clientX > window.innerWidth - UI.roomButtonWidth){
        gameState.roomIndex = (gameState.roomIndex + 1) % roomNames.length;
        return;
    }

    joy.active = true;
    joy.startX = touch.clientX;
    joy.startY = touch.clientY;
});

window.addEventListener("touchmove",(e)=>{
    if(!joy.active || gameState.mode !== "EXPLORE") return;
    const touch = e.touches[0];
    player.vx = (touch.clientX - joy.startX) / 10;
    player.vy = (touch.clientY - joy.startY) / 10;
});

window.addEventListener("touchend",()=>{
    joy.active = false;
    stopPlayer();
});

// ======================================
// 更新・描画ループ
// ======================================
function update(){
    if(gameState.mode === "EXPLORE") updatePlayer();
}

function draw(){
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    switch(gameState.mode){
        case "EXPLORE": drawExplore(); break;
        case "STORY":   drawStory();   break;
        case "HACKING": drawHack();    break;
    }
}

function loop(){
    update();
    draw();
    requestAnimationFrame(loop);
}

// 描画関連関数は render.js へ移行予定のためここでは呼び出しのみ
function drawExplore(){
    drawRoomName(ctx, roomNames[gameState.roomIndex]);
    drawRoomButtons(ctx);
    drawPlayer(ctx);
    drawTalkWindow(ctx);
}

function drawHack(){
    ctx.fillStyle = "rgba(0,0,0,0.95)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "#ff0000";
    ctx.textAlign = "center";
    ctx.font = "20px " + UI.font;
    ctx.fillText("[BACK]", window.innerWidth / 2, 50);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("CODE : " + gameState.inputCode.join(""), window.innerWidth / 2, 100);
    drawKeypad(ctx, window.innerWidth, window.innerHeight);
}

init();
