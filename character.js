// ======================================
// Project Dystopia Chronicle
// character.js
// キャラクターデータ
// ======================================

const characters = [

    {
        id: 0,
        name: "ヒロ",
        stage: 0,
        room: 0,

        x: 100,
        y: 300,

        talk: [
            "……準備はいいか？"
        ],

        event: null
    },

    {
        id: 1,
        name: "R4",
        stage: 0,
        room: 0,

        x: 250,
        y: 300,

        talk: [
            "システムは安定している。"
        ],

        event: null
    },

    {
        id: 2,
        name: "ジーマ",
        stage: 0,
        room: 1,

        x: 100,
        y: 400,

        talk: [
            "ここで何を見つけたんだ？"
        ],

        event: null
    },

    {
        id: 3,
        name: "ショウ",
        stage: 0,
        room: 1,

        x: 250,
        y: 400,

        talk: [
            "……静かにしろ。"
        ],

        event: null
    },

    {
        id: 4,
        name: "タイ",
        stage: 0,
        room: 3,

        x: 200,
        y: 350,

        talk: [
            "あんたもここから出るつもりか？"
        ],

        event: null
    }

];

function getCharactersInRoom(room){

    return characters.filter(character =>
        character.stage === getCurrentChapter().stage &&
        character.room === room
    );

}