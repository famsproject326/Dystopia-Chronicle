// ======================================
// Project Dystopia Chronicle
// flags.js
// ゲーム進行フラグ
// ======================================

const flags = {

    // Chapter1
    talkedHiro: false,
    talkedR4: false,
    talkedShou: false,
    talkedTaI: false,
    talkedZima: false,

    gotKey: false,

    hackedElevator: false,

    bossDefeated: false

};


// ================================
// フラグ取得
// ================================

function getFlag(name){

    return flags[name];

}


// ================================
// フラグON
// ================================

function setFlag(name){

    if(flags.hasOwnProperty(name)){
        flags[name] = true;
    }

}


// ================================
// フラグOFF
// ================================

function clearFlag(name){

    if(flags.hasOwnProperty(name)){
        flags[name] = false;
    }

}


// ================================
// 全フラグ初期化
// ================================

function resetFlags(){

    for(const key in flags){
        flags[key] = false;
    }

}