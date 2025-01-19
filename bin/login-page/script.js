// สลับระหว่าง Register และ Login Form
const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// ฟังก์ชันการสมัครสมาชิก
document.querySelector('.register-container form').addEventListener('submit', function (event) {
  event.preventDefault(); // ป้องกันการรีโหลดหน้าเว็บ

  const name = this.querySelector('input[placeholder="Name"]').value.trim();
  const password = this.querySelector('input[placeholder="password"]').value.trim();
  const confirmPassword = this.querySelector('input[placeholder="Confirm Password"]').value.trim();

  if (!name || !password || !confirmPassword) {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    return;
  }

  if (password !== confirmPassword) {
    alert("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");
    return;
  }

  // บันทึกผู้ใช้ใหม่ใน localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.some(user => user.name === name)) {
    alert("ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว");
    return;
  }

  users.push({ name, password });
  localStorage.setItem('users', JSON.stringify(users));

  alert("สมัครสมาชิกสำเร็จ!");
  container.classList.remove("right-panel-active"); // สลับไปหน้า Login
});

// ฟังก์ชันการเข้าสู่ระบบ
document.querySelector('.login-container form').addEventListener('submit', function (event) {
  event.preventDefault(); // ป้องกันการรีโหลดหน้าเว็บ

  const name = this.querySelector('input[placeholder="Name"]').value.trim();
  const password = this.querySelector('input[placeholder="Password"]').value.trim();

  if (!name || !password) {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    return;
  }

  // ตรวจสอบข้อมูลผู้ใช้ใน localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.name === name && user.password === password);

  if (!user) {
    alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    return;
  }

  alert("เข้าสู่ระบบสำเร็จ!");
  window.location.href = 'http://127.0.0.1:5500/dashboard.html'; // เปลี่ยนไปหน้า Dashboard
});

// การคลิก "Forgot Password?"
const forgotPasswordLink = document.querySelector('.pass-link a');
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = 'http://127.0.0.1:5500/bin/Forgot/forgot-password.html';
  });
}
