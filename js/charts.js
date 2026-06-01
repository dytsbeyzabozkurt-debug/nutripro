(function () {
  const app = window.NutriPro = window.NutriPro || {};

  const activityLabels = {
    "1.2": "Sedanter",
    "1.375": "Hafif aktif",
    "1.55": "Orta aktif",
    "1.725": "Çok aktif",
    "1.9": "Ekstra aktif"
  };

  app.calculateBMI = function (weight, height) {
    const h = Number(height) / 100;
    const bmi = h ? app.round(Number(weight) / (h * h), 1) : 0;
    let category = "Hesaplanamadı";
    if (bmi > 0 && bmi < 18.5) category = "Düşük ağırlık";
    else if (bmi < 25) category = "Normal aralık";
    else if (bmi < 30) category = "Fazla kilolu aralık";
    else if (bmi >= 30) category = "Obezite aralığı";
    return { bmi, category };
  };

  app.calculateMacros = function (energy, carbPct, proteinPct, fatPct) {
    const totalPct = Number(carbPct) + Number(proteinPct) + Number(fatPct);
    return {
      totalPct,
      carbPct: Number(carbPct),
      proteinPct: Number(proteinPct),
      fatPct: Number(fatPct),
      carbGram: app.round((energy * (Number(carbPct) / 100)) / 4, 1),
      proteinGram: app.round((energy * (Number(proteinPct) / 100)) / 4, 1),
      fatGram: app.round((energy * (Number(fatPct) / 100)) / 9, 1)
    };
  };

  app.calculateWaterTarget = function (weight, exerciseMinutes = 0) {
    const kg = Number(weight) || 0;
    const baseLow = Math.round(kg * 30);
    const baseHigh = Math.round(kg * 35);
    const exerciseExtra = Math.round((Number(exerciseMinutes) || 0) * 8);
    return {
      low: baseLow + exerciseExtra,
      high: baseHigh + exerciseExtra,
      exerciseExtra
    };
  };

  app.calculateEnergy = function () {
    const active = app.activeCase();
    if (!active) {
      app.showToast?.("Önce danışan seç.", true) || alert("Önce danışan seç.");
      return null;
    }
    const c = active.caseObj;
    const weight = Number(c.weight) || 0;
    const height = Number(c.height) || 0;
    const age = Number(c.age) || 0;
    if (!weight || !height || !age) {
      app.showToast?.("Enerji hesabı için yaş, boy ve kilo gerekli.", true);
      return null;
    }
    const sexBase = c.sex === "e" ? 5 : -161;
    const bmr = Math.round(10 * weight + 6.25 * height - 5 * age + sexBase);
    const activity = Number(app.$("activity_level")?.value || 1.2);
    const tdee = Math.round(bmr * activity);
    const category = app.$("calc_category")?.value || "kilo_koruma";
    let adjustment = Number(app.$("energy_adjustment")?.value || 0);
    if (category === "kilo_verme" && adjustment === 0) adjustment = -300;
    if (category === "kilo_alma" && adjustment === 0) adjustment = 300;
    if (category === "sporcu" && adjustment === 0) adjustment = 300;
    const targetEnergy = Math.max(1000, Math.round(tdee + adjustment));
    const targetRange = {
      low: Math.max(1000, Math.round(targetEnergy - 100)),
      high: Math.round(targetEnergy + 100)
    };
    const bmi = app.calculateBMI(weight, height);
    const water = app.calculateWaterTarget(weight);
    const macros = app.calculateMacros(
      targetEnergy,
      Number(app.$("macro_carb_pct")?.value || 50),
      Number(app.$("macro_protein_pct")?.value || 20),
      Number(app.$("macro_fat_pct")?.value || 30)
    );
    if (macros.totalPct !== 100) {
      app.showToast?.(`Makro yüzdeleri toplamı ${macros.totalPct}. Toplam %100 olmalı.`, true);
      return null;
    }
    const result = { bmr, activity, tdee, category, adjustment, targetEnergy, targetRange, bmi, water, macros };
    app.state.lastEnergyResult = result;
    const macroWarning = "";
    app.$("calcResult").hidden = false;
    app.$("calcResult").innerHTML = `
      <div class="calc-grid">
        <span><strong>BMR:</strong> ${bmr} kcal</span>
        <span><strong>Aktivite:</strong> ${activityLabels[String(activity)] || activity} (${activity})</span>
        <span><strong>TDEE:</strong> ${tdee} kcal</span>
        <span><strong>Hedef enerji:</strong> ${targetRange.low}-${targetRange.high} kcal</span>
        <span><strong>BKİ:</strong> ${bmi.bmi} (${bmi.category})</span>
        <span><strong>Su hedefi:</strong> ${water.low}-${water.high} ml/gün</span>
      </div>
      <div class="divider"></div>
      <strong>Makro dağılımı:</strong>
      <p>Karbonhidrat %${macros.carbPct}: ${macros.carbGram} g · Protein %${macros.proteinPct}: ${macros.proteinGram} g · Yağ %${macros.fatPct}: ${macros.fatGram} g</p>
      <p class="hint">Mifflin-St Jeor formülü ile hesaplanmıştır. Sonuçlar planlama desteğidir, tanı veya kesin tıbbi öneri değildir.</p>
      ${macroWarning}
    `;
    app.setMessage("calcNote", "Hesaplandı.");
    return result;
  };

  app.saveEnergyToCase = function () {
    const active = app.activeCase();
    if (!active) return;
    const result = app.state.lastEnergyResult || app.calculateEnergy();
    if (!result) return;
    active.caseObj.energyHistory.push({ date: new Date().toISOString(), result, category: result.category });
    app.saveCases(active.cases);
    app.renderDietPlan();
    app.setMessage("calcNote", "Danışana kaydedildi.");
    app.showToast?.("Enerji hedefi danışana kaydedildi.");
  };

  app.getEnergyTargets = function (caseObj) {
    const weight = Number(caseObj?.weight) || 70;
    const lastEnergy = caseObj?.energyHistory?.length ? caseObj.energyHistory[caseObj.energyHistory.length - 1] : null;
    const result = lastEnergy?.result;
    const energyTarget = result?.targetEnergy || result?.totalEnergy || Math.round(weight * 25);
    const macros = result?.macros || app.calculateMacros(energyTarget, 50, 20, 30);
    let proteinTarget = macros.proteinGram;
    const priorities = caseObj?.nutrientPriorities || [];
    if (priorities.includes("protein") || priorities.includes("iron") || priorities.includes("b12")) {
      proteinTarget = Math.max(proteinTarget, app.round(weight * 1.2, 1));
    }
    return {
      energyTarget,
      proteinTarget,
      carbTarget: macros.carbGram,
      fatTarget: macros.fatGram,
      fiberTarget: 30,
      waterTarget: result?.water || app.calculateWaterTarget(weight)
    };
  };

  app.progressRow = function (label, taken, target, unit) {
    const pct = target ? Math.round((Number(taken) / Number(target)) * 100) : 0;
    const tone = pct > 130 ? "danger" : (pct > 115 || pct < 75) ? "warn" : "";
    return `
      <div class="progress-line">
        <div class="progress-label"><span>${label}</span><strong>${app.round(taken, 1)} / ${app.round(target, 1)} ${unit} (%${pct})</strong></div>
        <div class="bar ${tone}" style="--pct:${Math.min(pct, 130)}%"><span></span></div>
      </div>
    `;
  };

  app.renderProgressBars = function (totals, targets) {
    return [
      app.progressRow("Enerji", totals.kcal, targets.energyTarget, "kcal"),
      app.progressRow("Protein", totals.protein, targets.proteinTarget, "g"),
      app.progressRow("Karbonhidrat", totals.carb, targets.carbTarget, "g"),
      app.progressRow("Yağ", totals.fat, targets.fatTarget, "g"),
      app.progressRow("Lif", totals.fiber, targets.fiberTarget, "g")
    ].join("");
  };

  app.updateDailyPanels = function (caseObj) {
    const totals = caseObj ? app.calculateDailyTotals(caseObj.mealPlan) : { kcal: 0, protein: 0, carb: 0, fat: 0, fiber: 0, micros: {}, byMeal: {} };
    app.$("dailyKcal").textContent = app.round(totals.kcal, 1);
    app.$("dailyProtein").textContent = app.round(totals.protein, 1);
    app.$("dailyCarb").textContent = app.round(totals.carb, 1);
    app.$("dailyFat").textContent = app.round(totals.fat, 1);
    app.$("dailyFiber").textContent = app.round(totals.fiber, 1);
    const targets = app.getEnergyTargets(caseObj || {});
    app.$("requirementSummary").innerHTML = app.renderProgressBars(totals, targets);
    app.renderBloodDietFocus?.(caseObj);
    app.drawMealChart(totals.byMeal || {});
    app.writeDietCommentary(totals, targets);
  };

  app.drawMealChart = function (byMeal) {
    const canvas = app.$("mealChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const data = app.meals.map(([key, label]) => ({ label, value: byMeal[key]?.kcal || 0 }));
    const max = Math.max(...data.map((item) => item.value), 1);
    const barWidth = 36;
    const gap = (canvas.width - 52 - data.length * barWidth) / Math.max(data.length - 1, 1);
    ctx.fillStyle = "#667085";
    ctx.font = "12px Segoe UI, sans-serif";
    data.forEach((item, idx) => {
      const x = 26 + idx * (barWidth + gap);
      const barHeight = Math.round((item.value / max) * 140);
      const y = 170 - barHeight;
      ctx.fillStyle = idx % 2 ? "#f9735b" : "#178ca4";
      ctx.fillRect(x, y, barWidth, barHeight);
      ctx.fillStyle = "#13202d";
      ctx.textAlign = "center";
      ctx.fillText(String(Math.round(item.value)), x + barWidth / 2, Math.max(14, y - 6));
      ctx.fillStyle = "#667085";
      ctx.fillText(item.label, x + barWidth / 2, 205);
    });
    ctx.textAlign = "left";
  };

  app.writeDietCommentary = function (totals, targets) {
    const energyPct = targets.energyTarget ? Math.round((totals.kcal / targets.energyTarget) * 100) : 0;
    const lines = ["Karar destek yorumu (tanı veya kesin öneri değildir):"];
    if (energyPct >= 90 && energyPct <= 110) lines.push("Kalori hedefe yakın görünüyor.");
    else if (energyPct < 90) lines.push("Kalori hedefin altında görünüyor.");
    else lines.push("Kalori hedefin üstünde görünüyor.");
    if (totals.protein < targets.proteinTarget * 0.85) lines.push("Protein hedefin altında.");
    if (totals.fiber < targets.fiberTarget * 0.75) lines.push("Lif düşük görünüyor.");
    if (totals.fat > targets.fatTarget * 1.15) lines.push("Yağ hedefin üstünde.");
    if (lines.length === 1) lines.push("Günlük plan hedeflerle uyumlu görünüyor.");
    const alerts = app.activeCase?.()?.caseObj?.bloodAlerts || [];
    if (alerts.length) {
      lines.push("");
      lines.push("Kan değerine göre dikkat:");
      alerts.slice(0, 4).forEach((alert) => lines.push(`- ${alert.text}`));
    }
    app.$("aiCommentary").textContent = lines.join("\n");
  };

  app.loadWaterForCase = function () {
    const active = app.activeCase();
    const water = active?.caseObj.water || { target: "", taken: "", exerciseMinutes: "" };
    const defaultTarget = active ? app.calculateWaterTarget(active.caseObj.weight) : { low: 0, high: 0 };
    app.$("waterTarget").value = water.target || defaultTarget.low || "";
    app.$("waterTaken").value = water.taken || "";
    if (app.$("exerciseMinutes")) app.$("exerciseMinutes").value = water.exerciseMinutes || "";
    app.updateWaterStatus();
  };

  app.updateWaterStatus = function () {
    const target = Number(app.$("waterTarget")?.value) || 0;
    const taken = Number(app.$("waterTaken")?.value) || 0;
    const exercise = Number(app.$("exerciseMinutes")?.value) || 0;
    const pct = target ? Math.round((taken / target) * 100) : 0;
    const glasses = Math.round(taken / 200);
    const extra = exercise ? ` Spor için yaklaşık ${Math.round(exercise * 8)} ml ek su değerlendirilebilir.` : "";
    app.$("waterStatus").innerHTML = target
      ? `${app.progressRow("Su", taken, target, "ml")}<span>%${pct} tamamlandı · yaklaşık ${glasses} bardak.${extra}</span>`
      : "Su hedefi girilmedi.";
  };

  app.applyCalculatedWater = function () {
    const active = app.activeCase();
    if (!active) return;
    const water = app.calculateWaterTarget(active.caseObj.weight, Number(app.$("exerciseMinutes")?.value) || 0);
    app.$("waterTarget").value = water.low;
    app.updateWaterStatus();
  };

  app.saveWater = function () {
    const active = app.activeCase();
    if (!active) return;
    const target = Number(app.$("waterTarget").value) || 0;
    const taken = Number(app.$("waterTaken").value) || 0;
    const exercise = Number(app.$("exerciseMinutes")?.value) || 0;
    if (target < 0 || taken < 0 || exercise < 0) {
      app.showToast?.("Su miktarı ve spor süresi negatif olamaz.", true);
      return;
    }
    active.caseObj.water = {
      target: app.$("waterTarget").value,
      taken: app.$("waterTaken").value,
      exerciseMinutes: app.$("exerciseMinutes")?.value || ""
    };
    app.saveCases(active.cases);
    app.updateWaterStatus();
  };

  app.resetWater = function () {
    app.$("waterTarget").value = "";
    app.$("waterTaken").value = "";
    if (app.$("exerciseMinutes")) app.$("exerciseMinutes").value = "";
    app.saveWater();
  };

  app.initCharts = function () {
    app.$("calcBtn")?.addEventListener("click", app.calculateEnergy);
    app.$("saveCalc")?.addEventListener("click", app.saveEnergyToCase);
    app.$("saveWaterBtn")?.addEventListener("click", app.saveWater);
    app.$("calcWaterBtn")?.addEventListener("click", app.applyCalculatedWater);
    app.$("resetWaterBtn")?.addEventListener("click", app.resetWater);
    app.$("waterTarget")?.addEventListener("input", app.updateWaterStatus);
    app.$("waterTaken")?.addEventListener("input", app.updateWaterStatus);
    app.$("exerciseMinutes")?.addEventListener("input", app.updateWaterStatus);
  };
})();
