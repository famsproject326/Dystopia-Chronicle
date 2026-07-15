// ======================================
// Project Dystopia Chronicle
// stage.js
// ステージデータ
// ======================================

const stages = [

    // ======================================
    // Stage 1
    // ======================================
    {
        id: 0,

        name: "研究施設",

        startRoom: 2,

        spawn: {
            x: window.innerWidth / 2 - PLAYER.size / 2,
            y: window.innerHeight - 100
        },

        elevator: {
            room: 2,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            password: ELEVATOR.password
        }
    },



    // ======================================
    // Stage 2
    // ======================================
    {
        id: 1,

        name: "地下通路",

        startRoom: 0,

        spawn: {
            x: window.innerWidth / 2 - PLAYER.size / 2,
            y: window.innerHeight - 100
        },

        elevator: {
            room: 1,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            password: "5678"
        }
    },



    // ======================================
    // Stage 3
    // ======================================
    {
        id: 2,

        name: "管理エリア",

        startRoom: 1,

        spawn: {
            x: window.innerWidth / 2 - PLAYER.size / 2,
            y: window.innerHeight - 100
        },

        elevator: {
            room: 3,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            password: "9999"
        }
    }

];



// ======================================
// 現在のステージ取得
// ======================================

function getCurrentStage(){

    return stages[getCurrentChapter().stage];

}



// ======================================
// ステージ読み込み
// ======================================

function loadStage(){

    const stage = getCurrentStage();

    roomIndex = stage.startRoom;

    player.x = stage.spawn.x;
    player.y = stage.spawn.y;

}