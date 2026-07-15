const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: canvas.width / 2, y: canvas.height / 2, size: 30, vx: 0, vy: 0 };
let joy = { active: false, startX: 0, startY: 0 };

// タッチ操作：どこでも触ったところが起点
window.addEventListener("touchstart", (e) => {
    joy.active = true;
    joy.startX = e.touches[0].clientX;
    joy.startY = e.touches[0].clientY;
});

window.addEventListener("touchmove", (e) => {
    if (!joy.active) return;
    // 触った位置からの差分で移動速度を決める
    player.vx = (e.touches[0].clientX - joy.startX) / 10;
    player.vy = (e.touches[0].clientY - joy.startY) / 10;
});

window.addEventListener("touchend", () => {
    joy.active = false;
    player.vx = 0; player.vy = 0;
});

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // プレイヤー移動
    player.x += player.vx;
    player.y += player.vy;

    // 描画：AIホログラム（中央）
    ctx.strokeStyle = "#0ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 60, 0, Math.PI * 2);
    ctx.stroke();

    // 描画：プレイヤー（白四角復活）
    ctx.fillStyle = "#fff";
    ctx.fillRect(player.x, player.y, player.size, player.size);
    
    requestAnimationFrame(loop);
}
loop();
