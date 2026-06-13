/**
 * app.js — Smart Loan Planner & Prepayment Analyzer
 * UI controller: handles all DOM interactions, renders results, manages state.
 */

"use strict";

// ─── App State ───────────────────────────────────────────────────────────────
let currentResults = null;
let activeTab = "reduceTenure"; // default prepayment tab

// ─── DOM Ready ───────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLanguage();
  applyTranslations();
  renderHistory();
  bindEvents();
});

// ─── Theme ───────────────────────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem("slp_theme") || "dark";
  if (saved === "dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
  updateThemeIcon(saved);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  const theme = isDark ? "dark" : "light";
  localStorage.setItem("slp_theme", theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  btn.innerHTML = theme === "dark"
    ? `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>`;
}

// ─── Language ─────────────────────────────────────────────────────────────────
function initLanguage() {
  const lang = localStorage.getItem("slp_language") || "en";
  setLanguage(lang);
  const sel = document.getElementById("langSelect");
  if (sel) sel.value = lang;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const attr = el.getAttribute("data-i18n-attr");
    if (attr) el.setAttribute(attr, t(key));
    else el.textContent = t(key);
  });
  // Update page title
  document.title = t("appName");
}

// ─── Event Binding ────────────────────────────────────────────────────────────
function bindEvents() {
  // Theme toggle
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  // Language selector
  const langSel = document.getElementById("langSelect");
  if (langSel) langSel.addEventListener("change", e => {
    setLanguage(e.target.value);
    applyTranslations();
    if (currentResults) renderAllResults(currentResults);
    renderHistory();
  });

  // Form calculate
  const calcBtn = document.getElementById("btnCalculate");
  if (calcBtn) calcBtn.addEventListener("click", handleCalculate);

  // Form reset
  const resetBtn = document.getElementById("btnReset");
  if (resetBtn) resetBtn.addEventListener("click", handleReset);

  // Save record
  const saveBtn = document.getElementById("btnSave");
  if (saveBtn) saveBtn.addEventListener("click", handleSave);

  // Prepayment tab switching
  document.querySelectorAll(".prepay-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      activeTab = btn.dataset.tab;
      switchPrepayTab(activeTab);
    });
  });

  // Export buttons
  const copyBtn = document.getElementById("btnCopy");
  if (copyBtn) copyBtn.addEventListener("click", handleCopy);

  const dlBtn = document.getElementById("btnDownload");
  if (dlBtn) dlBtn.addEventListener("click", handleDownload);

  // Clear history
  const clearBtn = document.getElementById("btnClearAll");
  if (clearBtn) clearBtn.addEventListener("click", handleClearAll);

  // Amortization toggle
  const amortBtn = document.getElementById("btnToggleAmort");
  if (amortBtn) amortBtn.addEventListener("click", toggleAmortization);

  // Enter key submits form
  document.querySelectorAll("#loanForm input, #loanForm select").forEach(el => {
    el.addEventListener("keydown", e => { if (e.key === "Enter") handleCalculate(); });
  });
}

// ─── Calculate Handler ────────────────────────────────────────────────────────
function handleCalculate() {
  clearErrors();

  const inputs = getFormInputs();
  const errors = Calculator.validateInputs(inputs);

  if (errors.length > 0) {
    showErrors(errors);
    return;
  }

  currentResults = Calculator.computeFullAnalysis(inputs);
  renderAllResults(currentResults);

  // Smooth scroll to results
  const resultsSection = document.getElementById("resultsSection");

if (resultsSection) {
  resultsSection.classList.remove("hidden");
  resultsSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
  
  const exportSection = document.getElementById("exportSection");

if (exportSection) {
  exportSection.classList.remove("hidden");
}
}

// ─── Form Helpers ─────────────────────────────────────────────────────────────
function getFormInputs() {
  return {
    borrowerName: document.getElementById("borrowerName").value.trim(),
    loanType: document.getElementById("loanType").value,
    loanAmount: document.getElementById("loanAmount").value,
    annualRate: document.getElementById("annualRate").value,
    tenureMonths: document.getElementById("tenureMonths").value,
    emisPaid: document.getElementById("emisPaid").value,
    prepaymentAmount: document.getElementById("prepaymentAmount").value || "0"
  };
}

function handleReset() {
  document.getElementById("loanForm").reset();
  clearErrors();
  currentResults = null;
  document.getElementById("resultsSection").classList.add("hidden");
  document.getElementById("exportSection").classList.add("hidden");
}

// ─── Validation UI ────────────────────────────────────────────────────────────
function clearErrors() {
  document.querySelectorAll(".field-error").forEach(el => el.textContent = "");
  document.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));
}

function showErrors(errors) {
  const fieldMap = {
    loan_amount_error: "loanAmount",
    rate_error: "annualRate",
    tenure_error: "tenureMonths",
    emis_paid_error: "emisPaid",
    emis_exceed_error: "emisPaid",
    prepayment_exceed_error: "prepaymentAmount"
  };
  errors.forEach(key => {
    const fieldId = fieldMap[key];
    if (fieldId) {
      const field = document.getElementById(fieldId);
      if (field) field.classList.add("input-error");
      const errEl = document.getElementById(`err_${fieldId}`);
      if (errEl) errEl.textContent = t(key);
    }
  });
}

// ─── Render All Results ───────────────────────────────────────────────────────
function renderAllResults(results) {
  renderEMISummary(results);
  renderOutstanding(results);
  renderPrepayment(results);
  renderClosure(results);
  renderAmortization(results);
}

// ─── EMI Summary ─────────────────────────────────────────────────────────────
function renderEMISummary(r) {
  const fmt = Calculator.formatINR;
  setText("res_emi", fmt(r.emi));
  setText("res_total_payable", fmt(r.totalPayable));
  setText("res_total_interest", fmt(r.totalInterest));
  setText("res_loan_amount", fmt(r.inputs.loanAmount));
  setText("res_loan_type", r.inputs.loanType);
  setText("res_borrower", r.inputs.borrowerName || "—");

  // Interest ratio bar
  const ratio = r.totalInterest / r.totalPayable;
  const bar = document.getElementById("interestRatioBar");
  if (bar) {
    bar.style.width = (Math.min(ratio, 1) * 100).toFixed(1) + "%";
  }
  const ratioLabel = document.getElementById("interestRatioLabel");
  if (ratioLabel) ratioLabel.textContent = `${(ratio * 100).toFixed(1)}% ${t("label_total_interest").toLowerCase()}`;
}

// ─── Outstanding Balance ──────────────────────────────────────────────────────
function renderOutstanding(r) {
  const fmt = Calculator.formatINR;
  const fmtT = Calculator.formatTenure;
  const o = r.outstanding;
  setText("res_outstanding", fmt(o.outstanding));
  setText("res_principal_paid", fmt(o.principalPaid));
  setText("res_interest_paid", fmt(o.totalInterestPaid));
  setText("res_remaining_months", fmtT(o.remainingMonths));
  setText("res_remaining_months_num", `(${o.remainingMonths} ${t("months")})`);

  // Progress bar: how much of loan is repaid
  const pct =
  r.inputs.tenureMonths > 0
    ? (r.inputs.emisPaid / r.inputs.tenureMonths) * 100
    : 0;
  const progressBar = document.getElementById("repaidProgressBar");
  if (progressBar) progressBar.style.width = pct.toFixed(1) + "%";
  const progressLabel = document.getElementById("repaidProgressLabel");
  if (progressLabel) {
  progressLabel.textContent = `${pct.toFixed(0)}% ${t("label_repaid")}`;
}
}

// ─── Prepayment ───────────────────────────────────────────────────────────────
function renderPrepayment(r) {
  const fmt = Calculator.formatINR;
  const fmtT = Calculator.formatTenure;
  const noPrep = document.getElementById("noPrepaymentMsg");
  const prepContent = document.getElementById("prepaymentContent");

  if (!r.prepayment || r.inputs.prepaymentAmount <= 0) {
    if (noPrep) noPrep.classList.remove("hidden");
    if (prepContent) prepContent.classList.add("hidden");
    return;
  }

  if (noPrep) noPrep.classList.add("hidden");
  if (prepContent) prepContent.classList.remove("hidden");

  const pp = r.prepayment;

  // Shared: new principal
  setText("res_new_principal", fmt(pp.newPrincipal));
  setText("res_original_remaining_interest", fmt(pp.originalRemainingInterest));

  // Reduce EMI tab
  setText("re_new_emi", fmt(pp.reduceEMI.newEMI));
  setText("re_interest_saved", fmt(pp.reduceEMI.interestSaved));
  setText("re_old_emi", fmt(r.emi));
  setText("re_emi_diff", fmt(r.emi - pp.reduceEMI.newEMI) + " " + t("per_month_saved"));

  // Reduce Tenure tab
  setText("rt_months_saved", pp.reduceTenure.monthsSaved);
  setText("rt_new_tenure", fmtT(pp.reduceTenure.newTenure));
  setText("rt_interest_saved", fmt(pp.reduceTenure.interestSaved));
  setText("rt_new_tenure_detail", `${pp.reduceTenure.newTenure} ${t("months")}`);

  switchPrepayTab(activeTab);
}

function switchPrepayTab(tab) {
  document.querySelectorAll(".prepay-tab").forEach(btn => {
    const isActive = btn.dataset.tab === tab;
    btn.classList.toggle("tab-active", isActive);
    btn.classList.toggle("tab-inactive", !isActive);
  });
  document.querySelectorAll(".prepay-panel").forEach(panel => {
    panel.classList.toggle("hidden", panel.dataset.panel !== tab);
  });
}

// ─── Closure ─────────────────────────────────────────────────────────────────
function renderClosure(r) {
  const fmt = Calculator.formatINR;
  const c = r.closure;
  setText("res_closure_amount", fmt(c.closureAmount));
  setText("res_future_interest", fmt(c.futureInterestAvoided));
  setText("res_continued_total", fmt(c.totalAmountIfContinued));
}

// ─── Amortization ─────────────────────────────────────────────────────────────
let amortVisible = false;

function toggleAmortization() {
  amortVisible = !amortVisible;
  const container = document.getElementById("amortContainer");
  const btn = document.getElementById("btnToggleAmort");
  if (container) container.classList.toggle("hidden", !amortVisible);
  if (btn) btn.textContent = amortVisible ? t("hide_schedule") : t("show_full_schedule");
  if (amortVisible && currentResults) renderAmortTable(currentResults.schedule);
}

function renderAmortization(r) {
  amortVisible = false;
  const container = document.getElementById("amortContainer");
  if (container) container.classList.add("hidden");
  const btn = document.getElementById("btnToggleAmort");
  if (btn) btn.textContent = t("show_full_schedule");
}

function renderAmortTable(schedule) {
  const fmt = Calculator.formatINR;
  const tbody = document.getElementById("amortTbody");
  if (!tbody) return;

  tbody.innerHTML = schedule.map(row => `
    <tr class="${row.isPaid ? "amort-paid" : "amort-upcoming"} transition-colors">
      <td class="amort-cell text-center font-medium">
        ${row.month}
        ${row.isPaid ? `<span class="amort-badge ml-1">${t("amort_paid_label")}</span>` : ""}
      </td>
      <td class="amort-cell text-right">${fmt(row.emi)}</td>
      <td class="amort-cell text-right text-emerald-600 dark:text-emerald-400">${fmt(row.principal)}</td>
      <td class="amort-cell text-right text-amber-600 dark:text-amber-400">${fmt(row.interest)}</td>
      <td class="amort-cell text-right font-medium">${fmt(row.balance)}</td>
    </tr>
  `).join("");
}

// ─── Export ───────────────────────────────────────────────────────────────────
function handleCopy() {
  if (!currentResults) return;
  Export.copyToClipboard(
    currentResults,
    () => showToast(t("copied"), "success"),
    () => showToast("Copy failed. Please try again.", "error")
  );
}

function handleDownload() {
  if (!currentResults) return;
  Export.downloadTXT(currentResults);
  showToast(t("downloaded"), "success");
}

// ─── Save / History ───────────────────────────────────────────────────────────
function handleSave() {
  if (!currentResults) return;
  const id = Storage.saveRecord(currentResults);
  if (id) {
    showToast(t("record_saved"), "success");
    renderHistory();
  }
}

function renderHistory() {
  const records = Storage.getAllRecords();
  const container = document.getElementById("historyList");
  const emptyMsg = document.getElementById("historyEmpty");
  const badge = document.getElementById("historyCount");

  if (badge) badge.textContent = records.length;

  if (!container) return;

  if (records.length === 0) {
    container.innerHTML = "";
    if (emptyMsg) emptyMsg.classList.remove("hidden");
    return;
  }

  if (emptyMsg) emptyMsg.classList.add("hidden");

  container.innerHTML = records.map(rec => {
    const date = new Date(rec.savedAt).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric"
    });
    return `
    <div class="history-card" data-id="${rec.id}">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0">
          <p class="history-name truncate">${rec.borrowerName}</p>
          <p class="history-meta">${rec.loanType} · ${Calculator.formatINR(rec.loanAmount)} · ${rec.annualRate}% · ${rec.tenureMonths}mo</p>
          <p class="history-meta mt-0.5">EMI: ${Calculator.formatINR(rec.emi)} · Outstanding: ${Calculator.formatINR(rec.outstanding)}</p>
          <p class="history-date">${date}</p>
        </div>
        <div class="flex flex-col gap-1.5 shrink-0">
          <button onclick="loadRecord('${rec.id}')" class="btn-history-load">${t("btn_load")}</button>
          <button onclick="deleteRecord('${rec.id}')" class="btn-history-delete">${t("btn_delete")}</button>
        </div>
      </div>
    </div>
    `;
  }).join("");
}

function loadRecord(id) {
  const snap = Storage.getRecord(id);
  if (!snap) return;
  const i = snap.inputs;

  document.getElementById("borrowerName").value = i.borrowerName || "";
  document.getElementById("loanType").value = i.loanType || "Personal Loan";
  document.getElementById("loanAmount").value = i.loanAmount || "";
  document.getElementById("annualRate").value = i.annualRate || "";
  document.getElementById("tenureMonths").value = i.tenureMonths || "";
  document.getElementById("emisPaid").value = i.emisPaid || "0";
  document.getElementById("prepaymentAmount").value = i.prepaymentAmount || "";

currentResults = snap;
renderAllResults(snap);

const resultsSection = document.getElementById("resultsSection");
if (resultsSection) {
  resultsSection.classList.remove("hidden");
}

const exportSection = document.getElementById("exportSection");
if (exportSection) {
  exportSection.classList.remove("hidden");
}

const loanForm = document.getElementById("loanForm");

if (loanForm) {
  loanForm.scrollIntoView({
    behavior: "smooth"
  });
}
  showToast(t("record_loaded"), "info");
}

function deleteRecord(id) {
  Storage.deleteRecord(id);
  renderHistory();
  showToast(t("record_deleted"), "info");
}

function handleClearAll() {
  if (!confirm(t("confirm_clear"))) return;
  Storage.clearAllRecords();
  renderHistory();
  showToast(t("records_cleared"), "info");
}

// ─── Toast Notification ───────────────────────────────────────────────────────
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const colors = {
    success: "bg-emerald-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-indigo-600 text-white"
  };

  const toast = document.createElement("div");
  toast.className = `toast-item ${colors[type] || colors.info}`;
  toast.textContent = message;
  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => toast.classList.add("toast-show"));

  // Auto remove
  setTimeout(() => {
    toast.classList.remove("toast-show");
    toast.classList.add("toast-hide");
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ─── Utility ─────────────────────────────────────────────────────────────────
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}
