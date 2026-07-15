const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
ctx.scale(dpr, dpr);

let player = { x: window.innerWidth / 2 - 15, y: window.innerHeight - 100, size: 30, vx: 0, vy: 0 };
let joy = { active: false, startX: 0, startY: 0 };
let gameMode = "EXPLORE";
let roomIndex = 1; // 0:左, 1:中央, 2:右

window.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    
    // 左右移動ボタン判定
    if (gameMode === "EXPLORE") {
        if (t.clientX < window.innerWidth * 0.15 && roomIndex > 0) { roomIndex--; return; }
        if (t.clientX > window.innerWidth * 0.85 && roomIndex < 2) { roomIndex++; return; }
    }

    // ハッキング切り替え（中央の部屋のみ）
    if (roomIndex === 1) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const distFromCenter = Math.hypot(t.clientX - centerX, t.clientY - centerY);
        if (distFromCenter < 60) {
            gameMode = (gameMode === "EXPLORE") ? "HACKING" : "EXPLORE";
            return;
        }
    }

    if (gameMode === "EXPLORE") {
        joy.active = true;
        joy.startX = t.clientX;
        joy.startY = t.clientY;
    }
});

// (touchmove, touchend はそのまま維持)
window.addEventListener("touchmove", (e) => {
    if (!joy.active || gameMode !== "EXPLORE") return;
    player.vx = (e.touches[0].clientX - joy.startX) / 10;
    player.vy = (e.touches[0].clientY - joy.startY) / 10;
});
window.addEventListener("touchend", () => { joy.active = false; player.vx = 0; player.vy = 0; });

function loop() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    if (gameMode === "EXPLORE") {
        player.x = Math.max(0, Math.min(window.innerWidth - player.size, player.x + player.vx));
        player.y = Math.max(0, Math.min(window.innerHeight - player.size, player.y + player.vy));

        // 部屋ごとの描画
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.font = "20px 'Courier New'";
        ctx.fillText("ROOM: " + (roomIndex === 0 ? "LEFT" : roomIndex === 1 ? "CENTER" : "RIGHT"), window.innerWidth/2, 50);

        // 移動矢印
        if (roomIndex > 0) ctx.fillText("<", 30, window.innerHeight / 2);
        if (roomIndex < 2) ctx.fillText(">", window.innerWidth - 30, window.innerHeight / 2);

        // 中央のAIホログラム
        if (roomIndex === 1) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            ctx.strokeStyle = "#0ff";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillText("TAP TO HACK", centerX, centerY + 100);
        }

        ctx.fillStyle = "#fff";
        ctx.fillRect(player.x, player.y, player.size, player.size);
    } else {
        ctx.fillStyle = "rgba(0,0,0,0.9)";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        if (typeof drawKeypad !== 'undefined') drawKeypad(ctx, window.innerWidth, window.innerHeight);
    }
    requestAnimationFrame(loop);
}
loop();
