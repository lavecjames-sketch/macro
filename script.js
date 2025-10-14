const form = document.getElementById('macro-form');
const tableBody = document.getElementById('macro-table-body');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const date = form.date.value;
  const protein = form.protein.value;
  const carbs = form.carbs.value;
  const fat = form.fat.value;

  const entry = { date, protein, carbs, fat };
  let entries = JSON.parse(localStorage.getItem('macroEntries')) || [];
  entries.push(entry);
  localStorage.setItem('macroEntries', JSON.stringify(entries));
  updateTable();
  form.reset();
});

function updateTable() {
  const entries = JSON.parse(localStorage.getItem('macroEntries')) || [];
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
}

updateTable();
