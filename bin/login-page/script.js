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

// ฟังก์ชันลงทะเบียน
document.querySelector('.register-container form').addEventListener('submit', function (event) {
  event.preventDefault(); // ป้องกันการรีโหลดหน้าเว็บ

  console.log("Register form submitted");

  // เก็บค่าจาก input
  const username = this.querySelector('input[placeholder="username"]').value.trim();
  const name = this.querySelector('input[placeholder="name"]').value.trim();
  const password = this.querySelector('input[placeholder="password"]').value.trim();
  const confirmPassword = this.querySelector('input[placeholder="Confirm Password"]').value.trim();
  const userType = this.querySelector('#newUserType').value; // รับค่าประเภทผู้ใช้

  const errorMessage = this.querySelector('.error-message');
  errorMessage.textContent = '';

  // ตรวจสอบค่าที่กรอก
  if (!username || !name || !password || !confirmPassword) {
    errorMessage.textContent = "กรุณากรอกข้อมูลให้ครบถ้วน";
    return;
  }

  // ตรวจสอบความยาวของรหัสผ่าน
  if (password.length < 8) {
    errorMessage.textContent = "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร";
    return;
  }

  // ตรวจสอบความแข็งแรงของรหัสผ่าน
  const missingElements = [];
  if (!/[a-z]/.test(password)) {
    missingElements.push("ตัวอักษรตัวเล็ก");
  }
  if (!/[A-Z]/.test(password)) {
    missingElements.push("ตัวอักษรตัวใหญ่");
  }
  if (!/\d/.test(password)) {
    missingElements.push("ตัวเลข");
  }
  if (!/[!@#$%^&*()-+._|={}]/.test(password)) {
    missingElements.push("อักขระพิเศษ");
  }

  if (missingElements.length > 0) {
    errorMessage.textContent = `รหัสผ่านไม่ครบ: ${missingElements.join(", ")}`;
    return;
  }

  // ตรวจสอบว่ารหัสผ่านและการยืนยันรหัสผ่านตรงกันหรือไม่
  if (password !== confirmPassword) {
    errorMessage.textContent = "รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน";
    return;
  }

  // บันทึกผู้ใช้ใหม่ใน localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // ตรวจสอบ username ซ้ำ
  if (users.some(user => user.username === username)) {
    errorMessage.textContent = "ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว";
    return;
  }

  // วันที่ปัจจุบัน (Start Date)
  const startDate = new Date().toISOString().split('T')[0]; // รูปแบบ YYYY-MM-DD

  // เพิ่มผู้ใช้ใหม่ในระบบ
  users.push({ username, name, password, userType, startDate });
  localStorage.setItem('users', JSON.stringify(users));

  alert("สมัครสมาชิกสำเร็จ!");

  // ล้างค่าในฟอร์ม
  this.reset();

  // สลับไปหน้า Login
  document.getElementById('container').classList.remove("right-panel-active");

  console.log("ข้อมูลที่กรอก:", { username, name, password, userType, startDate });
});

// ฟังก์ชันการเข้าสู่ระบบ
document.querySelector('.login-container form').addEventListener('submit', function (event) {
  event.preventDefault(); // ป้องกันการรีโหลดหน้าเว็บ

  console.log("Login form submitted");

  const username = this.querySelector('input[placeholder="Name"]').value.trim();
  const password = this.querySelector('input[placeholder="Password"]').value.trim();

  const errorMessage = this.querySelector('.error-message'); 
  errorMessage.textContent = ''; // ลบข้อความเตือนเก่า

  if (!username || !password) {
    errorMessage.textContent = "กรุณากรอกข้อมูลให้ครบถ้วน"; // แสดงข้อความเตือน
    return;
  }

  // ตรวจสอบข้อมูลผู้ใช้ใน localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    errorMessage.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"; // แสดงข้อความเตือน
    return;
  }

  // ✅ บันทึก Username ที่ Login ลงใน Local Storage
  localStorage.setItem("loggedInUser", username);


  // ถ้าเข้าสู่ระบบสำเร็จ
  window.location.href = 'https://god-weight.netlify.app/dashboard.html'; // เปลี่ยนไปที่หน้า Dashboard
  console.log("ข้อมูลที่กรอก:", { username, password });
});

// การคลิก "Forgot Password?"
const forgotPasswordLink = document.querySelector('.pass-link a');
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = 'https://god-weight.netlify.app/bin/Forgot/forgot-password.html';
  });
} 