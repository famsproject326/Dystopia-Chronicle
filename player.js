// ======================================
// Project Dystopia Chronicle
// player.js
// プレイヤー管理
// ======================================

let player = {
    x: 0,
    y: 0,

    size: PLAYER.size,

    vx: 0,
    vy: 0
};


// ======================================
// プレイヤー初期化
// ======================================

function resetPlayer(){

    const stage = getCurrentStage();

    player.x = stage.spawn.x;
    player.y = stage.spawn.y;

    player.vx = 0;
    player.vy = 0;

}


// ======================================
// プレイヤー更新
// ======================================

function updatePlayer(){

    player.x += player.vx;
    player.y += player.vy;

    player.x = Math.max(
        0,
        Math.min(window.innerWidth - player.size, player.x)
    );

    player.y = Math.max(
        0,
        Math.min(window.innerHeight - player.size, player.y)
    );

}


// ======================================
// プレイヤー描画
// ======================================

function drawPlayer(ctx){

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(
        player.x,
        player.y,
        player.size,
        player.size
    );

}


// ======================================
// プレイヤー停止
// ======================================

function stopPlayer(){

    player.vx = 0;
    player.vy = 0;

}


// ======================================
// 距離計算
// ======================================

function getDistance(x, y){

    return Math.hypot(
        (player.x + player.size / 2) - x,
        (player.y + player.size / 2) - y
    );

}