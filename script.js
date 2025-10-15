document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('macro-form');
    const tableBody = document.getElementById('macro-table-body');
    const ctx = document.getElementById('myChart').getContext('2d');
    let myChart;

    const initChart = () => {
        const entries = getEntries();
        const labels = entries.map(entry => entry.date);
        const proteinData = entries.map(entry => entry.protein);
        const carbsData = entries.map(entry => entry.carbs);
        const fatData = entries.map(entry => entry.fat);

        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Protein (g)',
                        data: proteinData,
                        borderColor: '#007bff',
                        tension: 0.1
                    },
                    {
                        label: 'Carbs (g)',
                        data: carbsData,
                        borderColor: '#28a745',
                        tension: 0.1
                    },
                    {
                        label: 'Fat (g)',
                        data: fatData,
                        borderColor: '#dc3545',
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const getEntries = () => JSON.parse(localStorage.getItem('macroEntries')) || [];

    const saveEntries = (entries) => localStorage.setItem('macroEntries', JSON.stringify(entries));

    const updateTable = () => {
        const entries = getEntries();
        tableBody.innerHTML = '';
        entries.forEach(entry => {
            const row = `<tr>
                <td>${entry.date}</td>
                <td>${entry.protein}</td>
                <td>${entry.carbs}</td>
                <td>${entry.fat}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const entries = getEntries();
        const newEntry = {
            date: form.date.value,
            protein: form.protein.value,
            carbs: form.carbs.value,
            fat: form.fat.value
        };
        entries.push(newEntry);
        saveEntries(entries);
        updateTable();
        initChart();
        form.reset();
    });

    updateTable();
    initChart();
});
