function drawKeypad(ctx, width, height) {
    ctx.fillStyle = "#0f0";
    ctx.font = "25px 'Courier New'";
    ctx.textAlign = "center";
    ctx.fillText("ENTER 4-DIGIT CODE", width / 2, height / 2 - 150);

    const startX = (width / 2) - 80;
    const startY = (height / 2) - 80;

    for (let i = 0; i < 9; i++) {
        let x = startX + (i % 3) * 60;
        let y = startY + Math.floor(i / 3) * 60;
        ctx.strokeStyle = "#0f0";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, 50, 50);
        ctx.fillText((i + 1).toString(), x + 25, y + 35);
    }
}
