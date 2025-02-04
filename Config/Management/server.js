require('dotenv').config();  // เรียกใช้ dotenv

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 เชื่อมต่อฐานข้อมูล MySQL โดยใช้ environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// ตรวจสอบการเชื่อมต่อฐานข้อมูล
db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to MySQL database");
});

// 📌 Route: ดึงข้อมูลทั้งหมดจากตาราง Trim
app.get("/api/trim", (req, res) => {
    db.query("SELECT * FROM Trim", (err, result) => {
        if (err) {
            console.error("Error fetching data:", err);
            res.status(500).json({ error: "Failed to fetch data" });
            return;
        }
        res.json(result);
    });
});

// 📌 Route: เพิ่มข้อมูลใหม่ลงใน Trim
app.post("/api/trim", (req, res) => {
    const { name, weight } = req.body;

    // ตรวจสอบว่ามีการส่งข้อมูลที่จำเป็นหรือไม่
    if (!name || !weight) {
        return res.status(400).json({ error: "Name and weight are required" });
    }

    db.query("INSERT INTO Trim (name, weight) VALUES (?, ?)", [name, weight], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).json({ error: "Failed to insert data" });
            return;
        }
        res.json({ message: "✅ Data added successfully", id: result.insertId });
    });
});

// 📌 Route: ลบข้อมูลตาม ID
app.delete("/api/trim/:id", (req, res) => {
    const { id } = req.params;

    // ตรวจสอบว่ามีการส่ง ID หรือไม่
    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }

    db.query("DELETE FROM Trim WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error deleting data:", err);
            res.status(500).json({ error: "Failed to delete data" });
            return;
        }
        res.json({ message: "✅ Data deleted successfully" });
    });
});

// 📌 Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
