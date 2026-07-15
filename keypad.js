let buttons = [];
function drawKeypad(ctx, width, height) {
    ctx.fillStyle = "#0f0"; ctx.font = "25px 'Courier New'"; ctx.textAlign = "center";
    ctx.fillText("ENTER 4-DIGIT CODE", width / 2, height / 2 - 150);
    const sz = 50, gap = 10, startX = (width/2) - (sz*1.5 + gap), startY = (height/2) - 80;
    buttons = [];
    for (let i = 0; i < 9; i++) {
        let x = startX + (i % 3) * (sz + gap), y = startY + Math.floor(i / 3) * (sz + gap);
        buttons.push({ num: i + 1, x: x, y: y, size: sz });
        ctx.strokeRect(x, y, sz, sz);
        ctx.fillText((i + 1).toString(), x + 25, y + 35);
    }
}
function checkKeypadClick(tx, ty) {
    for (let b of buttons) if (tx > b.x && tx < b.x + b.size && ty > b.y && ty < b.y + b.size) return b.num;
    return null;
}
