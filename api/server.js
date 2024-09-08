const fs = require('fs');
const express = require('express');
const app = express();
const countFile = 'count.txt';

// 讀取總來訪人次
app.get('/getTotalVisits', (req, res) => {
    fs.readFile(countFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        res.json({ totalVisits: parseInt(data, 10) });
    });
});

// 更新總來訪人次
app.post('/incrementVisits', (req, res) => {
    fs.readFile(countFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        let totalVisits = parseInt(data, 10) || 0;
        totalVisits++;
        fs.writeFile(countFile, totalVisits.toString(), (err) => {
            if (err) {
                return res.status(500).send('Error writing file');
            }
            res.json({ totalVisits });
        });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`伺服器正在運行: ${PORT}`);
});

module.exports = app;
