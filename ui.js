function drawExplore(ctx, roomName) {
    ctx.fillStyle = "#ffffff"; ctx.textAlign = "center";
    ctx.fillText("ROOM : " + roomName, window.innerWidth / 2, 50);
    drawPlayer(ctx);
}
function drawHack(ctx, inputCode) {
    ctx.fillStyle = "rgba(0,0,0,0.95)"; ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "#ffffff"; ctx.fillText("CODE : " + inputCode.join(""), window.innerWidth / 2, 100);
    drawKeypad(ctx, window.innerWidth, window.innerHeight);
}
