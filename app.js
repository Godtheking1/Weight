// ฟังก์ชันคำนวณค่า Part-action8 และค่า Lower, Upper โดยไม่ต้องรอค่า average
function calculatePartAction8AndLimits() {
    const partAction4 = parseFloat(document.getElementById('Part-action4').value); // ค่าน้ำหนักจาก Part-action4

    let partAction8 = 0; // กำหนดค่าเริ่มต้นให้กับ partAction8 (percentage)

    // ตรวจสอบเงื่อนไขการคำนวณ percentage สำหรับ Part-action7
    if (partAction4 < 0.0498) {
        partAction8 = 0.2; // 20%
    } else if (partAction4 > 0.0999) {
        partAction8 = 0.5; // 50%
    } else if (partAction4 >= 0.0498 && partAction4 <= 0.0998) {
        partAction8 = 0.3; // 30%
    }

    // แสดงค่าของ partAction8 ที่ input element 'Part-action8' และเพิ่ม '%' ต่อท้าย
    document.getElementById('Part-action8').value = (partAction8 * 100) + '%';

    // แสดงค่าของ partAction8 ที่ input element 'Part-action7' และเพิ่ม '%' ต่อท้าย
    document.getElementById('Part-action7').value = (partAction8 * partAction4).toFixed(3);

    // คำนวณ Lower และ Upper ตามสูตร
    const standardWeight = parseFloat(document.getElementById('standard-weight').textContent); // ค่าเฉลี่ยจาก standard-weight

    // ตรวจสอบว่า standardWeight และ partAction4 เป็นตัวเลขที่ถูกต้อง
    if (!isNaN(standardWeight) && !isNaN(partAction4) && standardWeight !== 0) {
        // คำนวณ Lower และ Upper ตามสูตร
        const lower = (standardWeight - (partAction8 * partAction4)).toFixed(3);
        const upper = (standardWeight + (partAction8 * partAction4)).toFixed(3);

        // อัปเดตค่า Lower และ Upper
        document.getElementById('standard-Lower').textContent = lower;
        document.getElementById('standard-Upper').textContent = upper;
    } else {
        // รีเซ็ตค่า Lower และ Upper เป็น "AUTO" หากข้อมูลไม่ถูกต้อง
        document.getElementById('standard-Lower').textContent = 'AUTO';
        document.getElementById('standard-Upper').textContent = 'AUTO';
    }
}

// ฟังก์ชันที่เรียกใช้เมื่อมีการคีย์ข้อมูลใน Detail Weight (Part) หรือ Box
document.getElementById('Part-action4').addEventListener('input', function() {
    // เรียกใช้ calculatePartAction8AndLimits ทันทีเมื่อมีการคีย์ข้อมูลใน Part-action4
    calculatePartAction8AndLimits();
});

// ฟังก์ชันคำนวณค่าเฉลี่ยใหม่ (ถ้าต้องการ)
function calculateAverage() {
    const boxInputClass = event.target.classList.contains('box-input') ? '.box-input' : '.box-input1';
    const inputs = document.querySelectorAll(boxInputClass);
    let total = 0;
    let count = 0;

    inputs.forEach(input => {
        const value = parseFloat(input.value); // แปลงค่าที่ป้อนเป็นตัวเลข
        if (!isNaN(value)) { // ตรวจสอบว่าค่าเป็นตัวเลข
            total += value;
            count++;
        }
    });

    // คำนวณค่าเฉลี่ย
    const average = count > 0 ? (total / count).toFixed(3) : 0;

    // อัปเดตค่าเฉลี่ยไปที่ input หรือ td ที่เหมาะสม
    if (boxInputClass === '.box-input') {
        document.getElementById('standard-weight').textContent = `${average}`;
        calculatePartAction8AndLimits(); // คำนวณ Part-action7, Lower, Upper โดยอัตโนมัติ
    } else if (boxInputClass === '.box-input1') {
        document.getElementById('Part-action4').value = average;
        calculatePartAction8AndLimits(); // คำนวณ Part-action7, Lower, Upper โดยอัตโนมัติ
    }
}

// ฟังก์ชันที่เรียกใช้เมื่อมีการคีย์ข้อมูลใน Box1, Box2, Box3 เป็นต้น
document.querySelectorAll('.box-input').forEach(input => {
    input.addEventListener('input', function() {
        calculateAverage(); // คำนวณค่าเฉลี่ยทุกครั้งที่มีการเปลี่ยนแปลงในช่องข้อมูล Box
    });
});
