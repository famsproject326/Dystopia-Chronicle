// ======================================
// Project Dystopia Chronicle
// save.js
// セーブ・ロード
// ======================================


// ======================================
// セーブ
// ======================================

function saveGame(){

    const saveData = {

        chapterIndex,

        storyIndex,

        roomIndex,

        player: {

            x: player.x,
            y: player.y

        },

        flags

    };

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(saveData)
    );

}


// ======================================
// ロード
// ======================================

function loadGame(){

    const data = localStorage.getItem(SAVE_KEY);

    if(!data) return false;

    const saveData = JSON.parse(data);

    chapterIndex = saveData.chapterIndex;
    storyIndex = saveData.storyIndex;
    roomIndex = saveData.roomIndex;

    player.x = saveData.player.x;
    player.y = saveData.player.y;

    Object.assign(flags, saveData.flags);

    return true;

}


// ======================================
// セーブ削除
// ======================================

function deleteSave(){

    localStorage.removeItem(SAVE_KEY);

}