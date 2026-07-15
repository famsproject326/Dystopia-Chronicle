// ======================================
// Project Dystopia Chronicle
// utils.js
// 汎用ユーティリティ関数
// ======================================

// 距離計算（既存のplayer.jsから移設）
function getDistance(x1, y1, x2, y2) {
    return Math.hypot(x1 - x2, y1 - y2);
}

// 画面サイズに基づいた座標補正などは今後ここに追加
