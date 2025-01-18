// การจัดการ Listbox
const listbox = document.getElementById("listbox");
const editBtn = document.getElementById("edit-btn");
const deleteBtn = document.getElementById("delete-btn");

// ตรวจสอบว่า elements มีอยู่ก่อน
if (listbox && editBtn && deleteBtn) {
    // Function to show buttons when an option is selected
    listbox.addEventListener("change", function () {
        const selectedOption = listbox.options[listbox.selectedIndex];
        if (selectedOption && selectedOption.value !== "") {
            editBtn.style.display = "inline-block";
            deleteBtn.style.display = "inline-block";
        } else {
            editBtn.style.display = "none";
            deleteBtn.style.display = "none";
        }
    });

    // Example Edit function
    editBtn.addEventListener("click", function () {
        const selectedOption = listbox.options[listbox.selectedIndex];
        if (selectedOption) {
            alert("Editing item: " + selectedOption.text);
            // คุณสามารถเพิ่มฟังก์ชันที่เกี่ยวข้องกับการแก้ไขได้
        }
    });

    // Example Delete function
    deleteBtn.addEventListener("click", function () {
        const selectedOption = listbox.options[listbox.selectedIndex];
        if (selectedOption) {
            const result = confirm("Are you sure you want to delete " + selectedOption.text + "?");
            if (result) {
                selectedOption.remove(); // ลบรายการที่เลือก
            }
        }
    });
}

// ดึงข้อมูล username จาก localStorage
const loggedInUser = localStorage.getItem('loggedInUser');
if (loggedInUser) {
    const codeId = document.getElementById('codeId');
    if (codeId) {
        // หากพบ username ที่ล็อกอินแล้ว, นำมาแสดงใน input ของ Code ID
        codeId.value = loggedInUser;
    }

    // เมื่อ Login เสร็จแล้วให้เปลี่ยนหน้าไปยัง dashboard
    window.location.href = 'http://127.0.0.1:5500/dashboard.html';
} else {
    // ถ้าไม่มีการล็อกอิน, redirect ไปที่หน้า Login
    window.location.href = 'http://127.0.0.1:5500/bin/login-page/Login.html';
}
