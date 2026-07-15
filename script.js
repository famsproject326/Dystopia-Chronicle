const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// AIホログラムの定義
let aiHologram = { x: canvas.width / 2, y: canvas.height / 2, radius: 50 };

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // AIホログラムの描画
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#00ffff";
    ctx.strokeStyle = "#00ffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(aiHologram.x, aiHologram.y, aiHologram.radius, 0, Math.PI * 2);
    ctx.stroke();
    
    // 文字の描画
    ctx.fillStyle = "#00ffff";
    ctx.font = "16px 'Courier New'";
    ctx.fillText("SYSTEM_STATUS: LOCKED", aiHologram.x - 80, aiHologram.y + 70);
    
    ctx.shadowBlur = 0; // 影をリセット
    requestAnimationFrame(loop);
}
loop();
