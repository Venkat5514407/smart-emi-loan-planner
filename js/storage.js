/**
 * storage.js — Smart Loan Planner & Prepayment Analyzer
 * All localStorage operations for loan history.
 */

"use strict";

const Storage = (() => {

  const STORAGE_KEY = "smart_loan_planner_records";
  const MAX_RECORDS = 100;

  /** Return parsed records array, or empty array on failure. */
  function getAllRecords() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn("SLP: Failed to parse records from localStorage.", e);
      return [];
    }
  }

  /** Persist records array back to localStorage. */
  function _saveAll(records) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      return true;
    } catch (e) {
      console.error("SLP: Failed to save records to localStorage.", e);
      return false;
    }
  }

  /**
   * Save a new calculation record.
   * @param {object} data - Full results object from Calculator.computeFullAnalysis()
   * @returns {string|null} Unique ID of saved record, or null on failure
   */
  function saveRecord(data) {
    const records = getAllRecords();

    const id = `slp_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 7)}`;

    const record = {
      id,
      savedAt: new Date().toISOString(),

      borrowerName: data?.inputs?.borrowerName || "—",
      loanType: data?.inputs?.loanType || "Custom Loan",
      loanAmount: data?.inputs?.loanAmount || 0,
      annualRate: data?.inputs?.annualRate || 0,
      tenureMonths: data?.inputs?.tenureMonths || 0,
      emisPaid: data?.inputs?.emisPaid || 0,
      prepaymentAmount: data?.inputs?.prepaymentAmount || 0,

      emi: data?.emi || 0,
      outstanding: data?.outstanding?.outstanding || 0,

      snapshot: data
    };

    // Newest records first
    records.unshift(record);

    // Prevent unlimited localStorage growth
    if (records.length > MAX_RECORDS) {
      records.length = MAX_RECORDS;
    }

    if (_saveAll(records)) {
      return id;
    }

    return null;
  }

  /**
   * Load a full snapshot by ID.
   * @param {string} id
   * @returns {object|null}
   */
  function getRecord(id) {
    const records = getAllRecords();
    const found = records.find(r => r.id === id);
    return found ? found.snapshot : null;
  }

  /**
   * Delete a record by ID.
   * @param {string} id
   * @returns {boolean}
   */
  function deleteRecord(id) {
    const records = getAllRecords();
    const filtered = records.filter(r => r.id !== id);
    return _saveAll(filtered);
  }

  /** Remove all records. */
  function clearAllRecords() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (e) {
      console.error("SLP: Failed to clear records.", e);
      return false;
    }
  }

  /** Return count of saved records. */
  function getCount() {
    return getAllRecords().length;
  }

  return {
    saveRecord,
    getAllRecords,
    getRecord,
    deleteRecord,
    clearAllRecords,
    getCount
  };

})();
