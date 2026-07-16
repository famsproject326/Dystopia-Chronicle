const stages = [
    { id: 0, name: "研究施設", startRoom: 2 },
    { id: 1, name: "地下通路", startRoom: 0 },
    { id: 2, name: "管理エリア", startRoom: 1 }
];
function getCurrentStage(){ return stages[gameState.chapterIndex]; }
function loadStage(){
    const stage = getCurrentStage();
    gameState.roomIndex = stage.startRoom;
}
