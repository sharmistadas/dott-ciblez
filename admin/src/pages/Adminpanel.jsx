import React, { useState, useEffect, useRef } from 'react';

// ─── Inline Styles ────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue: #233dfe;
    --blue-dark: #0a1fa8;
    --blue-light: #4d63fe;
    --blue-glow: rgba(35,61,254,0.25);
    --black: #000000;
    --white: #ffffff;
    --navy: #00072d;
    --surface: #050d2e;
    --surface2: #0a1545;
    --surface3: #0f1f5c;
    --border: rgba(35,61,254,0.2);
    --text-muted: rgba(255,255,255,0.45);
    --text-dim: rgba(255,255,255,0.7);
    --radius: 14px;
    --radius-sm: 8px;
    --transition: 0.22s cubic-bezier(0.4,0,0.2,1);
    --font: 'Space Grotesk', sans-serif;
    --font-display: 'Syne', sans-serif;
  }

  body { background: var(--navy); font-family: var(--font); color: var(--white); overflow-x: hidden; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: var(--surface); }
  ::-webkit-scrollbar-thumb { background: var(--blue); border-radius: 4px; }

  /* Layout */
  .app { display: flex; min-height: 100vh; position: relative; }

  /* Animated background */
  .bg-mesh {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 10%, rgba(35,61,254,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 80%, rgba(35,61,254,0.08) 0%, transparent 50%),
      radial-gradient(ellipse 100% 100% at 50% 50%, var(--navy) 0%, #000510 100%);
  }

  /* Sidebar */
  .sidebar {
    width: 260px; min-height: 100vh; background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    position: fixed; left: 0; top: 0; bottom: 0; z-index: 100;
    transition: transform var(--transition);
    backdrop-filter: blur(20px);
  }
  .sidebar.collapsed { transform: translateX(-260px); }
  .sidebar-overlay {
    display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.7);
    z-index: 99; backdrop-filter: blur(4px);
  }
  .sidebar-overlay.show { display: block; }

  .sidebar-logo {
    padding: 24px 20px 20px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 12px;
  }
  .logo-icon {
    width: 38px; height: 38px; background: var(--blue);
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-weight: 800; font-size: 18px;
    box-shadow: 0 0 20px var(--blue-glow);
  }
  .logo-text { font-family: var(--font-display); font-size: 18px; font-weight: 800; letter-spacing: -0.5px; }
  .logo-badge {
    font-size: 9px; background: var(--blue); padding: 2px 6px; border-radius: 20px;
    font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-left: auto;
  }

  .sidebar-section { padding: 16px 12px 8px; }
  .sidebar-section-label {
    font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    color: var(--text-muted); padding: 0 8px; margin-bottom: 6px;
  }

  .nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px; border-radius: var(--radius-sm); cursor: pointer;
    transition: all var(--transition); color: var(--text-dim);
    font-size: 13.5px; font-weight: 500; position: relative; margin-bottom: 2px;
    text-decoration: none; border: 1px solid transparent;
  }
  .nav-item:hover { color: var(--white); background: rgba(35,61,254,0.1); border-color: var(--border); }
  .nav-item.active {
    color: var(--white); background: var(--blue);
    box-shadow: 0 4px 20px var(--blue-glow); border-color: transparent;
  }
  .nav-item .nav-icon {
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    border-radius: 8px; font-size: 14px; flex-shrink: 0;
    background: rgba(255,255,255,0.05);
    transition: background var(--transition);
  }
  .nav-item.active .nav-icon { background: rgba(255,255,255,0.15); }
  .nav-item:hover:not(.active) .nav-icon { background: rgba(35,61,254,0.2); }
  .nav-badge {
    margin-left: auto; background: var(--blue-dark); color: var(--white);
    font-size: 10px; font-weight: 700; padding: 1px 7px; border-radius: 20px; min-width: 22px; text-align: center;
  }
  .nav-item.active .nav-badge { background: rgba(255,255,255,0.2); }

  .sidebar-footer {
    margin-top: auto; padding: 16px 12px;
    border-top: 1px solid var(--border);
  }
  .user-card {
    display: flex; align-items: center; gap: 10px;
    padding: 10px; border-radius: var(--radius-sm);
    background: var(--surface2); cursor: pointer;
    transition: background var(--transition); border: 1px solid var(--border);
  }
  .user-card:hover { background: var(--surface3); }
  .user-avatar {
    width: 34px; height: 34px; border-radius: 50%;
    background: var(--blue); display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 13px; flex-shrink: 0;
    box-shadow: 0 0 12px var(--blue-glow);
  }
  .user-name { font-size: 12.5px; font-weight: 600; }
  .user-role { font-size: 10.5px; color: var(--text-muted); }
  .user-dots { margin-left: auto; color: var(--text-muted); font-size: 16px; letter-spacing: 1px; }

  /* Main */
  .main {
    margin-left: 260px; flex: 1; display: flex; flex-direction: column; position: relative; z-index: 1;
    transition: margin-left var(--transition);
  }
  .main.full { margin-left: 0; }

  /* Topbar */
  .topbar {
    height: 64px; background: rgba(5,13,46,0.85); backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border); display: flex; align-items: center;
    padding: 0 24px; gap: 16px; position: sticky; top: 0; z-index: 50;
  }
  .topbar-toggle {
    width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
    border-radius: var(--radius-sm); background: var(--surface2); border: 1px solid var(--border);
    cursor: pointer; color: var(--white); transition: all var(--transition);
  }
  .topbar-toggle:hover { background: var(--blue); border-color: var(--blue); }
  .topbar-search {
    flex: 1; max-width: 360px; position: relative;
  }
  .topbar-search input {
    width: 100%; padding: 8px 12px 8px 38px; border-radius: var(--radius-sm);
    background: var(--surface2); border: 1px solid var(--border); color: var(--white);
    font-family: var(--font); font-size: 13px; outline: none;
    transition: all var(--transition);
  }
  .topbar-search input::placeholder { color: var(--text-muted); }
  .topbar-search input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px var(--blue-glow); }
  .search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 13px; }
  .topbar-actions { margin-left: auto; display: flex; align-items: center; gap: 10px; }
  .topbar-btn {
    width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
    border-radius: var(--radius-sm); background: var(--surface2); border: 1px solid var(--border);
    cursor: pointer; color: var(--text-dim); transition: all var(--transition); position: relative;
  }
  .topbar-btn:hover { background: var(--surface3); color: var(--white); }
  .notif-dot {
    position: absolute; top: 6px; right: 6px; width: 7px; height: 7px;
    background: var(--blue); border-radius: 50%;
    box-shadow: 0 0 6px var(--blue);
  }
  .topbar-avatar {
    width: 36px; height: 36px; border-radius: 50%; background: var(--blue);
    display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px;
    cursor: pointer; box-shadow: 0 0 12px var(--blue-glow); border: 2px solid rgba(35,61,254,0.5);
    transition: all var(--transition);
  }
  .topbar-avatar:hover { box-shadow: 0 0 20px var(--blue-glow); transform: scale(1.05); }

  /* Page */
  .page { padding: 28px 28px 40px; }
  .page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; gap: 16px; flex-wrap: wrap; }
  .page-title { font-family: var(--font-display); font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
  .page-subtitle { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
  .breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
  .breadcrumb span.sep { color: var(--border); }
  .breadcrumb span.current { color: var(--blue); }

  /* Cards */
  .card {
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    overflow: hidden; transition: all var(--transition);
  }
  .card:hover { border-color: rgba(35,61,254,0.4); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
  .card-header {
    padding: 16px 20px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .card-title { font-size: 14px; font-weight: 600; }
  .card-body { padding: 20px; }

  /* Stat Cards */
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-bottom: 28px; }
  .stat-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 20px; position: relative; overflow: hidden; cursor: default;
    transition: all var(--transition);
  }
  .stat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--blue);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s ease;
  }
  .stat-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.4); border-color: rgba(35,61,254,0.4); }
  .stat-card:hover::before { transform: scaleX(1); }
  .stat-card.accent { background: var(--blue); border-color: var(--blue-light); }
  .stat-card.accent::before { background: rgba(255,255,255,0.5); }
  .stat-icon {
    width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center;
    background: rgba(35,61,254,0.15); font-size: 16px; margin-bottom: 14px;
  }
  .stat-card.accent .stat-icon { background: rgba(255,255,255,0.15); }
  .stat-value { font-family: var(--font-display); font-size: 28px; font-weight: 800; letter-spacing: -1px; line-height: 1; }
  .stat-label { font-size: 12px; color: var(--text-muted); margin-top: 4px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
  .stat-card.accent .stat-label { color: rgba(255,255,255,0.65); }
  .stat-trend {
    position: absolute; top: 18px; right: 18px;
    font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 20px;
  }
  .stat-trend.up { background: rgba(16,185,129,0.15); color: #34d399; }
  .stat-trend.down { background: rgba(239,68,68,0.15); color: #f87171; }
  .stat-bg-icon {
    position: absolute; right: -10px; bottom: -10px;
    font-size: 64px; opacity: 0.05;
  }
  .stat-card.accent .stat-bg-icon { opacity: 0.12; }

  /* Table */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  thead th {
    padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted);
    border-bottom: 1px solid var(--border); white-space: nowrap;
  }
  tbody tr { border-bottom: 1px solid rgba(35,61,254,0.08); transition: background var(--transition); }
  tbody tr:hover { background: rgba(35,61,254,0.05); }
  tbody td { padding: 13px 16px; color: var(--text-dim); vertical-align: middle; }
  tbody tr:last-child { border-bottom: none; }

  /* Badge */
  .badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
    letter-spacing: 0.3px;
  }
  .badge::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
  .badge-blue { background: rgba(35,61,254,0.15); color: #6b86ff; }
  .badge-green { background: rgba(16,185,129,0.12); color: #34d399; }
  .badge-yellow { background: rgba(245,158,11,0.12); color: #fbbf24; }
  .badge-red { background: rgba(239,68,68,0.12); color: #f87171; }
  .badge-gray { background: rgba(255,255,255,0.08); color: var(--text-dim); }
  .badge-purple { background: rgba(139,92,246,0.12); color: #a78bfa; }

  /* Buttons */
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 16px; border-radius: var(--radius-sm); font-family: var(--font);
    font-size: 13px; font-weight: 600; cursor: pointer; border: none;
    transition: all var(--transition); white-space: nowrap;
  }
  .btn-primary { background: var(--blue); color: var(--white); box-shadow: 0 4px 16px var(--blue-glow); }
  .btn-primary:hover { background: var(--blue-light); transform: translateY(-1px); box-shadow: 0 6px 24px var(--blue-glow); }
  .btn-ghost { background: transparent; color: var(--text-dim); border: 1px solid var(--border); }
  .btn-ghost:hover { background: var(--surface2); color: var(--white); border-color: rgba(35,61,254,0.4); }
  .btn-danger { background: rgba(239,68,68,0.1); color: #f87171; border: 1px solid rgba(239,68,68,0.2); }
  .btn-danger:hover { background: rgba(239,68,68,0.2); }
  .btn-sm { padding: 5px 11px; font-size: 12px; }
  .btn-icon { padding: 7px; width: 34px; height: 34px; justify-content: center; }

  /* Form */
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; font-size: 12px; font-weight: 600; color: var(--text-dim); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
  .form-control {
    width: 100%; padding: 9px 13px; border-radius: var(--radius-sm);
    background: var(--surface2); border: 1px solid var(--border); color: var(--white);
    font-family: var(--font); font-size: 13.5px; outline: none; transition: all var(--transition);
  }
  .form-control::placeholder { color: var(--text-muted); }
  .form-control:focus { border-color: var(--blue); box-shadow: 0 0 0 3px var(--blue-glow); }
  select.form-control option { background: var(--surface); }
  textarea.form-control { resize: vertical; min-height: 80px; }

  /* Grid */
  .grid { display: grid; gap: 20px; }
  .grid-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-4 { grid-template-columns: repeat(4, 1fr); }

  /* Chips/Tabs */
  .tabs { display: flex; gap: 4px; background: var(--surface2); border-radius: var(--radius-sm); padding: 4px; border: 1px solid var(--border); width: fit-content; }
  .tab { padding: 6px 14px; border-radius: 6px; font-size: 12.5px; font-weight: 600; cursor: pointer; color: var(--text-muted); transition: all var(--transition); }
  .tab.active { background: var(--blue); color: var(--white); box-shadow: 0 2px 12px var(--blue-glow); }
  .tab:hover:not(.active) { color: var(--white); background: rgba(35,61,254,0.1); }

  /* Progress */
  .progress { height: 4px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; }
  .progress-bar { height: 100%; background: var(--blue); border-radius: 4px; transition: width 0.6s ease; box-shadow: 0 0 8px var(--blue-glow); }

  /* Avatar group */
  .avatar-group { display: flex; }
  .avatar-sm {
    width: 28px; height: 28px; border-radius: 50%; background: var(--blue);
    display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;
    border: 2px solid var(--surface); margin-left: -8px;
  }
  .avatar-sm:first-child { margin-left: 0; }

  /* Modal */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,10,0.8); backdrop-filter: blur(8px);
    z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px;
    animation: fadeIn 0.2s ease;
  }
  .modal {
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto;
    animation: slideUp 0.25s ease;
    box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(35,61,254,0.1);
  }
  .modal-header { padding: 20px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .modal-title { font-size: 16px; font-weight: 700; }
  .modal-close { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 6px; background: var(--surface2); cursor: pointer; color: var(--text-dim); border: none; transition: all var(--transition); }
  .modal-close:hover { background: rgba(239,68,68,0.15); color: #f87171; }
  .modal-body { padding: 24px; }
  .modal-footer { padding: 16px 24px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 10px; }

  /* Notification panel */
  .notif-panel {
    position: absolute; top: 50px; right: 56px; width: 320px;
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    box-shadow: 0 16px 48px rgba(0,0,0,0.5); z-index: 60; overflow: hidden;
    animation: slideDown 0.2s ease;
  }
  .notif-item { padding: 13px 16px; border-bottom: 1px solid var(--border); display: flex; gap: 12px; cursor: pointer; transition: background var(--transition); }
  .notif-item:hover { background: var(--surface2); }
  .notif-item:last-child { border-bottom: none; }
  .notif-dot-indicator { width: 8px; height: 8px; background: var(--blue); border-radius: 50%; margin-top: 4px; flex-shrink: 0; box-shadow: 0 0 6px var(--blue); }
  .notif-text { font-size: 12.5px; color: var(--text-dim); line-height: 1.4; }
  .notif-time { font-size: 11px; color: var(--text-muted); margin-top: 3px; }

  /* Activity feed */
  .activity-item { display: flex; gap: 14px; padding: 12px 0; border-bottom: 1px solid rgba(35,61,254,0.08); }
  .activity-item:last-child { border-bottom: none; }
  .activity-icon { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; }
  .activity-text { font-size: 13px; color: var(--text-dim); }
  .activity-time { font-size: 11px; color: var(--text-muted); margin-top: 3px; }

  /* Chart bar (CSS only) */
  .mini-chart { display: flex; align-items: flex-end; gap: 5px; height: 56px; }
  .bar { flex: 1; background: rgba(35,61,254,0.2); border-radius: 4px 4px 0 0; transition: height 0.5s ease; position: relative; cursor: pointer; }
  .bar:hover { background: var(--blue); box-shadow: 0 0 12px var(--blue-glow); }
  .bar.active { background: var(--blue); }

  /* Drag handle */
  .drag-handle { cursor: grab; color: var(--text-muted); font-size: 16px; padding: 0 8px; }
  .drag-handle:active { cursor: grabbing; }

  /* Toggle switch */
  .toggle { position: relative; width: 38px; height: 22px; }
  .toggle input { opacity: 0; width: 0; height: 0; }
  .toggle-slider {
    position: absolute; inset: 0; background: var(--surface3); border-radius: 22px; cursor: pointer;
    transition: background var(--transition); border: 1px solid var(--border);
  }
  .toggle-slider::before {
    content: ''; position: absolute; width: 16px; height: 16px; left: 2px; top: 2px;
    background: var(--text-muted); border-radius: 50%; transition: all var(--transition);
  }
  .toggle input:checked + .toggle-slider { background: var(--blue); border-color: var(--blue); box-shadow: 0 0 12px var(--blue-glow); }
  .toggle input:checked + .toggle-slider::before { transform: translateX(16px); background: var(--white); }

  /* Pagination */
  .pagination { display: flex; gap: 6px; align-items: center; }
  .page-btn {
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    border-radius: 8px; background: var(--surface2); border: 1px solid var(--border);
    cursor: pointer; font-size: 13px; color: var(--text-dim); transition: all var(--transition);
  }
  .page-btn:hover { border-color: var(--blue); color: var(--blue); }
  .page-btn.active { background: var(--blue); color: var(--white); border-color: var(--blue); box-shadow: 0 2px 12px var(--blue-glow); }
  .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }

  /* Login */
  .login-page {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .login-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 20px;
    padding: 40px; width: 100%; max-width: 420px; position: relative; z-index: 1;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(35,61,254,0.1);
  }
  .login-ring {
    position: absolute; border-radius: 50%; border: 1px solid rgba(35,61,254,0.15);
  }

  /* Animations */
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: none } }
  @keyframes slideDown { from { opacity: 0; transform: translateY(-10px) } to { opacity: 1; transform: none } }
  @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.4 } }
  @keyframes spin { to { transform: rotate(360deg) } }
  .spin { animation: spin 1s linear infinite; }

  /* Responsive */
  @media (max-width: 1024px) { .grid-4 { grid-template-columns: repeat(2, 1fr); } .grid-3 { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 768px) {
    .sidebar { transform: translateX(-260px); }
    .sidebar.open { transform: translateX(0); }
    .main { margin-left: 0 !important; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
    .page { padding: 20px 16px 32px; }
    .topbar { padding: 0 16px; }
    .topbar-search { max-width: 200px; }
    .page-header { flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr 1fr; } .topbar-search { display: none; } }

  /* Divider */
  .divider { height: 1px; background: var(--border); margin: 20px 0; }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .gap-2 { gap: 8px; }
  .gap-3 { gap: 12px; }
  .gap-4 { gap: 16px; }
  .mt-1 { margin-top: 4px; }
  .mt-2 { margin-top: 8px; }
  .mt-3 { margin-top: 12px; }
  .mt-4 { margin-top: 16px; }
  .mb-2 { margin-bottom: 8px; }
  .mb-3 { margin-bottom: 12px; }
  .mb-4 { margin-bottom: 16px; }
  .ml-auto { margin-left: auto; }
  .text-muted { color: var(--text-muted); }
  .text-dim { color: var(--text-dim); }
  .text-sm { font-size: 12px; }
  .text-xs { font-size: 11px; }
  .font-bold { font-weight: 700; }
  .font-semibold { font-weight: 600; }
  .w-full { width: 100%; }
  .relative { position: relative; }
  .rounded-full { border-radius: 9999px; }
  .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
`;

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const mockData = {
    jobs: [
        { id: 1, title: 'Senior React Developer', department: 'Engineering', location: 'Remote', type: 'Full-time', status: 'active', applicants: 34, posted: '2025-03-10' },
        { id: 2, title: 'Product Designer', department: 'Design', location: 'New York', type: 'Full-time', status: 'active', applicants: 21, posted: '2025-03-12' },
        { id: 3, title: 'Marketing Lead', department: 'Marketing', location: 'London', type: 'Contract', status: 'active', applicants: 15, posted: '2025-03-14' },
        { id: 4, title: 'DevOps Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', status: 'inactive', applicants: 8, posted: '2025-02-28' },
        { id: 5, title: 'Content Strategist', department: 'Marketing', location: 'Austin', type: 'Part-time', status: 'active', applicants: 12, posted: '2025-03-15' },
    ],
    applications: [
        { id: 1, name: 'Alex Morgan', email: 'alex@email.com', job: 'Senior React Developer', status: 'shortlisted', date: '2025-03-16', score: 92 },
        { id: 2, name: 'Jordan Lee', email: 'jordan@email.com', job: 'Product Designer', status: 'reviewed', date: '2025-03-15', score: 78 },
        { id: 3, name: 'Sam Chen', email: 'sam@email.com', job: 'Marketing Lead', status: 'pending', date: '2025-03-17', score: 65 },
        { id: 4, name: 'Riley Park', email: 'riley@email.com', job: 'DevOps Engineer', status: 'rejected', date: '2025-03-14', score: 45 },
        { id: 5, name: 'Casey Williams', email: 'casey@email.com', job: 'Senior React Developer', status: 'pending', date: '2025-03-18', score: 88 },
        { id: 6, name: 'Drew Davis', email: 'drew@email.com', job: 'Content Strategist', status: 'shortlisted', date: '2025-03-16', score: 74 },
    ],
    team: [
        { id: 1, name: 'Sarah Johnson', role: 'CTO', dept: 'Engineering', status: 'active', avatar: 'SJ', color: '#233dfe' },
        { id: 2, name: 'Mike Chen', role: 'Lead Designer', dept: 'Design', status: 'active', avatar: 'MC', color: '#7c3aed' },
        { id: 3, name: 'Lisa Park', role: 'Marketing Director', dept: 'Marketing', status: 'active', avatar: 'LP', color: '#0891b2' },
        { id: 4, name: 'Tom Wilson', role: 'Senior Dev', dept: 'Engineering', status: 'away', avatar: 'TW', color: '#059669' },
        { id: 5, name: 'Emma Davis', role: 'Sales Manager', dept: 'Sales', status: 'active', avatar: 'ED', color: '#dc2626' },
        { id: 6, name: 'James Brown', role: 'DevOps Lead', dept: 'Engineering', status: 'offline', avatar: 'JB', color: '#d97706' },
    ],
    bookings: [
        { id: 1, customer: 'Acme Corp', service: 'Web Development', date: '2025-03-25', time: '10:00 AM', status: 'confirmed', value: '$4,200' },
        { id: 2, customer: 'TechStart Inc', service: 'UI/UX Audit', date: '2025-03-26', time: '2:00 PM', status: 'pending', value: '$1,800' },
        { id: 3, customer: 'GlobalFirm', service: 'Branding Package', date: '2025-03-28', time: '11:00 AM', status: 'confirmed', value: '$6,500' },
        { id: 4, customer: 'Startup Hub', service: 'SEO Consultation', date: '2025-04-01', time: '3:30 PM', status: 'pending', value: '$900' },
        { id: 5, customer: 'MediaPro', service: 'App Development', date: '2025-04-03', time: '9:00 AM', status: 'cancelled', value: '$12,000' },
    ],
    inquiries: [
        { id: 1, name: 'Chris Evans', email: 'chris@co.com', subject: 'Partnership Opportunity', message: 'Hello, we are interested in exploring a strategic partnership...', date: '2025-03-17', read: false, priority: 'high' },
        { id: 2, name: 'Anna Smith', email: 'anna@co.com', subject: 'Custom Development Quote', message: 'We need a custom e-commerce solution built...', date: '2025-03-16', read: true, priority: 'medium' },
        { id: 3, name: 'Bob Johnson', email: 'bob@co.com', subject: 'Support Request', message: 'We are having issues with our current setup...', date: '2025-03-15', read: false, priority: 'low' },
        { id: 4, name: 'Zara Ahmed', email: 'zara@co.com', subject: 'Press Inquiry', message: 'We are writing an article about top tech agencies...', date: '2025-03-14', read: true, priority: 'medium' },
    ],
    blogPosts: [
        { id: 1, title: 'The Future of Web Development in 2025', category: 'Tech', status: 'published', views: 4821, date: '2025-03-10', featured: true },
        { id: 2, title: 'Building Scalable React Applications', category: 'Tutorial', status: 'published', views: 3204, date: '2025-03-05', featured: false },
        { id: 3, title: 'Design Systems: A Complete Guide', category: 'Design', status: 'draft', views: 0, date: '2025-03-18', featured: false },
        { id: 4, title: 'AI Tools Transforming Development', category: 'News', status: 'published', views: 6102, date: '2025-03-01', featured: true },
    ],
    subscribers: [
        { id: 1, email: 'user1@example.com', source: 'Blog', date: '2025-03-15' },
        { id: 2, email: 'user2@example.com', source: 'Footer', date: '2025-03-14' },
        { id: 3, email: 'user3@example.com', source: 'Popup', date: '2025-03-13' },
        { id: 4, email: 'user4@example.com', source: 'Blog', date: '2025-03-12' },
        { id: 5, email: 'user5@example.com', source: 'Social', date: '2025-03-11' },
        { id: 6, email: 'user6@example.com', source: 'Referral', date: '2025-03-10' },
    ],
    analytics: { daily: [42, 58, 37, 65, 51, 78, 62], revenue: [4200, 5800, 3700, 6500, 5100, 7800, 6200], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
};

// ─── Icons (inline SVG) ───────────────────────────────────────────────────────
const Icon = ({ name, size = 14 }) => {
    const icons = {
        dashboard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
        jobs: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>,
        applications: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>,
        team: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
        bookings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
        inquiries: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
        blog: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
        newsletter: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
        settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
        analytics: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
        bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg>,
        search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
        menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
        plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
        edit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
        trash: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" /></svg>,
        eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
        close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
        arrow_up: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15" /></svg>,
        arrow_down: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>,
        chevron_right: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>,
        download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
        filter: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
        check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>,
        star: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
        link: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>,
        logout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
        user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
        globe: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
        activity: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    };
    return icons[name] || null;
};

// ─── Components ────────────────────────────────────────────────────────────────

const StatCard = ({ title, value, icon, trend, trendUp, color, accent }) => (
    <div className={`stat-card${accent ? ' accent' : ''}`}>
        <div className="stat-bg-icon"><Icon name={icon} size={60} /></div>
        {trend && <span className={`stat-trend ${trendUp ? 'up' : 'down'}`}>{trendUp ? '↑' : '↓'} {trend}</span>}
        <div className="stat-icon"><Icon name={icon} size={18} /></div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{title}</div>
    </div>
);

const MiniChart = ({ data, active }) => {
    const max = Math.max(...data);
    return (
        <div className="mini-chart">
            {data.map((v, i) => (
                <div key={i} className={`bar${i === active ? ' active' : ''}`} style={{ height: `${(v / max) * 100}%` }} title={v} />
            ))}
        </div>
    );
};

// ─── Pages ─────────────────────────────────────────────────────────────────────

const Dashboard = ({ data }) => {
    const stats = [
        { title: 'Total Jobs', value: data.jobs.length, icon: 'jobs', trend: '12%', trendUp: true, accent: true },
        { title: 'Applications', value: data.applications.length, icon: 'applications', trend: '8%', trendUp: true },
        { title: 'Open Inquiries', value: data.inquiries.filter(i => !i.read).length, icon: 'inquiries', trend: '3%', trendUp: false },
        { title: 'Team Members', value: data.team.length, icon: 'team', trend: '5%', trendUp: true },
        { title: 'Bookings', value: data.bookings.length, icon: 'bookings', trend: '18%', trendUp: true },
        { title: 'Blog Posts', value: data.blogPosts.length, icon: 'blog', trend: '2%', trendUp: true },
        { title: 'Subscribers', value: data.subscribers.length, icon: 'newsletter', trend: '22%', trendUp: true },
    ];
    const revenue = data.analytics.revenue;
    const maxRev = Math.max(...revenue);
    return (
        <div>
            <div className="page-header">
                <div>
                    <div className="breadcrumb"><span>Home</span><span className="sep">›</span><span className="current">Dashboard</span></div>
                    <div className="page-title">Overview</div>
                    <div className="page-subtitle">Welcome back! Here's what's happening today.</div>
                </div>
                <button className="btn btn-primary"><Icon name="download" size={13} /> Export Report</button>
            </div>
            <div className="stats-grid">
                {stats.map((s, i) => <StatCard key={i} {...s} />)}
            </div>
            <div className="grid grid-2" style={{ gap: 20 }}>
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Weekly Revenue</span>
                        <span className="badge badge-green">+18% this week</span>
                    </div>
                    <div className="card-body">
                        <div style={{ marginBottom: 6 }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, letterSpacing: -1 }}>$43,600</span>
                            <span className="text-muted text-sm" style={{ marginLeft: 8 }}>this week</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80, marginTop: 16 }}>
                            {revenue.map((v, i) => (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                    <div style={{ width: '100%', background: i === 5 ? 'var(--blue)' : 'rgba(35,61,254,0.15)', height: `${(v / maxRev) * 70}px`, borderRadius: '6px 6px 0 0', transition: 'all 0.4s', boxShadow: i === 5 ? '0 0 12px var(--blue-glow)' : 'none' }} />
                                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{data.analytics.labels[i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Recent Activity</span>
                        <button className="btn btn-ghost btn-sm">View all</button>
                    </div>
                    <div className="card-body" style={{ padding: '12px 20px' }}>
                        {[
                            { icon: 'applications', text: 'Alex Morgan applied for Senior React Developer', time: '2m ago', color: '#233dfe' },
                            { icon: 'bookings', text: 'GlobalFirm confirmed Branding Package booking', time: '18m ago', color: '#059669' },
                            { icon: 'inquiries', text: 'New inquiry from Chris Evans', time: '1h ago', color: '#d97706' },
                            { icon: 'blog', text: 'AI Tools article reached 6k views', time: '3h ago', color: '#7c3aed' },
                            { icon: 'team', text: 'Emma Davis joined the Sales team', time: '5h ago', color: '#0891b2' },
                        ].map((a, i) => (
                            <div key={i} className="activity-item">
                                <div className="activity-icon" style={{ background: `${a.color}22` }}>
                                    <span style={{ color: a.color }}><Icon name={a.icon} size={14} /></span>
                                </div>
                                <div>
                                    <div className="activity-text">{a.text}</div>
                                    <div className="activity-time">{a.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ marginTop: 20 }}>
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Recent Jobs</span>
                        <span className="text-muted text-sm">{data.jobs.length} total</span>
                    </div>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Position</th><th>Department</th><th>Location</th><th>Applicants</th><th>Status</th></tr></thead>
                            <tbody>
                                {data.jobs.slice(0, 4).map(j => (
                                    <tr key={j.id}>
                                        <td><span style={{ fontWeight: 600 }}>{j.title}</span></td>
                                        <td><span className="text-dim">{j.department}</span></td>
                                        <td><span className="text-dim">{j.location}</span></td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div className="progress" style={{ width: 60 }}><div className="progress-bar" style={{ width: `${Math.min((j.applicants / 40) * 100, 100)}%` }} /></div>
                                                <span className="text-sm text-dim">{j.applicants}</span>
                                            </div>
                                        </td>
                                        <td><span className={`badge ${j.status === 'active' ? 'badge-green' : 'badge-gray'}`}>{j.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const JobsPage = ({ data, setData }) => {
    const [showModal, setShowModal] = useState(false);
    const [editJob, setEditJob] = useState(null);
    const [form, setForm] = useState({ title: '', department: '', location: '', type: 'Full-time' });
    const [filter, setFilter] = useState('all');

    const filtered = filter === 'all' ? data.jobs : data.jobs.filter(j => j.status === filter);

    const openAdd = () => { setEditJob(null); setForm({ title: '', department: '', location: '', type: 'Full-time' }); setShowModal(true); };
    const openEdit = (j) => { setEditJob(j); setForm(j); setShowModal(true); };
    const save = () => {
        const newJob = { ...form, id: editJob?.id || Date.now(), applicants: editJob?.applicants || 0, posted: editJob?.posted || new Date().toISOString().slice(0, 10), status: editJob?.status || 'active' };
        setData(d => ({ ...d, jobs: editJob ? d.jobs.map(j => j.id === editJob.id ? newJob : j) : [...d.jobs, newJob] }));
        setShowModal(false);
    };
    const del = (id) => setData(d => ({ ...d, jobs: d.jobs.filter(j => j.id !== id) }));
    const toggle = (id) => setData(d => ({ ...d, jobs: d.jobs.map(j => j.id === id ? { ...j, status: j.status === 'active' ? 'inactive' : 'active' } : j) }));

    return (
        <div>
            <div className="page-header">
                <div>
                    <div className="breadcrumb"><span>Home</span><span className="sep">›</span><span className="current">Jobs</span></div>
                    <div className="page-title">Job Listings</div>
                    <div className="page-subtitle">{data.jobs.length} positions across {[...new Set(data.jobs.map(j => j.department))].length} departments</div>
                </div>
                <button className="btn btn-primary" onClick={openAdd}><Icon name="plus" size={14} /> Add Job</button>
            </div>
            <div className="flex items-center gap-3 mb-4" style={{ flexWrap: 'wrap' }}>
                <div className="tabs">
                    {['all', 'active', 'inactive'].map(f => <div key={f} className={`tab${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f.charAt(0).toUpperCase() + f.slice(1)}</div>)}
                </div>
                <span className="text-muted text-sm ml-auto">{filtered.length} results</span>
            </div>
            <div className="card">
                <div className="table-wrap">
                    <table>
                        <thead><tr><th>Job Title</th><th>Department</th><th>Location</th><th>Type</th><th>Applicants</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.map(j => (
                                <tr key={j.id}>
                                    <td><span style={{ fontWeight: 600, color: 'var(--white)' }}>{j.title}</span></td>
                                    <td><span className="badge badge-blue">{j.department}</span></td>
                                    <td><span className="text-dim">{j.location}</span></td>
                                    <td><span className="text-sm text-dim">{j.type}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div className="progress" style={{ width: 50 }}><div className="progress-bar" style={{ width: `${Math.min((j.applicants / 40) * 100, 100)}%` }} /></div>
                                            <span className="text-sm text-dim">{j.applicants}</span>
                                        </div>
                                    </td>
                                    <td><span className={`badge ${j.status === 'active' ? 'badge-green' : 'badge-gray'}`}>{j.status}</span></td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => openEdit(j)}><Icon name="edit" size={13} /></button>
                                            <button className="btn btn-danger btn-icon btn-sm" onClick={() => del(j.id)}><Icon name="trash" size={13} /></button>
                                            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => toggle(j.id)} title="Toggle status"><Icon name={j.status === 'active' ? 'check' : 'close'} size={13} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <span className="modal-title">{editJob ? 'Edit Job' : 'Add New Job'}</span>
                            <button className="modal-close" onClick={() => setShowModal(false)}><Icon name="close" size={14} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="grid grid-2" style={{ gap: 14 }}>
                                <div className="form-group" style={{ gridColumn: '1/-1' }}>
                                    <label className="form-label">Job Title</label>
                                    <input className="form-control" placeholder="e.g. Senior React Developer" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Department</label>
                                    <input className="form-control" placeholder="Engineering" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Location</label>
                                    <input className="form-control" placeholder="Remote / City" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                                </div>
                                <div className="form-group" style={{ gridColumn: '1/-1' }}>
                                    <label className="form-label">Type</label>
                                    <select className="form-control" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                                        {['Full-time', 'Part-time', 'Contract', 'Internship'].map(t => <option key={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={save}><Icon name="check" size={13} /> {editJob ? 'Save Changes' : 'Create Job'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ApplicationsPage = ({ data, setData }) => {
    const [filter, setFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState(null);
    const perPage = 5;
    const filtered = filter === 'all' ? data.applications : data.applications.filter(a => a.status === filter);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);
    const update = (id, status) => setData(d => ({ ...d, applications: d.applications.map(a => a.id === id ? { ...a, status } : a) }));
    const statusBadge = { pending: 'badge-yellow', reviewed: 'badge-blue', shortlisted: 'badge-green', rejected: 'badge-red' };

    return (
        <div>
            <div className="page-header">
                <div>
                    <div className="breadcrumb"><span>Home</span><span className="sep">›</span><span className="current">Applications</span></div>
                    <div className="page-title">Applications</div>
                    <div className="page-subtitle">{data.applications.length} total candidates</div>
                </div>
                <button className="btn btn-ghost"><Icon name="download" size={13} /> Export</button>
            </div>
            <div className="flex items-center gap-3 mb-4" style={{ flexWrap: 'wrap' }}>
                <div className="tabs">
                    {['all', 'pending', 'reviewed', 'shortlisted', 'rejected'].map(f => (
                        <div key={f} className={`tab${filter === f ? ' active' : ''}`} onClick={() => { setFilter(f); setPage(1); }}>
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                            <span style={{ marginLeft: 5, background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '0 6px', fontSize: 10 }}>
                                {f === 'all' ? data.applications.length : data.applications.filter(a => a.status === f).length}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="card">
                <div className="table-wrap">
                    <table>
                        <thead><tr><th>Candidate</th><th>Applied For</th><th>Score</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            {paginated.map(a => (
                                <tr key={a.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(a)}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                                                {a.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, color: 'var(--white)', fontSize: 13 }}>{a.name}</div>
                                                <div className="text-xs text-muted">{a.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="text-dim text-sm">{a.job}</span></td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="progress" style={{ width: 48 }}><div className="progress-bar" style={{ width: `${a.score}%`, background: a.score > 80 ? '#34d399' : a.score > 60 ? 'var(--blue)' : '#f87171' }} /></div>
                                            <span className="text-sm" style={{ color: a.score > 80 ? '#34d399' : a.score > 60 ? '#6b86ff' : '#f87171', fontWeight: 600 }}>{a.score}</span>
                                        </div>
                                    </td>
                                    <td><span className="text-muted text-sm">{a.date}</span></td>
                                    <td><span className={`badge ${statusBadge[a.status]}`}>{a.status}</span></td>
                                    <td onClick={e => e.stopPropagation()}>
                                        <select className="form-control" style={{ width: 120, padding: '4px 8px', fontSize: 12 }} value={a.status} onChange={e => update(a.id, e.target.value)}>
                                            {['pending', 'reviewed', 'shortlisted', 'rejected'].map(s => <option key={s}>{s}</option>)}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="text-muted text-sm">Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</span>
                    <div className="pagination">
                        <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}><Icon name="arrow_up" size={12} style={{ transform: 'rotate(-90deg)' }} /></button>
                        {Array.from({ length: Math.ceil(filtered.length / perPage) }, (_, i) => (
                            <button key={i} className={`page-btn${page === i + 1 ? ' active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
                        ))}
                        <button className="page-btn" disabled={page * perPage >= filtered.length} onClick={() => setPage(p => p + 1)}><Icon name="arrow_down" size={12} style={{ transform: 'rotate(-90deg)' }} /></button>
                    </div>
                </div>
            </div>
            {selected && (
                <div className="modal-overlay" onClick={() => setSelected(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <span className="modal-title">Application Details</span>
                            <button className="modal-close" onClick={() => setSelected(null)}><Icon name="close" size={14} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="flex items-center gap-4 mb-4">
                                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, boxShadow: '0 0 20px var(--blue-glow)' }}>
                                    {selected.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 18 }}>{selected.name}</div>
                                    <div className="text-muted text-sm">{selected.email}</div>
                                </div>
                            </div>
                            <div className="grid grid-2" style={{ gap: 12 }}>
                                {[['Applied For', selected.job], ['Date', selected.date], ['Status', selected.status], ['Score', `${selected.score}/100`]].map(([k, v]) => (
                                    <div key={k} style={{ background: 'var(--surface2)', borderRadius: 10, padding: '12px 14px', border: '1px solid var(--border)' }}>
                                        <div className="text-xs text-muted mb-1" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>{k}</div>
                                        <div style={{ fontWeight: 600 }}>{v}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-ghost" onClick={() => setSelected(null)}>Close</button>
                            <button className="btn btn-primary"><Icon name="link" size={13} /> View Full Profile</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const TeamPage = ({ data, setData }) => {
    const [catFilter, setCatFilter] = useState('All');
    const cats = ['All', 'Engineering', 'Design', 'Marketing', 'Sales'];
    const filtered = catFilter === 'All' ? data.team : data.team.filter(m => m.dept === catFilter);
    const toggle = (id) => setData(d => ({ ...d, team: d.team.map(m => m.id === id ? { ...m, status: m.status === 'active' ? 'offline' : 'active' } : m) }));
    const statusColors = { active: '#34d399', away: '#fbbf24', offline: 'var(--text-muted)' };

    return (
        <div>
            <div className="page-header">
                <div>
                    <div className="breadcrumb"><span>Home</span><span className="sep">›</span><span className="current">Team</span></div>
                    <div className="page-title">Team Members</div>
                    <div className="page-subtitle">{data.team.filter(m => m.status === 'active').length} active of {data.team.length} total</div>
                </div>
                <button className="btn btn-primary"><Icon name="plus" size={14} /> Add Member</button>
            </div>
            <div className="tabs mb-4">
                {cats.map(c => <div key={c} className={`tab${catFilter === c ? ' active' : ''}`} onClick={() => setCatFilter(c)}>{c}</div>)}
            </div>
            <div className="grid grid-3" style={{ gap: 16 }}>
                {filtered.map(m => (
                    <div key={m.id} className="card" style={{ padding: 20 }}>
                        <div className="flex items-center gap-3 mb-3">
                            <div style={{ width: 46, height: 46, borderRadius: '50%', background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0, position: 'relative', boxShadow: `0 0 16px ${m.color}44` }}>
                                {m.avatar}
                                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 11, height: 11, borderRadius: '50%', background: statusColors[m.status], border: '2px solid var(--surface)' }} />
                            </div>
                            <div style={{ minWidth: 0 }}>
                                <div style={{ fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</div>
                                <div className="text-muted text-xs">{m.role}</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className={`badge ${m.dept === 'Engineering' ? 'badge-blue' : m.dept === 'Design' ? 'badge-purple' : m.dept === 'Marketing' ? 'badge-yellow' : 'badge-green'}`}>{m.dept}</span>
                            <label className="toggle"><input type="checkbox" checked={m.status === 'active'} onChange={() => toggle(m.id)} /><span className="toggle-slider" /></label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BookingsPage = ({ data, setData }) => {
    const update = (id, status) => setData(d => ({ ...d, bookings: d.bookings.map(b => b.id === id ? { ...b, status } : b) }));
    const statusBadge = { confirmed: 'badge-green', pending: 'badge-yellow', completed: 'badge-blue', cancelled: 'badge-red' };

    return (
        <div>
            <div className="page-header">
                <div>
                    <div className="breadcrumb"><span>Home</span><span className="sep">›</span><span className="current">Bookings</span></div>
                    <div className="page-title">Service Bookings</div>
                    <div className="page-subtitle">{data.bookings.filter(b => b.status === 'confirmed').length} confirmed • {data.bookings.filter(b => b.status === 'pending').length} pending</div>
                </div>
                <button className="btn btn-primary"><Icon name="plus" size={14} /> New Booking</button>
            </div>
            <div className="card">
                <div className="table-wrap">
                    <table>
                        <thead><tr><th>Customer</th><th>Service</th><th>Date & Time</th><th>Value</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            {data.bookings.map(b => (
                                <tr key={b.id}>
                                    <td><span style={{ fontWeight: 600, color: 'var(--white)' }}>{b.customer}</span></td>
                                    <td><span className="text-dim">{b.service}</span></td>
                                    <td><div style={{ fontSize: 13, color: 'var(--text-dim)' }}>{b.date}<br /><span className="text-xs text-muted">{b.time}</span></div></td>
                                    <td><span style={{ color: '#34d399', fontWeight: 600 }}>{b.value}</span></td>
                                    <td><span className={`badge ${statusBadge[b.status]}`}>{b.status}</span></td>
                                    <td>
                                        <select className="form-control" style={{ width: 120, padding: '4px 8px', fontSize: 12 }} value={b.status} onChange={e => update(b.id, e.target.value)}>
                                            {['pending', 'confirmed', 'completed', 'cancelled'].map(s => <option key={s}>{s}</option>)}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const InquiriesPage = ({ data, setData }) => {
    const [selected, setSelected] = useState(null);
    const markRead = (id) => setData(d => ({ ...d, inquiries: d.inquiries.map(i => i.id === id ? { ...i, read: true } : i) }));
    const priorityColors = { high: '#f87171', medium: '#fbbf24', low: '#34d399' };

    return (
        <div>
            <div className="page-header">
                <div>
                    <div className="breadcrumb"><span>Home</span><span className="sep">›</span><span className="current">Inquiries</span></div>
                    <div className="page-title">Contact Inquiries</div>
                    <div className="page-subtitle">{data.inquiries.filter(i => !i.read).length} unread messages</div>
                </div>
                <button className="btn btn-ghost"><Icon name="check" size={13} /> Mark all read</button>
            </div>
            <div className="card">
                {data.inquiries.map(inq => (
                    <div key={inq.id} onClick={() => { setSelected(inq); markRead(inq.id); }} style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, transition: 'background 0.2s', background: !inq.read ? 'rgba(35,61,254,0.04)' : 'transparent' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(35,61,254,0.08)'}
                        onMouseLeave={e => e.currentTarget.style.background = !inq.read ? 'rgba(35,61,254,0.04)' : 'transparent'}>
                        <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${priorityColors[inq.priority]}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ color: priorityColors[inq.priority] }}><Icon name="inquiries" size={14} /></span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="flex items-center gap-2">
                                <span style={{ fontWeight: inq.read ? 500 : 700, color: 'var(--white)', fontSize: 14 }}>{inq.name}</span>
                                {!inq.read && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--blue)', boxShadow: '0 0 6px var(--blue)' }} />}
                                <span className="ml-auto text-xs text-muted">{inq.date}</span>
                            </div>
                            <div style={{ fontSize: 13, fontWeight: inq.read ? 400 : 600, color: inq.read ? 'var(--text-muted)' : 'var(--text-dim)' }}>{inq.subject}</div>
                            <div className="text-xs text-muted truncate" style={{ maxWidth: 400 }}>{inq.message}</div>
                        </div>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: priorityColors[inq.priority], flexShrink: 0 }} title={inq.priority} />
                    </div>
                ))}
            </div>
            {selected && (
                <div className="modal-overlay" onClick={() => setSelected(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <span className="modal-title">Inquiry from {selected.name}</span>
                            <button className="modal-close" onClick={() => setSelected(null)}><Icon name="close" size={14} /></button>
                        </div>
                        <div className="modal-body">
                            <div style={{ background: 'var(--surface2)', borderRadius: 10, padding: '14px 16px', border: '1px solid var(--border)', marginBottom: 16 }}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-muted" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>From</span>
                                    <span className="text-xs text-muted">{selected.date}</span>
                                </div>
                                <div style={{ fontWeight: 600 }}>{selected.name} · <span className="text-muted" style={{ fontWeight: 400, fontSize: 13 }}>{selected.email}</span></div>
                            </div>
                            <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 16 }}>{selected.subject}</div>
                            <div style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontSize: 14 }}>{selected.message}</div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-ghost" onClick={() => setSelected(null)}>Close</button>
                            <button className="btn btn-primary"><Icon name="inquiries" size={13} /> Reply via Email</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const BlogPage = ({ data, setData }) => {
    const [showModal, setShowModal] = useState(false);
    const [editPost, setEditPost] = useState(null);
    const [form, setForm] = useState({ title: '', category: 'Tech', status: 'draft', featured: false });
    const statusBadge = { published: 'badge-green', draft: 'badge-yellow' };

    const open = (post) => { setEditPost(post || null); setForm(post || { title: '', category: 'Tech', status: 'draft', featured: false }); setShowModal(true); };
    const save = () => {
        const p = { ...form, id: editPost?.id || Date.now(), views: editPost?.views || 0, date: editPost?.date || new Date().toISOString().slice(0, 10) };
        setData(d => ({ ...d, blogPosts: editPost ? d.blogPosts.map(b => b.id === editPost.id ? p : b) : [...d.blogPosts, p] }));
        setShowModal(false);
    };
    const del = (id) => setData(d => ({ ...d, blogPosts: d.blogPosts.filter(b => b.id !== id) }));

    return (
        <div>
            <div className="page-header">
                <div>
                    <div className="breadcrumb"><span>Home</span><span className="sep">›</span><span className="current">Blog</span></div>
                    <div className="page-title">Blog Management</div>
                    <div className="page-subtitle">{data.blogPosts.filter(b => b.status === 'published').length} published · {data.blogPosts.filter(b => b.status === 'draft').length} drafts</div>
                </div>
                <button className="btn btn-primary" onClick={() => open(null)}><Icon name="plus" size={14} /> New Post</button>
            </div>
            <div className="card">
                <div className="table-wrap">
                    <table>
                        <thead><tr><th>Title</th><th>Category</th><th>Views</th><th>Published</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {data.blogPosts.map(p => (
                                <tr key={p.id}>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <span style={{ fontWeight: 600, color: 'var(--white)', fontSize: 13 }}>{p.title}</span>
                                            {p.featured && <span className="badge badge-yellow" style={{ padding: '1px 7px' }}><Icon name="star" size={9} /> Featured</span>}
                                        </div>
                                    </td>
                                    <td><span className="badge badge-blue">{p.category}</span></td>
                                    <td><span style={{ fontWeight: 600, color: p.views > 5000 ? '#34d399' : 'var(--text-dim)' }}>{p.views.toLocaleString()}</span></td>
                                    <td><span className="text-muted text-sm">{p.date}</span></td>
                                    <td><span className={`badge ${statusBadge[p.status]}`}>{p.status}</span></td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => open(p)}><Icon name="edit" size={13} /></button>
                                            <button className="btn btn-danger btn-icon btn-sm" onClick={() => del(p.id)}><Icon name="trash" size={13} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <span className="modal-title">{editPost ? 'Edit Post' : 'New Blog Post'}</span>
                            <button className="modal-close" onClick={() => setShowModal(false)}><Icon name="close" size={14} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Post Title</label>
                                <input className="form-control" placeholder="Enter post title..." value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                            </div>
                            <div className="grid grid-2" style={{ gap: 14 }}>
                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <select className="form-control" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                        {['Tech', 'Design', 'News', 'Tutorial', 'Business'].map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Status</label>
                                    <select className="form-control" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--surface2)', borderRadius: 10, border: '1px solid var(--border)' }}>
                                <label className="toggle"><input type="checkbox" checked={!!form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} /><span className="toggle-slider" /></label>
                                <span style={{ fontSize: 13, fontWeight: 500 }}>Mark as Featured</span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={save}><Icon name="check" size={13} /> {editPost ? 'Save Changes' : 'Publish Post'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const NewsletterPage = ({ data }) => {
    const bySource = data.subscribers.reduce((acc, s) => { acc[s.source] = (acc[s.source] || 0) + 1; return acc; }, {});
    const export_csv = () => {
        const csv = ['Email,Source,Date', ...data.subscribers.map(s => `${s.email},${s.source},${s.date}`)].join('\n');
        const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'subscribers.csv'; a.click();
    };
    return (
        <div>
            <div className="page-header">
                <div>
                    <div className="breadcrumb"><span>Home</span><span className="sep">›</span><span className="current">Newsletter</span></div>
                    <div className="page-title">Subscribers</div>
                    <div className="page-subtitle">{data.subscribers.length} total subscribers</div>
                </div>
                <button className="btn btn-primary" onClick={export_csv}><Icon name="download" size={13} /> Export CSV</button>
            </div>
            <div className="grid grid-2" style={{ gap: 20, marginBottom: 20 }}>
                <div className="card">
                    <div className="card-header"><span className="card-title">By Source</span></div>
                    <div className="card-body">
                        {Object.entries(bySource).map(([src, count]) => (
                            <div key={src} style={{ marginBottom: 12 }}>
                                <div className="flex items-center justify-between mb-1">
                                    <span style={{ fontSize: 13, fontWeight: 500 }}>{src}</span>
                                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{count} · {Math.round((count / data.subscribers.length) * 100)}%</span>
                                </div>
                                <div className="progress"><div className="progress-bar" style={{ width: `${(count / data.subscribers.length) * 100}%` }} /></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card">
                    <div className="card-header"><span className="card-title">Growth (This Week)</span></div>
                    <div className="card-body">
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, letterSpacing: -2 }}>+{data.subscribers.length}</div>
                        <div className="text-muted text-sm mb-4">new subscribers this week</div>
                        <MiniChart data={[3, 5, 2, 7, 4, 8, 6]} active={6} />
                        <div className="flex justify-between mt-2">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i} className="text-xs text-muted">{d}</span>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header"><span className="card-title">All Subscribers</span></div>
                <div className="table-wrap">
                    <table>
                        <thead><tr><th>Email</th><th>Source</th><th>Subscribed Date</th></tr></thead>
                        <tbody>
                            {data.subscribers.map(s => (
                                <tr key={s.id}>
                                    <td><span style={{ fontWeight: 500 }}>{s.email}</span></td>
                                    <td><span className="badge badge-blue">{s.source}</span></td>
                                    <td><span className="text-muted text-sm">{s.date}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const SettingsPage = ({ onLogout }) => {
    const [profile, setProfile] = useState({ name: 'Admin User', email: 'admin@example.com' });
    const [pass, setPass] = useState({ old: '', new: '', confirm: '' });
    const [saved, setSaved] = useState(false);
    const [tab, setTab] = useState('profile');

    const saveProfile = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    return (
        <div>
            <div className="page-header">
                <div>
                    <div className="breadcrumb"><span>Home</span><span className="sep">›</span><span className="current">Settings</span></div>
                    <div className="page-title">Settings</div>
                    <div className="page-subtitle">Manage your account and preferences</div>
                </div>
            </div>
            <div className="tabs mb-6">
                {[['profile', 'Profile'], ['security', 'Security'], ['notifications', 'Notifications'], ['appearance', 'Appearance']].map(([k, v]) => (
                    <div key={k} className={`tab${tab === k ? ' active' : ''}`} onClick={() => setTab(k)}>{v}</div>
                ))}
            </div>
            {tab === 'profile' && (
                <div className="grid grid-2" style={{ gap: 20 }}>
                    <div className="card">
                        <div className="card-header"><span className="card-title">Profile Information</span></div>
                        <div className="card-body">
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, boxShadow: '0 0 24px var(--blue-glow)' }}>AU</div>
                                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: '50%', background: 'var(--surface3)', border: '2px solid var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                        <Icon name="edit" size={11} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input className="form-control" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input className="form-control" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Role</label>
                                <input className="form-control" value="Administrator" disabled style={{ opacity: 0.5 }} />
                            </div>
                            <button className="btn btn-primary w-full" onClick={saveProfile}>
                                {saved ? <><Icon name="check" size={13} /> Saved!</> : 'Update Profile'}
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="card mb-4">
                            <div className="card-header"><span className="card-title">Account Status</span></div>
                            <div className="card-body">
                                {[['Account Type', 'Administrator'], ['Last Login', 'Today, 9:14 AM'], ['Two-Factor Auth', 'Disabled'], ['Sessions', '1 active']].map(([k, v]) => (
                                    <div key={k} className="flex items-center justify-between" style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                                        <span className="text-muted text-sm">{k}</span>
                                        <span style={{ fontSize: 13, fontWeight: 500 }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="btn btn-danger w-full" onClick={onLogout}><Icon name="logout" size={14} /> Sign Out</button>
                    </div>
                </div>
            )}
            {tab === 'security' && (
                <div style={{ maxWidth: 480 }}>
                    <div className="card">
                        <div className="card-header"><span className="card-title">Change Password</span></div>
                        <div className="card-body">
                            {['old', 'new', 'confirm'].map(k => (
                                <div key={k} className="form-group">
                                    <label className="form-label">{k === 'old' ? 'Current Password' : k === 'new' ? 'New Password' : 'Confirm New Password'}</label>
                                    <input type="password" className="form-control" value={pass[k]} onChange={e => setPass({ ...pass, [k]: e.target.value })} placeholder="••••••••" />
                                </div>
                            ))}
                            <button className="btn btn-primary w-full">Update Password</button>
                        </div>
                    </div>
                </div>
            )}
            {tab === 'notifications' && (
                <div style={{ maxWidth: 520 }}>
                    <div className="card">
                        <div className="card-header"><span className="card-title">Notification Preferences</span></div>
                        <div className="card-body">
                            {[['New Applications', true], ['Booking Confirmations', true], ['Unread Inquiries', false], ['Newsletter Signups', true], ['Team Updates', false]].map(([label, def]) => {
                                const [on, setOn] = useState(def);
                                return (
                                    <div key={label} className="flex items-center justify-between" style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                        <div>
                                            <div style={{ fontWeight: 500, fontSize: 13 }}>{label}</div>
                                            <div className="text-xs text-muted">Receive email notifications</div>
                                        </div>
                                        <label className="toggle"><input type="checkbox" checked={on} onChange={() => setOn(v => !v)} /><span className="toggle-slider" /></label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
            {tab === 'appearance' && (
                <div style={{ maxWidth: 480 }}>
                    <div className="card">
                        <div className="card-header"><span className="card-title">Theme & Display</span></div>
                        <div className="card-body">
                            <div className="form-group">
                                <label className="form-label">Accent Color</label>
                                <div className="flex gap-3 mt-2">
                                    {['#233dfe', '#7c3aed', '#059669', '#dc2626', '#d97706'].map(c => (
                                        <div key={c} style={{ width: 32, height: 32, borderRadius: '50%', background: c, cursor: 'pointer', border: c === '#233dfe' ? '3px solid var(--white)' : '3px solid transparent', boxShadow: c === '#233dfe' ? `0 0 12px ${c}` : 'none', transition: 'all 0.2s' }} />
                                    ))}
                                </div>
                            </div>
                            <div className="form-group mt-4">
                                <label className="form-label">Sidebar Width</label>
                                <input type="range" style={{ width: '100%', accentColor: 'var(--blue)' }} min="220" max="300" defaultValue="260" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ─── Login Page ────────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('admin@example.com');
    const [pass, setPass] = useState('admin123');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            if (email === 'admin@example.com' && pass === 'admin123') onLogin();
            else { setErr('Invalid credentials. Try admin@example.com / admin123'); setLoading(false); }
        }, 800);
    };

    return (
        <div className="login-page">
            <div className="bg-mesh" />
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                {[240, 400, 600].map((s, i) => (
                    <div key={i} className="login-ring" style={{ width: s, height: s, left: `calc(50% - ${s / 2}px)`, top: `calc(50% - ${s / 2}px)`, opacity: 0.08 + i * 0.03 }} />
                ))}
            </div>
            <div className="login-card">
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ width: 52, height: 52, background: 'var(--blue)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 0 28px var(--blue-glow)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22 }}>A</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>Welcome back</div>
                    <div className="text-muted text-sm mt-1">Sign in to your admin panel</div>
                </div>
                <form onSubmit={submit}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={pass} onChange={e => setPass(e.target.value)} required />
                    </div>
                    {err && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#f87171', marginBottom: 16 }}>{err}</div>}
                    <button type="submit" className="btn btn-primary w-full" style={{ height: 44, fontSize: 14, justifyContent: 'center' }} disabled={loading}>
                        {loading ? <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span> : 'Sign In'}
                    </button>
                </form>
                <div style={{ textAlign: 'center', marginTop: 20, padding: '12px', background: 'var(--surface2)', borderRadius: 10, border: '1px solid var(--border)' }}>
                    <div className="text-muted text-xs" style={{ letterSpacing: 0.3 }}>Demo credentials</div>
                    <div className="text-sm mt-1" style={{ fontFamily: 'monospace', color: 'var(--blue)' }}>admin@example.com / admin123</div>
                </div>
            </div>
        </div>
    );
};

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function AdminPanel() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [page, setPage] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showNotif, setShowNotif] = useState(false);
    const [data, setData] = useState(mockData);

    const notifications = [
        { text: 'Casey Williams applied for Senior React Developer', time: '2m ago' },
        { text: 'New inquiry from Chris Evans: Partnership Opportunity', time: '18m ago' },
        { text: 'GlobalFirm booking confirmed for Mar 28', time: '1h ago' },
        { text: 'Blog post reached 6,000 views', time: '3h ago' },
    ];

    const navItems = [
        { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', section: 'main' },
        { id: 'jobs', icon: 'jobs', label: 'Jobs', badge: data.jobs.filter(j => j.status === 'active').length, section: 'main' },
        { id: 'applications', icon: 'applications', label: 'Applications', badge: data.applications.filter(a => a.status === 'pending').length, section: 'main' },
        { id: 'team', icon: 'team', label: 'Team', section: 'main' },
        { id: 'bookings', icon: 'bookings', label: 'Bookings', badge: data.bookings.filter(b => b.status === 'pending').length, section: 'manage' },
        { id: 'inquiries', icon: 'inquiries', label: 'Inquiries', badge: data.inquiries.filter(i => !i.read).length, section: 'manage' },
        { id: 'blog', icon: 'blog', label: 'Blog', section: 'content' },
        { id: 'newsletter', icon: 'newsletter', label: 'Newsletter', section: 'content' },
        { id: 'settings', icon: 'settings', label: 'Settings', section: 'account' },
    ];

    const sections = [
        { id: 'main', label: 'Main' },
        { id: 'manage', label: 'Manage' },
        { id: 'content', label: 'Content' },
        { id: 'account', label: 'Account' },
    ];

    const renderPage = () => {
        switch (page) {
            case 'dashboard': return <Dashboard data={data} />;
            case 'jobs': return <JobsPage data={data} setData={setData} />;
            case 'applications': return <ApplicationsPage data={data} setData={setData} />;
            case 'team': return <TeamPage data={data} setData={setData} />;
            case 'bookings': return <BookingsPage data={data} setData={setData} />;
            case 'inquiries': return <InquiriesPage data={data} setData={setData} />;
            case 'blog': return <BlogPage data={data} setData={setData} />;
            case 'newsletter': return <NewsletterPage data={data} />;
            case 'settings': return <SettingsPage onLogout={() => setLoggedIn(false)} />;
            default: return <Dashboard data={data} />;
        }
    };

    if (!loggedIn) return (
        <>
            <style>{css}</style>
            <div className="bg-mesh" />
            <LoginPage onLogin={() => setLoggedIn(true)} />
        </>
    );

    return (
        <>
            <style>{css}</style>
            <div className="bg-mesh" />
            <div className="app">
                {/* Sidebar overlay (mobile) */}
                <div className={`sidebar-overlay${sidebarOpen ? ' show' : ''}`} onClick={() => setSidebarOpen(false)} />

                {/* Sidebar */}
                <div className={`sidebar${sidebarOpen ? ' open' : ''}`}>
                    <div className="sidebar-logo">
                        <div className="logo-icon">A</div>
                        <div className="logo-text">AdminPanel</div>
                        <div className="logo-badge">Pro</div>
                    </div>
                    {sections.map(sec => {
                        const items = navItems.filter(n => n.section === sec.id);
                        return (
                            <div key={sec.id} className="sidebar-section">
                                <div className="sidebar-section-label">{sec.label}</div>
                                {items.map(item => (
                                    <div key={item.id} className={`nav-item${page === item.id ? ' active' : ''}`}
                                        onClick={() => { setPage(item.id); setSidebarOpen(false); }}>
                                        <div className="nav-icon"><Icon name={item.icon} size={15} /></div>
                                        {item.label}
                                        {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                    <div className="sidebar-footer">
                        <div className="user-card" onClick={() => setPage('settings')}>
                            <div className="user-avatar">AU</div>
                            <div>
                                <div className="user-name">Admin User</div>
                                <div className="user-role">Super Admin</div>
                            </div>
                            <div className="user-dots">⋯</div>
                        </div>
                    </div>
                </div>

                {/* Main */}
                <div className="main">
                    {/* Topbar */}
                    <div className="topbar" style={{ position: 'relative' }}>
                        <button className="topbar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <Icon name="menu" size={16} />
                        </button>
                        <div className="topbar-search">
                            <span className="search-icon"><Icon name="search" size={13} /></span>
                            <input placeholder="Search anything..." />
                        </div>
                        <div className="topbar-actions">
                            <div className="topbar-btn" onClick={() => setShowNotif(!showNotif)}>
                                <Icon name="bell" size={15} />
                                <div className="notif-dot" />
                            </div>
                            <div className="topbar-btn"><Icon name="globe" size={15} /></div>
                            <div className="topbar-avatar" onClick={() => setPage('settings')}>AU</div>
                        </div>
                        {showNotif && (
                            <div className="notif-panel">
                                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontWeight: 700, fontSize: 13 }}>Notifications</span>
                                    <span className="badge badge-blue">{notifications.length} new</span>
                                </div>
                                {notifications.map((n, i) => (
                                    <div key={i} className="notif-item">
                                        <div className="notif-dot-indicator" />
                                        <div>
                                            <div className="notif-text">{n.text}</div>
                                            <div className="notif-time">{n.time}</div>
                                        </div>
                                    </div>
                                ))}
                                <div style={{ padding: '10px 16px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
                                    <span style={{ fontSize: 12, color: 'var(--blue)', cursor: 'pointer', fontWeight: 600 }}>View all notifications</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Page Content */}
                    <div className="page" onClick={() => showNotif && setShowNotif(false)}>
                        {renderPage()}
                    </div>
                </div>
            </div>
        </>
    );
}