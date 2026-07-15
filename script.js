const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 解像度調整
const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
ctx.scale(dpr, dpr);

let player = { x: window.innerWidth / 2 - 15, y: window.innerHeight / 2 - 15, size: 30, vx: 0, vy: 0 };
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
        player.x = Math.max(0, Math.min(window.innerWidth - player.size, player.x + player.vx));
        player.y = Math.max(0, Math.min(window.innerHeight - player.size, player.y + player.vy));

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const pCenterX = player.x + player.size / 2;
        const pCenterY = player.y + player.size / 2;
        const distToAI = Math.hypot(pCenterX - centerX, pCenterY - centerY);

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
        if (typeof drawKeypad !== 'undefined') {
            drawKeypad(ctx, window.innerWidth, window.innerHeight);
        }
    }
    requestAnimationFrame(loop);
}

// 実行開始
loop();
