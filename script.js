// ========================================
// ひらがな一覧（67文字）
// ========================================

const hiraganaList = [

    "あ","い","う","え","お",

    "か","き","く","け","こ",

    "さ","し","す","せ","そ",

    "た","ち","つ","て","と",

    "な","に","ぬ","ね","の",

    "は","ひ","ふ","へ","ほ",

    "ま","み","む","め","も",

    "や","ゆ","よ","！","？",

    "ら","り","る","れ","ろ",

    "わ","を","ん","ゔ",

    "が","ぎ","ぐ","げ","ご",

    "ざ","じ","ず","ぜ","ぞ",

    "だ","ぢ","づ","で","ど",

    "ば","び","ぶ","べ","ぼ",

    "ば","び","ぶ","べ","ぼ",
    
    "ゃ","ょ","ょ","っ","ー",
    
    "ぱ","ぴ","ぷ","ぺ","ぽ"

];

// ========================================
// HTML取得
// ========================================
const inputScreen = document.getElementById("input-screen");
const gameScreen = document.getElementById("game-screen");
const finishScreen = document.getElementById("finish-screen");

const wordInput = document.getElementById("word-input");

const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const homeButton = document.getElementById("home-button");

const completedWord = document.getElementById("completed-word");
const finalWord = document.getElementById("final-word");

const message = document.getElementById("message");

const choices = document.getElementById("choices");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

// ========================================
// ゲーム用変数
// ========================================

let targetWord = "";

let currentIndex = 0;

let completedText = "";

let currentAnswer = "";

// ========================================
// 入力チェック
// ========================================

function isHiragana(text){

    return /^[ぁ-ゖー]+$/.test(text);

}

// ========================================
// ゲーム開始
// ========================================

startButton.addEventListener("click", ()=>{

    const text = wordInput.value.trim();

    if(text.length===0){

        alert("ひらがなをにゅうりょくしてね。");
        return;

    }

    if(text.length>30){

        alert("30もじよりみじかいもじをにゅうりょくしてね");
        return;

    }

    if(!isHiragana(text)){

        alert("ひらがなをにゅうりょくしてね");
        return;

    }

    targetWord = text;

    currentIndex = 0;

    completedText = "";

    completedWord.textContent = "";

    message.textContent = "";

    inputScreen.classList.add("hidden");

    finishScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    createQuestion();

});

// ========================================
// 問題作成
// ========================================

function createQuestion(){

    message.textContent = "";

    nextButton.classList.add("hidden");

    choices.innerHTML = "";

    currentAnswer = targetWord[currentIndex];

    let list = [];

    list.push(currentAnswer);

    while(list.length<4){

        const random = hiraganaList[
            Math.floor(Math.random()*hiraganaList.length)
        ];

        if(!list.includes(random)){

            list.push(random);

        }

    }

    shuffle(list);

    list.forEach(kana=>{

        const button = document.createElement("button");

        button.className="choice";

        button.textContent=kana;

        button.addEventListener("click",()=>{

            answer(button,kana);

        });

        choices.appendChild(button);

    });

}

// ========================================
// 配列シャッフル
// ========================================

function shuffle(array){

    for(let i=array.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]=[array[j],array[i]];

    }

}

// ========================================
// 正解・不正解判定
// ========================================

function answer(button, kana){

    // 正解
    if(kana===currentAnswer){

        correctSound.currentTime = 0;
        correctSound.play();

        button.classList.add("correct");

        message.textContent="⭕ せいかい！";

        completedText += currentAnswer;

        completedWord.textContent = completedText;

        // 他のボタンを押せなくする
        document.querySelectorAll(".choice").forEach(btn=>{

            btn.disabled=true;

        });

        nextButton.classList.remove("hidden");

    }

    // 不正解
    else{

        wrongSound.currentTime = 0;
        wrongSound.play();

        button.classList.add("wrong");

        button.disabled=true;

        message.textContent="❌ ざんねん";

    }

}

// ========================================
// 次へ
// ========================================

nextButton.addEventListener("click",()=>{

    currentIndex++;

    // 全文字終了
    if(currentIndex>=targetWord.length){

        gameScreen.classList.add("hidden");

        finishScreen.classList.remove("hidden");

        finalWord.textContent=completedText;

        return;

    }

    createQuestion();

});

// ========================================
// もう一度遊ぶ
// ========================================

restartButton.addEventListener("click",()=>{

    finishScreen.classList.add("hidden");

    inputScreen.classList.remove("hidden");

    wordInput.value="";

});

// Enterキーでも開始（IME変換中は無視）
wordInput.addEventListener("keydown", (e) => {

    // 日本語変換中は開始しない
    if (e.isComposing || e.keyCode === 229) {
        return;
    }

    if (e.key === "Enter") {
        startButton.click();
    }

});

// ========================================
// あたらしくあそぶ
// ========================================

homeButton.addEventListener("click", ()=>{

    targetWord = "";

    currentIndex = 0;

    completedText = "";

    currentAnswer = "";

    wordInput.value = "";

    completedWord.textContent = "";

    finalWord.textContent = "";

    message.textContent = "";

    choices.innerHTML = "";

    nextButton.classList.add("hidden");

    gameScreen.classList.add("hidden");

    finishScreen.classList.add("hidden");

    inputScreen.classList.remove("hidden");

    wordInput.focus();

});