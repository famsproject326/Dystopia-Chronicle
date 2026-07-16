let joy = { active: false, startX: 0, startY: 0 };
window.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    if (typeof isTalking !== "undefined" && isTalking()) { closeTalk(); return; }
    if (touch.clientX < UI.roomButtonWidth) { gameState.roomIndex = (gameState.roomIndex - 1 + 4) % 4; return; }
    if (touch.clientX > window.innerWidth - UI.roomButtonWidth) { gameState.roomIndex = (gameState.roomIndex + 1) % 4; return; }
    joy.active = true; joy.startX = touch.clientX; joy.startY = touch.clientY;
});
window.addEventListener("touchmove", (e) => {
    if (!joy.active || gameState.mode !== "EXPLORE") return;
    const touch = e.touches[0];
    player.vx = (touch.clientX - joy.startX) / 10;
    player.vy = (touch.clientY - joy.startY) / 10;
});
window.addEventListener("touchend", () => { joy.active = false; stopPlayer(); });
