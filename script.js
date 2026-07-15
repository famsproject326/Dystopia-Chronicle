const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

let player = { x: 200, y: 200, size: 30, dx: 0, dy: 0 };
let joy = { active: false, startX: 0, startY: 0, moveX: 0, moveY: 0 };

// タッチイベント（ジョイスティック）
window.addEventListener("touchstart", (e) => {
    let t = e.touches[0];
    if (t.clientX < 200 && t.clientY > window.innerHeight - 200) {
        joy.active = true;
        joy.startX = t.clientX; joy.startY = t.clientY;
    }
});
window.addEventListener("touchmove", (e) => {
    if (!joy.active) return;
    let t = e.touches[0];
    joy.moveX = t.clientX - joy.startX;
    joy.moveY = t.clientY - joy.startY;
    player.dx = joy.moveX / 10;
    player.dy = joy.moveY / 10;
});
window.addEventListener("touchend", () => {
    joy.active = false;
    player.dx = 0; player.dy = 0;
});

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 移動
    player.x += player.dx;
    player.y += player.dy;

    // 描画：プレイヤー
    ctx.fillStyle = "#fff";
    ctx.fillRect(player.x, player.y, player.size, player.size);
    
    // 描画：AIホログラム（テスト配置）
    ctx.strokeStyle = "#0ff";
    ctx.strokeRect(canvas.width/2 - 50, canvas.height/2 - 50, 100, 100);

    requestAnimationFrame(loop);
}
loop();
