// ======================================
// Project Dystopia Chronicle
// script.js
// メイン管理
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


// ---------- Rooms ----------

const roomNames = [
    "302",
    "303",
    "ロビー",
    "301"
];


// ---------- JoyStick ----------

let joy = {
    active:false,
    startX:0,
    startY:0
};


// ---------- Game ----------

let gameMode = "STORY";

let roomIndex = 0;

let inputCode = [];


// ======================================
// 初期化
// ======================================

function init(){

    loadStage();

    resetPlayer();

    requestAnimationFrame(loop);

}


// ======================================
// 更新
// ======================================

function update(){

    if(gameMode==="EXPLORE"){

        updatePlayer();

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

        case "TITLE":

            break;

        case "STORY":

            drawStory();

            break;

        case "EXPLORE":

            drawExplore();

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

    drawRoomName(ctx,roomNames[roomIndex]);

    drawRoomButtons(ctx);

    getCharactersInRoom(roomIndex).forEach(character=>{

        ctx.fillStyle="#00ff00";

        ctx.fillRect(
            character.x,
            character.y,
            NPC.size,
            NPC.size
        );

        ctx.fillStyle="#ffffff";

        ctx.fillText(
            character.name,
            character.x+15,
            character.y-10
        );

    });

    drawTalkWindow(ctx);

    drawPlayer(ctx);

}


// ======================================
// ストーリー
// ======================================

function drawStory(){

    ctx.fillStyle="black";
    ctx.fillRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    ctx.fillStyle="white";

    ctx.textAlign="center";

    ctx.font="24px "+UI.font;

    ctx.fillText(
        getCurrentStory(),
        window.innerWidth/2,
        window.innerHeight/2
    );

}


// ======================================
// ハッキング
// ======================================

function drawHack(){

    ctx.fillStyle="black";

    ctx.fillRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    ctx.fillStyle="red";

    ctx.fillText(
        "[BACK]",
        window.innerWidth/2,
        50
    );

    ctx.fillStyle="white";

    ctx.fillText(
        "CODE : "+inputCode.join(""),
        window.innerWidth/2,
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