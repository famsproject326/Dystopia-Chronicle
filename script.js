const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
ctx.scale(dpr, dpr);

const roomNames = ["302", "303", "ロビー", "301"];

// キャラクターデータ（名前、部屋、座標、セリフ）
const characters = [
    { name: "ヒロ", room: 0, x: 100, y: 300, talk: "……準備はいいか？" },
    { name: "R4", room: 0, x: 250, y: 300, talk: "システムは安定している。" },
    { name: "ジーマ", room: 1, x: 100, y: 400, talk: "ここで何を見つけたんだ？" },
    { name: "ショウ", room: 1, x: 250, y: 400, talk: "……静かにしろ。" },
    { name: "タイ", room: 3, x: 200, y: 350, talk: "あんたもここから出るつもりか？" }
];

let player = { x: window.innerWidth / 2 - 15, y: window.innerHeight - 100, size: 30, vx: 0, vy: 0 };
let joy = { active: false, startX: 0, startY: 0 };
let gameMode = "EXPLORE";
let roomIndex = 2; // 初期位置：ロビー
let inputCode = [];
let talkMessage = ""; // 会話用

window.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    
    // 会話中ならタップで閉じる
    if (talkMessage !== "") { talkMessage = ""; return; }

    if (gameMode === "HACKING") {
        if (t.clientY < 80) { gameMode = "EXPLORE"; inputCode = []; return; }
        const clickedNum = checkKeypadClick(t.clientX, t.clientY);
        if (clickedNum !== null) {
            inputCode.push(clickedNum);
            if (inputCode.length === 4) {
                if (inputCode.join("") === "1234") { alert("EV ACTIVATED"); gameMode = "EXPLORE"; }
                else { alert("WRONG CODE"); }
                inputCode = [];
            }
        }
        return;
    }

    joy.active = true; joy.startX = t.clientX; joy.startY = t.clientY;

    // キャラクターとの会話判定
    const charsInRoom = characters.filter(c => c.room === roomIndex);
    for (let char of charsInRoom) {
        const distToChar = Math.hypot((player.x + 15) - (char.x + 15), (player.y + 15) - (char.y + 15));
        const distToTouch = Math.hypot(t.clientX - char.x, t.clientY - char.y);
        if (distToChar < 150 && distToTouch < 100) {
            talkMessage = char.name + ": " + char.talk;
            return;
        }
    }

    // EV判定
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const distToPlayer = Math.hypot((player.x + 15) - centerX, (player.y + 15) - centerY);
    if (roomIndex === 2 && t.clientX > centerX - 50 && t.clientX < centerX + 50 && t.clientY > centerY - 50 && t.clientY < centerY + 50 && distToPlayer < 120) {
        gameMode = "HACKING"; return;
    }

    if (t.clientX < 100) { roomIndex = (roomIndex === 0) ? 3 : roomIndex - 1; }
    else if (t.clientX > window.innerWidth - 100) { roomIndex = (roomIndex === 3) ? 0 : roomIndex + 1; }
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
        
        // キャラクター描画
        characters.filter(c => c.room === roomIndex).forEach(c => {
            ctx.fillStyle = "#0f0"; ctx.fillRect(c.x, c.y, 30, 30);
            ctx.fillStyle = "#fff"; ctx.font = "14px 'Courier New'"; ctx.fillText(c.name, c.x + 15, c.y - 10);
        });

        // 会話ウィンドウ
        if (talkMessage) {
            ctx.fillStyle = "rgba(0,0,0,0.9)"; ctx.fillRect(0, window.innerHeight - 120, window.innerWidth, 120);
            ctx.fillStyle = "#fff"; ctx.font = "16px 'Courier New'"; ctx.fillText(talkMessage, window.innerWidth / 2, window.innerHeight - 60);
        }

        ctx.textAlign = "center"; ctx.font = "20px 'Courier New'";
        ctx.fillText("<", 50, window.innerHeight / 2);
        ctx.fillText(">", window.innerWidth - 50, window.innerHeight / 2);
        
        if (roomIndex === 2) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const dist = Math.hypot((player.x + 15) - centerX, (player.y + 15) - centerY);
            ctx.strokeStyle = (dist < 120) ? "#f0f" : "#00f";
            ctx.strokeRect(centerX - 50, centerY - 50, 100, 100);
            ctx.fillText("EV", centerX, centerY + 80);
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
