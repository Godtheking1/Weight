-- เลือกใช้ฐานข้อมูล
USE freedb_Weight_2025;

-- สร้างตารางในฐานข้อมูลที่เลือก
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    weight FLOAT
);

-- แทรกข้อมูลตัวอย่าง
INSERT INTO users (name, weight) VALUES ('John Doe', 70.99);

-- ดูข้อมูลในตาราง
SELECT * FROM users;
