// ======================================
// Project Dystopia Chronicle
// ui.js
// ======================================
function drawExplore(ctx, roomName) {
    ctx.fillStyle = "#ffffff"; 
    ctx.font = "20px Courier New"; 
    ctx.textAlign = "center";
    ctx.fillText("ROOM : " + roomName, window.innerWidth / 2, 50);
    if (typeof drawPlayer === 'function') drawPlayer(ctx);
}

function drawHack(ctx, inputCode) {
    ctx.fillStyle = "rgba(0,0,0,0.95)"; 
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "#ffffff"; 
    ctx.fillText("CODE : " + (inputCode ? inputCode.join("") : ""), window.innerWidth / 2, 100);
}
