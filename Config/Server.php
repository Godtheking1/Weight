<?php
// การเชื่อมต่อกับฐานข้อมูล MySQL
$host = 'sql.freedb.tech:3306'; // ชื่อโฮสต์ (หรือ IP)
$username = 'freedb_Godadmin';  // ชื่อผู้ใช้ฐานข้อมูล
$password = 'y2Vk$5aS5HAQ*E?';      // รหัสผ่าน (หากมี)
$database = 'freedb_Weight_2025'; // ชื่อฐานข้อมูล

// สร้างการเชื่อมต่อ
$conn = new mysqli($host, $username, $password, $database);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connected successfully";  // การเชื่อมต่อสำเร็จ
}

// คำสั่ง SQL เพื่อดึงข้อมูลจากตาราง Trim
$sql = "SELECT part_no, dc_part_no, full_part_name, model, control, total FROM Trim";

// ส่งคำสั่ง SQL และเก็บผลลัพธ์
$result = $conn->query($sql);

// เริ่มการสร้าง dropdown
echo '<select class="listbox" size="9" id="listbox">';
echo '<option value="" disabled selected>No.  | D/C Part No. | Full Part Name. | Model | Control | Total </option>';

// ถ้ามีข้อมูลในฐานข้อมูล
if ($result->num_rows > 0) {
    // ลูปผ่านผลลัพธ์และแสดงแต่ละแถวใน dropdown
    while($row = $result->fetch_assoc()) {
        // ตรวจสอบข้อมูลที่ดึงมา
        echo '<pre>';
        var_dump($row);
        echo '</pre>';
        
        echo '<option value="' . $row["part_no"] . '">' . $row["part_no"] . ' | ' . $row["dc_part_no"] . ' | ' . $row["full_part_name"] . ' | ' . $row["model"] . ' | ' . $row["control"] . ' | ' . $row["total"] . '</option>';
    }
} else {
    echo '<option>No data found</option>';
}

echo '</select>';

// ปิดการเชื่อมต่อ
$conn->close();
?>
