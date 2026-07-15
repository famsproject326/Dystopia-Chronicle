const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

let player = { x: 100, y: 100, size: 30, vx: 0, vy: 0 };
let joy = { active: false, startX: 0, startY: 0 };

// タッチ操作
window.addEventListener("touchstart", (e) => {
    let t = e.touches[0];
    if (t.clientX < 200) { joy.active = true; joy.startX = t.clientX; joy.startY = t.clientY; }
});
window.addEventListener("touchmove", (e) => {
    if (!joy.active) return;
    player.vx = (e.touches[0].clientX - joy.startX) / 10;
    player.vy = (e.touches[0].clientY - joy.startY) / 10;
});
window.addEventListener("touchend", () => { joy.active = false; player.vx = 0; player.vy = 0; });

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // プレイヤー移動
    player.x += player.vx; player.y += player.dy;

    // AI判定
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dist = Math.hypot(player.x - centerX, player.y - centerY);
    const isAccessing = dist < 100;

    // 描画：AIホログラム
    ctx.strokeStyle = isAccessing ? "#f0f" : "#0ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = isAccessing ? "#f0f" : "#0ff";
    ctx.font = "bold 18px Courier New";
    ctx.textAlign = "center";
    ctx.fillText(isAccessing ? "ACCESS_GRANTED" : "SYSTEM_LOCKED", centerX, centerY + 90);

    // 描画：プレイヤー
    ctx.fillStyle = "#fff";
    ctx.fillRect(player.x, player.y, player.size, player.size);
    
    requestAnimationFrame(loop);
}
loop();
