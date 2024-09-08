function displayWelcomeMessage() {
    const username = getParameterByName('username');
    if (username) {
        document.getElementById('welcome-message').textContent = `${username} 您好！`;
    } else {
        document.getElementById('welcome-message').textContent = `未提供姓名`;
    }
}
