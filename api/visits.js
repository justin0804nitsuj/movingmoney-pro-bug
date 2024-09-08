const fs = require('fs');
const path = require('path');

// 檔案路徑
const countFilePath = path.resolve(__dirname, '../../count.txt');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // 讀取總來訪人次
        fs.readFile(countFilePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Error reading file' });
            }
            res.status(200).json({ totalVisits: parseInt(data, 10) });
        });
    } else if (req.method === 'POST') {
        // 更新總來訪人次
        fs.readFile(countFilePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Error reading file' });
            }
            let totalVisits = parseInt(data, 10) || 0;
            totalVisits++;
            fs.writeFile(countFilePath, totalVisits.toString(), (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error writing file' });
                }
                res.status(200).json({ totalVisits });
            });
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
