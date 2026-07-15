const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: canvas.width / 2, y: canvas.height / 2, size: 30, vx: 0, vy: 0 };
let joy = { active: false, startX: 0, startY: 0 };

// タッチ操作（どこでも起点）
window.addEventListener("touchstart", (e) => {
    joy.active = true;
    joy.startX = e.touches[0].clientX;
    joy.startY = e.touches[0].clientY;
});

window.addEventListener("touchmove", (e) => {
    if (!joy.active) return;
    player.vx = (e.touches[0].clientX - joy.startX) / 10;
    player.vy = (e.touches[0].clientY - joy.startY) / 10;
});

window.addEventListener("touchend", () => {
    joy.active = false;
    player.vx = 0; player.vy = 0;
});

// 描画ループ
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // プレイヤー移動
    player.x += player.vx;
    player.y += player.vy;

    // AIホログラムの定義（画面中央）
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dist = Math.hypot(player.x - centerX, player.y - centerY);
    const isAccessing = dist < 100;

    // 1. 円を描画
    ctx.strokeStyle = isAccessing ? "#f0f" : "#0ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
    ctx.stroke();

    // 2. 文字を描画（ここが大事！）
    ctx.fillStyle = isAccessing ? "#f0f" : "#0ff";
    ctx.font = "bold 20px 'Courier New'";
    ctx.textAlign = "center";
    const text = isAccessing ? "ACCESS_GRANTED" : "SYSTEM_LOCKED";
    ctx.fillText(text, centerX, centerY + 100);

    // 3. プレイヤーを描画
    ctx.fillStyle = "#fff";
    ctx.fillRect(player.x, player.y, player.size, player.size);
    
    requestAnimationFrame(loop);
}

// 実行開始
loop();
