require('dotenv').config();
const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();

// ให้ Express ให้บริการไฟล์ static จากโฟลเดอร์ 'public'
app.use(express.static(path.join(__dirname, "public")));

// เมื่อเข้าถึง root (/) ให้แสดงไฟล์ dashboard.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "dashboard.html"));
});

// ตั้งค่าพอร์ตให้ใช้จากตัวแปรแวดล้อม หรือใช้ 4000 เป็นค่าเริ่มต้น
const PORT = process.env.PORT || 10000;

async function startServer() {
    try {
        // รอให้ฐานข้อมูลเชื่อมต่อก่อนเริ่มเซิร์ฟเวอร์
        db.once("open", () => {
            console.log("Connected to the database");

            app.listen(PORT, () => {
                console.log(`Server started at http://localhost:${PORT}`);
            });
        });

        db.on("error", (err) => {
            console.error("Database connection error:", err);
            process.exit(1);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
}

startServer();
