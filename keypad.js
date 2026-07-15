function drawKeypad(ctx, width, height) {
    ctx.fillStyle = "#0f0";
    ctx.font = "25px 'Courier New'";
    ctx.textAlign = "center";
    ctx.fillText("ENTER 4-DIGIT CODE", width / 2, height / 2 - 150);

    // ★修正ポイント：ボタン3個分(150px)＋間隔分を考慮して中央に寄せる
    const buttonSize = 50;
    const gap = 10;
    const totalWidth = (buttonSize * 3) + (gap * 2);
    const startX = (width / 2) - (totalWidth / 2); 
    const startY = (height / 2) - 80;

    for (let i = 0; i < 9; i++) {
        let x = startX + (i % 3) * (buttonSize + gap);
        let y = startY + Math.floor(i / 3) * (buttonSize + gap);
        
        ctx.strokeStyle = "#0f0";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, buttonSize, buttonSize);
        ctx.fillText((i + 1).toString(), x + (buttonSize / 2), y + (buttonSize / 2) + 8);
    }
}
