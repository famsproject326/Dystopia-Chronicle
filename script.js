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
let roomIndex = 1;

window.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    
    // ハッキング画面の処理
    if (gameMode === "HACKING") {
        // [戻るボタン] のエリア(上部60px)だけをタップした時だけ戻る
        if (t.clientY < 60) {
            gameMode = "EXPLORE";
            return;
        }
        // それ以外の場所（数字ボタン）の判定
        const clickedNum = checkKeypadClick(t.clientX, t.clientY);
        if (clickedNum !== null) console.log("入力: " + clickedNum);
        return;
    }

    // 部屋移動 (左右15%)
    if (t.clientX < window.innerWidth * 0.15 && roomIndex > 0) { roomIndex--; return; }
    if (t.clientX > window.innerWidth * 0.85 && roomIndex < 2) { roomIndex++; return; }

    // AIエリア (中央の部屋のみ)
    if (roomIndex === 1) {
        const dist = Math.hypot((player.x + 15) - window.innerWidth/2, (player.y + 15) - window.innerHeight/2);
        if (dist < 120) { gameMode = "HACKING"; return; }
    }

    joy.active = true; joy.startX = t.clientX; joy.startY = t.clientY;
});

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
        
        ctx.fillStyle = "#fff"; ctx.font = "20px 'Courier New'"; ctx.textAlign = "center";
        ctx.fillText("ROOM: " + roomIndex, window.innerWidth/2, 50);
        if (roomIndex > 0) ctx.fillText("<", 30, window.innerHeight / 2);
        if (roomIndex < 2) ctx.fillText(">", window.innerWidth - 30, window.innerHeight / 2);

        if (roomIndex === 1) {
            const dist = Math.hypot((player.x + 15) - window.innerWidth/2, (player.y + 15) - window.innerHeight/2);
            ctx.strokeStyle = (dist < 100) ? "#f0f" : "#0ff";
            ctx.beginPath(); ctx.arc(window.innerWidth/2, window.innerHeight/2, 60, 0, Math.PI*2); ctx.stroke();
            ctx.fillText((dist < 100) ? "TAP TO HACK" : "LOCKED", window.innerWidth/2, window.innerHeight/2 + 100);
        }
        ctx.fillStyle = "#fff"; ctx.fillRect(player.x, player.y, 30, 30);
    } else {
        ctx.fillStyle = "rgba(0,0,0,0.9)"; ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = "#f00"; ctx.textAlign = "center"; ctx.fillText("[BACK TO ROOM]", window.innerWidth/2, 40);
        drawKeypad(ctx, window.innerWidth, window.innerHeight);
    }
    requestAnimationFrame(loop);
}
loop();
