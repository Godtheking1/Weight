fetch('get_parts.php')
    .then(response => response.json())
    .then(data => {
        console.log(data);  // เพิ่มการตรวจสอบข้อมูลที่ได้รับจาก PHP
        const tableBody = document.getElementById('trim-table-body');
        const listbox = document.getElementById('listbox');

        if (data && data.length > 0) {
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.dc_part_no}</td>
                    <td>${item.model}</td>
                    <td>${item.control}</td>
                    <td>${item.total}</td>
                `;
                tableBody.appendChild(row);

                const option = document.createElement('option');
                option.textContent = `${item.id} | ${item.dc_part_no} | ${item.model} | ${item.control} | ${item.total}`;
                listbox.appendChild(option);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="5">No data found</td>';
            tableBody.appendChild(row);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
