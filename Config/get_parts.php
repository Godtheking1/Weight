<?php
// กำหนดข้อมูลการเชื่อมต่อฐานข้อมูล
$servername = "sql.freedb.tech"; // ชื่อเซิร์ฟเวอร์ฐานข้อมูล
$username = "freedb_Godadmin"; // ชื่อผู้ใช้ฐานข้อมูล
$password = "y2Vk$5aS5HAQ*E?"; // รหัสผ่านฐานข้อมูล
$dbname = "freedb_Weight_2025"; // ชื่อฐานข้อมูล

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// ดึงข้อมูลจากตาราง Trim
$sql = "SELECT * FROM Trim"; // ใช้ชื่อของตารางที่ต้องการดึงข้อมูล
$result = $conn->query($sql);

// ตรวจสอบว่ามีข้อมูลหรือไม่
if ($result === false) {
    echo json_encode(["error" => "Query failed: " . $conn->error]);
    exit;
}

$parts = [];
if ($result->num_rows > 0) {
    // เก็บข้อมูลแต่ละแถว
    while($row = $result->fetch_assoc()) {
        $parts[] = $row;
    }
} else {
    echo json_encode(["message" => "No results found"]);
    exit;
}

// ส่งข้อมูลกลับในรูปแบบ JSON
header('Content-Type: application/json'); // กำหนด header ให้ส่งข้อมูลเป็น JSON
echo json_encode($parts);

// ปิดการเชื่อมต่อฐานข้อมูล
$conn->close();
?>
