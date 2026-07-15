const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
ctx.scale(dpr, dpr);

const roomCharacters = { 0: ["ヒロ", "R4"], 1: ["ジーマ", "ショウ"], 2: [], 3: ["タイ"] };
const roomNames = ["302", "303", "ロビー", "301"];

let player = { x: window.innerWidth / 2 - 15, y: window.innerHeight - 100, size: 30, vx: 0, vy: 0 };
let gameMode = "EXPLORE";
let roomIndex = 2;
let inputCode = [];

window.addEventListener("touchstart", (e) => {
    const t = e.touches[0];

    // HACKING中の処理
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

    // EVボタン（四角）の判定：ロビー(2)の時だけ有効
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    if (roomIndex === 2 && t.clientX > centerX - 50 && t.clientX < centerX + 50 && t.clientY > centerY - 50 && t.clientY < centerY + 50) {
        gameMode = "HACKING"; return;
    }

    // 部屋移動（左右ボタン）
    if (t.clientX < 100) { roomIndex = (roomIndex === 0) ? 3 : roomIndex - 1; }
    else if (t.clientX > window.innerWidth - 100) { roomIndex = (roomIndex === 3) ? 0 : roomIndex + 1; }
});

function loop() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (gameMode === "EXPLORE") {
        ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.font = "20px 'Courier New'";
        ctx.fillText("ROOM: " + roomNames[roomIndex], window.innerWidth/2, 50);
        
        ctx.textAlign = "left"; ctx.fillStyle = "#ff0";
        roomCharacters[roomIndex].forEach((name, i) => ctx.fillText(name, 20, 100 + (i * 30)));

        ctx.textAlign = "center";
        ctx.fillText("<", 50, window.innerHeight / 2);
        ctx.fillText(">", window.innerWidth - 50, window.innerHeight / 2);
        
        // EV四角ボタンの描画（ロビーのみ）
        if (roomIndex === 2) {
            ctx.strokeStyle = "#00f";
            ctx.strokeRect(window.innerWidth/2 - 50, window.innerHeight/2 - 50, 100, 100);
            ctx.fillText("EV", window.innerWidth/2, window.innerHeight/2 + 80);
        }
    } else {
        ctx.fillStyle = "rgba(0,0,0,0.95)"; ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = "#f00"; ctx.fillText("[BACK]", window.innerWidth/2, 50);
        ctx.fillStyle = "#fff"; ctx.fillText("CODE: " + inputCode.join(""), window.innerWidth/2, 100);
        drawKeypad(ctx, window.innerWidth, window.innerHeight);
    }
    requestAnimationFrame(loop);
}
loop();
