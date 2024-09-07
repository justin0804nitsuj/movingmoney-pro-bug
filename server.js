// 在 server.js 中
const express = require('express');
const fs = require('fs');
const app = express();

app.get('/visit', (req, res) => {
    let count = parseInt(fs.readFileSync('count.txt', 'utf8'));
    count++;
    fs.writeFileSync('count.txt', count);
    res.json({ totalVisited: count });
});

app.listen(3000, () => console.log('伺服器運行在 3000 端口'));