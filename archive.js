// ページが開かれたら解放フラグを保存
localStorage.setItem('hashimotoStationUnlocked', 'true');

// 2040年 橋本駅エリア コレクションデータ
const TOTAL_ITEMS = 7;
const SCULPTURES = [
    {
        id: 1,
        name: "リニア改札の記憶",
        image: "images/image01.png",
        area: "2040年の橋本",
        author: "リニア中央新幹線開発チーム",
        story: "2040年、リニア中央新幹線の開通により品川まで一瞬で繋がった橋本駅。地下深くの巨大ホームに降り立つと、乗客たちは旅の楽しみに胸を躍らせます。未来の会話記録に残されていたのは、時速500kmの車内で味わう限定の「べんとう」についての楽しげな思い出でした。",
        link: "https://www.yamaha-motor.co.jp/mobilites/",
        keyword: "べんとう"
    },
    {
        id: 2,
        name: "Mobilit.E.Sと風",
        image: "../images/archive-hashimoto/2Mobilites.png",
        area: "2040年の橋本",
        author: "YAMAHA Mobilit.E.S",
        story: "リニアを降りた人々を待ち受けるのは、静かに街を駆けぬける次世代モビリティ。心地よい風を感じながら橋本の広大なプロムナードを進む中、車内スピーカーからは流れる「おんがく」が、旅人たちの会話をやさしく包み込んでいました。",
        link: "https://www.yamaha-motor.co.jp/mobilites/",
        keyword: "おんがく"
    },
    {
        id: 3,
        name: "緑地公園のポニー",
        image: "../images/archive-hashimoto/3PonyPark.png",
        area: "2040年の橋本",
        author: "緑区都市デザイン課",
        story: "高層ビルと自然が共存する未来の橋本。モビリティで少し離れた公園に向かうと、子どもたちに愛されるポニーの姿があります。会話記録には、手のひらに乗せた「にんじん」をポニーがおいしそうに食べた、あたたかな午後の出来事が記録されています。",
        link: "https://www.yamaha-motor.co.jp/mobilites/",
        keyword: "にんじん"
    },
    {
        id: 4,
        name: "未来都市のタイムカプセル",
        image: "../images/archive-hashimoto/4TimeCapsule.png",
        area: "2040年の橋本",
        author: "橋本歴史保存会",
        story: "駅前広場の光る時計台の足元には、リニア工事が始まった頃の記憶を納めたタイムカプセルが眠っています。会話記録の少女は、20年前の自分から届いた「てがみ」を抱きしめ、変わりゆく街並みを感慨深そうに見つめていました。",
        link: "https://www.yamaha-motor.co.jp/mobilites/",
        keyword: "てがみ"
    },
    {
        id: 5,
        name: "相模川の風鈴モニュメント",
        image: "../images/archive-hashimoto/5WindMonument.png",
        area: "2040年の橋本",
        author: "環境アートプロジェクト",
        story: "相模川からの爽やかな風を受けて発電するガラス製のモニュメント。夕暮れ時になると風に乗って繊細な音色を響かせます。未来の人々は、まるで「ふうりん」のようなその美しい涼音に耳を澄ませながら、日々の疲れを癒やしていました。",
        link: "https://www.yamaha-motor.co.jp/mobilites/",
        keyword: "ふうりん"
    },
    {
        id: 6,
        name: "リニア展望テラス",
        image: "../images/archive-hashimoto/6LinearTerrace.png",
        area: "2040年の橋本",
        author: "橋本スカイテラス設計室",
        story: "地下から地上へ飛び出すリニアを一望できる絶景のテラスカフェ。会話記録に残されたふたりの会話では、湯気が立つ香ばしい「こーひー」を飲みながら、光の矢のように走り去る列車を眺める時間が何よりの贅沢だと語られています。",
        link: "https://www.yamaha-motor.co.jp/mobilites/",
        keyword: "こーひー"
    },
    {
        id: 7,
        name: "ホログラムの記憶碑",
        image: "../images/archive-hashimoto/7HologramMonument.png",
        area: "2040年の橋本",
        author: "2040未来ビジョン",
        story: "街角にたたずむ立体ホログラムの伝言板。過去と未来の想いを繋ぐこの場所で、ある人は大切な人から贈られた「ゆびわ」の思い出を立体映像として再現し、未来の橋本の空の下で静かに微笑んでいました。",
        link: "https://www.yamaha-motor.co.jp/mobilites/",
        keyword: "ゆびわ"
    }
];

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
    const item = SCULPTURES.find(s => s.id === id);
    if (!item) return;

    document.getElementById("popNo").textContent = `No.${item.id}`;
    document.getElementById("popTitle").textContent = item.name;
    document.getElementById("popImg").src = item.image;
    document.getElementById("popArea").textContent = item.area;
    document.getElementById("popAuthor").textContent = item.author;
    document.getElementById("popStory").textContent = item.story;
    document.getElementById("popLink").href = item.link;

    document.getElementById("popupOverlay").classList.add("show");
    document.getElementById("popup").classList.add("show");
}

function closePopup() {
    document.getElementById("popupOverlay").classList.remove("show");
    document.getElementById("popup").classList.remove("show");
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
                    <img src="images/jiku.png" style="width: 114px; height: auto;" alt="鍵アイコン">
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
    } else {
        progressFill.classList.remove("completed");
        if (progressContainer) progressContainer.classList.remove("completed");
        clearCompletionEffect();
    }
}

// 初期化処理
window.addEventListener("DOMContentLoaded", () => {
    unlockedSet = loadUnlocked();
    renderGrid();

    const urlParams = new URLSearchParams(window.location.search);
    const unlockId = parseInt(urlParams.get('unlock'));

    if (unlockId && !isNaN(unlockId) && unlockId >= 1 && unlockId <= TOTAL_ITEMS) {
        if (!unlockedSet.has(unlockId)) {
            const targetItem = SCULPTURES.find(s => s.id === unlockId);

            if (targetItem && targetItem.keyword) {
                setTimeout(() => {
                    const userInput = window.prompt(`【${targetItem.name}】\n音声ガイドや記録で話題になった「キーワード」を入力してください：`);

                    if (userInput === targetItem.keyword) {
                        unlockedSet.add(unlockId);
                        saveUnlocked(unlockedSet);
                        renderGrid();
                        setTimeout(() => showToast(`${targetItem.name} の記録が解放されました！`), 300);
                    } else if (userInput !== null && userInput !== "") {
                        alert("キーワードが違います。会話記録をよく聞いてもう一度お試しください。");
                    }
                }, 100);
            } else {
                unlockedSet.add(unlockId);
                saveUnlocked(unlockedSet);
                renderGrid();
                setTimeout(() => showToast("解放されました！"), 500);
            }
        } else {
            setTimeout(() => showToast("この記録は既に解放されています。"), 500);
        }

        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

/* =========================================================
    コンプリート演出
========================================================= */
(function () {
    const style = document.createElement("style");
    style.textContent = `
    #confettiCanvas {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2000;
    }
    .complete-overlay {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.65);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s ease;
        z-index: 2001;
        padding: 20px;
    }
    .complete-overlay.show {
        opacity: 1;
        pointer-events: auto;
    }
    .complete-card {
        position: relative;
        width: min(100%, 340px);
        padding: 36px 26px 28px;
        text-align: center;
        background: #fffdf7;
        border: 2px solid #0D8B80;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        transform: scale(0.8) translateY(20px);
        opacity: 0;
        transition: transform 0.5s cubic-bezier(0.2, 1.2, 0.35, 1), opacity 0.4s ease;
    }
    .complete-overlay.show .complete-card {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
    .complete-card::before {
        content: "";
        position: absolute;
        inset: 8px;
        border: 1px solid rgba(13, 139, 128, 0.4);
        border-radius: 10px;
        pointer-events: none;
    }
    .complete-seal {
        width: 104px;
        height: 104px;
        margin: 0 auto 18px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: linear-gradient(135deg, #0D8B80, #14a99c);
        color: #fff;
        box-shadow: 0 0 0 4px #fffdf7, 0 0 0 6px #0D8B80, 0 6px 16px rgba(0,0,0,.25);
        animation: sealPop 0.7s cubic-bezier(0.2, 1.5, 0.4, 1) 0.25s backwards;
    }
    .complete-seal .seal-main {
        font-size: 10px;
        font-weight: bold;
        letter-spacing: 0.04em;
        line-height: 1;
    }
    .complete-seal .seal-sub {
        margin-top: 6px;
        font-size: 26px;
        font-weight: bold;
        line-height: 1;
    }
    @keyframes sealPop {
        0%   { transform: scale(0) rotate(-45deg); opacity: 0; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    .complete-card h3 {
        font-family: serif;
        font-size: 21px;
        font-weight: bold;
        letter-spacing: 0.06em;
        color: #111;
        margin-bottom: 10px;
    }
    .complete-area {
        display: inline-block;
        padding: 5px 16px;
        margin-bottom: 16px;
        font-size: 13px;
        font-weight: bold;
        color: #fff;
        background: #0D8B80;
        border-radius: 999px;
    }
    .complete-desc {
        font-size: 13px;
        line-height: 1.8;
        color: #333;
        margin-bottom: 22px;
    }
    .complete-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 13px 16px;
        font-size: 15px;
        font-weight: bold;
        color: #fff;
        background: #0D8B80;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: transform 0.1s ease, background-color 0.2s ease;
    }
    .complete-btn:hover { background: #0b7a70; }
    .complete-btn:active { transform: translateY(2px); }
    .stamp-grid.all-cleared .stamp-item.unlocked {
        box-shadow: 0 0 0 2px #0D8B80, 2px 2px 8px rgba(13, 139, 128, 0.45);
    }
    @media (prefers-reduced-motion: reduce) {
        .complete-card, .complete-seal { animation: none; transition: opacity .3s ease; }
    }
    `;
    document.head.appendChild(style);

    function launchConfetti(duration = 3500) {
        const canvas = document.createElement("canvas");
        canvas.id = "confettiCanvas";
        document.body.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1;
        function resize() {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        resize();
        window.addEventListener("resize", resize);

        const colors = ["#0D8B80", "#14a99c", "#ffd700", "#ffffff", "#e99a25"];
        const W = window.innerWidth;
        const pieces = [];

        for (let i = 0; i < 140; i++) {
            pieces.push({
                x: Math.random() * W,
                y: Math.random() * -window.innerHeight,
                w: 6 + Math.random() * 6,
                h: 8 + Math.random() * 8,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: 1.5 + Math.random() * 3,
                drift: -1 + Math.random() * 2,
                rot: Math.random() * Math.PI * 2,
                rotSpeed: -0.1 + Math.random() * 0.2
            });
        }

        const start = performance.now();

        function frame(now) {
            const elapsed = now - start;
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            const fade = elapsed > duration - 800
                ? Math.max(0, (duration - elapsed) / 800)
                : 1;
            ctx.globalAlpha = fade;

            pieces.forEach(p => {
                p.y += p.speed;
                p.x += p.drift;
                p.rot += p.rotSpeed;

                if (p.y > window.innerHeight + 20 && elapsed < duration - 1200) {
                    p.y = -20;
                    p.x = Math.random() * window.innerWidth;
                }

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });

            if (elapsed < duration) {
                requestAnimationFrame(frame);
            } else {
                window.removeEventListener("resize", resize);
                canvas.remove();
            }
        }
        requestAnimationFrame(frame);
    }

    function showCompleteOverlay() {
        if (document.querySelector(".complete-overlay")) return;

        const banner = document.querySelector(".area-banner");
        const areaName = banner ? banner.textContent.trim() : "2040年の橋本";

        const overlay = document.createElement("div");
        overlay.className = "complete-overlay";
        overlay.innerHTML = `
            <div class="complete-card">
                <div class="complete-seal">
                    <span class="seal-main">COMPLETE</span>
                    <span class="seal-sub">${TOTAL_ITEMS}/${TOTAL_ITEMS}</span>
                </div>
                <h3>コンプリート！</h3>
                <div class="complete-area">${areaName}</div>
                <p class="complete-desc">
                    すべてのスポットを巡りました。<br>
                    2040年の記憶が、すべて解放されました。
                </p>
                <button type="button" class="complete-btn">記録を見る</button>
            </div>
        `;
        document.body.appendChild(overlay);

        function close() {
            overlay.classList.remove("show");
            setTimeout(() => overlay.remove(), 500);
        }
        overlay.querySelector(".complete-btn").addEventListener("click", close);
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) close();
        });

        requestAnimationFrame(() => {
            requestAnimationFrame(() => overlay.classList.add("show"));
        });
    }

    window.celebrateCompletion = function (isNew) {
        const grid = document.getElementById("grid");
        if (grid) grid.classList.add("all-cleared");

        if (!isNew) return;

        launchConfetti();
        setTimeout(showCompleteOverlay, 600);
    };

    window.clearCompletionEffect = function () {
        const grid = document.getElementById("grid");
        if (grid) grid.classList.remove("all-cleared");
    };
})();