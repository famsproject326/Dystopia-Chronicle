const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 高精細ディスプレイ対応
const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
ctx.scale(dpr, dpr);
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";

let player = { x: window.innerWidth / 2, y: window.innerHeight / 2, size: 30, vx: 0, vy: 0 };
let joy = { active: false, startX: 0, startY: 0 };
let gameMode = "EXPLORE";

window.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const distFromCenter = Math.hypot(t.clientX - centerX, t.clientY - centerY);
    
    if (distFromCenter < 60) {
        gameMode = (gameMode === "EXPLORE") ? "HACKING" : "EXPLORE";
        return;
    }
    if (gameMode === "EXPLORE") {
        joy.active = true;
        joy.startX = t.clientX;
        joy.startY = t.clientY;
    }
});

window.addEventListener("touchmove", (e) => {
    if (!joy.active || gameMode !== "EXPLORE") return;
    player.vx = (e.touches[0].clientX - joy.startX) / 10;
    player.vy = (e.touches[0].clientY - joy.startY) / 10;
});

window.addEventListener("touchend", () => {
    joy.active = false;
    player.vx = 0; player.vy = 0;
});

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (gameMode === "EXPLORE") {
        // 壁判定：画面内に留める
        player.x = Math.max(0, Math.min(window.innerWidth - player.size, player.x + player.vx));
        player.y = Math.max(0, Math.min(window.innerHeight - player.size, player.y + player.vy));

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const distToAI = Math.hypot(player.x + player.size/2 - centerX, player.y + player.size/2 - centerY);

        ctx.strokeStyle = (distToAI < 100) ? "#f0f" : "#0ff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = (distToAI < 100) ? "#f0f" : "#0ff";
        ctx.textAlign = "center";
        ctx.font = "bold 20px 'Courier New'";
        ctx.fillText((distToAI < 100) ? "TAP TO HACK" : "SYSTEM_LOCKED", centerX, centerY + 100);

        ctx.fillStyle = "#fff";
        ctx.fillRect(player.x, player.y, player.size, player.size);
    } else {
        ctx.fillStyle = "rgba(0,0,0,0.9)";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        if (typeof drawKeypad === 'function') drawKeypad(ctx, window.innerWidth, window.innerHeight);
    }
    requestAnimationFrame(loop);
}
loop();
