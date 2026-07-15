// ... (上の移動ロジックはそのまま)

// モード管理用変数
let gameMode = "EXPLORE"; // "EXPLORE" か "HACKING"

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // プレイヤー移動（探索モードの時だけ動ける）
    if (gameMode === "EXPLORE") {
        player.x += player.vx;
        player.y += player.vy;
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dist = Math.hypot(player.x - centerX, player.y - centerY);

    // 1. 探索モードの描画
    if (gameMode === "EXPLORE") {
        // AIホログラム
        ctx.strokeStyle = (dist < 100) ? "#f0f" : "#0ff";
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
        ctx.stroke();

        // プレイヤー
        ctx.fillStyle = "#fff";
        ctx.fillRect(player.x, player.y, player.size, player.size);

        // アクセス判定でモード切り替え
        if (dist < 100) {
            ctx.fillStyle = "#fff";
            ctx.fillText("TAP to HACK", centerX, centerY + 100);
            // タッチでハッキングモードへ（後で実装）
        }
    } 
    // 2. ハッキングモードの描画
    else if (gameMode === "HACKING") {
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0f0";
        ctx.fillText("ENTER PASSWORD", centerX, centerY - 50);
        // ここにテンキーを置いていく
    }
    
    requestAnimationFrame(loop);
}
