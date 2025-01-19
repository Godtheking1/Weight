// ฟังก์ชันที่จะทำงานเมื่อกดปุ่ม Submit (กรอก Username)
function submitUsername() {
    let username = document.getElementById('forgotUsername').value; // รับชื่อผู้ใช้จากฟอร์ม
    let users = JSON.parse(localStorage.getItem('users')) || []; // ดึงข้อมูลจาก localStorage

    if (!username) {
        document.getElementById('message').textContent = "กรุณากรอก Username.";
        return;
    }

    // ค้นหาผู้ใช้ที่กรอกชื่อผู้ใช้
    let user = users.find(user => user.username === username);

    if (user) {
        // หากพบผู้ใช้ จะให้แสดงฟอร์มให้กรอกรหัสใหม่
        document.getElementById('forgotContainer').style.display = 'none';  // ซ่อนฟอร์มกรอก Username
        document.getElementById('newPasswordForm').style.display = 'block';  // แสดงฟอร์มสร้างรหัสใหม่
    } else {
        // หากไม่พบ Username
        document.getElementById('message').textContent = "Username not found.";
    }
}

// ฟังก์ชันสำหรับการเปลี่ยนรหัสผ่าน
        function resetPassword() {
            let username = document.getElementById('forgotUsername').value; // รับชื่อผู้ใช้
            let newPassword = document.getElementById('newPassword').value; // รับรหัสผ่านใหม่
            let confirmPassword = document.getElementById('confirmPassword').value; // รับรหัสยืนยัน
            let users = JSON.parse(localStorage.getItem('users')) || []; // ดึงข้อมูลผู้ใช้จาก localStorage

            if (!newPassword || !confirmPassword) {
                document.getElementById('message').textContent = "กรุณากรอกทั้งรหัสผ่านใหม่และยืนยันรหัสผ่าน.";
                return;
            }

            if (newPassword !== confirmPassword) {
                document.getElementById('message').textContent = "รหัสผ่านไม่ตรงกัน กรุณาลองใหม่.";
                return;
            }

            if (newPassword.length < 8) {
                document.getElementById('message').textContent = "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร.";
                return;
            }

            // ตรวจสอบเงื่อนไขเพิ่มเติม
            if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/\d/.test(newPassword) || !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
                document.getElementById('message').textContent = "รหัสผ่านต้องประกอบด้วยอักษรใหญ่, อักษรเล็ก, ตัวเลข และอักษรพิเศษ.";
                return;
            }

            // อัปเดตรหัสผ่าน
            let userIndex = users.findIndex(user => user.username === username);

            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));
                alert("อัปเดตรหัสผ่านสำเร็จ!");
                window.location.href = "../Login/Login.html";  // เปลี่ยนไปยังหน้า Login
            } else {
                document.getElementById('message').textContent = "ไม่พบผู้ใช้ในระบบ.";
            }
        }

        // ฟังก์ชันสำหรับการตรวจสอบเงื่อนไขของรหัสผ่าน
        function checkPasswordConditions() {
            let password = document.getElementById('newPassword').value;

            document.getElementById('lengthCheckbox').checked = password.length >= 8;
            document.getElementById('uppercaseCheckbox').checked = /[A-Z]/.test(password);
            document.getElementById('lowercaseCheckbox').checked = /[a-z]/.test(password);
            document.getElementById('numberCheckbox').checked = /\d/.test(password);
            document.getElementById('specialCharCheckbox').checked = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        }

        // เรียกใช้ฟังก์ชัน checkPasswordConditions() ทุกครั้งที่มีการพิมพ์รหัสผ่าน
        document.getElementById('newPassword').addEventListener('input', checkPasswordConditions);