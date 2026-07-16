const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const roomNames = ["302", "303", "ロビー", "301"];

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize);
resize();

function loop(){
    if(gameState.mode === "EXPLORE") updatePlayer();
    ctx.fillStyle = "#000"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    if(gameState.mode === "EXPLORE") drawExplore(ctx, roomNames[gameState.roomIndex]);
    else if(gameState.mode === "HACKING") drawHack(ctx, gameState.inputCode);
    requestAnimationFrame(loop);
}

function init(){
    loadStage();
    resetPlayer();
    requestAnimationFrame(loop);
}
window.onload = init;
