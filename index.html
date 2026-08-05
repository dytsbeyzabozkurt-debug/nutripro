(function () {
  const app = window.NutriPro = window.NutriPro || {};

  const emptyMealPlan = () => ({
    sabah: [],
    kusluk: [],
    ogle: [],
    ikindi: [],
    aksam: [],
    gece: []
  });

  const goalLabels = {
    kilo_verme: "Kilo verme",
    kilo_alma: "Kilo alma",
    kilo_koruma: "Kilo koruma",
    sporcu: "Sporcu beslenmesi",
    gebelik: "Gebelik",
    hastalik: "Hastalık yönetimi"
  };

  app.clinicalBloodTests = [
    { key: "glucose", label: "Açlık glukoz", unit: "mg/dL", low: 70, high: 100 },
    { key: "hba1c", label: "HbA1c", unit: "%", low: 4, high: 5.7 },
    { key: "totalCholesterol", label: "Total kolesterol", unit: "mg/dL", high: 200 },
    { key: "ldl", label: "LDL", unit: "mg/dL", high: 130 },
    { key: "hdl", label: "HDL", unit: "mg/dL", low: 40 },
    { key: "triglyceride", label: "Trigliserid", unit: "mg/dL", high: 150 },
    { key: "ferritin", label: "Ferritin", unit: "ng/mL", low: 30, high: 300 },
    { key: "b12", label: "B12", unit: "pg/mL", low: 300, high: 900 },
    { key: "vitaminD", label: "D vitamini", unit: "ng/mL", low: 30, high: 100 },
    { key: "tsh", label: "TSH", unit: "mIU/L", low: 0.4, high: 4.5 },
    { key: "alt", label: "ALT", unit: "U/L", high: 49 },
    { key: "ast", label: "AST", unit: "U/L", high: 34 },
    { key: "hemoglobin", label: "Hemoglobin", unit: "g/dL", low: 12, high: 17.5 },
    { key: "crp", label: "CRP", unit: "mg/L", high: 5 }
  ];

  function userCasesKey() {
    const username = app.state.currentUser || app.getSession()?.username || "guest";
    return `${app.keys.clients}_${username}`;
  }

  function legacyUserCasesKey() {
    const username = app.state.currentUser || app.getSession()?.username || "guest";
    return `${app.keys.cases}_${username}`;
  }

  app.migrateOldDataIfNeeded = function () {
    const newKey = userCasesKey();
    if (localStorage.getItem(newKey)) return;
    const legacyUser = app.readJson(legacyUserCasesKey(), null);
    if (Array.isArray(legacyUser)) {
      app.writeJson(newKey, legacyUser);
      return;
    }
    const legacyGlobal = app.readJson(app.keys.cases, null);
    if (Array.isArray(legacyGlobal)) app.writeJson(newKey, legacyGlobal);
  }

  app.loadData = function () {
    app.migrateOldDataIfNeeded();
    const userCases = app.readJson(userCasesKey(), null);
    if (Array.isArray(userCases)) return userCases.map(app.ensureCaseShape);
    const legacyCases = app.readJson(legacyUserCasesKey(), []);
    return Array.isArray(legacyCases) ? legacyCases.map(app.ensureCaseShape) : [];
  };

  app.saveData = function (clients) {
    const shaped = (clients || []).map(app.ensureCaseShape);
    app.writeJson(userCasesKey(), shaped);
    app.writeJson(`${app.keys.measurements}_${app.state.currentUser || "guest"}`, shaped.flatMap((client) => (client.measurements || []).map((item) => ({ clientId: client.id, clientName: client.name, ...item }))));
    app.writeJson(`${app.keys.bloodValues}_${app.state.currentUser || "guest"}`, shaped.flatMap((client) => (client.bloodHistory || []).map((item) => ({ clientId: client.id, clientName: client.name, ...item }))));
    app.writeJson(`${app.keys.dietPlans}_${app.state.currentUser || "guest"}`, shaped.flatMap((client) => (client.dietPlanHistory || []).map((item) => ({ clientId: client.id, clientName: client.name, ...item }))));
    app.writeJson(`${app.keys.notes}_${app.state.currentUser || "guest"}`, shaped.flatMap((client) => (client.noteHistory || []).map((item) => ({ clientId: client.id, clientName: client.name, ...item }))));
  };

  app.getCases = () => app.loadData();
  app.saveCases = (cases) => app.saveData(cases);

  app.ensureCaseShape = function (caseObj) {
    caseObj.id = caseObj.id || `case_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    caseObj.name = caseObj.name || "";
    caseObj.personal = caseObj.personal || {};
    caseObj.clinical = caseObj.clinical || {};
    caseObj.nutrition = caseObj.nutrition || {};
    caseObj.goal = caseObj.goal || {};

    caseObj.phone = caseObj.phone ?? caseObj.personal.phone ?? "";
    caseObj.email = caseObj.email ?? caseObj.personal.email ?? "";
    caseObj.job = caseObj.job ?? caseObj.personal.job ?? "";
    caseObj.reason = caseObj.reason ?? caseObj.clinical.reason ?? "";
    caseObj.goalType = caseObj.goalType ?? caseObj.goal.type ?? "";
    caseObj.followUpDate = caseObj.followUpDate || "";
    caseObj.notes = caseObj.notes || "";

    caseObj.personal = {
      phone: caseObj.phone,
      email: caseObj.email,
      job: caseObj.job,
      ...caseObj.personal
    };
    caseObj.clinical = { reason: caseObj.reason, ...caseObj.clinical };
    caseObj.goal = { type: caseObj.goalType, ...caseObj.goal };

    caseObj.mealPlan = caseObj.mealPlan || emptyMealPlan();
    Object.keys(emptyMealPlan()).forEach((key) => {
      caseObj.mealPlan[key] = caseObj.mealPlan[key] || [];
    });
    caseObj.energyHistory = caseObj.energyHistory || [];
    caseObj.dietPlanHistory = caseObj.dietPlanHistory || [];
    caseObj.measurements = caseObj.measurements || [];
    caseObj.bloodHistory = caseObj.bloodHistory || [];
    caseObj.noteHistory = caseObj.noteHistory || [];
    caseObj.water = caseObj.water || { target: "", taken: "" };
    caseObj.bloodValues = caseObj.bloodValues || {};
    caseObj.bloodAlerts = caseObj.bloodAlerts || [];
    caseObj.nutrientPriorities = caseObj.nutrientPriorities || [];
    return caseObj;
  };

  app.activeCase = function () {
    const cases = app.getCases();
    const idx = app.state.selectedCaseIndex;
    if (!Number.isInteger(idx) || !cases[idx]) return null;
    return { caseObj: app.ensureCaseShape(cases[idx]), cases, idx };
  };

  function value(id) {
    return app.$(id)?.value?.trim() || "";
  }

  function numberValue(id) {
    const raw = value(id);
    return raw === "" ? "" : Number(raw);
  }

  app.validateForm = function (client, existingIndex = null) {
    if (!client.name.trim()) return "Ad soyad alanı zorunlu.";
    const numericFields = [
      ["Yaş", client.age],
      ["Boy", client.height],
      ["Kilo", client.weight],
      ["Hedef kilo", client.goal?.weight]
    ];
    for (const [label, val] of numericFields) {
      if (val !== "" && (!Number.isFinite(Number(val)) || Number(val) < 0)) return `${label} negatif veya geçersiz olamaz.`;
    }
    const duplicate = app.getCases().some((item, idx) => {
      if (idx === existingIndex) return false;
      return app.foldTurkish(item.name) === app.foldTurkish(client.name);
    });
    if (duplicate) return "Aynı isimli danışan zaten kayıtlı.";
    return "";
  };

  function clientFromForm() {
    return app.ensureCaseShape({
      id: app.state.editingCaseId || `case_${Date.now()}`,
      name: value("p_name"),
      dob: value("p_dob"),
      sex: value("p_sex") || "k",
      age: numberValue("p_age"),
      height: numberValue("p_height"),
      weight: numberValue("p_weight"),
      phone: value("p_phone"),
      email: value("p_email"),
      job: value("p_job"),
      reason: value("p_reason"),
      goalType: value("p_goal_type"),
      personal: {
        phone: value("p_phone"),
        email: value("p_email"),
        job: value("p_job")
      },
      clinical: {
        reason: value("p_reason"),
        history: value("p_history"),
        meds: value("p_meds"),
        allergy: value("p_allergy"),
        pregnancy: value("p_pregnancy"),
        diagnoses: value("p_diagnoses"),
        family: value("p_family")
      },
      nutrition: {
        mealCount: numberValue("p_meal_count"),
        breakfast: value("p_breakfast"),
        nightEating: value("p_night_eating"),
        eatingOut: value("p_eating_out"),
        dislikes: value("p_dislikes"),
        avoid: value("p_avoid"),
        waterIntake: value("p_water_intake"),
        activity: value("p_activity")
      },
      goal: {
        weight: numberValue("p_goal_weight"),
        date: value("p_goal_date"),
        type: value("p_goal_type"),
        weekly: value("p_weekly_goal")
      },
      createdAt: new Date().toISOString()
    });
  }

  function setForm(client) {
    const map = {
      p_name: client.name,
      p_age: client.age,
      p_sex: client.sex,
      p_height: client.height,
      p_weight: client.weight,
      p_phone: client.personal?.phone || client.phone,
      p_email: client.personal?.email || client.email,
      p_job: client.personal?.job || client.job,
      p_dob: client.dob,
      p_reason: client.clinical?.reason || client.reason,
      p_history: client.clinical?.history,
      p_meds: client.clinical?.meds,
      p_allergy: client.clinical?.allergy,
      p_pregnancy: client.clinical?.pregnancy,
      p_diagnoses: client.clinical?.diagnoses,
      p_family: client.clinical?.family,
      p_meal_count: client.nutrition?.mealCount,
      p_breakfast: client.nutrition?.breakfast,
      p_night_eating: client.nutrition?.nightEating,
      p_eating_out: client.nutrition?.eatingOut,
      p_dislikes: client.nutrition?.dislikes,
      p_avoid: client.nutrition?.avoid,
      p_water_intake: client.nutrition?.waterIntake,
      p_activity: client.nutrition?.activity,
      p_goal_weight: client.goal?.weight,
      p_goal_date: client.goal?.date,
      p_goal_type: client.goal?.type || client.goalType,
      p_weekly_goal: client.goal?.weekly
    };
    Object.entries(map).forEach(([id, val]) => {
      const el = app.$(id);
      if (el) el.value = val ?? "";
    });
  }

  app.showToast = function (message, isError = false) {
    const toast = app.$("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.toggle("error", Boolean(isError));
    toast.hidden = false;
    clearTimeout(app.state.toastTimer);
    app.state.toastTimer = setTimeout(() => toast.hidden = true, 3200);
  };

  app.showConfirmModal = function (message) {
    return window.confirm(message);
  };

  app.addClient = function () {
    const cases = app.getCases();
    const editingIndex = Number.isInteger(app.state.editingCaseIndex) ? app.state.editingCaseIndex : null;
    const client = clientFromForm();
    if (editingIndex !== null && cases[editingIndex]) {
      const old = cases[editingIndex];
      Object.assign(client, {
        id: old.id,
        createdAt: old.createdAt,
        mealPlan: old.mealPlan,
        energyHistory: old.energyHistory,
        dietPlanHistory: old.dietPlanHistory,
        measurements: old.measurements,
        bloodHistory: old.bloodHistory,
        water: old.water,
        bloodValues: old.bloodValues,
        bloodAlerts: old.bloodAlerts,
        nutrientPriorities: old.nutrientPriorities,
        followUpDate: old.followUpDate,
        notes: old.notes
      });
    }
    const error = app.validateForm(client, editingIndex);
    if (error) {
      app.showToast(error, true);
      return;
    }
    if (editingIndex !== null && cases[editingIndex]) {
      cases[editingIndex] = app.ensureCaseShape(client);
      app.saveCases(cases);
      app.state.editingCaseIndex = null;
      app.state.editingCaseId = null;
      app.showToast("Danışan güncellendi.");
    } else {
      cases.push(app.ensureCaseShape(client));
      app.saveCases(cases);
      app.state.selectedCaseIndex = cases.length - 1;
      app.showToast("Danışan kaydedildi.");
    }
    app.$("personForm")?.reset();
    app.$("clientFormTitle").textContent = "Yeni Danışan";
    app.$("cancelEditClient").hidden = true;
    app.renderClients();
    app.renderCaseSelect();
    app.renderDashboard();
    app.openCase(app.state.selectedCaseIndex ?? cases.length - 1);
  };

  app.savePersonFromForm = app.addClient;

  app.updateClient = function (idx) {
    const cases = app.getCases();
    if (!cases[idx]) return;
    app.state.editingCaseIndex = idx;
    app.state.editingCaseId = cases[idx].id;
    setForm(app.ensureCaseShape(cases[idx]));
    app.$("clientFormTitle").textContent = "Danışan Düzenle";
    app.$("cancelEditClient").hidden = false;
    app.switchTab("ekle");
  };

  app.deleteClient = function (idx) {
    if (!app.showConfirmModal("Bu danışanı silmek istiyor musun?")) return;
    const cases = app.getCases();
    cases.splice(idx, 1);
    app.saveCases(cases);
    if (app.state.selectedCaseIndex === idx) app.state.selectedCaseIndex = null;
    else if (app.state.selectedCaseIndex > idx) app.state.selectedCaseIndex -= 1;
    const session = app.getSession() || { username: app.state.currentUser };
    session.selectedCaseIndex = app.state.selectedCaseIndex;
    app.setSession(session);
    app.renderClients();
    app.renderCaseSelect();
    app.renderDashboard();
    app.renderDietPlan?.();
    app.showToast("Danışan silindi.");
  };

  app.deleteCase = app.deleteClient;

  app.renderClients = function () {
    const cases = app.getCases().map(app.ensureCaseShape);
    app.saveCases(cases);
    const search = app.foldTurkish(value("clientSearch"));
    const filter = value("goalFilter");
    const filtered = cases
      .map((item, idx) => ({ item, idx }))
      .filter(({ item }) => {
        const haystack = app.foldTurkish([
          item.name,
          item.phone,
          item.email,
          item.goal?.type,
          goalLabels[item.goal?.type]
        ].join(" "));
        const goalOk = !filter || item.goal?.type === filter || item.goalType === filter;
        return goalOk && (!search || haystack.includes(search));
      });

    if (app.$("caseCount")) app.$("caseCount").textContent = cases.length;
    const list = app.$("casesList");
    if (!list) return;
    if (!filtered.length) {
      list.innerHTML = '<div class="empty-state">Kayıt bulunamadı. Filtreleri değiştir veya yeni danışan ekle.</div>';
      return;
    }
    list.innerHTML = filtered.map(({ item, idx }) => `
      <article class="case-card">
        <h3>${app.escapeHtml(item.name)}</h3>
        <dl>
          <dt>Yaş</dt><dd>${app.escapeHtml(item.age || "-")}</dd>
          <dt>Boy</dt><dd>${app.escapeHtml(item.height || "-")} cm</dd>
          <dt>Kilo</dt><dd>${app.escapeHtml(item.weight || "-")} kg</dd>
          <dt>Hedef</dt><dd>${app.escapeHtml(goalLabels[item.goal?.type || item.goalType] || "-")}</dd>
          <dt>Telefon</dt><dd>${app.escapeHtml(item.phone || "-")}</dd>
          <dt>Takip</dt><dd>${app.escapeHtml(item.followUpDate || "-")}</dd>
        </dl>
        <div class="button-row">
          <button class="btn" data-detail-client="${idx}">Detay</button>
          <button class="btn secondary" data-open-case="${idx}">Diyet</button>
          <button class="btn secondary" data-edit-client="${idx}">Düzenle</button>
          <button class="btn secondary danger" data-delete-case="${idx}">Sil</button>
        </div>
      </article>
    `).join("");

    list.querySelectorAll("[data-open-case]").forEach((btn) => {
      btn.addEventListener("click", () => app.openCase(Number(btn.dataset.openCase)));
    });
    list.querySelectorAll("[data-detail-client]").forEach((btn) => {
      btn.addEventListener("click", () => app.openClientDetail(Number(btn.dataset.detailClient)));
    });
    list.querySelectorAll("[data-edit-client]").forEach((btn) => {
      btn.addEventListener("click", () => app.updateClient(Number(btn.dataset.editClient)));
    });
    list.querySelectorAll("[data-delete-case]").forEach((btn) => {
      btn.addEventListener("click", () => app.deleteClient(Number(btn.dataset.deleteCase)));
    });
  };

  app.renderCases = app.renderClients;

  function fillCaseSelect(select, cases) {
    if (!select) return;
    if (!cases.length) {
      select.innerHTML = '<option value="">Danışan yok</option>';
      select.disabled = true;
      return;
    }
    select.disabled = false;
    select.innerHTML = cases.map((item, idx) => `<option value="${idx}">${app.escapeHtml(item.name)}</option>`).join("");
    if (Number.isInteger(app.state.selectedCaseIndex) && cases[app.state.selectedCaseIndex]) {
      select.value = String(app.state.selectedCaseIndex);
    }
  }

  app.renderCaseSelect = function () {
    const cases = app.getCases();
    fillCaseSelect(app.$("calc_case_select"), cases);
    fillCaseSelect(app.$("diet_case_select"), cases);
  };

  app.openCase = function (idx) {
    const cases = app.getCases();
    if (!cases[idx]) return;
    app.state.selectedCaseIndex = idx;
    const session = app.getSession() || { username: app.state.currentUser };
    session.selectedCaseIndex = idx;
    app.setSession(session);
    if (app.$("selectedCaseName")) app.$("selectedCaseName").textContent = cases[idx].name;
    if (app.$("bloodCaseName")) app.$("bloodCaseName").textContent = cases[idx].name;
    app.renderCaseSelect();
    app.renderBloodPanel?.();
    app.loadWaterForCase?.();
    app.renderDietPlan?.();
    app.switchTab("besin");
  };

  function statusForBlood(test, value) {
    if (!Number.isFinite(Number(value))) return { status: "invalid", text: "Değer sayı olmalı." };
    const number = Number(value);
    if (test.low !== undefined && number < test.low) {
      return { status: "low", text: "Referans aralığının altında görünüyor. Klinik tablo ile birlikte değerlendirilmelidir. Bu yorum tanı amacı taşımaz." };
    }
    if (test.high !== undefined && number > test.high) {
      return { status: "high", text: "Referans aralığının üzerinde görünüyor. Uzman değerlendirmesi önerilir. Bu yorum tanı amacı taşımaz." };
    }
    return { status: "normal", text: "Referans aralığında görünüyor. Bu yorum tanı amacı taşımaz." };
  }

  app.openClientDetail = function (idx, detailTab = "genel") {
    const cases = app.getCases();
    if (!cases[idx]) return;
    app.state.selectedCaseIndex = idx;
    app.state.detailTab = detailTab;
    app.setSession({ username: app.state.currentUser, selectedCaseIndex: idx });
    app.renderClientDetail();
    app.switchTab("detay");
  };

  app.renderClientDetail = function () {
    const active = app.activeCase();
    const content = app.$("clientDetailContent");
    if (!content || !active) {
      if (content) content.innerHTML = '<div class="empty-state">Detay için önce danışan seç.</div>';
      return;
    }
    const client = active.caseObj;
    app.$("detailClientName").textContent = client.name;
    app.$("detailClientMeta").textContent = `${client.age || "-"} yaş · ${client.height || "-"} cm · ${client.weight || "-"} kg`;
    app.$("detailTabs").querySelectorAll("button").forEach((button) => {
      button.classList.toggle("active", button.dataset.detailTab === app.state.detailTab);
    });
    const tab = app.state.detailTab || "genel";
    if (tab === "olcum") content.innerHTML = measurementTemplate(client);
    else if (tab === "kan") content.innerHTML = bloodTemplate(client);
    else if (tab === "plan") content.innerHTML = planTemplate(client);
    else if (tab === "notlar") content.innerHTML = notesTemplate(client);
    else if (tab === "takip") content.innerHTML = followTemplate(client);
    else content.innerHTML = generalTemplate(client);
    bindDetailActions();
    if (tab === "olcum") app.renderMeasurements();
    if (tab === "kan") app.renderBloodValues();
    if (tab === "plan") app.renderDietPlans?.();
    if (tab === "notlar") app.renderNotes?.();
  };

  function generalTemplate(client) {
    return `
      <div class="detail-grid">
        <section class="panel">
          <h2>Kişisel Bilgiler</h2>
          <dl class="info-list">
            <dt>Ad soyad</dt><dd>${app.escapeHtml(client.name || "-")}</dd>
            <dt>Telefon</dt><dd>${app.escapeHtml(client.phone || "-")}</dd>
            <dt>E-posta</dt><dd>${app.escapeHtml(client.email || "-")}</dd>
            <dt>Meslek</dt><dd>${app.escapeHtml(client.job || "-")}</dd>
            <dt>Cinsiyet</dt><dd>${client.sex === "e" ? "Erkek" : client.sex === "k" ? "Kadın" : "Belirtilmedi"}</dd>
          </dl>
        </section>
        <section class="panel">
          <h2>Klinik & Hedef</h2>
          <dl class="info-list">
            <dt>Başvuru</dt><dd>${app.escapeHtml(client.clinical?.reason || "-")}</dd>
            <dt>Tanılar</dt><dd>${app.escapeHtml(client.clinical?.diagnoses || "-")}</dd>
            <dt>Alerji</dt><dd>${app.escapeHtml(client.clinical?.allergy || "-")}</dd>
            <dt>Hedef türü</dt><dd>${app.escapeHtml(goalLabels[client.goal?.type] || "-")}</dd>
            <dt>Hedef kilo</dt><dd>${app.escapeHtml(client.goal?.weight || "-")}</dd>
          </dl>
        </section>
      </div>
    `;
  }

  function measurementTemplate() {
    return `
      <section class="panel">
        <h2>Ölçüm Ekle</h2>
        <div class="form-grid">
          <label>Tarih<input id="m_date" type="date" value="${new Date().toISOString().slice(0, 10)}" /></label>
          <label>Kilo<input id="m_weight" type="number" min="0" step="0.1" /></label>
          <label>Bel çevresi<input id="m_waist" type="number" min="0" step="0.1" /></label>
          <label>Kalça çevresi<input id="m_hip" type="number" min="0" step="0.1" /></label>
          <label>Boyun çevresi<input id="m_neck" type="number" min="0" step="0.1" /></label>
          <label>Vücut yağ oranı<input id="m_fat" type="number" min="0" step="0.1" /></label>
          <label>Kas oranı<input id="m_muscle" type="number" min="0" step="0.1" /></label>
          <label>Not<input id="m_note" /></label>
        </div>
        <button class="btn" id="addMeasurementBtn">Ölçüm Ekle</button>
      </section>
      <section class="panel">
        <h2>Ölçüm Geçmişi</h2>
        <div id="measurementsTable"></div>
        <div class="chart-row">
          <div class="chart-box"><h2>Kilo değişimi</h2><canvas id="weightChart" width="420" height="180"></canvas></div>
          <div class="chart-box"><h2>Bel çevresi değişimi</h2><canvas id="waistChart" width="420" height="180"></canvas></div>
        </div>
      </section>
    `;
  }

  function bloodTemplate() {
    return `
      <section class="panel">
        <h2>Kan Değeri Ekle</h2>
        <div class="form-grid">
          <label>Test
            <select id="bv_key">
              ${app.clinicalBloodTests.map((test) => `<option value="${test.key}">${test.label}</option>`).join("")}
            </select>
          </label>
          <label>Değer<input id="bv_value" type="number" step="0.01" /></label>
          <label>Birim<input id="bv_unit" placeholder="mg/dL, ng/mL..." /></label>
          <label>Tarih<input id="bv_date" type="date" value="${new Date().toISOString().slice(0, 10)}" /></label>
          <label>Not<input id="bv_note" /></label>
        </div>
        <button class="btn" id="addBloodValueBtn">Kan Değeri Ekle</button>
        <p class="hint">Referans kontrolü tanı koymaz; uzman değerlendirmesi gerekir.</p>
      </section>
      <section class="panel">
        <h2>Kan Değeri Geçmişi</h2>
        <div id="bloodHistoryTable"></div>
      </section>
    `;
  }

  function planTemplate(client) {
    const count = Object.values(client.mealPlan || {}).reduce((sum, list) => sum + (list?.length || 0), 0);
    return `
      <section class="panel">
        <h2>Diyet Planı Geçmişi</h2>
        <p class="hint">Güncel planda ${count} besin kaydı var. Planı düzenlemek için Diyet Planı ekranını kullan.</p>
        <button class="btn" data-open-case="${app.state.selectedCaseIndex}">Diyet Planına Git</button>
        <div class="divider"></div>
        <div id="dietPlanHistory"></div>
      </section>
    `;
  }

  function notesTemplate(client) {
    return `
      <section class="panel">
        <h2>Görüşme Notu Ekle</h2>
        <div class="form-grid two">
          <label>Tarih<input id="noteDate" type="date" value="${new Date().toISOString().slice(0, 10)}" /></label>
          <label>Diyete uyum durumu
            <select id="noteCompliance">
              <option value="">Seç</option>
              <option value="iyi">İyi</option>
              <option value="orta">Orta</option>
              <option value="zorlanıyor">Zorlanıyor</option>
            </select>
          </label>
          <label>Bir sonraki takip tarihi<input id="noteFollowUp" type="date" value="${app.escapeHtml(client.followUpDate || "")}" /></label>
          <label>Şikayetler
            <div class="checkbox-grid">
              ${["Kabızlık", "Şişkinlik", "Reflü", "Halsizlik", "Uyku problemi", "Tatlı isteği"].map((item) => `<label><input type="checkbox" name="noteSymptoms" value="${item}" /> ${item}</label>`).join("")}
            </div>
          </label>
        </div>
        <label>Görüşme notu<textarea id="detailNotes">${app.escapeHtml(client.notes || "")}</textarea></label>
        <button class="btn" id="saveDetailNotesBtn">Notu Kaydet</button>
      </section>
      <section class="panel">
        <h2>Not Geçmişi</h2>
        <div id="notesHistory"></div>
      </section>
    `;
  }

  function followTemplate(client) {
    return `
      <section class="panel">
        <h2>Takip Tarihi</h2>
        <div class="form-grid two">
          <label>Takip tarihi<input id="followUpDate" type="date" value="${app.escapeHtml(client.followUpDate || "")}" /></label>
          <label>Kısa not<input id="followUpNote" value="${app.escapeHtml(client.followUpNote || "")}" /></label>
        </div>
        <div class="button-row">
          <button class="btn" id="saveFollowBtn">Takibi Kaydet</button>
          <button class="btn secondary" id="detailReportBtn">Rapor Oluştur</button>
        </div>
      </section>
    `;
  }

  function bindDetailActions() {
    app.$("addMeasurementBtn")?.addEventListener("click", app.addMeasurement);
    app.$("addBloodValueBtn")?.addEventListener("click", app.addBloodValue);
    app.$("saveDetailNotesBtn")?.addEventListener("click", app.addNote);
    app.$("saveFollowBtn")?.addEventListener("click", () => {
      const active = app.activeCase();
      if (!active) return;
      active.caseObj.followUpDate = value("followUpDate");
      active.caseObj.followUpNote = value("followUpNote");
      app.saveCases(active.cases);
      app.renderDashboard();
      app.showToast("Takip tarihi kaydedildi.");
    });
    app.$("detailReportBtn")?.addEventListener("click", () => {
      app.generateReport();
      app.switchTab("raporlar");
    });
    document.querySelectorAll("[data-open-case]").forEach((btn) => {
      btn.addEventListener("click", () => app.openCase(Number(btn.dataset.openCase)));
    });
  }

  app.addNote = function () {
    const active = app.activeCase();
    if (!active) return;
    const noteText = value("detailNotes");
    if (!noteText) {
      app.showToast("Görüşme notu boş olamaz.", true);
      return;
    }
    const symptoms = Array.from(document.querySelectorAll('input[name="noteSymptoms"]:checked')).map((item) => item.value);
    const note = {
      id: `note_${Date.now()}`,
      date: value("noteDate") || new Date().toISOString().slice(0, 10),
      text: noteText,
      compliance: value("noteCompliance"),
      symptoms,
      followUpDate: value("noteFollowUp")
    };
    active.caseObj.notes = noteText;
    active.caseObj.noteHistory = active.caseObj.noteHistory || [];
    active.caseObj.noteHistory.push(note);
    if (note.followUpDate) active.caseObj.followUpDate = note.followUpDate;
    app.saveCases(active.cases);
    app.renderNotes();
    app.renderDashboard();
    app.showToast("Görüşme notu kaydedildi.");
  };

  app.renderNotes = function () {
    const active = app.activeCase();
    const target = app.$("notesHistory");
    if (!active || !target) return;
    const notes = [...(active.caseObj.noteHistory || [])].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    target.innerHTML = notes.length ? `
      <div class="table-wrap"><table>
        <thead><tr><th>Tarih</th><th>Uyum</th><th>Şikayetler</th><th>Takip</th><th>Not</th></tr></thead>
        <tbody>${notes.map((note) => `<tr><td>${app.escapeHtml(note.date)}</td><td>${app.escapeHtml(note.compliance || "-")}</td><td>${app.escapeHtml((note.symptoms || []).join(", ") || "-")}</td><td>${app.escapeHtml(note.followUpDate || "-")}</td><td>${app.escapeHtml(note.text)}</td></tr>`).join("")}</tbody>
      </table></div>
    ` : '<div class="empty-state">Henüz görüşme notu yok.</div>';
  };

  app.addMeasurement = function () {
    const active = app.activeCase();
    if (!active) return;
    const measurement = {
      id: `m_${Date.now()}`,
      date: value("m_date") || new Date().toISOString().slice(0, 10),
      weight: numberValue("m_weight"),
      waist: numberValue("m_waist"),
      hip: numberValue("m_hip"),
      neck: numberValue("m_neck"),
      fat: numberValue("m_fat"),
      muscle: numberValue("m_muscle"),
      note: value("m_note")
    };
    if ([measurement.weight, measurement.waist, measurement.hip, measurement.neck, measurement.fat, measurement.muscle].some((v) => v !== "" && (!Number.isFinite(v) || v < 0))) {
      app.showToast("Ölçüm değerleri negatif veya geçersiz olamaz.", true);
      return;
    }
    active.caseObj.measurements.push(measurement);
    app.saveCases(active.cases);
    app.renderMeasurements();
    app.showToast("Ölçüm eklendi.");
  };

  app.renderMeasurements = function () {
    const active = app.activeCase();
    const target = app.$("measurementsTable");
    if (!active || !target) return;
    const items = [...active.caseObj.measurements].sort((a, b) => (a.date || "").localeCompare(b.date || ""));
    target.innerHTML = items.length ? `
      <div class="table-wrap"><table>
        <thead><tr><th>Tarih</th><th>Kilo</th><th>Bel</th><th>Kalça</th><th>Boyun</th><th>Yağ %</th><th>Kas %</th><th>Not</th></tr></thead>
        <tbody>${items.map((m) => `<tr><td>${app.escapeHtml(m.date)}</td><td>${app.escapeHtml(m.weight || "-")}</td><td>${app.escapeHtml(m.waist || "-")}</td><td>${app.escapeHtml(m.hip || "-")}</td><td>${app.escapeHtml(m.neck || "-")}</td><td>${app.escapeHtml(m.fat || "-")}</td><td>${app.escapeHtml(m.muscle || "-")}</td><td>${app.escapeHtml(m.note || "-")}</td></tr>`).join("")}</tbody>
      </table></div>
    ` : '<div class="empty-state">Henüz ölçüm yok.</div>';
    drawLineChart(app.$("weightChart"), items, "weight");
    drawLineChart(app.$("waistChart"), items, "waist");
  };

  function drawLineChart(canvas, items, field) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const data = items.filter((item) => Number.isFinite(Number(item[field]))).map((item) => Number(item[field]));
    if (data.length < 2) {
      ctx.fillStyle = "#667085";
      ctx.font = "13px sans-serif";
      ctx.fillText("Grafik için en az iki kayıt gerekli.", 20, 90);
      return;
    }
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    ctx.strokeStyle = "#dfe7ee";
    ctx.beginPath();
    ctx.moveTo(28, 12);
    ctx.lineTo(28, 152);
    ctx.lineTo(400, 152);
    ctx.stroke();
    ctx.strokeStyle = "#178ca4";
    ctx.lineWidth = 3;
    ctx.beginPath();
    data.forEach((value, idx) => {
      const x = 32 + (idx * 360) / (data.length - 1);
      const y = 148 - ((value - min) / range) * 120;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  app.addBloodValue = function () {
    const active = app.activeCase();
    if (!active) return;
    const test = app.clinicalBloodTests.find((item) => item.key === value("bv_key"));
    const rawValue = numberValue("bv_value");
    if (!test || rawValue === "" || !Number.isFinite(rawValue)) {
      app.showToast("Kan değeri sayı olmalı.", true);
      return;
    }
    const evaluated = statusForBlood(test, rawValue);
    const record = {
      id: `bv_${Date.now()}`,
      key: test.key,
      label: test.label,
      value: rawValue,
      unit: value("bv_unit") || test.unit,
      date: value("bv_date") || new Date().toISOString().slice(0, 10),
      note: value("bv_note"),
      status: evaluated.status,
      comment: evaluated.text
    };
    active.caseObj.bloodHistory.push(record);
    app.saveCases(active.cases);
    app.renderBloodValues();
    app.showToast("Kan değeri eklendi.");
  };

  app.renderBloodValues = function () {
    const active = app.activeCase();
    const target = app.$("bloodHistoryTable");
    if (!active || !target) return;
    const items = [...active.caseObj.bloodHistory].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    target.innerHTML = items.length ? `
      <div class="table-wrap"><table>
        <thead><tr><th>Tarih</th><th>Test</th><th>Değer</th><th>Birim</th><th>Durum</th><th>Not / güvenli yorum</th></tr></thead>
        <tbody>${items.map((item) => `<tr><td>${app.escapeHtml(item.date)}</td><td>${app.escapeHtml(item.label)}</td><td>${app.escapeHtml(item.value)}</td><td>${app.escapeHtml(item.unit)}</td><td class="status-${item.status}">${item.status === "high" ? "Üzerinde" : item.status === "low" ? "Altında" : "Aralıkta"}</td><td>${app.escapeHtml(item.note || item.comment)}</td></tr>`).join("")}</tbody>
      </table></div>
    ` : '<div class="empty-state">Henüz kan değeri geçmişi yok.</div>';
  };

  app.renderDashboard = function () {
    const cases = app.getCases().map(app.ensureCaseShape);
    const today = new Date().toISOString().slice(0, 10);
    const week = new Date();
    week.setDate(week.getDate() + 7);
    const weekEnd = week.toISOString().slice(0, 10);
    const followItems = cases
      .filter((item) => item.followUpDate && item.followUpDate >= today && item.followUpDate <= weekEnd)
      .sort((a, b) => (a.followUpDate || "").localeCompare(b.followUpDate || ""));
    const activeFollow = cases.filter((item) => item.followUpDate && item.followUpDate >= today).length;
    const followDue = followItems.length;
    const dietPlans = cases.reduce((sum, item) => sum + (item.dietPlanHistory?.length || (Object.values(item.mealPlan || {}).some((list) => list.length) ? 1 : 0)), 0);
    const missingBlood = cases.filter((item) => !item.bloodHistory?.length && !Object.keys(item.bloodValues || {}).length).length;
    const stats = [
      ["Toplam danışan", cases.length],
      ["Aktif takip", activeFollow],
      ["Bu hafta takip", followDue],
      ["Hazırlanan plan", dietPlans],
      ["Eksik kan değeri", missingBlood]
    ];
    if (app.$("dashboardStats")) {
      app.$("dashboardStats").innerHTML = stats.map(([label, value]) => `<article class="stat-card"><span>${label}</span><strong>${value}</strong></article>`).join("");
    }
    if (app.$("recentClients")) {
      const recent = [...cases].sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || "")).slice(0, 5);
      app.$("recentClients").innerHTML = recent.length ? `<div class="recent-list">${recent.map((item) => `<div class="recent-item"><strong>${app.escapeHtml(item.name)}</strong><span>${app.escapeHtml(goalLabels[item.goal?.type] || "Hedef yok")}</span></div>`).join("")}</div>` : '<div class="empty-state">Henüz danışan yok.</div>';
    }
    app.renderFollowUps();
    const notesKey = `${app.keys.session}_today_notes_${app.state.currentUser || "guest"}_${today}`;
    if (app.$("todayNotes") && !app.$("todayNotes").value) app.$("todayNotes").value = localStorage.getItem(notesKey) || "";
    if (app.$("settingsUser")) app.$("settingsUser").textContent = app.state.currentUser || "-";
    if (app.$("foodDbCount")) app.$("foodDbCount").textContent = app.state.foodDb?.length || 0;
    if (app.$("foodDbStatus")) app.$("foodDbStatus").textContent = app.state.foodDb?.length ? "Hazır" : "Yükleniyor";
  };

  app.renderFollowUps = function () {
    const target = app.$("followUpList");
    if (!target) return;
    const today = new Date().toISOString().slice(0, 10);
    const week = new Date();
    week.setDate(week.getDate() + 7);
    const weekEnd = week.toISOString().slice(0, 10);
    const items = app.getCases()
      .filter((item) => item.followUpDate && item.followUpDate >= today && item.followUpDate <= weekEnd)
      .sort((a, b) => (a.followUpDate || "").localeCompare(b.followUpDate || ""));
    target.innerHTML = items.length ? `<div class="recent-list">${items.map((item) => `<div class="recent-item"><strong>${app.escapeHtml(item.name)}</strong><span>${app.escapeHtml(item.followUpDate)} ${app.escapeHtml(item.followUpNote || "")}</span></div>`).join("")}</div>` : '<div class="empty-state">Bu hafta yaklaşan takip yok.</div>';
  };

  app.generateReport = function () {
    const active = app.activeCase();
    if (!active) {
      app.showToast("Rapor için önce danışan seç.", true);
      return;
    }
    const c = active.caseObj;
    const session = app.getSession() || {};
    const lastEnergy = c.energyHistory?.[c.energyHistory.length - 1]?.result || {};
    const targets = app.getEnergyTargets?.(c) || {};
    const totals = app.calculateDailyTotals?.(c.mealPlan) || {};
    const lastMeasurement = c.measurements?.[c.measurements.length - 1] || {};
    const importantBlood = (c.bloodHistory || []).filter((item) => item.status === "high" || item.status === "low").slice(-6);
    const meals = app.meals.map(([key, label]) => {
      const rows = (c.mealPlan?.[key] || []).map((item) => `<li>${app.escapeHtml(item.name)} - ${app.round(item.grams, 0)} g (${app.round(item.kcal, 0)} kcal)</li>`).join("");
      return `<section><h3>${label}</h3><ul>${rows || "<li>Besin eklenmedi.</li>"}</ul></section>`;
    }).join("");
    const report = `
      <article class="report-document">
        <header>
          <h1>NutriPro Danışan Planı</h1>
          <p><strong>Klinik/Diyetisyen:</strong> ${app.escapeHtml(session.clinicName || "NutriPro Klinik")}</p>
          <p><strong>Danışan:</strong> ${app.escapeHtml(c.name)} · <strong>Tarih:</strong> ${new Date().toLocaleDateString("tr-TR")}</p>
        </header>
        <section class="report-grid">
          <div><strong>Hedef</strong><span>${app.escapeHtml(goalLabels[c.goal?.type] || c.goalType || "-")}</span></div>
          <div><strong>Günlük enerji</strong><span>${app.round(targets.energyTarget || lastEnergy.targetEnergy || 0, 0)} kcal</span></div>
          <div><strong>BMR</strong><span>${app.escapeHtml(lastEnergy.bmr || "-")} kcal</span></div>
          <div><strong>TDEE</strong><span>${app.escapeHtml(lastEnergy.tdee || "-")} kcal</span></div>
          <div><strong>BKİ</strong><span>${app.escapeHtml(lastEnergy.bmi?.bmi || "-")} ${app.escapeHtml(lastEnergy.bmi?.category || "")}</span></div>
          <div><strong>Su hedefi</strong><span>${app.escapeHtml(targets.waterTarget?.low || "-")} - ${app.escapeHtml(targets.waterTarget?.high || "-")} ml</span></div>
        </section>
        <section>
          <h2>Makro Hedefler ve Günlük Toplam</h2>
          <p>Protein: ${app.round(totals.protein, 1)} / ${app.round(targets.proteinTarget, 1)} g · Karbonhidrat: ${app.round(totals.carb, 1)} / ${app.round(targets.carbTarget, 1)} g · Yağ: ${app.round(totals.fat, 1)} / ${app.round(targets.fatTarget, 1)} g · Lif: ${app.round(totals.fiber, 1)} / ${app.round(targets.fiberTarget, 1)} g</p>
        </section>
        <section>
          <h2>Öğün Planı</h2>
          ${meals}
        </section>
        <section>
          <h2>Değişim Önerileri</h2>
          <ul>${(app.exchangeSuggestions || []).map((item) => `<li>${app.escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        <section>
          <h2>Diyetisyen Notu</h2>
          <p>${app.escapeHtml(c.dietPlanHistory?.[c.dietPlanHistory.length - 1]?.note || c.notes || "-")}</p>
        </section>
        <section>
          <h2>Son Ölçümler</h2>
          <p>Tarih: ${app.escapeHtml(lastMeasurement.date || "-")} · Kilo: ${app.escapeHtml(lastMeasurement.weight || "-")} · Bel: ${app.escapeHtml(lastMeasurement.waist || "-")} · Kalça: ${app.escapeHtml(lastMeasurement.hip || "-")}</p>
        </section>
        <section>
          <h2>Önemli Kan Değeri Uyarıları</h2>
          <ul>${importantBlood.length ? importantBlood.map((item) => `<li>${app.escapeHtml(item.label)}: ${app.escapeHtml(item.value)} ${app.escapeHtml(item.unit)} - ${app.escapeHtml(item.comment || "")}</li>`).join("") : "<li>Kayıtlı önemli uyarı yok.</li>"}</ul>
        </section>
        <footer>
          Bu plan bireysel değerlendirme için hazırlanmıştır. Tıbbi tanı veya tedavi yerine geçmez. Klinik kararlar uzman değerlendirmesiyle verilmelidir.
        </footer>
      </article>
    `;
    if (app.$("reportOutput")) app.$("reportOutput").innerHTML = report;
    app.showToast("Rapor oluşturuldu.");
  };

  app.printReport = function () {
    if (!app.$("reportOutput")?.innerHTML.trim()) app.generateReport();
    window.print();
  };

  app.exportData = function () {
    const username = app.state.currentUser || "guest";
    const data = {
      version: 3,
      exportedAt: new Date().toISOString(),
      username,
      clients: app.getCases(),
      measurements: app.readJson(`${app.keys.measurements}_${username}`, []),
      bloodValues: app.readJson(`${app.keys.bloodValues}_${username}`, []),
      dietPlans: app.readJson(`${app.keys.dietPlans}_${username}`, []),
      notes: app.readJson(`${app.keys.notes}_${username}`, []),
      settings: app.readJson(`${app.keys.settings}_${username}`, {}),
      foodDatabase: app.state.foodDb || []
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nutripro-yedek-${username}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    app.showToast("JSON yedeği indirildi.");
  };

  app.validateImportJSON = function (data) {
    if (!data || typeof data !== "object") return "JSON dosyası okunamadı.";
    if (!Array.isArray(data.clients)) return "JSON içinde clients/danışanlar listesi bulunamadı.";
    if (data.clients.some((client) => !client.name)) return "Bazı danışanlarda ad soyad eksik.";
    return "";
  };

  app.importData = async function (file) {
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const error = app.validateImportJSON(data);
      if (error) {
        app.showToast(error, true);
        return;
      }
      if (!app.showConfirmModal("JSON yedeği içe aktarılacak ve mevcut danışan verileri değiştirilecek. Devam edilsin mi?")) return;
      app.saveCases(data.clients);
      if (Array.isArray(data.foodDatabase) && data.foodDatabase.length) app.setFoodDb?.(data.foodDatabase, `import-${Date.now()}`);
      app.renderClients();
      app.renderCaseSelect();
      app.renderDashboard();
      app.renderDietPlan?.();
      app.showToast("JSON yedeği içe aktarıldı.");
    } catch {
      app.showToast("JSON formatı hatalı. Dosya içe aktarılamadı.", true);
    } finally {
      if (app.$("importDataFile")) app.$("importDataFile").value = "";
    }
  };

  app.clearAllData = function (resetApp = false) {
    const message = resetApp
      ? "Uygulama verileri sıfırlanacak. Bu işlem geri alınamaz. Devam edilsin mi?"
      : "Demo danışan verileri temizlenecek. Devam edilsin mi?";
    if (!app.showConfirmModal(message)) return;
    const username = app.state.currentUser || "guest";
    [app.keys.clients, app.keys.measurements, app.keys.bloodValues, app.keys.dietPlans, app.keys.notes, app.keys.settings].forEach((key) => {
      localStorage.removeItem(`${key}_${username}`);
    });
    localStorage.removeItem(`${app.keys.cases}_${username}`);
    if (resetApp) {
      localStorage.removeItem(app.keys.foodDb);
      localStorage.removeItem(app.keys.foodDbVersion);
      localStorage.removeItem(`${app.keys.foodDatabase}_${username}`);
    }
    app.state.selectedCaseIndex = null;
    app.renderClients();
    app.renderCaseSelect();
    app.renderDashboard();
    app.renderDietPlan?.();
    app.showToast(resetApp ? "Uygulama verileri sıfırlandı." : "Demo verileri temizlendi.");
  };

  function renderMeasurementShortcut() {
    const active = app.activeCase();
    const target = app.$("measurementShortcut");
    if (!target) return;
    if (!active) {
      target.innerHTML = '<div class="empty-state">Ölçüm eklemek için önce danışan listesinden bir danışan seç.</div>';
      return;
    }
    target.innerHTML = `
      <div class="panel">
        <h2>${app.escapeHtml(active.caseObj.name)}</h2>
        <p class="hint">Ölçüm geçmişi detay sayfasında tutulur.</p>
        <button class="btn" id="openMeasurementDetailBtn">Ölçüm Detayına Git</button>
      </div>
    `;
    app.$("openMeasurementDetailBtn")?.addEventListener("click", () => app.openClientDetail(active.idx, "olcum"));
  }

  app.initCases = function () {
    app.$("savePerson")?.addEventListener("click", app.addClient);
    app.$("cancelEditClient")?.addEventListener("click", () => {
      app.state.editingCaseIndex = null;
      app.state.editingCaseId = null;
      app.$("personForm")?.reset();
      app.$("clientFormTitle").textContent = "Yeni Danışan";
      app.$("cancelEditClient").hidden = true;
    });
    app.$("clientSearch")?.addEventListener("input", app.renderClients);
    app.$("goalFilter")?.addEventListener("change", app.renderClients);
    app.$("calc_case_select")?.addEventListener("change", (event) => {
      app.openCase(Number(event.target.value));
      app.switchTab("hesap");
    });
    app.$("diet_case_select")?.addEventListener("change", (event) => {
      app.openCase(Number(event.target.value));
    });
    app.$("detailTabs")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-detail-tab]");
      if (!button) return;
      app.state.detailTab = button.dataset.detailTab;
      app.renderClientDetail();
    });
    app.$("saveTodayNoteBtn")?.addEventListener("click", () => {
      const today = new Date().toISOString().slice(0, 10);
      localStorage.setItem(`${app.keys.session}_today_notes_${app.state.currentUser || "guest"}_${today}`, value("todayNotes"));
      app.showToast("Bugünkü notlar kaydedildi.");
    });
    app.$("generateReportBtn")?.addEventListener("click", app.generateReport);
    app.$("printReportBtn")?.addEventListener("click", app.printReport);
    app.$("exportDataBtn")?.addEventListener("click", app.exportData);
    app.$("importDataFile")?.addEventListener("change", (event) => app.importData(event.target.files?.[0]));
    app.$("clearDemoDataBtn")?.addEventListener("click", () => app.clearAllData(false));
    app.$("resetAppDataBtn")?.addEventListener("click", () => app.clearAllData(true));
    document.querySelectorAll("[data-tab-jump]").forEach((button) => {
      button.addEventListener("click", () => app.switchTab(button.dataset.tabJump));
    });
    document.addEventListener("nutripro:tab", (event) => {
      if (event.detail === "olcumler") renderMeasurementShortcut();
      if (event.detail === "dashboard") app.renderDashboard();
      if (event.detail === "veritabani") app.renderDashboard();
      if (event.detail === "ayarlar") app.renderDashboard();
    });
  };
})();
