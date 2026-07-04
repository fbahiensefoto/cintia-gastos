const STORAGE_KEY = 'cintia_expenses';

const state = {
  expenses: loadExpenses(),
  category: 'combustivel',
  monthFilter: 'all',
};

const els = {
  form: document.getElementById('expenseForm'),
  catButtons: document.querySelectorAll('.cat-btn'),
  categoryInput: document.getElementById('category'),
  value: document.getElementById('value'),
  date: document.getElementById('date'),
  note: document.getElementById('note'),
  list: document.getElementById('expenseList'),
  emptyState: document.getElementById('emptyState'),
  totalFuel: document.getElementById('totalFuel'),
  totalFood: document.getElementById('totalFood'),
  totalAll: document.getElementById('totalAll'),
  monthFilter: document.getElementById('monthFilter'),
};

init();

function init() {
  els.date.value = todayISO();
  els.catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      els.catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.category = btn.dataset.cat;
      els.categoryInput.value = state.category;
    });
  });

  els.form.addEventListener('submit', onSubmit);
  els.monthFilter.addEventListener('change', () => {
    state.monthFilter = els.monthFilter.value;
    render();
  });

  render();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(() => {});
  }
}

function onSubmit(e) {
  e.preventDefault();
  const value = parseFloat(els.value.value);
  if (!value || value <= 0) return;

  const expense = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    category: state.category,
    value,
    date: els.date.value || todayISO(),
    note: els.note.value.trim(),
  };

  state.expenses.unshift(expense);
  saveExpenses();

  els.value.value = '';
  els.note.value = '';
  els.date.value = todayISO();

  render();
}

function deleteExpense(id) {
  state.expenses = state.expenses.filter(exp => exp.id !== id);
  saveExpenses();
  render();
}

function render() {
  renderMonthFilter();
  const filtered = filteredExpenses();
  renderSummary(filtered);
  renderList(filtered);
}

function renderMonthFilter() {
  const months = Array.from(new Set(state.expenses.map(e => monthKey(e.date)))).sort().reverse();
  const current = state.monthFilter;

  els.monthFilter.innerHTML = '';
  const allOpt = document.createElement('option');
  allOpt.value = 'all';
  allOpt.textContent = 'Todos os meses';
  els.monthFilter.appendChild(allOpt);

  months.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = monthLabel(m);
    els.monthFilter.appendChild(opt);
  });

  if (current === 'all' || months.includes(current)) {
    els.monthFilter.value = current;
  } else {
    els.monthFilter.value = 'all';
    state.monthFilter = 'all';
  }
}

function filteredExpenses() {
  if (state.monthFilter === 'all') return state.expenses;
  return state.expenses.filter(e => monthKey(e.date) === state.monthFilter);
}

function renderSummary(list) {
  const fuel = sumBy(list, 'combustivel');
  const food = sumBy(list, 'alimentacao');
  els.totalFuel.textContent = formatBRL(fuel);
  els.totalFood.textContent = formatBRL(food);
  els.totalAll.textContent = formatBRL(fuel + food);
}

function sumBy(list, category) {
  return list.filter(e => e.category === category).reduce((acc, e) => acc + e.value, 0);
}

function renderList(list) {
  els.list.innerHTML = '';
  const sorted = [...list].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));

  els.emptyState.style.display = sorted.length ? 'none' : 'block';

  sorted.forEach(exp => {
    const li = document.createElement('li');
    li.className = `expense-item ${exp.category}`;
    li.innerHTML = `
      <div class="icon">${exp.category === 'combustivel' ? '⛽' : '🍔'}</div>
      <div class="info">
        <div class="date">${formatDate(exp.date)}</div>
        ${exp.note ? `<div class="note">${escapeHTML(exp.note)}</div>` : ''}
      </div>
      <div class="amount">${formatBRL(exp.value)}</div>
      <button class="delete-btn" aria-label="Excluir">✕</button>
    `;
    li.querySelector('.delete-btn').addEventListener('click', () => deleteExpense(exp.id));
    els.list.appendChild(li);
  });
}

function loadExpenses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveExpenses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.expenses));
}

function todayISO() {
  const d = new Date();
  const tz = d.getTimezoneOffset();
  return new Date(d.getTime() - tz * 60000).toISOString().slice(0, 10);
}

function monthKey(dateStr) {
  return dateStr.slice(0, 7);
}

function monthLabel(key) {
  const [year, month] = key.split('-');
  const names = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  return `${names[parseInt(month, 10) - 1]}/${year}`;
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
