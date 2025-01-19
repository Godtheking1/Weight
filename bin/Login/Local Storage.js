// บันทึกข้อมูลผู้ใช้
localStorage.setItem('username', 'john_doe');
localStorage.setItem('email', 'john@example.com');
localStorage.setItem('isLoggedIn', 'true');

// ดึงข้อมูล
console.log(localStorage.getItem('username')); // "john_doe"
console.log(localStorage.getItem('email')); // "john@example.com"

// ลบข้อมูล
localStorage.removeItem('email');

// เช็คข้อมูลที่เหลือ
console.log(localStorage.length); // 2 (username และ isLoggedIn)

// วนลูปแสดงข้อมูลทั้งหมด
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log(`${key}: ${localStorage.getItem(key)}`);
}

// ล้างข้อมูลทั้งหมด
localStorage.clear();
console.log(localStorage.length); // 0
