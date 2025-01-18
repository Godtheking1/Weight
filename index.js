let excelData = null;

function loadExcelFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        excelData = workbook.Sheets[workbook.SheetNames[0]]; // ใช้ sheet แรก
        console.log('Excel Data Loaded:', excelData);
    };
    reader.readAsArrayBuffer(file);
}

function processExcelFile() {
    if (!excelData) {
        alert('Please load an Excel file first.');
        return;
    }

    // แปลงข้อมูล Excel เป็น JSON (หรือจัดการตามต้องการ)
    const jsonData = XLSX.utils.sheet_to_json(excelData, { header: 1 });
    console.log('Processed Data:', jsonData);
}

// ฟังก์ชัน Logout
function logout() {
    console.log("Logout button clicked");
    if (confirm("Are you sure you want to log out?")) {
        // ใช้ path แบบ file-relative
        window.location.replace("Login.html");
        console.log("JavaScript Loaded Successfully");
    }
}

function handleMaterialSelection() {
    const selectedMaterial = document.getElementById("materialList").value;

    if (selectedMaterial) {
        alert(`You selected: ${selectedMaterial}`);
    } else {
        alert("Please select a material.");
    }
}

// ฟังก์ชันเพื่อดึงข้อมูลผู้ใช้งานที่ล็อกอินจาก localStorage
function setUserLoginInfo() {
    // ดึงชื่อผู้ใช้งานจาก localStorage
    const loggedInUser = localStorage.getItem('loggedInUser'); // หรือใช้ชื่อ key ที่เก็บข้อมูลผู้ใช้ใน localStorage

    if (loggedInUser) {
        // หากพบชื่อผู้ใช้ใน localStorage ให้แสดงในฟิลด์ "Code ID"
        document.getElementById('codeInput').value = loggedInUser;
    } else {
        // ถ้าไม่พบข้อมูลผู้ใช้ใน localStorage
        document.getElementById('codeInput').value = "ไม่พบข้อมูลผู้ใช้งาน";
    }
}

// เรียกฟังก์ชันเมื่อโหลดหน้า
window.onload = setUserLoginInfo;



