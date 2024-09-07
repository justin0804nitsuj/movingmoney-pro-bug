function login() {
    const username = document.getElementById('username').value;
    if (username) {
        // 更新使用者的登入次數
        let loginCount = localStorage.getItem(`${username}_loginCount`) || 0;
        loginCount++;
        localStorage.setItem(`${username}_loginCount`, loginCount);

        // 更新總來訪人次
        let totalvisited = localStorage.getItem('totalvisited') || 0;
        totalvisited++;
        localStorage.setItem('totalvisited', totalvisited);

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
        const loginCount = localStorage.getItem(`${username}_loginCount`) || 0;
        document.getElementById('welcome-message').textContent = `${username} 你好`;
        document.getElementById('login-count').textContent = `您已登入本網站 ${loginCount} 次`;

        const totalvisited = localStorage.getItem('totalvisited') || 0;
        document.getElementById('total-visited').textContent = `來訪人次: ${totalvisited}`;
    } else {
        document.getElementById('welcome-message').textContent = `未提供姓名`;
    }
}

fetch('/visit')
    .then(response => response.json())
    .then(data => {
        document.getElementById('total-visited').textContent = `來訪人次: ${data.totalVisited}`;
    });

        // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiKJAv2LoRqZeDEeXwObHahORbRgbbF_0",
  authDomain: "pro-bug-24c02.firebaseapp.com",
  projectId: "pro-bug-24c02",
  storageBucket: "pro-bug-24c02.appspot.com",
  messagingSenderId: "786668643323",
  appId: "1:786668643323:web:c37036b82c80548e66215e",
  measurementId: "G-QB34B12S0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);