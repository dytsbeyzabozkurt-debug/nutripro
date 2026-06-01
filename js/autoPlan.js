(function () {
  const app = window.NutriPro = window.NutriPro || {};

  const mealTargets = {
    sabah: 0.24,
    kusluk: 0.10,
    ogle: 0.30,
    ikindi: 0.10,
    aksam: 0.22,
    gece: 0.04
  };

  const baselinePlan = {
    sabah: [
      { terms: ["yumurta", "tavuk (tam)yumurta"], grams: 60 },
      { terms: ["beyaz peynir", "peynir"], grams: 35 },
      { terms: ["ekmek", "bulgur"], grams: 45 }
    ],
    kusluk: [
      { terms: ["elma", "armut", "portakal"], grams: 150 },
      { terms: ["yoğurt", "süt"], grams: 120 }
    ],
    ogle: [
      { terms: ["mercimek", "nohut", "k. fasulye", "barbunya"], grams: 110 },
      { terms: ["beyaz et", "tavuk", "dana eti az yağlı", "sığır eti az yağlı"], grams: 90 },
      { terms: ["bulgur", "pirinç", "makarna"], grams: 80 }
    ],
    ikindi: [
      { terms: ["badem", "fındık", "ceviz"], grams: 18 },
      { terms: ["kefir", "yoğurt", "süt"], grams: 120 }
    ],
    aksam: [
      { terms: ["sardalya", "uskumru", "palamut", "levrek", "alabalık"], grams: 110 },
      { terms: ["kabak", "ıspanak", "sebze", "patates"], grams: 120 },
      { terms: ["yoğurt", "ayran"], grams: 100 }
    ],
    gece: [
      { terms: ["kefir", "süt", "yoğurt"], grams: 100 }
    ]
  };

  const priorityPlan = {
    iron: [
      { meal: "ogle", terms: ["karaciğer", "dana eti az yağlı", "sığır eti az yağlı"], grams: 80 },
      { meal: "aksam", terms: ["mercimek", "nohut", "k. fasulye"], grams: 100 }
    ],
    vitaminC: [
      { meal: "kusluk", terms: ["portakal", "mandalina", "greyfurt", "çilek"], grams: 140 },
      { meal: "ogle", terms: ["limon", "portakal suyu"], grams: 60 }
    ],
    b12: [
      { meal: "sabah", terms: ["yumurta"], grams: 60 },
      { meal: "aksam", terms: ["sardalya", "uskumru", "palamut"], grams: 100 }
    ],
    vitaminD: [
      { meal: "aksam", terms: ["sardalya", "uskumru", "palamut"], grams: 110 },
      { meal: "sabah", terms: ["yumurta"], grams: 60 }
    ],
    calcium: [
      { meal: "sabah", terms: ["peynir", "süt"], grams: 100 },
      { meal: "ikindi", terms: ["yoğurt", "süt", "susam", "badem"], grams: 120 }
    ],
    potassium: [
      { meal: "kusluk", terms: ["muz", "kayısı (kuru)", "portakal"], grams: 100 },
      { meal: "ogle", terms: ["patates", "mercimek", "nohut"], grams: 110 }
    ],
    protein: [
      { meal: "ogle", terms: ["beyaz et", "tavuk", "dana eti az yağlı"], grams: 100 },
      { meal: "aksam", terms: ["balık", "sardalya", "levrek"], grams: 100 }
    ],
    glycemicControl: [
      { meal: "ogle", terms: ["mercimek", "nohut", "k. fasulye"], grams: 120 },
      { meal: "kusluk", terms: ["elma", "armut"], grams: 120 }
    ],
    heartHealth: [
      { meal: "aksam", terms: ["sardalya", "uskumru", "levrek", "alabalık"], grams: 120 },
      { meal: "ogle", terms: ["mercimek", "barbunya", "nohut"], grams: 110 }
    ]
  };

  const avoidByPriority = {
    lowSodium: ["tuzlu", "salam", "sosis", "sucuk", "pastırma", "konserve"],
    glycemicControl: ["şeker", "akide", "bal", "reçel", "pekmez", "çikolata"],
    heartHealth: ["yağlı", "sucuk", "salam", "sosis", "kavurma"],
    lowPotassium: ["muz", "patates", "kayısı", "potasyum"]
  };

  function folded(value) {
    return app.foldTurkish(value || "");
  }

  function hasAvoidedName(food, priorities) {
    const avoidTerms = priorities.flatMap((priority) => avoidByPriority[priority] || []);
    const name = folded(food.name);
    return avoidTerms.some((term) => name.includes(folded(term)));
  }

  app.findFoodByTerms = function (terms, priorities = [], usedIds = new Set()) {
    const normalizedTerms = terms.map(folded);
    const candidates = app.state.foodDb
      .filter((food) => !usedIds.has(food.id))
      .filter((food) => food.kcal_per_100g !== null && food.kcal_per_100g !== undefined)
      .filter((food) => !hasAvoidedName(food, priorities))
      .map((food) => {
        const name = folded(food.name);
        let score = 0;
        normalizedTerms.forEach((term, idx) => {
          if (name === term) score += 80 - idx;
          else if (name.includes(term)) score += 50 - idx;
        });
        if (food.protein_per_100g > 12) score += 4;
        if (food.fiber_per_100g > 4) score += 4;
        if (food.fat_per_100g > 25) score -= 6;
        return { food, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
    return candidates[0]?.food || null;
  };

  function canAdd(caseObj, entry, targets, mealKey) {
    const current = app.getDailyTotals(caseObj.mealPlan);
    const meal = current.byMeal[mealKey] || { kcal: 0 };
    const maxEnergy = targets.energyTarget * 1.05;
    const maxProtein = targets.proteinTarget * 1.2;
    const maxCarb = targets.carbTarget * 1.12;
    const maxFat = targets.fatTarget * 1.12;
    const mealMax = targets.energyTarget * (mealTargets[mealKey] || 0.18) * 1.25;
    if ((current.kcal + Number(entry.kcal || 0)) > maxEnergy) return false;
    if ((current.protein + Number(entry.protein || 0)) > maxProtein) return false;
    if ((current.carb + Number(entry.carb || 0)) > maxCarb) return false;
    if ((current.fat + Number(entry.fat || 0)) > maxFat) return false;
    if ((meal.kcal + Number(entry.kcal || 0)) > mealMax) return false;
    return true;
  }

  function addPlannedFood(caseObj, spec, targets, priorities, usedIds) {
    const food = app.findFoodByTerms(spec.terms, priorities, usedIds);
    if (!food) return false;
    const entry = app.createMealEntry(food, spec.grams);
    if (!canAdd(caseObj, entry, targets, spec.meal)) return false;
    caseObj.mealPlan[spec.meal].push(entry);
    usedIds.add(food.id);
    return true;
  }

  function fillEnergyGap(caseObj, targets, priorities, usedIds) {
    const fillers = [
      { meal: "ogle", terms: ["pirinç", "bulgur"], grams: 45 },
      { meal: "aksam", terms: ["zeytinyağı"], grams: 8 },
      { meal: "aksam", terms: ["patates"], grams: 120 },
      { meal: "kusluk", terms: ["elma", "armut"], grams: 100 },
      { meal: "sabah", terms: ["ekmek", "buğday unu"], grams: 30 },
      { meal: "ikindi", terms: ["siyah zeytin", "yeşil zeytin"], grams: 25 }
    ];
    let guard = 0;
    while (app.getDailyTotals(caseObj.mealPlan).kcal < targets.energyTarget * 0.9 && guard < 12) {
      const spec = fillers[guard % fillers.length];
      if (!addPlannedFood(caseObj, spec, targets, priorities, usedIds)) guard += 1;
      else guard += 1;
    }
  }

  app.autoPlan = function () {
    const active = app.activeCase();
    if (!active) {
      alert("Otomatik plan için önce bir vaka seç.");
      return;
    }

    const caseObj = active.caseObj;
    const targets = app.getEnergyTargets(caseObj);
    const priorities = caseObj.nutrientPriorities || [];
    const usedIds = new Set();
    app.meals.forEach(([key]) => caseObj.mealPlan[key] = []);

    Object.entries(baselinePlan).forEach(([meal, specs]) => {
      specs.forEach((spec) => addPlannedFood(caseObj, { ...spec, meal }, targets, priorities, usedIds));
    });

    priorities.forEach((priority) => {
      (priorityPlan[priority] || []).forEach((spec) => addPlannedFood(caseObj, spec, targets, priorities, usedIds));
    });

    fillEnergyGap(caseObj, targets, priorities, usedIds);

    const totals = app.getDailyTotals(caseObj.mealPlan);
    const focus = priorities.length ? ` Kan değerlerine göre öncelikler: ${priorities.join(", ")}.` : "";
    app.saveActiveCase(active.cases, active.idx);
    app.setMessage("dietMsg", `Otomatik plan hedefe göre oluşturuldu: ${Math.round(totals.kcal)} / ${targets.energyTarget} kcal.${focus}`);
    app.switchTab("besin");
  };

  app.initAutoPlan = function () {
    app.$("autoPlanBtn").addEventListener("click", app.autoPlan);
  };
})();
