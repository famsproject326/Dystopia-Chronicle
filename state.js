// ======================================
// Project Dystopia Chronicle
// state.js
// ゲームの状態管理
// ======================================

const gameState = {
    mode: "EXPLORE",      // "EXPLORE", "STORY", "HACKING"
    roomIndex: 2,         // 現在の部屋
    chapterIndex: 0,      // 現在の章
    storyIndex: 0,        // 現在のストーリー行
    inputCode: []         // 入力中のコード
};
