import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./data.json');

export default function handler(req, res) {
    if (req.method === 'POST') {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        data.totalVisits += 1;

        fs.writeFileSync(filePath, JSON.stringify(data));

        res.status(200).json({ totalVisits: data.totalVisits });
    } else if (req.method === 'GET') {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        res.status(200).json({ totalVisits: data.totalVisits });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
