:root {
  --bg: #f5f7fb;
  --surface: #ffffff;
  --surface-soft: #eef4f7;
  --text: #13202d;
  --muted: #667085;
  --border: #dfe7ee;
  --primary: #178ca4;
  --primary-dark: #0f687a;
  --accent: #f9735b;
  --success: #14804a;
  --warning: #b7791f;
  --danger: #c2413a;
  --shadow: 0 18px 45px rgba(35, 50, 68, 0.08);
  --radius: 10px;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; background: var(--bg); color: var(--text); }
button, input, select, textarea { font: inherit; }
button { cursor: pointer; }

.shell {
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
}

.sidebar {
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: #fbfcfe;
  border-right: 1px solid var(--border);
}

.brand { display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
.brand-mark {
  width: 54px;
  height: 54px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: white;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  font-weight: 800;
}
.brand h1, .brand p, .topbar h2, .section-head h2 { margin: 0; }
.brand p, .hint, .eyebrow { color: var(--muted); font-size: 13px; }

.main { padding: 22px; overflow: auto; }
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  margin-bottom: 16px;
}

.tabs { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; }
.side-nav { display: flex; flex-direction: column; align-items: stretch; gap: 6px; }
body:not(.logged-in) .side-nav,
body:not(.logged-in) .quick-actions { display: none; }
.tabs button, .ghost {
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  border-radius: 999px;
  padding: 9px 13px;
  font-weight: 700;
}
.side-nav button { width: 100%; border-radius: 9px; text-align: left; }
.tabs button.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}
.quick-actions { margin-top: auto; }
.top-actions { display: flex; align-items: center; gap: 8px; }
.mobile-menu-btn { display: none; }
.demo-warning {
  border: 1px solid rgba(183, 121, 31, 0.25);
  background: #fff7ed;
  color: #8a4b0f;
  border-radius: var(--radius);
  padding: 11px 13px;
  margin-bottom: 14px;
  font-size: 13px;
  font-weight: 700;
}
.demo-card {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #f8fbfc;
  padding: 9px;
  color: var(--muted);
  font-size: 12px;
}
.demo-card strong { color: var(--text); }
.warning-note { color: var(--warning); font-weight: 800; }
.toast {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 50;
  max-width: 360px;
  border-radius: 10px;
  background: #102a43;
  color: white;
  padding: 12px 14px;
  box-shadow: var(--shadow);
  font-weight: 700;
}
.toast.error { background: var(--danger); }

.panel, .case-card, .result-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 16px;
}
.panel h2, .case-card h3 { margin: 0 0 10px; font-size: 16px; }
.panel-head { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 10px; }
.panel-head h2 { margin: 0; }
.mini-result { margin-top: 12px; box-shadow: none; }
.warn-text { color: var(--warning); font-weight: 800; }
.calc-grid { display: grid; grid-template-columns: repeat(2, minmax(190px, 1fr)); gap: 8px 14px; }

label { display: flex; flex-direction: column; gap: 7px; color: var(--muted); font-size: 13px; font-weight: 650; }
input, select, textarea {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 9px;
  background: var(--surface-soft);
  color: var(--text);
  padding: 10px 11px;
}
textarea { min-height: 118px; resize: vertical; margin-top: 8px; }
input:focus, select:focus, textarea:focus { outline: 2px solid rgba(23, 140, 164, 0.18); border-color: var(--primary); }

.btn {
  border: 0;
  border-radius: 9px;
  background: var(--primary);
  color: white;
  padding: 10px 13px;
  font-weight: 800;
}
.btn:hover { background: var(--primary-dark); }
.btn.secondary { background: #eaf0f4; color: var(--text); border: 1px solid var(--border); }
.btn.secondary:hover { background: #dce8ee; }
.btn.danger { background: var(--danger); }
.btn.full { width: 100%; justify-content: center; margin-top: 8px; }

.button-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
.button-row.right { justify-content: flex-end; }
.tab { display: none; }
.tab.active { display: block; }
.section-head { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 12px; }
.pill { border-radius: 999px; background: #e7f6f8; color: var(--primary-dark); padding: 7px 11px; font-size: 13px; }
.dashboard-grid { display: grid; grid-template-columns: repeat(4, minmax(180px, 1fr)); gap: 12px; margin-bottom: 12px; }
.stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow); padding: 16px; }
.stat-card span { display: block; color: var(--muted); font-size: 13px; margin-bottom: 8px; }
.stat-card strong { font-size: 28px; }
.dashboard-layout { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr); gap: 12px; align-items: start; }
.recent-list { display: grid; gap: 8px; }
.recent-item { display: flex; justify-content: space-between; gap: 10px; border-bottom: 1px solid var(--border); padding: 8px 0; }

.case-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 12px; }
.case-card { display: flex; flex-direction: column; gap: 10px; }
.case-card dl { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 12px; margin: 0; color: var(--muted); font-size: 13px; }
.case-card dd { margin: 0; color: var(--text); font-weight: 700; }
.empty-state { border: 1px dashed var(--border); border-radius: var(--radius); padding: 28px; text-align: center; color: var(--muted); background: var(--surface); }
.list-toolbar { display: grid; grid-template-columns: minmax(220px, 1fr) minmax(180px, 260px) auto; gap: 12px; align-items: end; margin-bottom: 12px; }

.form-grid { display: grid; grid-template-columns: repeat(3, minmax(170px, 1fr)); gap: 12px; }
.form-grid.two { grid-template-columns: repeat(2, minmax(180px, 1fr)); }
.form-section { margin-bottom: 12px; }
.detail-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
.detail-tabs button {
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  border-radius: 999px;
  padding: 8px 11px;
  font-weight: 800;
}
.detail-tabs button.active { background: var(--primary); color: white; border-color: var(--primary); }
.detail-grid { display: grid; grid-template-columns: repeat(2, minmax(220px, 1fr)); gap: 12px; }
.checkbox-grid { display: grid; grid-template-columns: repeat(2, minmax(130px, 1fr)); gap: 6px; margin-top: 7px; }
.checkbox-grid label { flex-direction: row; align-items: center; gap: 6px; color: var(--text); font-weight: 600; }
.checkbox-grid input { width: auto; }
.info-list { display: grid; grid-template-columns: 150px 1fr; gap: 8px 12px; margin: 0; }
.info-list dt { color: var(--muted); }
.info-list dd { margin: 0; font-weight: 700; }
.chart-row { display: grid; grid-template-columns: repeat(2, minmax(260px, 1fr)); gap: 12px; margin-top: 12px; }
.chart-box { border: 1px solid var(--border); border-radius: var(--radius); padding: 12px; background: #fbfcfe; }
.blood-note { display: block; color: var(--muted); font-size: 12px; margin-top: 4px; }
.status-low, .status-high { color: var(--warning); font-weight: 800; }
.status-normal { color: var(--success); font-weight: 800; }
.report-output { margin-top: 12px; }
.report-document { background: white; color: #111827; line-height: 1.5; }
.report-document h1 { margin: 0 0 8px; font-size: 26px; }
.report-document h2 { margin: 18px 0 8px; font-size: 18px; }
.report-document h3 { margin: 10px 0 4px; font-size: 15px; }
.report-document footer { margin-top: 18px; border-top: 1px solid var(--border); padding-top: 12px; font-weight: 800; }
.report-grid { display: grid; grid-template-columns: repeat(3, minmax(150px, 1fr)); gap: 10px; margin: 14px 0; }
.report-grid div { border: 1px solid var(--border); border-radius: 8px; padding: 10px; }
.report-grid strong, .report-grid span { display: block; }
.report-grid span { margin-top: 4px; color: var(--muted); }
.file-btn { display: inline-flex; width: auto; flex-direction: row; cursor: pointer; }
.kvkk-panel { border-color: rgba(183, 121, 31, 0.28); background: #fffaf0; }
.food-grid { grid-template-columns: 150px minmax(260px, 1fr) 120px; align-items: end; }
.simple-food-grid select { margin-top: 7px; }
.blood-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
.file-upload { display: grid; gap: 8px; }
.divider { height: 1px; background: var(--border); margin: 14px 0; }
.unit { color: var(--muted); font-weight: 500; }
.blood-results { margin-top: 12px; }
.alert-list { display: grid; gap: 10px; }
.blood-alert {
  display: grid;
  gap: 4px;
  border-left: 4px solid var(--warning);
  border-radius: 8px;
  background: #fff7ed;
  padding: 10px 12px;
}
.blood-alert.high { border-color: var(--danger); background: #fff1f1; }
.blood-alert.low { border-color: var(--warning); background: #fff7ed; }
.ok-panel { border-color: rgba(20, 128, 74, 0.22); }
.blood-focus {
  border-top: 1px solid var(--border);
  margin-top: 12px;
  padding-top: 12px;
}
.focus-title { color: var(--muted); font-size: 13px; margin-bottom: 8px; }
.focus-chip {
  display: inline-flex;
  align-items: center;
  margin: 0 6px 6px 0;
  border-radius: 999px;
  background: #fff7ed;
  color: #8a4b0f;
  padding: 6px 9px;
  font-size: 12px;
  font-weight: 800;
}

.diet-layout { display: grid; grid-template-columns: minmax(0, 1fr) 380px; gap: 14px; align-items: start; }
.diet-main, .diet-side { display: flex; flex-direction: column; gap: 12px; }
.diet-case-picker { display: grid; grid-template-columns: minmax(220px, 340px) auto; align-items: end; gap: 10px 14px; margin-top: 8px; }
.diet-case-picker label { margin: 0; }
.metrics { display: grid; gap: 8px; }
.metrics span { display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 7px; }
.mini-metrics { display: grid; grid-template-columns: repeat(5, minmax(70px, 1fr)); gap: 6px; font-size: 12px; }
.mini-metrics span { border: 1px solid var(--border); border-radius: 8px; padding: 6px; background: #f8fbfc; }
.food-db-summary { margin: 12px 0; }
.food-db-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-top: 12px; }
.food-card { border: 1px solid var(--border); border-radius: var(--radius); padding: 12px; background: #fbfcfe; }
.food-card h3 { margin: 0 0 6px; font-size: 15px; }
.tag-row { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px; }
.tag-row span { border-radius: 999px; background: #e7f6f8; color: var(--primary-dark); padding: 4px 7px; font-size: 11px; font-weight: 800; }
.exchange-list { margin: 0; padding-left: 18px; color: var(--text); line-height: 1.7; }

.meal-card { margin-top: 12px; }
.meal-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 8px; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 14px; min-width: 720px; }
th, td { padding: 10px; border-bottom: 1px solid var(--border); text-align: left; }
th { background: #f0f5f7; font-weight: 800; color: var(--text); }
td.num, th.num { text-align: right; white-space: nowrap; }
.mini-btn { border: 1px solid var(--border); border-radius: 8px; padding: 6px 9px; background: white; color: var(--danger); font-weight: 800; }

.progress-line { display: grid; gap: 5px; margin-bottom: 10px; }
.progress-label { display: flex; justify-content: space-between; gap: 8px; color: var(--muted); font-size: 13px; }
.bar { height: 9px; border-radius: 999px; background: #e8eef2; overflow: hidden; }
.bar span { display: block; height: 100%; width: min(var(--pct), 130%); background: var(--primary); }
.bar.warn span { background: var(--warning); }
.bar.danger span { background: var(--danger); }

.commentary {
  white-space: pre-wrap;
  margin: 0;
  color: var(--text);
  font-family: inherit;
  line-height: 1.45;
}
canvas { width: 100%; max-width: 100%; height: auto; display: block; }
[hidden] { display: none !important; }

@media (max-width: 1100px) {
  .shell, .diet-layout, .dashboard-layout { grid-template-columns: 1fr; }
  .sidebar {
    position: fixed;
    inset: 0 auto 0 0;
    width: min(320px, 86vw);
    z-index: 40;
    transform: translateX(-105%);
    transition: transform 0.2s ease;
    box-shadow: var(--shadow);
  }
  body.sidebar-open .sidebar { transform: translateX(0); }
  .mobile-menu-btn { display: inline-flex; }
  .topbar { align-items: flex-start; flex-direction: column; }
  .tabs { justify-content: flex-start; }
  .dashboard-grid { grid-template-columns: repeat(2, minmax(160px, 1fr)); }
}

@media (max-width: 760px) {
  .sidebar, .main { padding: 14px; }
  .form-grid, .form-grid.two, .food-grid, .list-toolbar, .detail-grid, .chart-row, .dashboard-grid { grid-template-columns: 1fr; }
  .diet-case-picker { grid-template-columns: 1fr; }
  .info-list { grid-template-columns: 1fr; }
  .calc-grid, .mini-metrics { grid-template-columns: 1fr; }
  .checkbox-grid, .report-grid { grid-template-columns: 1fr; }
}

@media print {
  @page { size: A4; margin: 14mm; }
  body { background: white; }
  .sidebar, .topbar, .demo-warning, .no-print, .tabs, .section-head, .toast, button { display: none !important; }
  .shell, .main { display: block; width: 100%; min-height: auto; padding: 0; }
  .tab { display: none !important; }
  #tab-raporlar { display: block !important; }
  .panel, .result-card, .report-output { border: 0; box-shadow: none; padding: 0; }
  .report-document { font-size: 12px; }
  .report-document h1 { font-size: 22px; }
  .report-document h2 { font-size: 16px; page-break-after: avoid; }
  .report-grid { grid-template-columns: repeat(2, 1fr); }
}
