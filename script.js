const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// プレイヤーとAIの定義
let player = { x: 100, y: 100, size: 30 };
let aiHologram = { x: canvas.width / 2, y: canvas.height / 2, radius: 60, status: "LOCKED" };

// キー操作の管理
let keys = {};
window.addEventListener("keydown", (e) => keys[e.code] = true);
window.addEventListener("keyup", (e) => keys[e.code] = false);

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. 移動処理
    if (keys["ArrowUp"]) player.y -= 5;
    if (keys["ArrowDown"]) player.y += 5;
    if (keys["ArrowLeft"]) player.x -= 5;
    if (keys["ArrowRight"]) player.x += 5;

    // 2. 距離判定（AIに近づいたらステータスが変わる）
    const dist = Math.hypot(player.x - aiHologram.x, player.y - aiHologram.y);
    if (dist < 100) {
        aiHologram.status = "ACCESS_GRANTED";
    } else {
        aiHologram.status = "LOCKED";
    }

    // 3. 描画
    // AIホログラム
    ctx.strokeStyle = aiHologram.status === "LOCKED" ? "#00ffff" : "#ff00ff";
    ctx.beginPath();
    ctx.arc(aiHologram.x, aiHologram.y, aiHologram.radius, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.fillStyle = aiHologram.status === "LOCKED" ? "#00ffff" : "#ff00ff";
    ctx.fillText("SYSTEM: " + aiHologram.status, aiHologram.x - 60, aiHologram.y + 80);

    // プレイヤー
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(player.x, player.y, player.size, player.size);
    
    requestAnimationFrame(loop);
}
loop();
