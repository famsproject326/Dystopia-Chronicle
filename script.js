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
    0: ["ヒロ", "R4"],       // 302号室
    1: ["ジーマ", "ショウ"],  // 303号室
    2: [],                    // ロビー
    3: ["タイ"]               // 301号室
};

// 部屋の名前リスト（一周用）
const roomNames = ["302", "303", "ロビー", "301"];

let player = { x: window.innerWidth / 2 - 15, y: window.innerHeight - 100, size: 30, vx: 0, vy: 0 };
let joy = { active: false, startX: 0, startY: 0 };
let gameMode = "EXPLORE";
let roomIndex = 2; // 初期位置：ロビー
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
    // 左右の移動ボタン（一周ロジック）
    if (t.clientX < btnArea && t.clientY > window.innerHeight/2 - btnArea && t.clientY < window.innerHeight/2 + btnArea) { 
        roomIndex = (roomIndex === 0) ? 3 : roomIndex - 1; return; 
    }
    if (t.clientX > window.innerWidth - btnArea && t.clientY > window.innerHeight/2 - btnArea && t.clientY < window.innerHeight/2 + btnArea) { 
        roomIndex = (roomIndex === 3) ? 0 : roomIndex + 1; return; 
    }

    // EVボタンの当たり判定（四角形）
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    if (t.clientX > centerX - 50 && t.clientX < centerX + 50 && t.clientY > centerY - 50 && t.clientY < centerY + 50) {
        if (roomIndex === 2) { alert("EV起動コードを入力せよ"); gameMode = "HACKING"; return; }
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
        
        ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.font = "20px 'Courier New'";
        ctx.fillText("ROOM: " + roomNames[roomIndex], window.innerWidth/2, 50);
        
        ctx.textAlign = "left"; ctx.fillStyle = "#ff0";
        ctx.font = "18px 'Courier New'";
        const chars = roomCharacters[roomIndex] || [];
        chars.forEach((name, i) => ctx.fillText(name, 20, 100 + (i * 30)));

        ctx.textAlign = "center";
        ctx.fillText("<", 50, window.innerHeight / 2);
        ctx.fillText(">", window.innerWidth - 50, window.innerHeight / 2);
        
        // EV起動ボタン（四角）
        ctx.strokeStyle = "#00f";
        ctx.strokeRect(window.innerWidth/2 - 50, window.innerHeight/2 - 50, 100, 100);
        ctx.fillText("EV", window.innerWidth/2, window.innerHeight/2 + 80);

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
