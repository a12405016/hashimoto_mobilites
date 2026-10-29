// ページが開かれたら解放フラグを保存
localStorage.setItem('hashimotoStationUnlocked', 'true');

// 2040年 橋本駅エリア コレクションデータ
const TOTAL_ITEMS = 7;
const SCULPTURES = [
    {
        id: 1,
        name: "スマートリング",
        image: "images/OOPARTS01_BG.png",
        story: "脈拍から口座番号まで、あらゆる情報を記憶できる指輪。リニア乗車時の乗車券情報もそこには収められている。手をかざすだけで改札を通れる優れもの。心拍に異常が見受けられた時、自動で医療機関へ報告してくれる。内側にはD.B.C.Bの刻印がある。",
        link: "https://www.yamaha-motor.co.jp/mobilites/",
        // 会話記録の音声（なければ省略。ポップアップに音声欄は出ません）
        audio: "audio/hashimoto2040_talk01_demo.mp3",
        audioTitle: "会話記録 01"
    },
    {
        id: 2,
        name: "配送ドローン",
        image: "images/OOPARTS02_BG.png",
        story: "重量3キログラム以内なら配送可能な無人ドローン。人件費削減に一躍買っており、安全迅速な配送を実現した。衣類・食料品・日用品など、様々な商品が空を飛び交う暮らしが始まった。裏側にはD.B.C.Bの刻印がある。",
        link: "https://www.yamaha-motor.co.jp/mobilites/"
    },
    {
        id: 3,
        name: "スマートグラス",
        image: "images/hashimoto2040_OOPARTS03_BG.png",
        story: "高性能コンピュータを搭載した眼鏡。目に映る景色を自動で解析し、ユーザーが欲している情報をピックアップして表示する。外国語の翻訳機能に特に需要があり、文字や音声を自動翻訳しリアルタイムで表示してくれる。小さくD.B.C.Bの刻印がある。",
        link: "https://www.yamaha-motor.co.jp/mobilites/"
    },
    {
        id: 4,
        name: "AIスマートフォン",
        image: "images/favicon.png",
        story: "パートナーAIが搭載されたスマートフォン。パートナーAIとは、自分に関するあらゆる知識や情報を登録したAIマネージャーを所有することができるサービス。どの企業のAIを契約し、育成していくかはユーザー次第。カバー裏にD.B.C.Bの刻印がある。",
        link: "https://www.yamaha-motor.co.jp/mobilites/"
    },
    {
        id: 5,
        name: "MSデジタルカルテ",
        image: "images/favicon.png",
        story: "メディカルステーション利用時に受け取れるデジタルカルテ。利用者の身体情報や、懸念される病気・怪我などのデータが記載されている。しかしながら医療機関での受診が不要になったということではないので注意が必要。右下にD.B.C.Bのロゴマークがある。",
        link: "https://www.yamaha-motor.co.jp/mobilites/"
    },
    {
        id: 6,
        name: "MT乗車カード",
        image: "images/favicon.png",
        story: "マイクロタクシー専用の乗車カード。年会費を払って作成可能。マイクロタクシーは決められた走行区間を巡回しており、アプリを使って好きなタイミングで呼ぶことができる。ビジネスで頻繁に利用するなら、乗車カードは持っておくと便利。表面にD.B.C.Bの刻印がある。",
        link: "https://www.yamaha-motor.co.jp/mobilites/"
    },
    {
        id: 7,
        name: "未来の橋本の写真",
        image: "images/favicon.png",
        story: "2040年の橋本が写った写真。街並みは今と大きく変わっているわけではないが、確かに暮らしやすく、便利な街へと発展していった。写真は紙に印刷されており、昨今では珍しい。D.B.C.Bの刻印はない。",
        link: "https://www.yamaha-motor.co.jp/mobilites/"
    }
];

// EXコンテンツ（8つ目）
// ・7つすべて解放すると、ロックされた状態でエリアが現れます
// ・URL「?unlock=ex」（または ?unlock=8）で解放されます
// TODO: name / image / story を本番用の内容に差し替えてください
const EX_ITEM = {
    id: "EX",
    name: "時空の特異点",
    image: "images/favicon.png",
    story: "7つの記録がすべてそろったとき、時空の修復は完了し、封じられていた最後の記録が姿を現す。それは2040年の橋本と現在をつなぐ、特異点そのもの。ここに辿り着いたあなたは、もう立派な時空の修復者だ。",
    link: "https://www.yamaha-motor.co.jp/mobilites/"
    // audio: "audio/xxxx.mp3",   // EXにも音声を付けるときはここに指定
    // audioTitle: "会話記録 EX"
};
const EX_KEY = "hashimoto-unlocked-area1-ex";

// 解放済みの彫刻IDを保存するためのキー
const STORAGE_KEY = "hashimoto-unlocked-area1";
let unlockedSet = new Set();

// localStorage から読み込み
function loadUnlocked() {
    try {
        const res = localStorage.getItem(STORAGE_KEY);
        if (res) return new Set(JSON.parse(res));
    } catch (e) { }
    return new Set();
}

function saveUnlocked(set) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}

function openPopup(id) {
    const isEx = id === "EX";
    const item = isEx ? EX_ITEM : SCULPTURES.find(s => s.id === id);
    if (!item) return;

    document.getElementById("popup").classList.toggle("ex-mode", isEx);
    document.getElementById("popLabel").textContent = isEx ? "最後の記録" : "オーパーツ説明";
    document.getElementById("popNo").textContent = isEx ? "EX" : `No.${item.id}`;
    document.getElementById("popTitle").textContent = item.name;
    const popImg = document.getElementById("popImg");
    popImg.src = item.image;
    popImg.alt = item.name;
    document.getElementById("popStory").textContent = item.story;
    document.getElementById("popLink").href = item.link;
    setupAudio(item);

    document.getElementById("popupOverlay").classList.add("show");
    document.getElementById("popup").classList.add("show");
}

function closePopup() {
    document.getElementById("popupOverlay").classList.remove("show");
    document.getElementById("popup").classList.remove("show");
    stopAudio();
}

/* =========================================================
    音声プレイヤー（ポップアップ内）
========================================================= */
const ICON_PLAY = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
const ICON_PAUSE = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor"/></svg>';

function fmtTime(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    const m = Math.floor(sec / 60);
    const r = Math.floor(sec % 60);
    return `${m}:${String(r).padStart(2, "0")}`;
}

function setPlayingUI(playing) {
    document.getElementById("audioPlayer").classList.toggle("is-playing", playing);
    const btn = document.getElementById("audioBtn");
    btn.innerHTML = playing ? ICON_PAUSE : ICON_PLAY;
    btn.setAttribute("aria-label", playing ? "一時停止" : "再生");
}

function resetAudioUI() {
    document.getElementById("audioSeek").value = 0;
    document.getElementById("audioCur").textContent = "0:00";
    document.getElementById("audioDur").textContent = "0:00";
    setPlayingUI(false);
}

function stopAudio() {
    const audio = document.getElementById("popAudio");
    if (!audio) return;
    audio.pause();
    try { audio.currentTime = 0; } catch (e) { }
    resetAudioUI();
}

function setupAudio(item) {
    const group = document.getElementById("popAudioGroup");
    const audio = document.getElementById("popAudio");
    if (!group || !audio) return;

    audio.pause();
    if (!item.audio) {
        group.hidden = true;
        audio.removeAttribute("src");
        audio.load();
        return;
    }

    group.hidden = false;
    document.getElementById("audioTitle").textContent = item.audioTitle || "会話記録";
    resetAudioUI();
    audio.src = item.audio;
    audio.load();
}

function initAudio() {
    const audio = document.getElementById("popAudio");
    const btn = document.getElementById("audioBtn");
    const seek = document.getElementById("audioSeek");
    if (!audio || !btn || !seek) return;

    setPlayingUI(false);

    btn.addEventListener("click", () => {
        if (audio.paused) {
            const p = audio.play();
            if (p && p.catch) p.catch(() => showToast("音声を再生できませんでした"));
        } else {
            audio.pause();
        }
    });

    audio.addEventListener("play", () => setPlayingUI(true));
    audio.addEventListener("pause", () => setPlayingUI(false));
    audio.addEventListener("ended", () => {
        setPlayingUI(false);
        seek.value = 0;
        document.getElementById("audioCur").textContent = "0:00";
        try { audio.currentTime = 0; } catch (e) { }
    });
    audio.addEventListener("loadedmetadata", () => {
        document.getElementById("audioDur").textContent = fmtTime(audio.duration);
    });
    audio.addEventListener("timeupdate", () => {
        if (isFinite(audio.duration) && audio.duration > 0) {
            seek.value = (audio.currentTime / audio.duration) * 100;
        }
        document.getElementById("audioCur").textContent = fmtTime(audio.currentTime);
    });
    audio.addEventListener("error", () => {
        if (audio.getAttribute("src")) showToast("音声ファイルを読み込めませんでした");
    });

    seek.addEventListener("input", () => {
        if (isFinite(audio.duration) && audio.duration > 0) {
            audio.currentTime = (seek.value / 100) * audio.duration;
        }
    });
}

/* =========================================================
    アンケートボタン / EXコンテンツ
========================================================= */
let exUnlocked = localStorage.getItem(EX_KEY) === "true";

function setSurveyState(unlocked, animate) {
    const btn = document.getElementById("surveyBtn");
    if (!btn) return;
    const wasLocked = btn.classList.contains("is-locked");

    btn.classList.toggle("is-locked", !unlocked);
    btn.classList.toggle("is-unlocked", unlocked);
    btn.setAttribute("aria-disabled", String(!unlocked));
    document.getElementById("surveyIcon").textContent = unlocked ? "↗" : "🔒";
    document.getElementById("surveySub").textContent = unlocked
        ? "アンケートにご協力ください"
        : "7つすべて解放すると開放されます";

    if (unlocked) {
        btn.href = btn.dataset.href;
    } else {
        btn.removeAttribute("href");
    }

    if (unlocked && wasLocked && animate) {
        btn.classList.add("just-unlocked");
        setTimeout(() => btn.classList.remove("just-unlocked"), 1000);
    }
}

function setExState(state) {
    const card = document.getElementById("exCard");
    if (!card) return;
    const revealed = state === "revealed";

    card.dataset.state = state;
    card.classList.toggle("is-revealed", revealed);
    card.classList.toggle("is-locked", !revealed);
    card.setAttribute("aria-label", revealed ? `EXコンテンツ：${EX_ITEM.name}` : "EXコンテンツ（未解放）");

    document.getElementById("exImg").src = EX_ITEM.image;
    document.getElementById("exEyebrow").textContent = revealed ? "FINAL ARCHIVE" : "LOCKED";
    document.getElementById("exTitle").textContent = revealed ? EX_ITEM.name : "？？？？？？";
    document.getElementById("exSub").textContent = revealed
        ? "すべての記録を解放した者だけが辿り着ける、最後の記録。"
        : "最後の記録は、まだどこかに眠っている…";
}

// 7つ揃っているかどうかで、アンケートとEXエリアの表示を切り替える
function updateExtras(complete, isNew) {
    const section = document.getElementById("exSection");

    if (!complete) {
        if (section) section.hidden = true;
        setSurveyState(false, false);
        setExState("locked");
        return;
    }

    setExState(exUnlocked ? "revealed" : "locked");
    if (!section) {
        setSurveyState(true, false);
        return;
    }

    if (isNew) {
        // コンプリート演出を閉じたあと、やさしくフェードインで出現
        section.hidden = true;
        setSurveyState(false, false);
        window.onCompleteClosed = () => {
            setSurveyState(true, true);
            section.hidden = false;
            section.classList.add("ex-appear");
            section.scrollIntoView({ behavior: "smooth", block: "center" });
            setTimeout(() => showToast("アンケートが開放されました！"), 1200);
        };
    } else if (typeof window.onCompleteClosed !== "function") {
        setSurveyState(true, false);
        section.hidden = false;
    }
}

// EXをURLで解放（?unlock=ex または ?unlock=8）
function unlockEx() {
    if (exUnlocked) {
        showToast("この記録は既に解放されています。");
        return;
    }
    exUnlocked = true;
    localStorage.setItem(EX_KEY, "true");

    // 7つ揃う前に読み込んだ場合は、記録だけ受け取っておく
    if (unlockedSet.size < TOTAL_ITEMS) {
        showToast("記録を受け取りました。7つすべて解放すると現れます。");
        return;
    }

    // 7つ揃っている場合：控えめに点灯させる
    const card = document.getElementById("exCard");
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
        setExState("revealed");
        card.classList.add("ex-unlock");
        setTimeout(() => card.classList.remove("ex-unlock"), 1900);
        setTimeout(() => showToast("EXの記録が解放されました！"), 900);
    }, 600);
}

function initExtras() {
    const card = document.getElementById("exCard");
    if (card) {
        const onActivate = () => {
            if (card.dataset.state === "revealed") {
                openPopup("EX");
            } else {
                showToast("まだ解放されていません");
            }
        };
        card.addEventListener("click", onActivate);
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onActivate();
            }
        });
    }

    const survey = document.getElementById("surveyBtn");
    if (survey) {
        survey.addEventListener("click", (e) => {
            if (survey.classList.contains("is-locked")) {
                e.preventDefault();
                showToast("7つすべて解放するとアンケートが開放されます");
            }
        });
    }
}

function renderGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    SCULPTURES.forEach(s => {
        const isUnlocked = unlockedSet.has(s.id);
        const itemDiv = document.createElement("div");

        if (isUnlocked) {
            itemDiv.className = "stamp-item unlocked";
            itemDiv.onclick = () => openPopup(s.id);
            itemDiv.innerHTML = `
                <span class="stamp-no">No.${s.id}</span>
                <img src="${s.image}" class="unlocked-img" alt="${s.name}" onerror="this.style.display='none'">
            `;
        } else {
            itemDiv.className = "stamp-item locked";
            itemDiv.onclick = () => showToast("未解放です！");
            itemDiv.innerHTML = `
                <span class="stamp-no">No.${s.id}</span>
                <div class="lock-icon">
                    <img src="images/timeparad2.gif" style="width: 114px; height: auto;" alt="時空の穴のアイコン">
                </div>
            `;
        }
        grid.appendChild(itemDiv);
    });

    const count = unlockedSet.size;
    const progressFill = document.getElementById("progressFill");
    const progressContainer = document.querySelector(".progress-bar-container");
    const percentage = (count / TOTAL_ITEMS) * 100;

    document.getElementById("progressCount").textContent = `${count} / ${TOTAL_ITEMS}`;
    progressFill.style.width = `${percentage}%`;

    if (count === TOTAL_ITEMS) {
        progressFill.classList.add("completed");
        if (progressContainer) progressContainer.classList.add("completed");

        const celebratedKey = STORAGE_KEY + "-celebrated";
        const isNew = localStorage.getItem(celebratedKey) !== "true";
        if (isNew) localStorage.setItem(celebratedKey, "true");
        celebrateCompletion(isNew);
        updateExtras(true, isNew);
    } else {
        progressFill.classList.remove("completed");
        if (progressContainer) progressContainer.classList.remove("completed");
        clearCompletionEffect();
        updateExtras(false, false);
    }
}

// 初期化処理
window.addEventListener("DOMContentLoaded", () => {
    unlockedSet = loadUnlocked();
    initExtras();
    initAudio();
    renderGrid();

    // URLパラメータによる解放：?unlock=1〜7（EXは ?unlock=ex または ?unlock=8）
    const urlParams = new URLSearchParams(window.location.search);
    const raw = (urlParams.get("unlock") || "").trim().toLowerCase();

    if (raw) {
        if (raw === "ex" || raw === String(TOTAL_ITEMS + 1)) {
            setTimeout(unlockEx, 300);
        } else {
            const unlockId = parseInt(raw, 10);
            const targetItem = SCULPTURES.find(s => s.id === unlockId);

            if (targetItem) {
                if (!unlockedSet.has(unlockId)) {
                    unlockedSet.add(unlockId);
                    saveUnlocked(unlockedSet);
                    renderGrid();
                    setTimeout(() => showToast(`${targetItem.name} の記録が解放されました！`), 500);
                } else {
                    setTimeout(() => showToast("このオーパーツは既に解放されています。"), 500);
                }
            }
        }

        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

/* =========================================================
    コンプリート演出
    ブラウン管の信号復旧（7つのゲージが埋まる）→ 水面の波紋が広がる
========================================================= */
(function () {
    const style = document.createElement("style");
    style.textContent = `
    .cx-ov {
        position: fixed;
        inset: 0;
        z-index: 2001;
        background: rgba(0, 0, 12, 0.6);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.4s ease, background-color 1s ease;
        overflow: hidden;
        color: #fff;
    }
    .cx-ov.show { opacity: 1; pointer-events: auto; }
    .cx-ov.done { background: rgba(0, 0, 0, 0.62); }

    /* ブラウン管のノイズ */
    .cx-crt {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: repeating-linear-gradient(0deg, rgba(0,0,0,.4) 0 2px, transparent 2px 4px), rgba(0, 0, 10, .35);
        animation: cxFlick .12s steps(2) infinite;
        transition: opacity 1s ease;
    }
    .cx-crt::after {
        content: "";
        position: absolute;
        left: 0; right: 0; top: 0;
        height: 60px;
        background: linear-gradient(transparent, rgba(255,255,255,.25), transparent);
        animation: cxTear 1.6s linear infinite;
    }
    .cx-ov.done .cx-crt { opacity: 0; animation: none; }

    .cx-t {
        position: absolute;
        pointer-events: none;
        left: 0; right: 0;
        top: 33%;
        padding: 0 20px;
        text-align: center;
        text-shadow: 0 0 14px rgba(80,69,155,.9), 0 2px 6px rgba(0,0,0,.5);
    }
    .cx-t small { display: block; margin-bottom: 10px; font-size: 12px; font-weight: bold; letter-spacing: .4em; }
    .cx-t b { display: block; font-family: serif; font-size: 28px; letter-spacing: .1em; }
    .cx-t.glitch b { animation: cxGlitch .25s steps(2) infinite; }
    .cx-t.in { animation: cxIn .9s ease both; }

    /* 7つのゲージ */
    .cx-seg {
        position: absolute;
        pointer-events: none;
        left: 0; right: 0;
        top: 50%;
        display: flex;
        justify-content: center;
        gap: 6px;
        transition: opacity .5s ease;
    }
    .cx-seg i { width: 30px; height: 10px; background: rgba(255,255,255,.2); transition: .2s; }
    .cx-seg i.on { background: #BDF2FC; box-shadow: 0 0 10px #BDF2FC; }
    .cx-ov.done .cx-seg { opacity: 0; }

    /* 水面の波紋 */
    .cx-rp {
        position: absolute;
        left: 50%; top: 40%;
        width: 12vmax; height: 12vmax;
        margin: -6vmax;
        border: 2px solid #fff;
        border-radius: 50%;
        opacity: 0;
        box-shadow: 0 0 12px rgba(189,242,252,.6);
        animation: cxRipple 2.6s ease-out forwards;
        pointer-events: none;
    }
    .cx-rp.b { border-color: #BDF2FC; }
    .cx-flash { position: absolute; inset: 0; background: #fff; animation: cxFlash .8s ease-out forwards; pointer-events: none; }

    /* 完了後の文言とボタン */
    .cx-end {
        position: absolute;
        left: 50%;
        top: 52%;
        width: min(calc(100% - 48px), 340px);
        transform: translateX(-50%);
        text-align: center;
        opacity: 0;
        pointer-events: none;
        z-index: 5;
    }
    .cx-ov.done .cx-end { opacity: 1; pointer-events: auto; transition: opacity .9s ease 1.2s; }
    .cx-end p { margin-bottom: 20px; font-size: 13px; line-height: 1.8; text-shadow: 0 1px 4px rgba(0,0,0,.6); }
    .cx-btn {
        width: 100%;
        padding: 13px 16px;
        border: none;
        border-radius: 50px;
        background: #fff;
        color: #50459B;
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,.4);
        transition: transform .1s ease;
    }
    .cx-btn:active { transform: translateY(2px); }

    .stamp-grid.all-cleared .stamp-item.unlocked {
        box-shadow: 0 0 0 2px #50459B, 2px 2px 8px rgba(80, 69, 155, 0.45);
    }

    @keyframes cxFlick { 50% { opacity: .8; } }
    @keyframes cxTear { from { top: -60px; } to { top: 100%; } }
    @keyframes cxGlitch {
        0%   { transform: translate(0);       text-shadow: 2px 0 #ff2d6f, -2px 0 #2dfff0; }
        50%  { transform: translate(-3px,1px); text-shadow: -3px 0 #ff2d6f, 3px 0 #2dfff0; }
    }
    @keyframes cxIn { from { opacity: 0; transform: translateY(10px) scale(.95); } }
    @keyframes cxFlash { to { opacity: 0; } }
    @keyframes cxRipple {
        0%   { transform: scale(0); opacity: .9; }
        100% { transform: scale(8); opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
        .cx-crt, .cx-crt::after, .cx-t.glitch b { animation: none; }
        .cx-rp { display: none; }
    }
    `;
    document.head.appendChild(style);

    function showCompleteOverlay() {
        if (document.querySelector(".cx-ov")) return;

        const overlay = document.createElement("div");
        overlay.className = "cx-ov";
        overlay.innerHTML = `
            <div class="cx-crt"></div>
            <div class="cx-t glitch" id="cxText"><small>NO SIGNAL</small><b>時空が途切れている…</b></div>
            <div class="cx-seg">${"<i></i>".repeat(TOTAL_ITEMS)}</div>
            <div class="cx-end">
                <p>すべてのスポットを巡りました。<br>2040年の記憶が、すべて解放されました。</p>
                <button type="button" class="cx-btn">記録を見る</button>
            </div>
        `;
        document.body.appendChild(overlay);

        const timers = [];
        const wait = (fn, ms) => timers.push(setTimeout(fn, ms));
        const text = overlay.querySelector("#cxText");
        const segs = overlay.querySelectorAll(".cx-seg i");
        const GAUGE_START = 900, GAUGE_STEP = 320;

        // ① 信号が途切れている → ② 修復中（ゲージが1つずつ埋まる）
        wait(() => {
            text.innerHTML = "<small>RESTORING…</small><b>時空を修復中</b>";
        }, GAUGE_START);
        segs.forEach((el, i) => wait(() => el.classList.add("on"), GAUGE_START + i * GAUGE_STEP));

        // ③ 復旧：フラッシュ → ノイズが消え、水面の波紋が広がる
        wait(() => {
            const flash = document.createElement("div");
            flash.className = "cx-flash";
            overlay.appendChild(flash);
            setTimeout(() => flash.remove(), 900);

            [0, 0.5].forEach((d, i) => {
                const rp = document.createElement("div");
                rp.className = "cx-rp" + (i % 2 ? " b" : "");
                rp.style.animationDelay = d + "s";
                overlay.appendChild(rp);
                setTimeout(() => rp.remove(), 3500);
            });

            overlay.classList.add("done");
            text.className = "cx-t in";
            text.innerHTML = "<small>SIGNAL RESTORED</small><b>時空、修復完了</b>";
        }, GAUGE_START + segs.length * GAUGE_STEP + 300);

        function close() {
            timers.forEach(clearTimeout);
            overlay.classList.remove("show");
            setTimeout(() => overlay.remove(), 500);
            // 演出が閉じたら、アンケート・EXエリアの出現へ
            if (typeof window.onCompleteClosed === "function") {
                const cb = window.onCompleteClosed;
                window.onCompleteClosed = null;
                setTimeout(cb, 600);
            }
        }
        overlay.querySelector(".cx-btn").addEventListener("click", close);
        // 演出の途中で閉じてしまわないよう、完了後のみ背景タップでも閉じられる
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay && overlay.classList.contains("done")) close();
        });

        requestAnimationFrame(() => {
            requestAnimationFrame(() => overlay.classList.add("show"));
        });
    }

    window.celebrateCompletion = function (isNew) {
        const grid = document.getElementById("grid");
        if (grid) grid.classList.add("all-cleared");

        if (!isNew) return;
        setTimeout(showCompleteOverlay, 600);
    };

    window.clearCompletionEffect = function () {
        const grid = document.getElementById("grid");
        if (grid) grid.classList.remove("all-cleared");
    };
})();