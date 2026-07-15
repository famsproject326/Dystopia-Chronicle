const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: 200, y: 200, size: 30, vx: 0, vy: 0 };
let aiHologram = { x: canvas.width / 2, y: canvas.height / 2, radius: 60, status: "LOCKED" };

// ジョイスティックの状態
let joy = { active: false, x: 0, y: 0 };

// タッチ操作の受付
window.addEventListener("touchstart", (e) => {
    joy.active = true;
    updateJoy(e.touches[0]);
});
window.addEventListener("touchmove", (e) => {
    updateJoy(e.touches[0]);
});
window.addEventListener("touchend", () => {
    joy.active = false;
    player.vx = 0; player.vy = 0;
});

function updateJoy(touch) {
    // 画面左下のジョイスティック範囲を計算
    const dx = touch.clientX - 100; // 左下 100, 100 あたりを基準に
    const dy = touch.clientY - (window.innerHeight - 100);
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 100) {
        player.vx = dx / 10;
        player.vy = dy / 10;
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 移動
    player.x += player.vx;
    player.y += player.vy;

    // AIとの距離
    const dist = Math.hypot(player.x - aiHologram.x, player.y - aiHologram.y);
    aiHologram.status = (dist < 100) ? "ACCESS_GRANTED" : "LOCKED";

    // 描画
    ctx.strokeStyle = aiHologram.status === "LOCKED" ? "#00ffff" : "#ff00ff";
    ctx.beginPath();
    ctx.arc(aiHologram.x, aiHologram.y, aiHologram.radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(player.x, player.y, player.size, player.size);
    
    requestAnimationFrame(loop);
}
loop();
