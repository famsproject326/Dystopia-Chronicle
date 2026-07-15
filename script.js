// ======================================
// Project Dystopia Chronicle
// script.js
// Ver1.1 Part 1
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
const roomNames = [
    "302",
    "303",
    "ロビー",
    "301"
];

// ---------- Game ----------
let gameMode = "EXPLORE";
let roomIndex = 2;
let inputCode = [];

// ---------- JoyStick ----------
let joy = {
    active: false,
    startX: 0,
    startY: 0
};

// ======================================
// 初期化
// ======================================

function init(){

    loadStage();
    resetPlayer();

    requestAnimationFrame(loop);

}

// ======================================
// タッチ開始
// ======================================

window.addEventListener("touchstart",(e)=>{

    const touch = e.touches[0];

    // 会話終了
    if(isTalking()){
        closeTalk();
        return;
    }

    // 左移動
    if(touch.clientX < UI.roomButtonWidth){

        roomIndex--;

        if(roomIndex < 0){
            roomIndex = roomNames.length-1;
        }

        return;

    }

    // 右移動
    if(touch.clientX > window.innerWidth-UI.roomButtonWidth){

        roomIndex++;

        if(roomIndex >= roomNames.length){
            roomIndex = 0;
        }

        return;

    }

    joy.active = true;

    joy.startX = touch.clientX;
    joy.startY = touch.clientY;

});

// ======================================
// タッチ移動
// ======================================

window.addEventListener("touchmove",(e)=>{

    if(!joy.active) return;

    if(gameMode!=="EXPLORE") return;

    const touch = e.touches[0];

    player.vx = (touch.clientX-joy.startX)/10;
    player.vy = (touch.clientY-joy.startY)/10;

});

// ======================================
// タッチ終了
// ======================================

window.addEventListener("touchend",()=>{

    joy.active = false;

    stopPlayer();

});

// ======================================
// 更新
// ======================================

function update(){

    switch(gameMode){

        case "EXPLORE":

            updatePlayer();

            break;

    }

}

// ======================================
// 描画
// ======================================

function draw(){

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    switch(gameMode){

        case "EXPLORE":

            drawExplore();

            break;

        case "STORY":

            drawStory();

            break;

        case "HACKING":

            drawHack();

            break;

    }

}

// ======================================
// 探索画面
// ======================================

function drawExplore(){

    drawRoomName(ctx, roomNames[roomIndex]);

    drawRoomButtons(ctx);

    drawPlayer(ctx);

    drawTalkWindow(ctx);

}


// ======================================
// ストーリー画面
// ======================================

function drawStory(){

    ctx.fillStyle = "#000";
    ctx.fillRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "24px " + UI.font;

    ctx.fillText(
        getCurrentStory(),
        window.innerWidth / 2,
        window.innerHeight / 2
    );

}


// ======================================
// ハッキング画面
// ======================================

function drawHack(){

    ctx.fillStyle = "rgba(0,0,0,0.95)";
    ctx.fillRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    ctx.fillStyle = "#ff0000";
    ctx.textAlign = "center";
    ctx.font = "20px " + UI.font;

    ctx.fillText(
        "[BACK]",
        window.innerWidth / 2,
        50
    );

    ctx.fillStyle = "#ffffff";

    ctx.fillText(
        "CODE : " + inputCode.join(""),
        window.innerWidth / 2,
        100
    );

    drawKeypad(
        ctx,
        window.innerWidth,
        window.innerHeight
    );

}


// ======================================
// メインループ
// ======================================

function loop(){

    update();

    draw();

    requestAnimationFrame(loop);

}


// ======================================
// 起動
// ======================================

init();