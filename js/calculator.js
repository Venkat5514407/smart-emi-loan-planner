/**
 * calculator.js — Smart Loan Planner & Prepayment Analyzer
 * Pure financial calculation functions. No DOM access.
 * All monetary values in INR (₹). Rates in decimal form internally.
 */

"use strict";

const Calculator = (() => {

  // ─── Core Formula ───────────────────────────────────────────────────────────

  /**
   * Calculate monthly EMI using standard reducing-balance formula.
   * EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
   * @param {number} principal   - Loan amount in ₹
   * @param {number} annualRate  - Annual interest rate (e.g. 12 for 12%)
   * @param {number} tenureMonths - Total loan tenure in months
   * @returns {number} Monthly EMI in ₹
   */
  function calculateEMI(principal, annualRate, tenureMonths) {
    if (annualRate === 0) return principal / tenureMonths;
    const r = annualRate / (12 * 100);
    const n = tenureMonths;
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return emi;
  }

  // ─── Outstanding Balance ─────────────────────────────────────────────────────

  /**
   * Calculate outstanding principal after k EMIs have been paid.
   * Uses the standard amortization formula:
   * Outstanding = P × (1 + r)^k − EMI × ((1 + r)^k − 1) / r
   * @param {number} principal      - Original loan amount
   * @param {number} annualRate     - Annual interest rate (%)
   * @param {number} tenureMonths   - Total tenure in months
   * @param {number} emisPaid       - Number of EMIs already paid
   * @returns {object} { outstanding, emiAmount, remainingMonths, totalInterestPaid }
   */
  function calculateOutstanding(principal, annualRate, tenureMonths, emisPaid) {
    const r = annualRate === 0 ? 0 : annualRate / (12 * 100);
    const n = tenureMonths;
    const k = emisPaid;
    const emi = calculateEMI(principal, annualRate, tenureMonths);

    let outstanding;
    if (r === 0) {
      outstanding = principal - (principal / n) * k;
    } else {
      outstanding = principal * Math.pow(1 + r, k) - emi * (Math.pow(1 + r, k) - 1) / r;
    }

    outstanding = Math.max(0, outstanding);

    // Total interest paid so far
    const totalPaidSoFar = emi * k;
    const principalPaidSoFar = principal - outstanding;
    const interestPaidSoFar = totalPaidSoFar - principalPaidSoFar;

    return {
      outstanding: Math.round(outstanding * 100) / 100,
      emiAmount: Math.round(emi * 100) / 100,
      remainingMonths: Math.max(0, n - k),
      totalInterestPaid: Math.round(Math.max(0, interestPaidSoFar) * 100) / 100,
      principalPaid: Math.round(principalPaidSoFar * 100) / 100
    };
  }

  // ─── Prepayment Analysis ─────────────────────────────────────────────────────

  /**
   * Analyze impact of a lump-sum prepayment — two modes:
   * Mode A: Reduce EMI (keep same tenure)
   * Mode B: Reduce Tenure (keep same EMI)
   *
   * @param {number} outstanding      - Current outstanding principal
   * @param {number} annualRate       - Annual interest rate (%)
   * @param {number} remainingMonths  - Remaining loan tenure in months
   * @param {number} currentEMI       - Current monthly EMI
   * @param {number} prepayment       - Lump sum prepayment amount
   * @returns {object} Both modes with savings
   */
  function analyzePrepayment(outstanding, annualRate, remainingMonths, currentEMI, prepayment) {
    const r = annualRate === 0 ? 0 : annualRate / (12 * 100);
    const newPrincipal = Math.max(0, outstanding - prepayment);

    // Original remaining interest (no prepayment)
    const originalRemainingInterest = (currentEMI * remainingMonths) - outstanding;

    // ── Mode A: Reduce EMI, same tenure ─────────────────────────────────────
    let newEMIReduceEMI = 0;
    if (r === 0) {
      newEMIReduceEMI = newPrincipal / remainingMonths;
    } else {
      newEMIReduceEMI = calculateEMI(newPrincipal, annualRate, remainingMonths);
    }
    const newTotalInterestReduceEMI = (newEMIReduceEMI * remainingMonths) - newPrincipal;
    const interestSavedReduceEMI = originalRemainingInterest - newTotalInterestReduceEMI;
    const monthsSavedReduceEMI = 0; // tenure unchanged

    // ── Mode B: Reduce Tenure, same EMI ─────────────────────────────────────
    let newTenureReduceTenure = remainingMonths;
    let interestSavedReduceTenure = 0;
    let monthsSaved = 0;

    if (r === 0) {
      newTenureReduceTenure = Math.ceil(newPrincipal / currentEMI);
    } else {
      // n = -ln(1 - r×P/EMI) / ln(1+r)
      const ratio = (r * newPrincipal) / currentEMI;
      if (ratio < 1) {
        newTenureReduceTenure = Math.ceil(-Math.log(1 - ratio) / Math.log(1 + r));
      } else {
        // EMI too small to cover interest — fallback
        newTenureReduceTenure = remainingMonths;
      }
    }

    newTenureReduceTenure = Math.min(newTenureReduceTenure, remainingMonths);
    monthsSaved = remainingMonths - newTenureReduceTenure;
    const newTotalInterestReduceTenure = (currentEMI * newTenureReduceTenure) - newPrincipal;
    interestSavedReduceTenure = originalRemainingInterest - Math.max(0, newTotalInterestReduceTenure);

    return {
      newPrincipal: Math.round(newPrincipal * 100) / 100,
      originalRemainingInterest: Math.round(Math.max(0, originalRemainingInterest) * 100) / 100,

      reduceEMI: {
        newEMI: Math.round(newEMIReduceEMI * 100) / 100,
        newTenure: remainingMonths,
        monthsSaved: 0,
        interestSaved: Math.round(Math.max(0, interestSavedReduceEMI) * 100) / 100,
        newTotalInterest: Math.round(Math.max(0, newTotalInterestReduceEMI) * 100) / 100
      },

      reduceTenure: {
        newEMI: Math.round(currentEMI * 100) / 100,
        newTenure: newTenureReduceTenure,
        monthsSaved: Math.max(0, monthsSaved),
        interestSaved: Math.round(Math.max(0, interestSavedReduceTenure) * 100) / 100,
        newTotalInterest: Math.round(Math.max(0, newTotalInterestReduceTenure) * 100) / 100
      }
    };
  }

  // ─── Loan Closure ───────────────────────────────────────────────────────────

  /**
   * Calculate total amount needed to close the loan today.
   * Includes outstanding principal (interest is not charged for future months).
   *
   * @param {number} outstanding      - Current outstanding principal
   * @param {number} remainingMonths  - Remaining loan tenure in months
   * @param {number} currentEMI       - Current monthly EMI
   * @returns {object} Closure details
   */
  function calculateLoanClosure(outstanding, remainingMonths, currentEMI) {
    const futureInterestAvoided = (currentEMI * remainingMonths) - outstanding;
    const totalSavings = Math.max(0, futureInterestAvoided);

    return {
      closureAmount: Math.round(outstanding * 100) / 100,
      futureInterestAvoided: Math.round(totalSavings * 100) / 100,
      totalAmountIfContinued: Math.round(currentEMI * remainingMonths * 100) / 100
    };
  }

  // ─── Amortization Schedule ──────────────────────────────────────────────────

  /**
   * Generate full month-by-month amortization schedule.
   * @param {number} principal      - Original loan principal
   * @param {number} annualRate     - Annual interest rate (%)
   * @param {number} tenureMonths   - Total tenure in months
   * @param {number} emisPaid       - EMIs already paid (to highlight paid rows)
   * @returns {Array} Array of monthly schedule objects
   */
  function generateAmortizationSchedule(principal, annualRate, tenureMonths, emisPaid) {
    const r = annualRate === 0 ? 0 : annualRate / (12 * 100);
    const emi = calculateEMI(principal, annualRate, tenureMonths);
    const schedule = [];
    let balance = principal;

    for (let month = 1; month <= tenureMonths; month++) {
      const interestComponent = r === 0 ? 0 : balance * r;
      const principalComponent = emi - interestComponent;
      balance = Math.max(0, balance - principalComponent);

      schedule.push({
        month,
        emi: Math.round(emi * 100) / 100,
        principal: Math.round(principalComponent * 100) / 100,
        interest: Math.round(interestComponent * 100) / 100,
        balance: Math.round(balance * 100) / 100,
        isPaid: month <= emisPaid
      });

      if (balance <= 0.01) break;
    }

    return schedule;
  }

  // ─── Full Loan Summary ──────────────────────────────────────────────────────

  /**
   * Master function — runs all calculations and returns a unified results object.
   * @param {object} inputs - All user inputs from the form
   * @returns {object} Complete loan analysis results
   */
  function computeFullAnalysis(inputs) {
    const {
      borrowerName, loanType,
      loanAmount, annualRate, tenureMonths, emisPaid,
      prepaymentAmount
    } = inputs;

    const P = parseFloat(loanAmount) || 0;
    const rate = parseFloat(annualRate) || 0;
    const n = parseInt(tenureMonths) || 0;
    const k = parseInt(emisPaid) || 0;
    const prepay = parseFloat(prepaymentAmount) || 0;

    // Core EMI
    const emi = calculateEMI(P, rate, n);
    const totalPayable = emi * n;
    const totalInterest = totalPayable - P;

    // Outstanding after k EMIs
    const outstandingData = calculateOutstanding(P, rate, n, k);
    const { outstanding, remainingMonths } = outstandingData;

    // Prepayment (only if prepayment > 0 and valid)
    let prepaymentData = null;
    if (prepay > 0 && prepay <= outstanding) {
      prepaymentData = analyzePrepayment(outstanding, rate, remainingMonths, emi, prepay);
    }

    // Loan Closure
    const closureData = calculateLoanClosure(outstanding, remainingMonths, emi);

    // Amortization
    const schedule = generateAmortizationSchedule(P, rate, n, k);

    return {
      inputs: { borrowerName, loanType, loanAmount: P, annualRate: rate, tenureMonths: n, emisPaid: k, prepaymentAmount: prepay },
      emi: Math.round(emi * 100) / 100,
      totalPayable: Math.round(totalPayable * 100) / 100,
      totalInterest: Math.round(Math.max(0, totalInterest) * 100) / 100,
      outstanding: outstandingData,
      prepayment: prepaymentData,
      closure: closureData,
      schedule,
      timestamp: new Date().toISOString()
    };
  }

  // ─── Validation ─────────────────────────────────────────────────────────────

  /**
   * Validate all user inputs and return array of error messages.
   * @param {object} inputs - Raw form inputs
   * @returns {Array} Array of error strings (empty = valid)
   */
  function validateInputs(inputs) {
    const errors = [];
    const P = parseFloat(inputs.loanAmount);
    const rate = parseFloat(inputs.annualRate);
    const n = parseInt(inputs.tenureMonths);
    const k = parseInt(inputs.emisPaid);
    const prepay = parseFloat(inputs.prepaymentAmount) || 0;

    if (!P || P <= 0) errors.push("loan_amount_error");
    if (isNaN(rate) || rate < 0) errors.push("rate_error");
    if (!n || n <= 0) errors.push("tenure_error");
    if (isNaN(k) || k < 0) errors.push("emis_paid_error");
    if (k > n) errors.push("emis_exceed_error");

    if (errors.length === 0 && prepay > 0) {
      const outstandingData = calculateOutstanding(P, rate, n, k);
      if (prepay > outstandingData.outstanding) errors.push("prepayment_exceed_error");
    }

    return errors;
  }

  // ─── Utilities ───────────────────────────────────────────────────────────────

  /**
   * Format number as Indian currency string
   * @param {number} num
   * @returns {string}
   */
  function formatINR(num) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.round(num));
  }

  /**
   * Format a month count as "X yrs Y mo" string
   * @param {number} months
   * @returns {string}
   */
  function formatTenure(months) {
    const y = Math.floor(months / 12);
    const m = months % 12;
    if (y === 0) return `${m} mo`;
    if (m === 0) return `${y} yr${y > 1 ? "s" : ""}`;
    return `${y} yr${y > 1 ? "s" : ""} ${m} mo`;
  }

  // Public API
  return {
    calculateEMI,
    calculateOutstanding,
    analyzePrepayment,
    calculateLoanClosure,
    generateAmortizationSchedule,
    computeFullAnalysis,
    validateInputs,
    formatINR,
    formatTenure
  };

})();
