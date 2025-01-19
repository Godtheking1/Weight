document.getElementById('newPassword').addEventListener('input', validatePassword);

function validatePassword() {
    const password = document.getElementById('newPassword').value;

    let isValid = true; // ตัวแปรสำหรับเก็บสถานะว่าผ่านทุกเงื่อนไขหรือไม่

    // ตรวจสอบความยาวของรหัสผ่าน
    const isLengthValid = password.length >= 8;
    document.getElementById('lengthCheckbox').checked = isLengthValid;
    if (!isLengthValid) isValid = false;

    // ตรวจสอบอักษรพิมพ์ใหญ่
    const hasUppercase = /[A-Z]/.test(password);
    document.getElementById('uppercaseCheckbox').checked = hasUppercase;
    if (!hasUppercase) isValid = false;

    // ตรวจสอบอักษรพิมพ์เล็ก
    const hasLowercase = /[a-z]/.test(password);
    document.getElementById('lowercaseCheckbox').checked = hasLowercase;
    if (!hasLowercase) isValid = false;

    // ตรวจสอบตัวเลข
    const hasNumber = /\d/.test(password);
    document.getElementById('numberCheckbox').checked = hasNumber;
    if (!hasNumber) isValid = false;

    // ตรวจสอบอักษรพิเศษ
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_=+-/';]/.test(password);
    document.getElementById('specialCharCheckbox').checked = hasSpecialChar;
    if (!hasSpecialChar) isValid = false;

    // คืนค่าผลลัพธ์ (true = ผ่านเงื่อนไขทั้งหมด, false = มีเงื่อนไขที่ไม่ผ่าน)
    return isValid;
}

    // ฟังก์ชันสำหรับอัปเดต Checkbox ผ่าน JavaScript
    function updateCheckbox(id, isChecked) {
        const checkbox = document.getElementById(id);
        checkbox.checked = isChecked; // ติ๊กหรือยกเลิกการติ๊ก
    }

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์ม

    // ตรวจสอบรหัสผ่านผ่านเงื่อนไขหรือไม่
    if (!validatePassword()) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วนตามเงื่อนไข");
        return; // หยุดถ้ารหัสผ่านไม่ผ่านการตรวจสอบ
    }

    const username = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    // ตรวจสอบว่ามีผู้ใช้คนนี้อยู่แล้วหรือไม่
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
        alert("Username นี้ถูกใช้งานแล้ว");
        return;
    }

    // เพิ่มผู้ใช้ใหม่ลงใน localStorage
    users.push({ username: username, password: newPassword });
    localStorage.setItem('users', JSON.stringify(users));

    alert("ลงทะเบียนสำเร็จ!");
    window.location.href = '../Login/Login.html'; // เปลี่ยนไปหน้า Login
});
function goBack() {
    window.location.href = "../Login/Login.html"; // กลับไปหน้า Login
}