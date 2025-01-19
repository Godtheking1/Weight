// การจัดการฟอร์มล็อกอิน
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์ม

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // ตรวจสอบว่าใส่ข้อมูลหรือไม่
    if (!username || !password) {
        document.getElementById('errorMessage').textContent = "กรุณากรอก Username และ Password";
        return;
    }

    // ดึงข้อมูลผู้ใช้จาก localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // หากล็อกอินสำเร็จ, เก็บข้อมูลผู้ใช้ลงใน localStorage
        localStorage.setItem('loggedInUser', username);
        
        alert("Login สำเร็จ!");
        window.location.href = 'file:///C:/Users/H-01-002933/Desktop/SQL/Web%20Upper%20Lower/index.html'; // เปลี่ยนไปหน้าหลัก
    } else {
        document.getElementById('errorMessage').textContent =
            "Username หรือ Password ไม่ถูกต้อง!";
    }
});

// การเปลี่ยนหน้าไปยังหน้าลงทะเบียน
function registerRedirect() {
    window.location.href ='../Register/Register.html'
}

// การคลิก "Forgot Password?"
document.getElementById('forgotPassword').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = '../Forgot/forgot-password.html';
});
