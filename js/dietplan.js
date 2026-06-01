(function () {
  const app = window.NutriPro = window.NutriPro || {};

  app.meals = [
    ["sabah", "Kahvaltı"],
    ["kusluk", "Kuşluk"],
    ["ogle", "Öğle"],
    ["ikindi", "İkindi"],
    ["aksam", "Akşam"],
    ["gece", "Gece"]
  ];

  const mealTemplates = {
    balanced_breakfast: [
      { terms: ["yumurta"], grams: 60 },
      { terms: ["beyaz peynir", "peynir"], grams: 40 },
      { terms: ["ekmek"], grams: 30 },
      { terms: ["domates", "salatalık"], grams: 120 }
    ],
    athlete_breakfast: [
      { terms: ["yumurta"], grams: 100 },
      { terms: ["yulaf", "buğday"], grams: 55 },
      { terms: ["süt"], grams: 200 },
      { terms: ["muz"], grams: 100 }
    ],
    light_dinner: [
      { terms: ["balık", "levrek", "alabalık"], grams: 120 },
      { terms: ["kabak", "ıspanak", "sebze"], grams: 180 },
      { terms: ["yoğurt"], grams: 120 }
    ],
    diabetes_friendly: [
      { terms: ["mercimek", "nohut", "fasulye"], grams: 120 },
      { terms: ["yoğurt"], grams: 120 },
      { terms: ["elma", "armut"], grams: 100 }
    ],
    high_protein_snack: [
      { terms: ["yoğurt", "kefir", "süt"], grams: 180 },
      { terms: ["badem", "fındık", "ceviz"], grams: 18 }
    ]
  };

  app.exchangeSuggestions = [
    "1 dilim ekmek yerine 3 yemek kaşığı bulgur tercih edilebilir.",
    "1 porsiyon meyve yerine 1 küçük elma veya 1 küçük armut kullanılabilir.",
    "1 süt değişimi yerine 1 su bardağı süt veya 1 kase yoğurt seçilebilir.",
    "1 et değişimi yerine yumurta, peynir, tavuk veya balık alternatifleri değerlendirilebilir.",
    "Ara öğünde yüksek yağlı seçenek yerine yoğurt + meyve gibi daha dengeli seçenekler düşünülebilir."
  ];

  app.mealLabelToKey = function (label) {
    const folded = app.foldTurkish(label);
    return {
      kahvalti: "sabah",
      sabah: "sabah",
      kusluk: "kusluk",
      ogle: "ogle",
      ikindi: "ikindi",
      aksam: "aksam",
      gece: "gece"
    }[folded] || "sabah";
  };

  app.calculateFoodValues = function (food, grams) {
    const factor = (Number(grams) || 0) / 100;
    const value = (field) => food[field] === null || food[field] === undefined ? 0 : app.round(food[field] * factor, 2);
    return {
      kcal: value("kcal_per_100g"),
      protein: value("protein_per_100g"),
      carb: value("carb_per_100g"),
      fat: value("fat_per_100g"),
      fiber: value("fiber_per_100g"),
      micros: {
        calcium_mg: value("calcium_mg"),
        iron_mg: value("iron_mg"),
        phosphorus_mg: value("phosphorus_mg"),
        potassium_mg: value("potassium_mg"),
        sodium_mg: value("sodium_mg")
      }
    };
  };

  app.createMealEntry = function (food, grams) {
    const values = app.calculateFoodValues(food, grams);
    return {
      id: `meal_${Date.now()}_${Math.random().toString(16).slice(2)}`,
      foodId: food.id,
      name: food.name,
      portionDesc: food.portion_desc || "",
      grams: Number(grams),
      ...values
    };
  };

  app.calculateMealTotals = function (items) {
    return (items || []).reduce((totals, item) => {
      totals.kcal += Number(item.kcal || 0);
      totals.protein += Number(item.protein || 0);
      totals.carb += Number(item.carb || 0);
      totals.fat += Number(item.fat || 0);
      totals.fiber += Number(item.fiber || 0);
      totals.micros.calcium_mg += Number(item.micros?.calcium_mg || 0);
      totals.micros.iron_mg += Number(item.micros?.iron_mg || 0);
      totals.micros.potassium_mg += Number(item.micros?.potassium_mg || 0);
      totals.micros.sodium_mg += Number(item.micros?.sodium_mg || 0);
      return totals;
    }, { kcal: 0, protein: 0, carb: 0, fat: 0, fiber: 0, micros: { calcium_mg: 0, iron_mg: 0, potassium_mg: 0, sodium_mg: 0 } });
  };

  app.getMealTotals = app.calculateMealTotals;

  app.calculateDailyTotals = function (mealPlan) {
    const daily = { kcal: 0, protein: 0, carb: 0, fat: 0, fiber: 0, micros: { calcium_mg: 0, iron_mg: 0, potassium_mg: 0, sodium_mg: 0 }, byMeal: {} };
    app.meals.forEach(([key]) => {
      const totals = app.calculateMealTotals(mealPlan?.[key] || []);
      ["kcal", "protein", "carb", "fat", "fiber"].forEach((field) => totals[field] = app.round(totals[field], 2));
      Object.keys(totals.micros).forEach((field) => totals.micros[field] = app.round(totals.micros[field], 2));
      daily.byMeal[key] = totals;
      daily.kcal += totals.kcal;
      daily.protein += totals.protein;
      daily.carb += totals.carb;
      daily.fat += totals.fat;
      daily.fiber += totals.fiber;
      Object.keys(daily.micros).forEach((field) => daily.micros[field] += totals.micros[field]);
    });
    ["kcal", "protein", "carb", "fat", "fiber"].forEach((field) => daily[field] = app.round(daily[field], 2));
    Object.keys(daily.micros).forEach((field) => daily.micros[field] = app.round(daily.micros[field], 2));
    return daily;
  };

  app.getDailyTotals = app.calculateDailyTotals;

  function enteredGrams(food) {
    const amount = Number(app.$("food_grams_main")?.value) || 0;
    const mode = app.$("food_amount_mode")?.value || "gram";
    return mode === "portion" ? amount * Number(food?.portion_grams || 100) : amount;
  }

  app.saveActiveCase = function (cases) {
    app.saveCases(cases);
    app.renderCases?.();
    app.renderDietPlan();
    app.renderDashboard?.();
  };

  app.addFoodToMeal = function () {
    const active = app.activeCase();
    if (!active) {
      app.showToast?.("Önce danışan seç.", true) || alert("Önce danışan seç.");
      return;
    }
    const food = app.findFood(app.$("food_select_main").value);
    const grams = enteredGrams(food);
    if (!food) {
      app.showToast?.("Besin seçimi geçersiz.", true) || alert("Besin seçimi geçersiz.");
      return;
    }
    if (!grams || grams <= 0) {
      app.showToast?.("Gram veya porsiyon miktarı gir.", true) || alert("Miktar gir.");
      return;
    }
    const key = app.mealLabelToKey(app.$("meal_select_ui").value);
    active.caseObj.mealPlan[key].push(app.createMealEntry(food, grams));
    app.saveActiveCase(active.cases, active.idx);
    app.$("food_grams_main").value = "";
    app.updateFoodAmountPreview?.();
    app.setMessage("dietMsg", `${food.name} eklendi.`);
  };

  app.removeMealEntry = function (mealKey, entryId) {
    const active = app.activeCase();
    if (!active) return;
    active.caseObj.mealPlan[mealKey] = active.caseObj.mealPlan[mealKey].filter((item) => item.id !== entryId);
    app.saveActiveCase(active.cases, active.idx);
  };

  app.clearSelectedMeal = function () {
    const active = app.activeCase();
    if (!active) return;
    const key = app.mealLabelToKey(app.$("meal_select_ui").value);
    active.caseObj.mealPlan[key] = [];
    app.saveActiveCase(active.cases, active.idx);
  };

  app.clearDay = function () {
    const active = app.activeCase();
    if (!active) return;
    app.meals.forEach(([key]) => active.caseObj.mealPlan[key] = []);
    app.saveActiveCase(active.cases, active.idx);
  };

  app.applyMealTemplate = function () {
    const active = app.activeCase();
    if (!active) {
      app.showToast?.("Şablon için önce danışan seç.", true);
      return;
    }
    const template = mealTemplates[app.$("meal_template_select")?.value];
    if (!template) {
      app.showToast?.("Önce şablon seç.", true);
      return;
    }
    const mealKey = app.mealLabelToKey(app.$("template_meal_select")?.value);
    const used = new Set(active.caseObj.mealPlan[mealKey].map((item) => item.foodId));
    template.forEach((spec) => {
      const food = app.findFoodByTerms?.(spec.terms, [], used) || app.state.foodDb.find((item) => spec.terms.some((term) => app.foldTurkish(item.name).includes(app.foldTurkish(term))));
      if (!food) return;
      active.caseObj.mealPlan[mealKey].push(app.createMealEntry(food, spec.grams));
      used.add(food.id);
    });
    app.saveActiveCase(active.cases, active.idx);
    app.showToast?.("Öğün şablonu eklendi.");
  };

  app.saveDietPlan = function () {
    const active = app.activeCase();
    if (!active) {
      app.showToast?.("Plan kaydetmek için önce danışan seç.", true);
      return;
    }
    const totals = app.calculateDailyTotals(active.caseObj.mealPlan);
    const targets = app.getEnergyTargets?.(active.caseObj) || {};
    active.caseObj.dietPlanHistory = active.caseObj.dietPlanHistory || [];
    active.caseObj.dietPlanHistory.push({
      id: `plan_${Date.now()}`,
      date: new Date().toISOString(),
      target: active.caseObj.goal?.type || active.caseObj.goalType || "",
      dailyCalories: targets.energyTarget || totals.kcal,
      macroTargets: targets,
      meals: JSON.parse(JSON.stringify(active.caseObj.mealPlan)),
      totals,
      note: app.$("dietitianNote")?.value || ""
    });
    app.saveCases(active.cases);
    app.renderDashboard?.();
    app.showToast?.("Diyet planı danışan geçmişine kaydedildi.");
  };

  app.renderDietPlans = function () {
    const active = app.activeCase();
    const target = app.$("dietPlanHistory");
    if (!active || !target) return;
    const plans = [...(active.caseObj.dietPlanHistory || [])].reverse();
    target.innerHTML = plans.length ? `
      <div class="table-wrap"><table>
        <thead><tr><th>Tarih</th><th>Kalori</th><th>Protein</th><th>Karbonhidrat</th><th>Yağ</th><th>Not</th></tr></thead>
        <tbody>${plans.map((plan) => `<tr><td>${new Date(plan.date).toLocaleDateString("tr-TR")}</td><td>${app.round(plan.totals?.kcal, 0)} kcal</td><td>${app.round(plan.totals?.protein, 1)} g</td><td>${app.round(plan.totals?.carb, 1)} g</td><td>${app.round(plan.totals?.fat, 1)} g</td><td>${app.escapeHtml(plan.note || "-")}</td></tr>`).join("")}</tbody>
      </table></div>
    ` : '<div class="empty-state">Henüz kaydedilmiş diyet planı yok.</div>';
  };

  app.renderExchangeSuggestions = function () {
    const box = app.$("exchangeList");
    if (!box) return;
    box.innerHTML = `<ul class="exchange-list">${app.exchangeSuggestions.map((item) => `<li>${app.escapeHtml(item)}</li>`).join("")}</ul>`;
  };

  app.renderDietPlan = function () {
    app.renderCaseSelect?.();
    const active = app.activeCase();
    const container = app.$("mealsContainer");
    if (!container) return;
    if (!active) {
      app.$("selectedCaseName").textContent = "-";
      container.innerHTML = '<div class="empty-state">Plan oluşturmak için önce danışan seç.</div>';
      app.updateDailyPanels?.(null);
      return;
    }
    app.$("selectedCaseName").textContent = active.caseObj.name;
    app.loadWaterForCase?.();
    app.renderExchangeSuggestions();
    container.innerHTML = app.meals.map(([key, label]) => {
      const items = active.caseObj.mealPlan[key] || [];
      const totals = app.calculateMealTotals(items);
      const rows = items.length ? items.map((item) => `
        <tr>
          <td>${app.escapeHtml(item.name)}<span class="blood-note">${app.escapeHtml(item.portionDesc || "")}</span></td>
          <td class="num">${app.round(item.grams, 0)}</td>
          <td class="num">${app.round(item.kcal, 1)}</td>
          <td class="num">${app.round(item.protein, 1)}</td>
          <td class="num">${app.round(item.carb, 1)}</td>
          <td class="num">${app.round(item.fat, 1)}</td>
          <td class="num">${app.round(item.fiber, 1)}</td>
          <td class="num"><button class="mini-btn" data-remove-entry="${item.id}" data-meal="${key}">Sil</button></td>
        </tr>
      `).join("") : '<tr><td colspan="8">Bu öğünde besin yok.</td></tr>';
      return `
        <section class="panel meal-card">
          <div class="meal-head">
            <h2>${label}</h2>
            <span class="pill">${app.round(totals.kcal, 1)} kcal · P ${app.round(totals.protein, 1)} g · K ${app.round(totals.carb, 1)} g · Y ${app.round(totals.fat, 1)} g · Lif ${app.round(totals.fiber, 1)} g</span>
          </div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Besin</th><th class="num">g</th><th class="num">kcal</th><th class="num">protein</th><th class="num">karb.</th><th class="num">yağ</th><th class="num">lif</th><th class="num"></th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </section>
      `;
    }).join("");
    container.querySelectorAll("[data-remove-entry]").forEach((button) => {
      button.addEventListener("click", () => app.removeMealEntry(button.dataset.meal, button.dataset.removeEntry));
    });
    app.updateDailyPanels?.(active.caseObj);
  };

  app.initDietPlan = function () {
    app.$("addFoodMainBtn")?.addEventListener("click", app.addFoodToMeal);
    app.$("clearMealBtn")?.addEventListener("click", app.clearSelectedMeal);
    app.$("clearDayBtn")?.addEventListener("click", app.clearDay);
    app.$("applyTemplateBtn")?.addEventListener("click", app.applyMealTemplate);
    app.$("saveDietPlanBtn")?.addEventListener("click", app.saveDietPlan);
  };
})();
