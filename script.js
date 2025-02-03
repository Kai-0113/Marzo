  // 倒计时功能
function updateCountdown() {
    let returnDate = document.getElementById('returnDate').value;
    if (returnDate) {
        localStorage.setItem('returnDate', returnDate);
        calculateDaysLeft();
    }
}

function calculateDaysLeft() {
    let returnDate = localStorage.getItem('returnDate');
    if (returnDate) {
        let today = new Date();
        let targetDate = new Date(returnDate);
        let diffTime = targetDate - today;
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        document.getElementById('daysLeft').innerText = diffDays + " 天";
        document.getElementById('returnDate').value = returnDate;
    }
}

// 留言板功能
function saveMessage() {
    let input = document.getElementById('messageInput').value;
    if (input) {
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        let timestamp = new Date().toLocaleString();
        messages.push({ text: input, time: timestamp });
        localStorage.setItem('messages', JSON.stringify(messages));
        displayMessages();
        document.getElementById('messageInput').value = "";
    }
}

function displayMessages() {
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    let messageList = document.getElementById('messageList');
    messageList.innerHTML = "";
    messages.forEach(msg => {
        let li = document.createElement('li');
        li.innerText = msg.time + " - " + msg.text;
        messageList.appendChild(li);
    });
}
// 关键词互动改为按钮点击触发
const keywordResponses = {
    "亲亲": ["嗯？自己过来。", "想要？先说‘李泽言最好了’。", "不够的话，再多要几次。", "现在？"],
    "抱抱": ["过来。", "抱紧点。", "……想抱多久都可以。", "想抱就抱，哪次不是这样？"],
    "想你": ["你以为就你想我？", "那就天天见。", "我也想你，过来。"],
    "喜欢你": ["嗯，我知道。", "那就继续喜欢下去，不许变。", "……我也是。"]
};

const keywordCounts = JSON.parse(localStorage.getItem('keywordCounts')) || {
    "亲亲": 0,
    "抱抱": 0,
    "想你": 0,
    "喜欢你": 0
};

function triggerResponse(keyword) {
    if (keywordResponses[keyword]) {
        let responses = keywordResponses[keyword];
        let randomResponse = responses[Math.floor(Math.random() * responses.length)];
        document.getElementById('keywordResponse').innerText = randomResponse;
        
        // 更新统计数据
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
        localStorage.setItem('keywordCounts', JSON.stringify(keywordCounts));
        updateKeywordStats();
    }
}

function updateKeywordStats() {
    let statsElement = document.getElementById('keywordStats');
    if (!statsElement) return;
    statsElement.innerHTML = "<h3>互动统计</h3>";
    for (let key in keywordCounts) {
        statsElement.innerHTML += `<p>${key}：${keywordCounts[key]} 次</p>`;
    }
}

// 存储惊喜留言（只需要运行一次，之后数据会一直保留）
function storeSurpriseMessages() {
    localStorage.removeItem("surpriseMessages"); // 先清除旧数据，确保最新留言生效
    const messages = {
        "2025-02-03": String.raw`今天有没有做什么有趣的事情？
或者，有没有哪一刻让你觉得，‘如果阿言在就好了’？如果有，那就记下来，等你回来，我一件一件听你讲。`,
        "2025-02-04": String.raw`想象一下，如果我就在你身边，现在会对你说什么？
大概是：‘今天过得怎么样？’然后，看着你的一举一动，等你告诉我所有的细节。
我永远愿意听你说。`,
        "2025-02-05": String.raw`世界很大，但无论你在哪里，我的心永远向着你。
所以，即使你走得再远，也别觉得孤单。如果有一天，你心情不好，不用忍着，记得来找我。
我一直在等你。`,
        "2025-02-09": String.raw`你知道吗？我偶尔也会想，时间如果能跳跃就好了。
这样的话，就不会有‘等待’这种概念。你一眨眼，我就已经站在你面前。
不过，既然时间不能跳跃，那我就等你。`,
        "2025-02-10": String.raw`你是不是偷懒没按时睡觉？
我可不会放过你。
快去睡觉，闭上眼，想象我就在你身边。晚安，笨蛋。`,
        "2025-02-25": String.raw`不管这一刻你在做什么，我希望你是开心的。
如果不是，那就让我哄你笑一笑。
你笑起来的样子，我最喜欢了。`,
        "2025-03-02": String.raw`有时候，会不会在某个瞬间突然想起我？
比如，看到一杯咖啡时，想到我会不会嫌它太甜；走在夜晚的街头，觉得如果我在身边，应该会轻轻握住你的手。
如果有这样的瞬间，就告诉我。`,
        "2025-03-07": String.raw`你知不知道，我最喜欢你哪一点？
不是因为你聪明，也不是因为你撒娇的时候可爱，而是——你总是把我的存在当成最自然的事情。
就像现在，我不在你身边，但你依然愿意相信我在。`,
        "2025-03-09": String.raw`今天过得怎么样？有没有好好吃饭？
如果累了，就停下来歇一歇，喝口水，伸个懒腰。要是心情不好，就去吃点喜欢的甜品，或者听一首温柔的歌。
无论什么时候，都别忘了，你是被爱着的。`,
        "2025-04-01": String.raw`有些日子可能会觉得难熬，但别忘了，你并不孤单。
有时候，看看天，想象一下我正在看着同一片天空。等你回来，我会把错过的每一天，都补回来。`,
        "2025-04-22": String.raw`今天有没有好好照顾自己？
有没有按时吃饭，天气冷了有没有穿暖？如果我在的话，现在应该会唠叨你一句‘别总是忙到忘记照顾自己’。
但我不在，所以你要自己做到。`,
        "2025-05-26": String.raw`我猜你又在想我了，对吧？
那就好。
因为，我也在想你。`,
        "2025-04-27": String.raw`偶尔看看天空吧，想象一下我就在你身边。
或者，直接告诉我，你想我了。
我等你。`,
        "2025-05-18": String.raw`你有没有在路上看到某个景色，觉得想和我分享？
如果有，就拍下来，留给我看。我想看到你的世界，也想让你知道，你的世界里，我永远都在。`,
        "2025-04-19": String.raw`如果这一天过得有点辛苦，抱抱你。
辛苦了，恺恺。但你要记得，不管是好日子还是难熬的日子，你都不是一个人。
我一直在这里。`
    };
    localStorage.setItem("surpriseMessages", JSON.stringify(messages));
}

function loadSurpriseMessages() {
    const messages = JSON.parse(localStorage.getItem("surpriseMessages")) || {};
    let today = new Date().toISOString().split('T')[0];

    if (messages[today]) {
        setTimeout(() => {
            Swal.fire({
                title: "🎁 惊喜留言！",
                text: messages[today],
                icon: "info",
                confirmButtonText: "知道啦！",
                background: "#fff8e1", // 淡黄色背景
                color: "#5a3e36", // 深色文字
                confirmButtonColor: "#d17b61" // 按钮颜色
            });
        }, 2000);
    } else {
        console.log("📅 笨蛋，别失望，天天有就不叫惊喜了。");
    }
}

// 页面加载时自动运行
window.onload = function() {
    storeSurpriseMessages();  // 只运行一次，存储数据
    setTimeout(loadSurpriseMessages, 500);  // 确保数据已存储后再加载
    updateKeywordStats();
};


