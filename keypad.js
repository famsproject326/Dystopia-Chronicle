function drawKeypad(ctx, width, height) {
    ctx.fillStyle = "#0f0";
    ctx.font = "25px 'Courier New'";
    ctx.textAlign = "center";
    ctx.fillText("ENTER 4-DIGIT CODE", width / 2, height / 4);

    for (let i = 0; i < 9; i++) {
        let x = (width / 2) - 60 + (i % 3) * 60;
        let y = (height / 2) - 60 + Math.floor(i / 3) * 60;
        ctx.strokeStyle = "#0f0";
        ctx.strokeRect(x, y, 50, 50);
        ctx.fillText((i + 1).toString(), x + 25, y + 35);
    }
}
