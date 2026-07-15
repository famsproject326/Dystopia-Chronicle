const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
ctx.scale(dpr, dpr);

// --- キャラクター配置データ ---
const roomCharacters = {
    0: ["ジーマ", "ショウ"], // 303号室
    1: ["R4", "ヒロ"],      // 302号室
    2: ["タイ"]             // 301号室
};

let player = { x: window.innerWidth / 2 - 15, y: window.innerHeight - 100, size: 30, vx: 0, vy: 0 };
let joy = { active: false, startX: 0, startY: 0 };
let gameMode = "EXPLORE";
let roomIndex = 1;
let inputCode = [];

window.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    
    if (gameMode === "HACKING") {
        if (t.clientY < 80) { gameMode = "EXPLORE"; inputCode = []; return; }
        const clickedNum = checkKeypadClick(t.clientX, t.clientY);
        if (clickedNum !== null) {
            inputCode.push(clickedNum);
            if (inputCode.length === 4) {
                if (inputCode.join("") === "1234") { alert("ACCESS GRANTED!"); gameMode = "EXPLORE"; }
                else { alert("WRONG CODE"); }
                inputCode = [];
            }
        }
        return; 
    }

    const btnArea = 100;
    if (t.clientX < btnArea && t.clientY > window.innerHeight/2 - btnArea && t.clientY < window.innerHeight/2 + btnArea && roomIndex > 0) { roomIndex--; return; }
    if (t.clientX > window.innerWidth - btnArea && t.clientY > window.innerHeight/2 - btnArea && t.clientY < window.innerHeight/2 + btnArea && roomIndex < 2) { roomIndex++; return; }

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const distFromCenter = Math.hypot(t.clientX - centerX, t.clientY - centerY);
    const playerDist = Math.hypot((player.x + 15) - centerX, (player.y + 15) - centerY);
    if (roomIndex === 1 && distFromCenter < 100 && playerDist < 120) { gameMode = "HACKING"; return; }

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
        
        ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.font = "20px 'Courier New'";
        ctx.fillText("ROOM: " + (roomIndex === 0 ? "303" : roomIndex === 1 ? "302" : "301"), window.innerWidth/2, 50);
        
        // --- キャラクター名前のみ表示 ---
        ctx.textAlign = "left"; ctx.fillStyle = "#ff0";
        ctx.font = "18px 'Courier New'";
        const chars = roomCharacters[roomIndex] || [];
        chars.forEach((name, i) => ctx.fillText(name, 20, 100 + (i * 30)));

        if (roomIndex > 0) { ctx.textAlign = "center"; ctx.fillText("<", 50, window.innerHeight / 2); }
        if (roomIndex < 2) { ctx.textAlign = "center"; ctx.fillText(">", window.innerWidth - 50, window.innerHeight / 2); }
        
        if (roomIndex === 1) {
            const d = Math.hypot((player.x + 15) - window.innerWidth/2, (player.y + 15) - window.innerHeight/2);
            ctx.strokeStyle = (d < 100) ? "#f0f" : "#0ff";
            ctx.beginPath(); ctx.arc(window.innerWidth/2, window.innerHeight/2, 60, 0, Math.PI*2); ctx.stroke();
            ctx.fillText((d < 100) ? "TAP TO HACK" : "LOCKED", window.innerWidth/2, window.innerHeight/2 + 100);
        }
        ctx.fillStyle = "#fff"; ctx.fillRect(player.x, player.y, 30, 30);
    } else {
        ctx.fillStyle = "rgba(0,0,0,0.95)"; ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = "#f00"; ctx.fillText("[BACK]", window.innerWidth/2, 50);
        ctx.fillStyle = "#fff"; ctx.fillText("CODE: " + inputCode.join(""), window.innerWidth/2, 100);
        drawKeypad(ctx, window.innerWidth, window.innerHeight);
    }
    requestAnimationFrame(loop);
}
loop();
