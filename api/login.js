import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./data.json');

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username } = req.body;
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        if (!data.users[username]) {
            data.users[username] = { loginCount: 0 };
        }

        data.users[username].loginCount += 1;

        fs.writeFileSync(filePath, JSON.stringify(data));

        res.status(200).json({ loginCount: data.users[username].loginCount });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
