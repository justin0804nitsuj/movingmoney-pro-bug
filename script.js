function login() {
    const username = document.getElementById('username').value;
    if (username) {
        // 取得登入次數，從 localStorage 中獲取或初始化為 0
        let loginCount = localStorage.getItem(`${username}_loginCount`) || 0;
        loginCount++;
        localStorage.setItem(`${username}_loginCount`, loginCount);

        // 更新總來訪人次
        let totalvisited = localStorage.getItem('totalvisited') || 0;
        totalvisited++;
        localStorage.setItem('totalvisited', totalvisited);

        // 將使用者名稱和登入次數加入 URL 並導向 main.html
        const encodedUsername = encodeURIComponent(username);
        window.location.href = `https://movingmoney-pro-bug.vercel.app/main.html?username=${encodedUsername}&loginCount=${loginCount}`;
    } else {
        alert("請輸入姓名");
    }
}

function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function displayWelcomeMessage() {
    const username = getParameterByName('username');
    const loginCount = getParameterByName('loginCount');

    if (username) {
        document.getElementById('welcome-message').textContent = `已成功登入 名稱為 ${username}`;
        document.getElementById('login-count').textContent = `這是您第 ${loginCount} 次登入`;

        // 顯示總來訪人次
        fetch('/api/visit')
            .then(response => response.json())
            .then(data => {
                document.getElementById('total-visited').textContent = `總來訪人次：${data.totalVisits}`;
            })
            .catch(error => console.error('Error:', error));
    } else {
        document.getElementById('welcome-message').textContent = `未提供姓名`;
    }
}