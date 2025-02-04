document.addEventListener("DOMContentLoaded", function () {
    const avatarElements = document.querySelectorAll(".avatar");

    // ฟังก์ชันที่ใช้เรียก DiceBear API สำหรับสร้าง Avatar
    function getRandomAvatar() {
        const styles = ["adventurer", "croodles", "micah"]; // สไตล์การ์ตูนที่น่ารัก
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];
        const seed = Math.random().toString(36).substring(7); // สร้าง seed แบบสุ่ม
        return `https://api.dicebear.com/6.x/${randomStyle}/svg?seed=${seed}`;
    }

    // เปลี่ยน src ของ avatar แต่ละตัว
    avatarElements.forEach(avatar => {
        avatar.src = getRandomAvatar();
    });
});
