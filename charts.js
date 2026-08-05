(function () {
  const app = window.NutriPro = window.NutriPro || {};

  app.keys = {
    users: "nutripro_users_v2",
    session: "nutripro_session_v2",
    cases: "nutripro_cases_v2",
    clients: "nutripro_clients",
    measurements: "nutripro_measurements",
    bloodValues: "nutripro_bloodValues",
    dietPlans: "nutripro_dietPlans",
    notes: "nutripro_notes",
    foodDatabase: "nutripro_foodDatabase",
    settings: "nutripro_settings",
    foodDb: "nutripro_fooddb_v2",
    foodDbVersion: "nutripro_fooddb_version_v2"
  };

  app.state = {
    currentUser: null,
    selectedCaseIndex: null,
    editingCaseIndex: null,
    editingCaseId: null,
    detailTab: "genel",
    foodDb: [],
    lastEnergyResult: null,
    toastTimer: null
  };

  app.$ = (id) => document.getElementById(id);

  app.readJson = function (key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };

  app.writeJson = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  };

  app.getUsers = () => app.readJson(app.keys.users, {});
  app.saveUsers = (users) => app.writeJson(app.keys.users, users);
  app.getSession = () => app.readJson(app.keys.session, null);
  app.setSession = (session) => app.writeJson(app.keys.session, session);
  app.clearSession = () => localStorage.removeItem(app.keys.session);

  app.escapeHtml = function (value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));
  };

  app.round = function (value, digits = 1) {
    const factor = 10 ** digits;
    return Math.round((Number(value) || 0) * factor) / factor;
  };

  app.setMessage = function (id, text, isError = false) {
    const el = app.$(id);
    if (!el) return;
    el.textContent = text || "";
    el.style.color = isError ? "var(--danger)" : "var(--muted)";
  };

  app.switchTab = function (tabName) {
    document.querySelectorAll(".tab").forEach((el) => el.classList.remove("active"));
    document.querySelectorAll(".tabs button[data-tab]").forEach((btn) => btn.classList.remove("active"));
    app.$(`tab-${tabName}`)?.classList.add("active");
    document.querySelector(`.tabs button[data-tab="${tabName}"]`)?.classList.add("active");
    document.body.classList.remove("sidebar-open");
    if (tabName === "besin") app.renderDietPlan?.();
    if (tabName === "dashboard") app.renderDashboard?.();
    document.dispatchEvent(new CustomEvent("nutripro:tab", { detail: tabName }));
  };

  app.ensureInitialUser = function () {
    const users = app.getUsers();
    if (!users.beyza) {
      users.beyza = { username: "beyza", password: "1234", clinicName: "NutriPro Demo", createdAt: new Date().toISOString() };
      app.saveUsers(users);
    }
  };

  app.showLogin = function () {
    app.$("appArea").hidden = true;
    document.body.classList.remove("logged-in", "sidebar-open");
    app.state.currentUser = null;
    app.state.selectedCaseIndex = null;
  };

  app.showApp = function (username) {
    const users = app.getUsers();
    app.state.currentUser = username;
    const session = app.getSession() || { username };
    const clinicName = session.clinicName || users[username]?.clinicName || "NutriPro çalışma alanı";
    app.state.selectedCaseIndex = Number.isInteger(session.selectedCaseIndex) ? session.selectedCaseIndex : null;
    app.$("appArea").hidden = false;
    document.body.classList.add("logged-in");
    app.$("greet").textContent = `Hoş geldin, ${username}`;
    app.$("subGreet").textContent = clinicName;
    if (app.$("activeUserPill")) app.$("activeUserPill").textContent = username;
    app.renderCases?.();
    app.renderCaseSelect?.();
    app.renderDashboard?.();
    app.renderBloodPanel?.();
    app.renderFoodSelect?.();
    app.renderDietPlan?.();
    app.switchTab("dashboard");
  };

  app.bindNavigation = function () {
    document.querySelectorAll(".tabs button[data-tab]").forEach((btn) => {
      btn.addEventListener("click", () => app.switchTab(btn.dataset.tab));
    });
    app.$("mobileMenuBtn")?.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-open");
    });
  };

  app.bindAuth = function () {
    app.$("loginBtn")?.addEventListener("click", () => {
      const username = app.$("username").value.trim();
      const password = app.$("password").value;
      const users = app.getUsers();
      if (!users[username] || users[username].password !== password) {
        app.setMessage("loginMsg", "Kullanıcı adı veya şifre hatalı.", true);
        return;
      }
      app.setSession({ username, selectedCaseIndex: null, clinicName: users[username].clinicName || "" });
      app.setMessage("loginMsg", "");
      app.showApp(username);
    });

    app.$("registerBtn")?.addEventListener("click", () => {
      const username = app.$("username").value.trim();
      const password = app.$("password").value;
      const clinicName = app.$("clinicName")?.value.trim() || "";
      if (!username || !password) {
        app.setMessage("loginMsg", "Kullanıcı adı ve şifre gir.", true);
        return;
      }
      const users = app.getUsers();
      if (users[username]) {
        app.setMessage("loginMsg", "Bu kullanıcı zaten var.", true);
        return;
      }
      users[username] = { username, password, clinicName, createdAt: new Date().toISOString() };
      app.saveUsers(users);
      app.setSession({ username, selectedCaseIndex: null, clinicName });
      app.setMessage("loginMsg", "");
      app.showApp(username);
    });

    app.$("logoutBtn")?.addEventListener("click", () => {
      app.clearSession();
      app.showLogin();
    });
  };

  app.init = async function () {
    app.ensureInitialUser();
    app.bindNavigation();
    app.bindAuth();
    app.initCases?.();
    await app.initFoodDb?.();
    app.initBlood?.();
    app.initDietPlan?.();
    app.initAutoPlan?.();
    app.initCharts?.();

    const session = app.getSession();
    const users = app.getUsers();
    if (session?.username && users[session.username]) {
      app.showApp(session.username);
    } else {
      app.showLogin();
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    app.init().catch((error) => {
      console.error(error);
      app.setMessage("loginMsg", "Uygulama başlatılırken hata oluştu.", true);
    });
  });
})();
