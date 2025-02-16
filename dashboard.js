document.addEventListener("DOMContentLoaded", function () {
    const listbox = document.getElementById("listbox");
    const editBtn = document.getElementById("edit-btn");
    const deleteBtn = document.getElementById("delete-btn");

    if (!listbox || !editBtn || !deleteBtn) {
        console.error("Elements not found");
        return;
    }

    // ถ้ายังต้องการให้ปุ่มแสดงเฉพาะเมื่อเลือกข้อมูล
    listbox.addEventListener("change", function () {
        const selectedOption = listbox.options[listbox.selectedIndex];
        
        // เช็คหากตัวเลือกไม่ใช่ตัวแรกที่ไม่สามารถเลือกได้
        if (selectedOption && selectedOption.value !== "กรุณาเลือกข้อมูล" && selectedOption.value !== "") {
            editBtn.disabled = false;
            deleteBtn.disabled = false;
        } else {
            editBtn.disabled = true;
            deleteBtn.disabled = true;
        }
    });
    
    // ฟังก์ชันแก้ไข
    function editFunction() {
        const listbox = document.getElementById("listbox");
        const selectedOption = listbox.options[listbox.selectedIndex];
        if (selectedOption) {
            alert("Editing: " + selectedOption.text);
        }
    }

    // ฟังก์ชันลบ
    function deleteFunction() {
        const listbox = document.getElementById("listbox");
        const selectedOption = listbox.options[listbox.selectedIndex];
        
        // ป้องกันไม่ให้ลบตัวเลือกแรก
        if (selectedOption && selectedOption.value !== "กรุณาเลือกข้อมูล" && selectedOption.value !== "") {
            if (confirm("Delete " + selectedOption.text + "?")) {
                selectedOption.remove();
                // ซ่อนปุ่มเมื่อไม่มีการเลือก
                editBtn.style.display = "none";
                deleteBtn.style.display = "none";
            }
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        // ดึงข้อมูลผู้ใช้ทั้งหมดจาก localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // หาผู้ใช้ที่ล็อกอิน
        const user = users.find(u => u.username === loggedInUser);

        // ถ้าหากพบข้อมูลของผู้ใช้ที่ล็อกอิน
        if (user) {
            const userType = user.userType; // รับค่า userType จากข้อมูลผู้ใช้
            const userTypeElement = document.getElementById("Usertype");
            const addUserButton = document.getElementById("addUserButton");

            if (userTypeElement) {
                // แสดงค่า userType (Admin หรือ user) ใน input
                userTypeElement.value = userType;
            }

            if (addUserButton) {
                // ถ้า userType เป็น admin แสดงปุ่ม Add User
                if (userType === "admin") {
                    addUserButton.style.display = "inline-block"; // หรือ "block" ขึ้นอยู่กับ layout
                    addUserButton.disabled = false;
                } else {
                    // ถ้า userType ไม่ใช่ admin ซ่อนปุ่ม Add User
                    addUserButton.style.display = "none";
                    addUserButton.disabled = true;
                }
            }
        } else {
            console.error("ไม่พบข้อมูลของผู้ใช้ในระบบ");
        }

        // แสดง username ใน input codeId
        const codeId = document.getElementById("codeId");
        if (codeId) {
            codeId.value = loggedInUser;
        }
    } else {
        // ถ้าไม่มีการล็อกอิน, redirect ไปที่หน้า Login
        window.location.href = "https://god-weight.netlify.app/bin/login-page/Login.html";
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // ดึงปุ่มต่างๆ
    const addUserButton = document.getElementById('addUserButton');
    const queueOrderButton = document.getElementById('queueOrderButton');
    const reportButton = document.getElementById('reportButton');

    // ลิงก์ที่ต้องการ
    const addUserLink = '/Config/Management/index.html';
    const queueOrderLink = 'https://docs.google.com/spreadsheets/d/1NbR0RoXXfwNCd9sfzF3qwYRRJtDfbc2z8N7fkMN_3Ro/edit?gid=180982015#gid=180982015';
    const reportLink = 'https://docs.google.com/forms/d/e/1FAIpQLSe5Vmyua1NSlQ00NdBsE8ECZXtqJCUVgwIRg16CuZlJ3dy9uQ/viewform';

    // เพิ่ม event listener ให้ปุ่ม
    addUserButton.addEventListener('click', function () {
        window.location.href = addUserLink; // เปลี่ยนเส้นทางไปที่ลิงก์ Add User
    });

    queueOrderButton.addEventListener('click', function () {
        window.open(queueOrderLink, '_blank'); // เปิดลิงก์ Queue Order ในแท็บใหม่
    });

    reportButton.addEventListener('click', function () {
        window.open(reportLink, '_blank'); // เปิดลิงก์ Report ในแท็บใหม่
    });
});

let isLocked = true; // สถานะล็อคเริ่มต้น

        document.getElementById("newButton").addEventListener("click", function() {
            let lockFields = ["Part-action1", "Part-action2", "Part-action3", "Part-action5", "Part-action6"];
            let inputs = document.querySelectorAll("input[type='text']");
            let radios = document.querySelectorAll("input[name='hundredPercent']"); // ล็อคเฉพาะ Yes / No

            inputs.forEach(input => {
                if (lockFields.includes(input.id)) {
                    input.readOnly = isLocked; // ล็อคเฉพาะช่องที่กำหนด
                }
            });

            radios.forEach(radio => radio.disabled = isLocked); // ล็อคปุ่ม Yes / No

            isLocked = !isLocked; // สลับสถานะล็อค
        });

window.onload = function() {
    fetchData();
    // restrictToAdmin();
};
