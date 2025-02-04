const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/addUser', (req, res) => {
    console.log(req.body);
    res.json({ message: 'เพิ่มผู้ใช้สำเร็จ!' });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
