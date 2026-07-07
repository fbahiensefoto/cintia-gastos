const STORAGE_KEY = 'cintia_expenses';
const LANG_KEY = 'cintia_lang';

const CATEGORY_ICONS = {
  combustivel: '⛽',
  alimentacao: '🍔',
  manutencao: '🔧',
};

const TRANSLATIONS = {
  pt: {
    htmlLang: 'pt-BR',
    appTitle: 'Meus Gastos',
    monthAll: 'Todos os meses',
    yearAll: 'Todos os anos',
    labelFuel: 'Combustível',
    labelFood: 'Alimentação',
    labelMaintenance: 'Manutenção',
    labelTotalMonth: 'Total do mês',
    labelTotalYear: 'Total do ano',
    labelTotalAll: 'Total geral',
    catFuelBtn: '⛽ Combustível',
    catFoodBtn: '🍔 Alimentação',
    catMaintenanceBtn: '🔧 Manutenção',
    labelValue: 'Valor (R$)',
    labelDate: 'Data',
    labelNote: 'Observação (opcional)',
    notePlaceholder: 'Ex: posto Shell, mercado...',
    saveBtn: 'Adicionar gasto',
    historyTitle: 'Histórico',
    emptyState: 'Nenhum gasto lançado ainda.',
    deleteLabel: 'Excluir',
    backupSummary: '🔄 Backup / Transferir dados',
    backupExportHint: 'Gere um código com todos os seus gastos pra guardar ou enviar pro celular novo.',
    generateBackupBtn: 'Gerar código',
    copyBackupBtn: 'Copiar código',
    copiedFeedback: 'Copiado!',
    backupImportHint: 'Já tem um código? Cole abaixo pra restaurar os gastos.',
    restorePlaceholder: 'Cole aqui o código de backup...',
    restoreBtn: 'Restaurar backup',
    restoreConfirm: 'Isso vai adicionar os gastos do backup aos que já existem neste aparelho. Continuar?',
    restoreSuccess: 'Backup restaurado com sucesso!',
    restoreError: 'Código inválido.',
    backupEmpty: 'Nenhum gasto para gerar backup.',
    months: ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'],
  },
  en: {
    htmlLang: 'en',
    appTitle: 'My Expenses',
    monthAll: 'All months',
    yearAll: 'All years',
    labelFuel: 'Fuel',
    labelFood: 'Food',
    labelMaintenance: 'Maintenance',
    labelTotalMonth: 'Total this month',
    labelTotalYear: 'Total this year',
    labelTotalAll: 'Grand total',
    catFuelBtn: '⛽ Fuel',
    catFoodBtn: '🍔 Food',
    catMaintenanceBtn: '🔧 Maintenance',
    labelValue: 'Amount (R$)',
    labelDate: 'Date',
    labelNote: 'Note (optional)',
    notePlaceholder: 'E.g. gas station, market...',
    saveBtn: 'Add expense',
    historyTitle: 'History',
    emptyState: 'No expenses logged yet.',
    deleteLabel: 'Delete',
    backupSummary: '🔄 Backup / Transfer data',
    backupExportHint: 'Generate a code with all your expenses to save or send to your new phone.',
    generateBackupBtn: 'Generate code',
    copyBackupBtn: 'Copy code',
    copiedFeedback: 'Copied!',
    backupImportHint: 'Already have a code? Paste it below to restore your expenses.',
    restorePlaceholder: 'Paste your backup code here...',
    restoreBtn: 'Restore backup',
    restoreConfirm: 'This will add the backup expenses to the ones already on this device. Continue?',
    restoreSuccess: 'Backup restored successfully!',
    restoreError: 'Invalid code.',
    backupEmpty: 'No expenses to back up.',
    months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  },
  es: {
    htmlLang: 'es',
    appTitle: 'Mis Gastos',
    monthAll: 'Todos los meses',
    yearAll: 'Todos los años',
    labelFuel: 'Combustible',
    labelFood: 'Alimentación',
    labelMaintenance: 'Mantenimiento',
    labelTotalMonth: 'Total del mes',
    labelTotalYear: 'Total del año',
    labelTotalAll: 'Total general',
    catFuelBtn: '⛽ Combustible',
    catFoodBtn: '🍔 Comida',
    catMaintenanceBtn: '🔧 Mantenimiento',
    labelValue: 'Valor (R$)',
    labelDate: 'Fecha',
    labelNote: 'Nota (opcional)',
    notePlaceholder: 'Ej: gasolinera, mercado...',
    saveBtn: 'Agregar gasto',
    historyTitle: 'Historial',
    emptyState: 'Aún no hay gastos registrados.',
    deleteLabel: 'Eliminar',
    backupSummary: '🔄 Copia de seguridad / Transferir datos',
    backupExportHint: 'Genera un código con todos tus gastos para guardar o enviar a tu nuevo celular.',
    generateBackupBtn: 'Generar código',
    copyBackupBtn: 'Copiar código',
    copiedFeedback: '¡Copiado!',
    backupImportHint: '¿Ya tienes un código? Pégalo abajo para restaurar los gastos.',
    restorePlaceholder: 'Pega aquí el código de respaldo...',
    restoreBtn: 'Restaurar copia',
    restoreConfirm: 'Esto agregará los gastos del respaldo a los que ya existen en este dispositivo. ¿Continuar?',
    restoreSuccess: '¡Copia de seguridad restaurada con éxito!',
    restoreError: 'Código inválido.',
    backupEmpty: 'No hay gastos para respaldar.',
    months: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'],
  },
};

const state = {
  expenses: loadExpenses(),
  category: 'combustivel',
  yearFilter: todayISO().slice(0, 4),
  monthFilter: monthKey(todayISO()),
  lang: loadLang(),
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
  totalMaintenance: document.getElementById('totalMaintenance'),
  totalAll: document.getElementById('totalAll'),
  totalLabel: document.getElementById('totalLabel'),
  yearFilter: document.getElementById('yearFilter'),
  monthFilter: document.getElementById('monthFilter'),
  langButtons: document.querySelectorAll('.lang-btn'),
  generateBackupBtn: document.getElementById('generateBackupBtn'),
  backupOutput: document.getElementById('backupOutput'),
  copyBackupBtn: document.getElementById('copyBackupBtn'),
  restoreInput: document.getElementById('restoreInput'),
  restoreBtn: document.getElementById('restoreBtn'),
  settingsBtn: document.getElementById('settingsBtn'),
  closeBackupBtn: document.getElementById('closeBackupBtn'),
  backupModal: document.getElementById('backupModal'),
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

  els.langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      state.lang = btn.dataset.lang;
      saveLang();
      render();
    });
  });

  els.form.addEventListener('submit', onSubmit);
  els.yearFilter.addEventListener('change', () => {
    state.yearFilter = els.yearFilter.value;
    state.monthFilter = 'all';
    render();
  });
  els.monthFilter.addEventListener('change', () => {
    state.monthFilter = els.monthFilter.value;
    render();
  });

  els.generateBackupBtn.addEventListener('click', generateBackup);
  els.copyBackupBtn.addEventListener('click', copyBackup);
  els.restoreBtn.addEventListener('click', restoreBackup);
  els.settingsBtn.addEventListener('click', () => els.backupModal.classList.remove('hidden'));
  els.closeBackupBtn.addEventListener('click', () => els.backupModal.classList.add('hidden'));
  els.backupModal.addEventListener('click', (e) => {
    if (e.target === els.backupModal) els.backupModal.classList.add('hidden');
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
  applyTranslations();
  renderYearFilter();
  renderMonthFilter();
  const filtered = filteredExpenses();
  renderSummary(filtered);
  renderList(filtered);
}

function t(key) {
  return TRANSLATIONS[state.lang][key];
}

function applyTranslations() {
  document.documentElement.lang = t('htmlLang');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  els.langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === state.lang);
  });
}

function renderYearFilter() {
  const yearSet = new Set(state.expenses.map(e => e.date.slice(0, 4)));
  yearSet.add(todayISO().slice(0, 4));
  const years = Array.from(yearSet).sort().reverse();
  const current = state.yearFilter;

  els.yearFilter.innerHTML = '';
  const allOpt = document.createElement('option');
  allOpt.value = 'all';
  allOpt.textContent = t('yearAll');
  els.yearFilter.appendChild(allOpt);

  years.forEach(y => {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    els.yearFilter.appendChild(opt);
  });

  if (current === 'all' || years.includes(current)) {
    els.yearFilter.value = current;
  } else {
    els.yearFilter.value = 'all';
    state.yearFilter = 'all';
  }
}

function renderMonthFilter() {
  const scoped = state.expenses.filter(e => state.yearFilter === 'all' || e.date.slice(0, 4) === state.yearFilter);
  const monthSet = new Set(scoped.map(e => monthKey(e.date)));
  const today = todayISO();
  if (state.yearFilter === 'all' || today.slice(0, 4) === state.yearFilter) {
    monthSet.add(monthKey(today));
  }
  const months = Array.from(monthSet).sort().reverse();
  const current = state.monthFilter;

  els.monthFilter.innerHTML = '';
  const allOpt = document.createElement('option');
  allOpt.value = 'all';
  allOpt.textContent = t('monthAll');
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
  return state.expenses.filter(e => {
    if (state.yearFilter !== 'all' && e.date.slice(0, 4) !== state.yearFilter) return false;
    if (state.monthFilter !== 'all' && monthKey(e.date) !== state.monthFilter) return false;
    return true;
  });
}

function renderSummary(list) {
  const fuel = sumBy(list, 'combustivel');
  const food = sumBy(list, 'alimentacao');
  const maintenance = sumBy(list, 'manutencao');
  els.totalFuel.textContent = formatBRL(fuel);
  els.totalFood.textContent = formatBRL(food);
  els.totalMaintenance.textContent = formatBRL(maintenance);
  els.totalAll.textContent = formatBRL(fuel + food + maintenance);

  if (state.monthFilter !== 'all') {
    els.totalLabel.textContent = t('labelTotalMonth');
  } else if (state.yearFilter !== 'all') {
    els.totalLabel.textContent = t('labelTotalYear');
  } else {
    els.totalLabel.textContent = t('labelTotalAll');
  }
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
      <div class="icon">${CATEGORY_ICONS[exp.category]}</div>
      <div class="info">
        <div class="date">${formatDate(exp.date)}</div>
        ${exp.note ? `<div class="note">${escapeHTML(exp.note)}</div>` : ''}
      </div>
      <div class="amount">${formatBRL(exp.value)}</div>
      <button class="delete-btn" aria-label="${t('deleteLabel')}">✕</button>
    `;
    li.querySelector('.delete-btn').addEventListener('click', () => deleteExpense(exp.id));
    els.list.appendChild(li);
  });
}

function generateBackup() {
  if (!state.expenses.length) {
    alert(t('backupEmpty'));
    return;
  }
  els.backupOutput.value = toBase64(JSON.stringify(state.expenses));
  els.backupOutput.select();
}

function copyBackup() {
  if (!els.backupOutput.value) return;
  navigator.clipboard.writeText(els.backupOutput.value).then(() => {
    const original = t('copyBackupBtn');
    els.copyBackupBtn.textContent = t('copiedFeedback');
    setTimeout(() => { els.copyBackupBtn.textContent = original; }, 1500);
  });
}

function restoreBackup() {
  const code = els.restoreInput.value.trim();
  if (!code) return;

  let imported;
  try {
    imported = JSON.parse(fromBase64(code));
    if (!Array.isArray(imported)) throw new Error('invalid');
  } catch {
    alert(t('restoreError'));
    return;
  }

  if (!confirm(t('restoreConfirm'))) return;

  const existingIds = new Set(state.expenses.map(e => e.id));
  const newOnes = imported.filter(e => e && e.id && !existingIds.has(e.id));
  state.expenses = state.expenses.concat(newOnes);
  saveExpenses();
  els.restoreInput.value = '';
  alert(t('restoreSuccess'));
  render();
}

function toBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function fromBase64(b64) {
  return decodeURIComponent(escape(atob(b64)));
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

function loadLang() {
  const saved = localStorage.getItem(LANG_KEY);
  return TRANSLATIONS[saved] ? saved : 'pt';
}

function saveLang() {
  localStorage.setItem(LANG_KEY, state.lang);
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
  const names = TRANSLATIONS[state.lang].months;
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
