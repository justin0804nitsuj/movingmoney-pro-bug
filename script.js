function login() {
    const username = document.getElementById('username').value;
    if (username) {
        // 發送登入次數更新請求
        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username })
        })
        .then(response => response.json())
        .then(data => {
            // 導向到 main.html 並傳遞使用者名稱
            window.location.href = `main.html?username=${encodeURIComponent(username)}&loginCount=${data.loginCount}`;
        })
        .catch(error => console.error('Error:', error));

        // 更新總來訪人次
        fetch('/api/visit', { method: 'POST' })
            .catch(error => console.error('Error:', error));
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
