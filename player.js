let player = { x: 0, y: 0, size: PLAYER.size, vx: 0, vy: 0 };
function resetPlayer(){
    const stage = getCurrentStage();
    player.x = window.innerWidth / 2 - player.size / 2;
    player.y = window.innerHeight - 150;
}
function updatePlayer(){
    player.x = Math.max(0, Math.min(window.innerWidth - player.size, player.x + player.vx));
    player.y = Math.max(0, Math.min(window.innerHeight - player.size, player.y + player.vy));
}
function drawPlayer(ctx){ ctx.fillStyle = "#ffffff"; ctx.fillRect(player.x, player.y, player.size, player.size); }
function stopPlayer(){ player.vx = 0; player.vy = 0; }
