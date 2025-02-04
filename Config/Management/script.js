// โหลดข้อมูลผู้ใช้จาก localStorage
function getUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(user => ({
        ...user,
        startDate: user.startDate || new Date().toISOString().slice(0, 10), // กำหนด startDate ถ้ายังไม่มี
        updatedDate: user.updatedDate || "-" // ถ้ายังไม่มี updatedDate ให้เป็น "-"
    }));

    return users;
}

// บันทึกข้อมูลผู้ใช้ไปยัง localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers(); // โหลดข้อมูลใหม่ทันทีหลังจากอัปเดต
}

// โหลดผู้ใช้เมื่อเปิดหน้า
document.addEventListener('DOMContentLoaded', loadUsers);

let currentPage = 1;  // หน้าปัจจุบันเริ่มต้นที่ 1
let usersPerPage = 20;  // จำนวนผู้ใช้ต่อหน้าเริ่มต้นที่ 20
let users = JSON.parse(localStorage.getItem('users')) || [];  // ดึงข้อมูลผู้ใช้จาก localStorage
let totalUsers = users.length;  // คำนวณจำนวนผู้ใช้ทั้งหมดจากข้อมูลใน localStorage
let totalPages = Math.ceil(totalUsers / usersPerPage);  // คำนวณจำนวนหน้าทั้งหมด

function changeUsersPerPage(value) {
    usersPerPage = value;
    currentPage = 1;  // เมื่อเปลี่ยนจำนวนผู้ใช้ต่อหน้า ให้เริ่มหน้าแรก
    totalPages = Math.ceil(totalUsers / usersPerPage);  // อัปเดตจำนวนหน้าทั้งหมด
    loadUsers();
    updatePageSelector();
    updatePageInfo();
}

function loadUsers() {
    const adminTable = document.getElementById('adminTableBody');
    const userTable = document.getElementById('userTableBody');

    const start = (currentPage - 1) * usersPerPage;
    const end = currentPage * usersPerPage;

    const usersToDisplay = users.slice(start, end); // เลือกผู้ใช้ที่จะแสดง

    // ล้างข้อมูลเดิมในตาราง
    adminTable.innerHTML = '';
    userTable.innerHTML = '';

    let adminRowCount = 0;
    let userRowCount = 0;

    usersToDisplay.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.name}</td>
            <td>${'*'.repeat(user.password.length)}</td>
            <td>${user.userType === 'admin' ? 'Admin' : 'User'}</td>
            <td>${user.startDate || '-'}</td>
            <td>${user.updatedDate || '-'}</td>
            <td class="actions">
                <button class="edit" onclick="editUser('${user.username}')">
                    <span class="icon">✏️</span>Edit
                </button>
                <button class="delete" onclick="deleteUser('${user.username}')">
                    <span class="icon">🗑️</span>Delete
                </button>
            </td>
        `;

        // แยกกลุ่มผู้ใช้
        if (user.userType === 'admin') {
            // กำหนดสีพื้นหลังสลับกันสำหรับแถวของ Admin
            if (adminRowCount % 2 === 0) {
                row.style.backgroundColor = '#f2f2f2'; // สีเทาอ่อน
            } else {
                row.style.backgroundColor = '#ffffff'; // สีขาว
            }
            adminRowCount++; // เพิ่มตัวนับแถว Admin
            adminTable.appendChild(row);
        } else {
            // กำหนดสีพื้นหลังสลับกันสำหรับแถวของ User
            if (userRowCount % 2 === 0) {
                row.style.backgroundColor = '#f2f2f2'; // สีเทาอ่อน
            } else {
                row.style.backgroundColor = '#ffffff'; // สีขาว
            }
            userRowCount++; // เพิ่มตัวนับแถว User
            userTable.appendChild(row);
        }
    });

    updatePageSelector();
    updatePageInfo();
}

function updatePageInfo() {
    const totalUsers = users.length; // จำนวนผู้ใช้ทั้งหมด
    const totalPages = Math.ceil(totalUsers / usersPerPage); // จำนวนหน้าทั้งหมด
    const pageInfo = document.getElementById('pageInfo');
    pageInfo.textContent = `Page ${currentPage} of ${totalPages} (${totalUsers} Users)`;
}

function updatePageSelector() {
    const pageSelector = document.getElementById('pageSelector');

    pageSelector.innerHTML = '';  // ลบปุ่มหน้าก่อนหน้า

    let pageNumbers = [];
    // สร้างหมายเลขหน้าสำหรับแสดงผล
    if (totalPages <= 4) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        if (currentPage <= 3) {
            for (let i = 1; i <= 4; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...', totalPages);
        } else if (currentPage >= totalPages - 2) {
            pageNumbers.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
    }

    // เพิ่มปุ่มหน้าลงไปใน pageSelector
    pageNumbers.forEach(number => {
        const pageButton = document.createElement('span');
        pageButton.classList.add('page-button');
        pageButton.textContent = number;
        pageButton.onclick = () => {
            if (number !== '...') {
                currentPage = number;
                loadUsers();
            }
        };
        pageSelector.appendChild(pageButton);
    });
}

function goToPage(pageNumber) {
    currentPage = pageNumber;
    loadUsers();
}

function openModal(isEditMode = false) {
    const addModal = document.getElementById('addUserModal');
    const editModal = document.getElementById('editUserModal');
    const modalTitle = document.getElementById('modalTitle');
    const addUserForm = document.getElementById('addUserForm');
    const editUserForm = document.getElementById('editUserForm');

    addModal.style.display = 'none';
    editModal.style.display = 'none';

    if (isEditMode) {
        modalTitle.innerText = 'Edit User';
        editModal.style.display = 'block';
        addUserForm.style.display = 'none';
        editUserForm.style.display = 'block';
    } else {
        modalTitle.innerText = 'Add User';
        addModal.style.display = 'block';
        addUserForm.style.display = 'block';
        editUserForm.style.display = 'none';
    }
}

function closeModal() {
    const addModal = document.getElementById('addUserModal');
    const editModal = document.getElementById('editUserModal');

    addModal.style.display = 'none';
    editModal.style.display = 'none';
}

// ฟังก์ชันสำหรับเพิ่มผู้ใช้ใหม่
function addUser() {
    const username = document.getElementById('newUsername').value;
    const name = document.getElementById('newName').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userType = document.getElementById('newUserType').value;

    // ลบข้อความผิดพลาดที่เคยแสดงไว้
    const errorMessage = document.querySelector('.error-message');
    errorMessage.textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';

    // ตรวจสอบค่าที่กรอก
    if (!username || !name || !password || !confirmPassword) {
        errorMessage.textContent = "กรุณากรอกข้อมูลให้ครบถ้วน";
        return;
    }

    // ตรวจสอบความยาวของรหัสผ่าน
    if (password.length < 8) {
        document.getElementById('confirmPasswordError').textContent = "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร";
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
        document.getElementById('confirmPasswordError').textContent = `รหัสผ่านไม่ครบ: ${missingElements.join(", ")}`;
        return;
    }

    // ตรวจสอบว่ารหัสผ่านตรงกันหรือไม่
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = "รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน";
        return;
    }

    // ตรวจสอบ Username ซ้ำ
    const users = getUsers();  // ฟังก์ชัน getUsers() ควรดึงข้อมูลผู้ใช้ที่มีอยู่แล้ว
    if (users.some(user => user.username === username)) {
        document.getElementById('usernameError').textContent = "ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว";
        return;
    }

    const userData = { username, name, password, userType };

    // ส่งข้อมูลผู้ใช้ใหม่ไปยัง backend (Server)
    fetch('http://localhost:5000/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);  // แจ้งให้ผู้ใช้ทราบ
        loadUsers();  // โหลดข้อมูลใหม่จาก Server
    })
    .catch(error => {
        console.error('Error:', error);
        alert('ไม่สามารถบันทึกข้อมูลได้');
    });

    // ล้างฟอร์ม
    clearFormFields();

    // ปิด Modal
    closeModal();
}

// ฟังก์ชันสำหรับแก้ไขผู้ใช้
function editUser(username) {
    const users = getUsers();
    const user = users.find(user => user.username === username);

    if (user) {
        document.getElementById('editUsername').value = user.username;
        document.getElementById('editName').value = user.name;
        // document.getElementById('editPassword').value = user.password;    // ไม่แสดงรหัสผ่านเดิม
        document.getElementById('editUserType').value = user.userType;

        openModal(true); // เปิด Modal ในโหมดแก้ไข
        saveUsers(users);
    }
}

// ฟังก์ชันสำหรับอัปเดตข้อมูลผู้ใช้
function updateUser() {
    const username = document.getElementById('editUsername').value;
    const name = document.getElementById('editName').value;
    const password = document.getElementById('editPassword').value;
    const userType = document.getElementById('editUserType').value;
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    confirmPasswordError.textContent = '';

    if (!password) {
        confirmPasswordError.textContent = "กรุณากรอกรหัสผ่าน";
        return;
    }

    if (password.length < 8) {
        confirmPasswordError.textContent = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
        return;
    }

    const missingElements = [];
    if (!/[a-z]/.test(password)) missingElements.push("ตัวอักษรตัวเล็ก");
    if (!/[A-Z]/.test(password)) missingElements.push("ตัวอักษรตัวใหญ่");
    if (!/\d/.test(password)) missingElements.push("ตัวเลข");
    if (!/[!@#$%^&*()-+._|={}]/.test(password)) missingElements.push("อักขระพิเศษ");

    if (missingElements.length > 0) {
        confirmPasswordError.textContent = `รหัสผ่านต้องมี: ${missingElements.join(", ")}`;
        return;
    }

    let users = getUsers(); // โหลดข้อมูลผู้ใช้ทั้งหมดจาก localStorage
    let userIndex = users.findIndex(user => user.username === username);

    if (userIndex !== -1) {
        users[userIndex].name = name;
        users[userIndex].userType = userType;
        
        // อัปเดตรหัสผ่านถ้ามีการเปลี่ยนแปลง
        if (password) {
            users[userIndex].password = password;
        }

        // อัปเดตวันที่แก้ไขล่าสุด
        users[userIndex].updatedDate = new Date().toISOString().slice(0, 10);

        saveUsers(users); // บันทึกข้อมูลที่แก้ไขแล้วลง localStorag
        location.reload();
        closeModal(); // ปิด Modal
    }
}

// ฟังก์ชันสำหรับลบผู้ใช้
function deleteUser(username) {
    // เอาผู้ใช้ทั้งหมดจาก localStorage
    const users = getUsers();

    // กรองลบผู้ใช้ที่ตรงกับชื่อผู้ใช้ที่เลือก
    const updatedUsers = users.filter(user => user.username !== username);

    // บันทึกข้อมูลผู้ใช้ที่อัปเดตกลับไปที่ localStorage
    saveUsers(updatedUsers);

    // รีเฟรชหน้าเว็บหลังจากลบผู้ใช้
    location.reload(); // เพิ่มที่นี่

    // แจ้งเตือนหรือทำการแสดงข้อความหลังการลบได้ตามต้องการ
    alert("ผู้ใช้ถูกลบเรียบร้อยแล้ว");
}

function checkUsername() {
    const username = document.getElementById('newUsername').value.trim();
    const users = getUsers();

    if (users.some(user => user.username === username)) {
        document.getElementById('usernameError').textContent = 'ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว';
    } else {
        document.getElementById('usernameError').textContent = '';
    }
}

function clearFormFields() {
    document.getElementById('newUsername').value = '';
    document.getElementById('newName').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('newUserType').value = 'admin'; // รีเซ็ตค่า User Type เป็น 'admin'
    document.getElementById('usernameError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';
}

function changeUsersPerPage(value) {
    console.log('Number of users per page: ', value);
    // คุณสามารถใส่โค้ดเพื่อปรับจำนวนผู้ใช้ต่อหน้าได้ที่นี่
}

function toggleSection(sectionId, element) {
    const section = document.getElementById(sectionId);
    const header = section.previousElementSibling; // h2 ก่อน div

    // เช็คการเปิดหรือปิด
    if (section.style.display === 'none') {
        section.style.display = 'block';  // แสดงเนื้อหาของ section
        element.innerText = '⬆️ ' + element.innerText.slice(2);  // เปลี่ยนลูกศรเป็นขึ้น
    } else {
        section.style.display = 'none';   // ซ่อนเนื้อหาของ section
        element.innerText = '⬇️ ' + element.innerText.slice(2);  // เปลี่ยนลูกศรเป็นลง
    }
    
    element.classList.toggle('active');
}

// ฟังก์ชันสำหรับปุ่ม Home
function goHome() {
    window.location.href = 'https://god-weight.netlify.app/dashboard.html';  // เปลี่ยนเส้นทางไปหน้าแรก
}

// โหลดข้อมูลเมื่อหน้าเว็บโหลดเสร็จ
window.onload = loadUsers;