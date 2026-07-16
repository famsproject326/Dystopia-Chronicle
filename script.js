// ======================================
// Project Dystopia Chronicle
// script.js
// ======================================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const roomNames = ["302", "303", "ロビー", "301"];

function resize() { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
}
window.addEventListener('resize', resize);
resize();

function loop(){
    // ここで gameState が確実に存在するかチェック
    if (typeof gameState !== 'undefined') {
        if(gameState.mode === "EXPLORE") updatePlayer();
        
        ctx.fillStyle = "#000"; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        if(gameState.mode === "EXPLORE") {
            drawExplore(ctx, roomNames[gameState.roomIndex]);
        } else if(gameState.mode === "HACKING") {
            drawHack(ctx, gameState.inputCode);
        }
    }
    requestAnimationFrame(loop);
}

// 読み込み順序に依存しないよう、少し遅延させて初期化
window.addEventListener('load', () => {
    setTimeout(() => {
        if (typeof loadStage === 'function') loadStage();
        if (typeof resetPlayer === 'function') resetPlayer();
        requestAnimationFrame(loop);
    }, 100);
});
