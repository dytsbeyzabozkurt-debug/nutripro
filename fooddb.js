(function () {
  const app = window.NutriPro = window.NutriPro || {};

  app.bloodTests = [
    { key: "hemoglobin", label: "Hemoglobin", unit: "g/dL", low: 12, high: 17.5, lowPriority: ["iron", "b12", "protein"], lowText: "Anemi riski için demir, B12 ve kaliteli protein önceliklendirilmeli." },
    { key: "ferritin", label: "Ferritin", unit: "ng/mL", low: 30, high: 300, lowPriority: ["iron", "vitaminC"], lowText: "Demir depoları düşük olabilir; demir kaynakları C vitaminiyle desteklenmeli." },
    { key: "iron", label: "Serum demir", unit: "ug/dL", low: 60, high: 170, lowPriority: ["iron", "vitaminC"], lowText: "Demir alımı ve emilimi desteklenmeli." },
    { key: "b12", label: "B12", unit: "pg/mL", low: 300, high: 900, lowPriority: ["b12", "protein"], lowText: "B12 için yumurta, balık, et ve süt ürünleri öne alınmalı." },
    { key: "vitaminD", label: "D vitamini", unit: "ng/mL", low: 30, high: 100, lowPriority: ["vitaminD", "calcium"], lowText: "D vitamini düşükse yağlı balık, yumurta ve kalsiyum kaynakları desteklenmeli." },
    { key: "calcium", label: "Kalsiyum", unit: "mg/dL", low: 8.5, high: 10.5, lowPriority: ["calcium"], lowText: "Kalsiyum için süt ürünleri, yeşil yapraklılar ve susam/tahin kaynakları değerlendirilmeli." },
    { key: "potassium", label: "Potasyum", unit: "mmol/L", low: 3.5, high: 5.2, lowPriority: ["potassium"], highPriority: ["lowPotassium"], lowText: "Potasyum düşükse meyve, sebze, kurubaklagil ve patates grubu artırılabilir.", highText: "Potasyum yüksekse yüksek potasyumlu besinler kontrollü tutulmalı." },
    { key: "sodium", label: "Sodyum", unit: "mmol/L", low: 135, high: 145, highPriority: ["lowSodium"], highText: "Sodyum yüksekse tuzlu/işlenmiş besinler sınırlandırılmalı." },
    { key: "glucose", label: "Açlık glukoz", unit: "mg/dL", low: 70, high: 100, highPriority: ["glycemicControl"], highText: "Kan şekeri yüksekse posa yüksek, rafine karbonhidratı düşük seçimler yapılmalı." },
    { key: "ldl", label: "LDL", unit: "mg/dL", high: 130, highPriority: ["heartHealth"], highText: "LDL yüksekse doymuş yağ düşük, lif ve balık ağırlıklı plan tercih edilmeli." },
    { key: "triglyceride", label: "Trigliserid", unit: "mg/dL", high: 150, highPriority: ["heartHealth", "glycemicControl"], highText: "Trigliserid yüksekse şekerli/rafine karbonhidrat ve fazla yağ kontrollü tutulmalı." }
  ];

  const pdfAliases = {
    hemoglobin: ["hemoglobin (hb)", "hemoglobin", "hgb", "hb"],
    ferritin: ["ferritin"],
    iron: ["demir (serum)", "serum demir", "demir"],
    b12: ["vitamin b12", "b12"],
    vitaminD: ["25-oh vitamin d", "25 oh vitamin d", "d vitamini", "vitamin d"],
    calcium: ["kalsiyum (ca)", "kalsiyum", "calcium", " ca "],
    potassium: ["potasyum (k)", "potasyum", "potassium"],
    sodium: ["sodyum (na)", "sodyum", "sodium"],
    glucose: ["glukoz", "açlık kan şekeri", "aclik kan sekeri", "glucose"],
    ldl: ["ldl kolesterol", "ldl"],
    triglyceride: ["trigliserit", "trigliserid", "triglyceride"]
  };

  function unique(values) {
    return Array.from(new Set(values.filter(Boolean)));
  }

  app.evaluateBloodValues = function (values) {
    const alerts = [];
    const priorities = [];
    app.bloodTests.forEach((test) => {
      const raw = values[test.key];
      if (raw === "" || raw === null || raw === undefined) return;
      const value = Number(raw);
      if (!Number.isFinite(value)) return;
      if (test.low !== undefined && value < test.low) {
        alerts.push({ key: test.key, label: test.label, value, unit: test.unit, status: "low", text: test.lowText || `${test.label} düşük.` });
        priorities.push(...(test.lowPriority || []));
      } else if (test.high !== undefined && value > test.high) {
        alerts.push({ key: test.key, label: test.label, value, unit: test.unit, status: "high", text: test.highText || `${test.label} yüksek.` });
        priorities.push(...(test.highPriority || []));
      }
    });
    return { alerts, priorities: unique(priorities) };
  };

  app.renderBloodPanel = function () {
    const active = app.activeCase?.();
    const values = active?.caseObj?.bloodValues || {};
    if (app.$("bloodCaseName")) app.$("bloodCaseName").textContent = active?.caseObj?.name || "-";
    const inputs = app.$("bloodInputs");
    if (!inputs) return;
    inputs.innerHTML = app.bloodTests.map((test) => `
      <label>${test.label} <span class="unit">${test.unit || ""}</span>
        <input id="blood_${test.key}" type="number" step="0.01" value="${app.escapeHtml(values[test.key] ?? "")}" placeholder="${rangeText(test)}" />
      </label>
    `).join("");
    app.renderBloodResults(active?.caseObj);
  };

  function rangeText(test) {
    if (test.low !== undefined && test.high !== undefined) return `${test.low} - ${test.high}`;
    if (test.high !== undefined) return `< ${test.high}`;
    if (test.low !== undefined) return `> ${test.low}`;
    return "";
  }

  app.renderBloodResults = function (caseObj) {
    const results = app.$("bloodResults");
    if (!results) return;
    if (!caseObj) {
      results.innerHTML = '<div class="empty-state">Kan değerlerini kaydetmek için önce vaka aç.</div>';
      return;
    }
    const alerts = caseObj.bloodAlerts || [];
    if (!alerts.length) {
      results.innerHTML = '<div class="panel ok-panel"><strong>Kaydedilmiş kritik eksik/yüksek değer yok.</strong><p class="hint">Değer girildiğinde otomatik plan bu öncelikleri dikkate alacak.</p></div>';
      return;
    }
    results.innerHTML = `
      <div class="panel">
        <h2>Diyet Öncelikleri</h2>
        <div class="alert-list">
          ${alerts.map((alert) => `
            <div class="blood-alert ${alert.status}">
              <strong>${app.escapeHtml(alert.label)}: ${app.escapeHtml(alert.value)} ${app.escapeHtml(alert.unit)}</strong>
              <span>${app.escapeHtml(alert.text)}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  };

  app.renderBloodDietFocus = function (caseObj) {
    const focus = app.$("bloodDietFocus");
    if (!focus) return;
    const alerts = caseObj?.bloodAlerts || [];
    if (!alerts.length) {
      focus.innerHTML = '<p class="hint">Kan değeri önceliği yok.</p>';
      return;
    }
    focus.innerHTML = `
      <div class="focus-title">Kan değerine göre plan öncelikleri</div>
      ${alerts.slice(0, 4).map((alert) => `<span class="focus-chip">${app.escapeHtml(alert.label)}</span>`).join("")}
    `;
  };

  app.saveBloodValues = function () {
    const active = app.activeCase?.();
    if (!active) {
      alert("Önce bir vaka seç.");
      return;
    }
    const values = {};
    app.bloodTests.forEach((test) => {
      const value = app.$(`blood_${test.key}`)?.value;
      if (value !== "") values[test.key] = Number(value);
    });
    const evaluated = app.evaluateBloodValues(values);
    active.caseObj.bloodValues = values;
    active.caseObj.bloodAlerts = evaluated.alerts;
    active.caseObj.nutrientPriorities = evaluated.priorities;
    active.caseObj.bloodHistory = active.caseObj.bloodHistory || [];
    const today = new Date().toISOString().slice(0, 10);
    Object.entries(values).forEach(([key, value]) => {
      const test = app.bloodTests.find((item) => item.key === key);
      if (!test || !Number.isFinite(Number(value))) return;
      const status = test.low !== undefined && value < test.low ? "low" : test.high !== undefined && value > test.high ? "high" : "normal";
      active.caseObj.bloodHistory.push({
        id: `bv_${Date.now()}_${key}`,
        key,
        label: test.label,
        value,
        unit: test.unit,
        date: today,
        status,
        comment: status === "high"
          ? "Referans aralığının üzerinde görünüyor. Uzman değerlendirmesi önerilir. Bu yorum tanı amacı taşımaz."
          : status === "low"
            ? "Referans aralığının altında görünüyor. Klinik tablo ile birlikte değerlendirilmelidir. Bu yorum tanı amacı taşımaz."
            : "Referans aralığında görünüyor. Bu yorum tanı amacı taşımaz."
      });
    });
    app.saveCases(active.cases);
    app.renderBloodPanel();
    app.renderDietPlan?.();
  };

  app.clearBloodValues = function () {
    const active = app.activeCase?.();
    if (!active) return;
    active.caseObj.bloodValues = {};
    active.caseObj.bloodAlerts = [];
    active.caseObj.nutrientPriorities = [];
    app.saveCases(active.cases);
    app.renderBloodPanel();
    app.renderDietPlan?.();
  };

  function setBloodMessage(text, isError = false) {
    const el = app.$("bloodPdfMsg");
    if (!el) return;
    el.textContent = text || "";
    el.style.color = isError ? "var(--danger)" : "var(--muted)";
  }

  function normalizePdfText(text) {
    return String(text || "")
      .replace(/\u0000/g, "")
      .replace(/�/g, "")
      .replace(/[ \t]+/g, " ")
      .replace(/\r/g, "\n")
      .replace(/\n{2,}/g, "\n");
  }

  function foldForMatch(text) {
    return app.foldTurkish(String(text || "")
      .replace(/İ/g, "i")
      .replace(/ı/g, "i")
      .replace(/Ş/g, "s")
      .replace(/ş/g, "s")
      .replace(/Ğ/g, "g")
      .replace(/ğ/g, "g")
      .replace(/Ü/g, "u")
      .replace(/ü/g, "u")
      .replace(/Ö/g, "o")
      .replace(/ö/g, "o")
      .replace(/Ç/g, "c")
      .replace(/ç/g, "c"));
  }

  function parseNumberText(value) {
    if (!value) return null;
    const normalized = String(value).replace(",", ".");
    const number = Number(normalized);
    return Number.isFinite(number) ? number : null;
  }

  function stripMatchText(text) {
    return foldForMatch(text).replace(/[^a-z0-9,.-]/g, "");
  }

  function decodePdfLiteral(raw) {
    let out = "";
    for (let i = 0; i < raw.length; i += 1) {
      const ch = raw[i];
      if (ch !== "\\") {
        out += ch;
        continue;
      }
      const next = raw[++i];
      if (next === "n") out += "\n";
      else if (next === "r") out += "\r";
      else if (next === "t") out += "\t";
      else if (next === "b") out += "\b";
      else if (next === "f") out += "\f";
      else if (next === "(" || next === ")" || next === "\\") out += next;
      else if (/[0-7]/.test(next || "")) {
        let oct = next;
        for (let j = 0; j < 2 && /[0-7]/.test(raw[i + 1] || ""); j += 1) oct += raw[++i];
        out += String.fromCharCode(parseInt(oct, 8));
      } else {
        out += next || "";
      }
    }
    return out;
  }

  function decodeUnicodeHex(hex) {
    const clean = hex.replace(/[^0-9a-f]/gi, "");
    const bytes = [];
    for (let i = 0; i < clean.length; i += 2) bytes.push(parseInt(clean.slice(i, i + 2).padEnd(2, "0"), 16));
    if (bytes[0] === 0xfe && bytes[1] === 0xff) {
      let out = "";
      for (let i = 2; i + 1 < bytes.length; i += 2) out += String.fromCharCode((bytes[i] << 8) + bytes[i + 1]);
      return out;
    }
    if (clean.length % 4 === 0) {
      let out = "";
      for (let i = 0; i + 3 < clean.length; i += 4) out += String.fromCodePoint(parseInt(clean.slice(i, i + 4), 16));
      return out;
    }
    return String.fromCharCode(...bytes);
  }

  function decodePdfHex(hex, cmap) {
    const clean = hex.replace(/[^0-9a-f]/gi, "").toUpperCase();
    if (cmap && clean.length >= 4) {
      let mapped = "";
      for (let i = 0; i < clean.length; i += 4) {
        const code = clean.slice(i, i + 4);
        mapped += cmap.get(code) || "";
      }
      if (mapped) return mapped;
    }
    return decodeUnicodeHex(hex);
  }

  function parseToUnicodeCMap(text) {
    const cmap = new Map();
    const bfcharRe = /beginbfchar([\s\S]*?)endbfchar/g;
    const bfrangeRe = /beginbfrange([\s\S]*?)endbfrange/g;
    let section;
    while ((section = bfcharRe.exec(text))) {
      const lineRe = /<([0-9a-fA-F]+)>\s+<([0-9a-fA-F]+)>/g;
      let line;
      while ((line = lineRe.exec(section[1]))) {
        cmap.set(line[1].toUpperCase().padStart(4, "0"), decodeUnicodeHex(line[2]));
      }
    }
    while ((section = bfrangeRe.exec(text))) {
      const rangeRe = /<([0-9a-fA-F]+)>\s+<([0-9a-fA-F]+)>\s+(?:<([0-9a-fA-F]+)>|\[([^\]]+)\])/g;
      let range;
      while ((range = rangeRe.exec(section[1]))) {
        const start = parseInt(range[1], 16);
        const end = parseInt(range[2], 16);
        if (range[3]) {
          const destStart = parseInt(range[3], 16);
          for (let code = start; code <= end; code += 1) {
            cmap.set(code.toString(16).toUpperCase().padStart(4, "0"), String.fromCodePoint(destStart + code - start));
          }
        } else if (range[4]) {
          const items = Array.from(range[4].matchAll(/<([0-9a-fA-F]+)>/g)).map((m) => decodeUnicodeHex(m[1]));
          items.forEach((value, idx) => cmap.set((start + idx).toString(16).toUpperCase().padStart(4, "0"), value));
        }
      }
    }
    return cmap;
  }

  function mergeCMaps(texts) {
    const cmap = new Map();
    texts.forEach((text) => {
      parseToUnicodeCMap(text).forEach((value, key) => {
        if (!cmap.has(key)) cmap.set(key, value);
      });
    });
    return cmap;
  }

  function extractTextOperators(streamText, cmap) {
    const pieces = [];
    const literalRe = /\((?:\\.|[^\\)])*\)\s*Tj/g;
    const arrayRe = /\[((?:.|\n)*?)\]\s*TJ/g;
    const hexRe = /<([0-9a-fA-F\s]+)>\s*Tj/g;
    let match;
    while ((match = literalRe.exec(streamText))) pieces.push(decodePdfLiteral(match[0].replace(/\)\s*Tj$/, "").slice(1)));
    while ((match = arrayRe.exec(streamText))) {
      const parts = [];
      const itemRe = /\((?:\\.|[^\\)])*\)|<([0-9a-fA-F\s]+)>/g;
      let item;
      while ((item = itemRe.exec(match[1]))) {
        const token = item[0];
        parts.push(token.startsWith("(") ? decodePdfLiteral(token.slice(1, -1)) : decodePdfHex(token.slice(1, -1), cmap));
      }
      pieces.push(parts.join(""));
    }
    while ((match = hexRe.exec(streamText))) pieces.push(decodePdfHex(match[1], cmap));
    return pieces.join(" ");
  }

  function bytesToBinary(bytes) {
    let out = "";
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      out += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }
    return out;
  }

  async function inflatePdfStream(bytes) {
    if (!("DecompressionStream" in window)) return "";
    try {
      let end = bytes.length;
      while (end > 0 && (bytes[end - 1] === 10 || bytes[end - 1] === 13)) end -= 1;
      const cleanBytes = end === bytes.length ? bytes : bytes.slice(0, end);
      const stream = new Blob([cleanBytes]).stream().pipeThrough(new DecompressionStream("deflate"));
      const buffer = await new Response(stream).arrayBuffer();
      return bytesToBinary(new Uint8Array(buffer));
    } catch {
      return "";
    }
  }

  app.extractPdfText = async function (file) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const binary = bytesToBinary(bytes);
    const streamTexts = [binary];
    const streamRe = /<<(?:.|\n)*?>>\s*stream\r?\n/g;
    let match;
    while ((match = streamRe.exec(binary))) {
      const dict = match[0];
      const start = streamRe.lastIndex;
      const end = binary.indexOf("endstream", start);
      if (end === -1) break;
      const raw = bytes.slice(start, end);
      if (/FlateDecode/.test(dict)) {
        const inflated = await inflatePdfStream(raw);
        if (inflated) streamTexts.push(inflated);
      } else {
        streamTexts.push(bytesToBinary(raw));
      }
      streamRe.lastIndex = end + "endstream".length;
    }
    const cmap = mergeCMaps(streamTexts);
    const texts = streamTexts.map((text) => extractTextOperators(text, cmap));
    return normalizePdfText(texts.join("\n"));
  };

  app.parseBloodText = function (text) {
    const normalizedText = normalizePdfText(text);
    const foldedText = foldForMatch(normalizedText);
    const compactText = stripMatchText(normalizedText);
    const values = {};
    Object.entries(pdfAliases).forEach(([key, aliases]) => {
      let best = null;
      aliases.forEach((alias) => {
        const foldedAlias = foldForMatch(alias).trim();
        const pattern = new RegExp(`(?:^|\\n|\\s)${foldedAlias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:[^\\d-]{0,100})([-+]?\\d+(?:[\\.,]\\d+)?)`, "i");
        const match = foldedText.match(pattern);
        let number = parseNumberText(match?.[1]);
        if (number === null) {
          const compactAlias = stripMatchText(alias);
          const compactPattern = new RegExp(`${compactAlias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:[^\\d-]{0,80})([-+]?\\d+(?:[\\.,]\\d+)?)`, "i");
          number = parseNumberText(compactText.match(compactPattern)?.[1]);
        }
        if (number !== null && best === null) best = number;
      });
      if (best !== null) values[key] = best;
    });
    return values;
  };

  app.applyBloodValuesToInputs = function (values) {
    Object.entries(values).forEach(([key, value]) => {
      const input = app.$(`blood_${key}`);
      if (input) input.value = value;
    });
  };

  app.analyzeBloodPdf = async function () {
    const file = app.$("bloodPdfFile")?.files?.[0];
    if (!file) {
      setBloodMessage("Önce PDF dosyası seç.", true);
      return;
    }
    setBloodMessage("PDF okunuyor. Otomatik çekilen değerleri kaydetmeden önce manuel kontrol et.");
    try {
      const text = await app.extractPdfText(file);
      const values = app.parseBloodText(text);
      const found = Object.keys(values);
      if (!found.length) {
        setBloodMessage("PDF okundu ama eşleşen kan değeri bulunamadı. Manuel giriş kullanabilirsin.", true);
        return;
      }
      app.applyBloodValuesToInputs(values);
      setBloodMessage(`${found.length} değer bulundu: ${found.map((key) => app.bloodTests.find((test) => test.key === key)?.label || key).join(", ")}. Kaydetmeden önce mutlaka doğrula.`);
    } catch (error) {
      console.error(error);
      setBloodMessage("PDF analiz edilirken hata oluştu. Manuel giriş kullanabilirsin.", true);
    }
  };

  app.initBlood = function () {
    app.$("saveBloodBtn")?.addEventListener("click", app.saveBloodValues);
    app.$("clearBloodBtn")?.addEventListener("click", app.clearBloodValues);
    app.$("analyzeBloodPdfBtn")?.addEventListener("click", app.analyzeBloodPdf);
    app.renderBloodPanel();
  };
})();
