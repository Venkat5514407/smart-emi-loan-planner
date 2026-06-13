/**
 * export.js — Smart Loan Planner & Prepayment Analyzer
 * Handles copy-to-clipboard and TXT file download.
 */

"use strict";

const Export = (() => {

  /**
   * Generate a plain-text loan summary report.
   * @param {object} results - Full results from Calculator.computeFullAnalysis()
   * @returns {string} Formatted text report
   */
  function generateTextReport(results) {

  if (!results || !results.inputs) {
    return "No loan data available.";
  }
    const fmt = Calculator.formatINR;
    const fmtT = Calculator.formatTenure;
    const i = results.inputs;
    const line = "─".repeat(50);
    const dline = "═".repeat(50);

    let report = [];

    report.push(dline);
    report.push("    SMART EMI LOAN PLANNER — LOAN SUMMARY REPORT");
    report.push(dline);
    report.push(`Generated On  : ${new Date().toLocaleString("en-IN")}`);
    report.push(`Borrower Name : ${i.borrowerName || "—"}`);
    report.push(`Loan Type     : ${i.loanType}`);
    report.push(line);

    report.push("\n📋 LOAN DETAILS");
    report.push(`  Loan Amount       : ${fmt(i.loanAmount)}`);
    report.push(`  Annual Rate       : ${i.annualRate}%`);
    report.push(`  Tenure            : ${fmtT(i.tenureMonths)} (${i.tenureMonths} months)`);
    report.push(`  EMIs Already Paid : ${i.emisPaid}`);

    report.push("\n📊 EMI SUMMARY");
    report.push(`  Monthly EMI       : ${fmt(results.emi)}`);
    report.push(`  Total Payable     : ${fmt(results.totalPayable)}`);
    report.push(`  Total Interest    : ${fmt(results.totalInterest)}`);

    report.push("\n💰 OUTSTANDING BALANCE");
    report.push(`  Outstanding Principal : ${fmt(results.outstanding.outstanding)}`);
    report.push(`  Principal Paid        : ${fmt(results.outstanding.principalPaid)}`);
    report.push(`  Interest Paid         : ${fmt(results.outstanding.totalInterestPaid)}`);
    report.push(`  Remaining Months      : ${fmtT(results.outstanding.remainingMonths)}`);

    if (results.prepayment && i.prepaymentAmount > 0) {
      const pp = results.prepayment;
      report.push(`\n⚡ PREPAYMENT ANALYSIS (Prepayment: ${fmt(i.prepaymentAmount)})`);
      report.push(`  New Principal After Prepayment : ${fmt(pp.newPrincipal)}`);
      report.push("  ── Option A: Reduce EMI ──");
      report.push(`     New Monthly EMI    : ${fmt(pp.reduceEMI.newEMI)}`);
      report.push(`     Interest Saved     : ${fmt(pp.reduceEMI.interestSaved)}`);
      report.push("  ── Option B: Reduce Tenure (Recommended) ──");
      report.push(`     Months Saved       : ${pp.reduceTenure.monthsSaved} months`);
      report.push(`     New Tenure         : ${fmtT(pp.reduceTenure.newTenure)}`);
      report.push(`     Interest Saved     : ${fmt(pp.reduceTenure.interestSaved)}`);
    }

    report.push("\n🔒 LOAN CLOSURE TODAY");
    report.push(`  Amount to Close Loan    : ${fmt(results.closure.closureAmount)}`);
    report.push(`  Future Interest Avoided : ${fmt(results.closure.futureInterestAvoided)}`);
    report.push(`  Total if Continued      : ${fmt(results.closure.totalAmountIfContinued)}`);

    report.push("\n" + dline);
    report.push("  NOTE: All figures are estimates for planning purposes only.");
    report.push("  Consult your lender for exact closure/prepayment figures.");
    report.push(dline);

    return report.join("\n");
  }

  /**
   * Copy text summary to clipboard.
   * @param {object} results
   * @param {function} onSuccess - Callback on success
   * @param {function} onError - Callback on error
   */
  async function copyToClipboard(results, onSuccess, onError) {
    const text = generateTextReport(results);
    try {
      await navigator.clipboard.writeText(text);
      if (onSuccess) onSuccess();
    } catch (e) {
      // Fallback for older browsers
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        if (onSuccess) onSuccess();
      } catch (e2) {
        if (onError) onError(e2);
      }
    }
  }

  /**
   * Trigger TXT file download.
   * @param {object} results
   */
  function downloadTXT(results) {
    const text = generateTextReport(results);
    const name = results?.inputs?.borrowerName
      ? results?.inputs?.borrowerName.replace(/\s+/g, "_")
      : "loan";
    const filename = `SmartEMILoanPlanner_${name}_${Date.now()}.txt`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  return { generateTextReport, copyToClipboard, downloadTXT };

})();
