function login() {
    const username = document.getElementById('username').value;
    if (username) {
        // 導向到 main.html 並傳遞使用者名稱
        window.location.href = `main.html?username=${encodeURIComponent(username)}`;
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
    if (username) {
        document.getElementById('welcome-message').textContent = `${username} 您好！`;
    } else {
        document.getElementById('welcome-message').textContent = `未提供姓名`;
    }
}
