const express = require("express");
const app = express();
const path = require("path");

// ให้ Express ให้บริการไฟล์ static จากโฟลเดอร์ 'public'
app.use(express.static(path.join(__dirname, "public")));

// เมื่อเข้าถึง root (/) ให้แสดงไฟล์ dashboard.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// ตั้งค่าพอร์ตให้ใช้จากตัวแปรแวดล้อม หรือใช้ 10000 เป็นค่าเริ่มต้น
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
require('dotenv').config();
const app = require('./app');
const db = require('./db');

const PORT = process.env.PORT || 4000;

async function startServer() {
	//on database connection
	db.once('open', () => console.log('connected to the databse'));

	app.listen(PORT, () => {
		console.log(`Server started at http://localhost:${PORT}`);
	});
}

startServer();
