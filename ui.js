// ======================================
// Project Dystopia Chronicle
// ui.js
// 描画管理
// ======================================

let talkMessage = "";

function showTalk(text) { talkMessage = text; }
function closeTalk() { talkMessage = ""; }
function isTalking() { return talkMessage !== ""; }

// 描画処理をここへ集約
function drawExplore(ctx, roomName, player) {
    drawRoomName(ctx, roomName);
    drawRoomButtons(ctx);
    drawPlayer(ctx, player);
    drawTalkWindow(ctx);
}

function drawHack(ctx, inputCode) {
    ctx.fillStyle = "rgba(0,0,0,0.95)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "#ff0000";
    ctx.textAlign = "center";
    ctx.font = "20px " + UI.font;
    ctx.fillText("[BACK]", window.innerWidth / 2, 50);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("CODE : " + inputCode.join(""), window.innerWidth / 2, 100);
    drawKeypad(ctx, window.innerWidth, window.innerHeight);
}

function drawRoomName(ctx, roomName) {
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "20px " + UI.font;
    ctx.fillText("ROOM : " + roomName, window.innerWidth / 2, 50);
}

function drawRoomButtons(ctx) {
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "20px " + UI.font;
    ctx.fillText("<", 50, window.innerHeight / 2);
    ctx.fillText(">", window.innerWidth - 50, window.innerHeight / 2);
}

function drawTalkWindow(ctx) {
    if (!talkMessage) return;
    ctx.fillStyle = "rgba(0,0,0,0.9)";
    ctx.fillRect(0, window.innerHeight - UI.dialogHeight, window.innerWidth, UI.dialogHeight);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "16px " + UI.font;
    ctx.fillText(talkMessage, window.innerWidth / 2, window.innerHeight - 60);
}
