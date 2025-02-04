// โหลด bcrypt.js
document.addEventListener('DOMContentLoaded', loadUsers);

// ฟังก์ชันสำหรับแฮชรหัสผ่านก่อนบันทึก
async function hashPassword(password) {
    const saltRounds = 10;  // จำนวนรอบของการแฮช (ยิ่งเยอะยิ่งปลอดภัย)
    return await bcrypt.hash(password, saltRounds);
}

// ฟังก์ชันเพิ่มผู้ใช้
async function addUser() {
    const username = document.getElementById('newUsername').value;
    const name = document.getElementById('newName').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userType = document.getElementById('newUserType').value;

    // ตรวจสอบค่าที่กรอก
    if (!username || !name || !password || !confirmPassword) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
    }
    if (password !== confirmPassword) {
        alert("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");
        return;
    }

    // แฮชรหัสผ่านด้วย bcrypt
    const hashedPassword = await hashPassword(password);

    // บันทึกข้อมูลลง localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, name, password: hashedPassword, userType, startDate: new Date().toISOString().split('T')[0] });
    localStorage.setItem('users', JSON.stringify(users));

    alert("เพิ่มผู้ใช้เรียบร้อยแล้ว");
    loadUsers();
    closeModal();
}

async function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username);

    if (!user) {
        alert("ไม่พบชื่อผู้ใช้");
        return;
    }

    // ตรวจสอบรหัสผ่าน
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        alert("เข้าสู่ระบบสำเร็จ!");
        window.location.href = 'dashboard.html';
    } else {
        alert("รหัสผ่านไม่ถูกต้อง");
    }
}
