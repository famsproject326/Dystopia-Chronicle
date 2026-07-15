// ======================================
// Project Dystopia Chronicle
// story.js
// ストーリー・章データ
// ======================================

const chapters = [

    // ======================================
    // Chapter 1
    // ======================================
    {
        title: "CHAPTER 1",
        stage: 0,

        story: [
            "20XX年",
            "世界は巨大企業『NEXUS』に支配されていた。",
            "人々は自由を失い、監視社会の中で生きている。",
            "ヒロたちは、この世界を変えるため動き出した。",
            "まずは施設から脱出しろ。"
        ]
    },

    // ======================================
    // Chapter 2
    // ======================================
    {
        title: "CHAPTER 2",
        stage: 1,

        story: [
            "EVは起動した。",
            "しかし警備システムが異常を検知。",
            "新たなフロアへ向かう。"
        ]
    },

    // ======================================
    // Chapter 3
    // ======================================
    {
        title: "CHAPTER 3",
        stage: 2,

        story: [
            "施設の奥で、新たな真実を知る。",
            "NEXUSの計画とは……。"
        ]
    }

];


// ======================================
// 現在の進行状況
// ======================================

let chapterIndex = STORY.firstChapter;
let storyIndex = 0;


// ======================================
// 現在のChapterを取得
// ======================================

function getCurrentChapter() {
    return chapters[chapterIndex];
}


// ======================================
// 現在表示するストーリー文章
// ======================================

function getCurrentStory() {
    return chapters[chapterIndex].story[storyIndex];
}


// ======================================
// 次の文章へ
// 戻り値
// true = 次がある
// false = 最後まで読んだ
// ======================================

function nextStory() {

    storyIndex++;

    if (storyIndex >= chapters[chapterIndex].story.length) {
        storyIndex = 0;
        return false;
    }

    return true;

}


// ======================================
// 次のChapterへ
// ======================================

function nextChapter() {

    chapterIndex++;

    storyIndex = 0;

}


// ======================================
// エンディング判定
// ======================================

function isEnding() {
    return chapterIndex >= chapters.length;
}