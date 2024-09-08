// api/visits.js
import fs from 'fs';
import path from 'path';

const countFilePath = path.resolve('/tmp/count.txt');  // 使用 /tmp 目錄

export default async function handler(req, res) {
    if (req.method === 'GET') {
        fs.readFile(countFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return res.status(500).json({ message: 'Error reading file' });
            }
            res.status(200).json({ totalVisits: parseInt(data, 10) });
        });
    } else if (req.method === 'POST') {
        fs.readFile(countFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return res.status(500).json({ message: 'Error reading file' });
            }
            let totalVisits = parseInt(data, 10) || 0;
            totalVisits++;
            fs.writeFile(countFilePath, totalVisits.toString(), (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return res.status(500).json({ message: 'Error writing file' });
                }
                res.status(200).json({ totalVisits });
            });
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
