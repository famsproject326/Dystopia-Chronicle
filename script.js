const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: canvas.width / 2, y: canvas.height / 2, size: 30, vx: 0, vy: 0 };
let joy = { active: false, startX: 0, startY: 0 };
let gameMode = "EXPLORE";

window.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dist = Math.hypot(t.clientX - centerX, t.clientY - centerY);

    // AIの円の中をタップしたらハッキングモードへ
    if (gameMode === "EXPLORE" && dist < 60) {
        gameMode = "HACKING";
        return;
    }

    // それ以外の場所は移動ジョイスティックの起点
    if (gameMode === "EXPLORE") {
        joy.active = true;
        joy.startX = t.clientX;
        joy.startY = t.clientY;
    } else {
        // ハッキングモード中にタップしたら戻る
        gameMode = "EXPLORE";
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
        player.x += player.vx;
        player.y += player.vy;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const distToAI = Math.hypot(player.x - centerX, player.y - centerY);
        const isNear = distToAI < 100;

        ctx.strokeStyle = isNear ? "#f0f" : "#0ff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = isNear ? "#f0f" : "#0ff";
        ctx.font = "bold 20px 'Courier New'";
        ctx.textAlign = "center";
        ctx.fillText(isNear ? "TAP AI TO HACK" : "SYSTEM_LOCKED", centerX, centerY + 100);

        ctx.fillStyle = "#fff";
        ctx.fillRect(player.x, player.y, player.size, player.size);
    } else {
        // ハッキング画面
        ctx.fillStyle = "rgba(0,0,0,0.9)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0f0";
        ctx.font = "30px 'Courier New'";
        ctx.textAlign = "center";
        ctx.fillText("PASSWORD REQUIRED", canvas.width/2, canvas.height/2);
    }
    requestAnimationFrame(loop);
}
loop();
