// ======================================
// Project Dystopia Chronicle
// ui.js
// UI・描画管理
// ======================================

let talkMessage = "";


// ======================================
// 会話表示
// ======================================

function showTalk(text){

    talkMessage = text;

}


// ======================================
// 会話を閉じる
// ======================================

function closeTalk(){

    talkMessage = "";

}


// ======================================
// 会話中か
// ======================================

function isTalking(){

    return talkMessage !== "";

}


// ======================================
// 部屋名表示
// ======================================

function drawRoomName(ctx, roomName){

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "20px " + UI.font;

    ctx.fillText(
        "ROOM : " + roomName,
        window.innerWidth / 2,
        50
    );

}


// ======================================
// 部屋移動ボタン
// ======================================

function drawRoomButtons(ctx){

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "20px " + UI.font;

    ctx.fillText("<", 50, window.innerHeight / 2);

    ctx.fillText(
        ">",
        window.innerWidth - 50,
        window.innerHeight / 2
    );

}


// ======================================
// 会話ウィンドウ
// ======================================

function drawTalkWindow(ctx){

    if(!talkMessage) return;

    ctx.fillStyle = "rgba(0,0,0,0.9)";
    ctx.fillRect(
        0,
        window.innerHeight - UI.dialogHeight,
        window.innerWidth,
        UI.dialogHeight
    );

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "16px " + UI.font;

    ctx.fillText(
        talkMessage,
        window.innerWidth / 2,
        window.innerHeight - 60
    );

}