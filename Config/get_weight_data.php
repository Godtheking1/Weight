<?php
header('Content-Type: application/json');
// สมมุติว่าเชื่อมต่อฐานข้อมูลแล้ว
$query = "SELECT standard, lower_value, upper_value FROM weight_data";
$result = mysqli_query($conn, $query);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
echo json_encode($data);
?>
