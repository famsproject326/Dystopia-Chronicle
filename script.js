// ... (上の部分はそのまま)

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (gameMode === "EXPLORE") {
        // 壁判定と位置調整
        player.x = Math.max(0, Math.min(window.innerWidth - player.size, player.x + player.vx));
        player.y = Math.max(0, Math.min(window.innerHeight - player.size, player.y + player.vy));

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // ★プレイヤーの中心を計算（サイズ分だけ中央に寄せる）
        const pCenterX = player.x + player.size / 2;
        const pCenterY = player.y + player.size / 2;
        
        const distToAI = Math.hypot(pCenterX - centerX, pCenterY - centerY);

        // AIホログラム
        ctx.strokeStyle = (distToAI < 100) ? "#f0f" : "#0ff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = (distToAI < 100) ? "#f0f" : "#0ff";
        ctx.textAlign = "center";
        ctx.font = "bold 20px 'Courier New'";
        ctx.fillText((distToAI < 100) ? "TAP TO HACK" : "SYSTEM_LOCKED", centerX, centerY + 100);

        // プレイヤー描画
        ctx.fillStyle = "#fff";
        ctx.fillRect(player.x, player.y, player.size, player.size);
    } 
    // ... (else以下はそのまま)
    
    requestAnimationFrame(loop);
}
