/**
 * translations.js — Smart Loan Planner & Prepayment Analyzer
 * All UI strings in English, Hindi (हिन्दी), and Telugu (తెలుగు).
 */

"use strict";

const Translations = {

  en: {
    // App
    appName: "Smart EMI Loan Planner",
    language_name: "English",
    loan_closed: "Loan Fully Closed",
    appTagline: "Plan smarter. Pay less interest.",
    nav_home: "Calculator",
    nav_about: "About",
    nav_privacy: "Privacy",

    // Form
    section_loan_details: "Loan Details",
    label_borrower_name: "Borrower Name",
    label_loan_type: "Loan Type",
    label_loan_amount: "Loan Amount (₹)",
    label_annual_rate: "Annual Interest Rate (%)",
    label_tenure: "Loan Tenure (Months)",
    label_emis_paid: "EMIs Already Paid",
    label_prepayment: "Prepayment Amount (₹)",
    placeholder_name: "Enter borrower name",
    placeholder_amount: "e.g. 500000",
    placeholder_rate: "e.g. 12",
    placeholder_tenure: "e.g. 60",
    placeholder_emis_paid: "e.g. 12",
    placeholder_prepayment: "e.g. 50000 (optional)",
    btn_calculate: "Calculate",
    btn_reset: "Reset",
    btn_save: "Save Record",

    // Loan types
    loan_bike: "Bike Loan",
    loan_car: "Car Loan",
    loan_home: "Home Loan",
    loan_personal: "Personal Loan",
    loan_education: "Education Loan",
    loan_custom: "Custom Loan",

    // Results
    section_emi: "EMI Summary",
    label_monthly_emi: "Monthly EMI",
    label_total_payable: "Total Amount Payable",
    label_total_interest: "Total Interest",
    label_loan_amount_res: "Loan Amount",

    section_outstanding: "Outstanding Balance",
    label_outstanding: "Outstanding Principal",
    label_principal_paid: "Principal Paid So Far",
    label_interest_paid: "Interest Paid So Far",
    label_remaining_months: "Remaining Months",

    section_prepayment: "Prepayment Analysis",
    label_no_prepayment: "Enter a prepayment amount to see impact analysis.",
    tab_reduce_emi: "Reduce EMI",
    tab_reduce_tenure: "Reduce Tenure",
    label_new_emi: "New Monthly EMI",
    label_new_tenure: "New Remaining Tenure",
    label_interest_saved: "Interest Saved",
    label_months_saved: "Months Saved",
    label_old_emi: "Current EMI",
    label_original_interest: "Original Remaining Interest",
    recommended: "Recommended",

    section_closure: "Loan Closure Today",
    label_closure_amount: "Amount to Close Loan",
    label_future_interest: "Future Interest Avoided",
    label_continued_total: "Total if Continued",
    closure_note: "Closing the loan today avoids future interest entirely.",

    section_amortization: "Amortization Schedule",
    col_month: "Month",
    col_emi: "EMI",
    col_principal: "Principal",
    col_interest: "Interest",
    col_balance: "Balance",
    amort_paid_label: "Paid",
    show_full_schedule: "Show Full Schedule",
    hide_schedule: "Hide Schedule",

    section_export: "Export Summary",
    btn_copy: "Copy Summary",
    btn_download: "Download TXT",
    copied: "Copied!",
    downloaded: "Downloaded!",

    section_history: "Loan History",
    history_empty: "No saved records yet. Calculate and save a loan to see history.",
    btn_load: "Load",
    btn_delete: "Delete",
    btn_clear_all: "Clear All",
    confirm_clear: "Clear all saved records?",
    record_saved: "Record saved successfully.",
    record_deleted: "Record deleted.",
    records_cleared: "All records cleared.",

    // Validation errors
    loan_amount_error: "Loan amount must be greater than ₹0.",
    rate_error: "Interest rate cannot be negative.",
    tenure_error: "Loan tenure must be at least 1 month.",
    emis_paid_error: "EMIs paid cannot be negative.",
    emis_exceed_error: "EMIs already paid cannot exceed total tenure.",
    prepayment_exceed_error: "Prepayment amount cannot exceed outstanding principal.",

    // Misc
    months: "months",
    years: "years",
    na: "N/A",
    footer: "© 2026 Smart EMI Loan Planner. All calculations are estimates for planning purposes only."
  },

  hi: {
    appName: "स्मार्ट EMI लोन प्लानर",
    language_name: "हिन्दी",
    loan_closed: "लोन पूरी तरह बंद हो चुका है",
    appTagline: "समझदारी से योजना बनाएं। कम ब्याज दें।",
    nav_home: "कैलकुलेटर",
    nav_about: "परिचय",
    nav_privacy: "गोपनीयता",

    section_loan_details: "लोन विवरण",
    label_borrower_name: "उधारकर्ता का नाम",
    label_loan_type: "लोन प्रकार",
    label_loan_amount: "लोन राशि (₹)",
    label_annual_rate: "वार्षिक ब्याज दर (%)",
    label_tenure: "लोन अवधि (महीने)",
    label_emis_paid: "पहले से भरी गई EMI",
    label_prepayment: "अग्रिम भुगतान राशि (₹)",
    placeholder_name: "उधारकर्ता का नाम दर्ज करें",
    placeholder_amount: "जैसे 500000",
    placeholder_rate: "जैसे 12",
    placeholder_tenure: "जैसे 60",
    placeholder_emis_paid: "जैसे 12",
    placeholder_prepayment: "जैसे 50000 (वैकल्पिक)",
    btn_calculate: "गणना करें",
    btn_reset: "रीसेट",
    btn_save: "रिकॉर्ड सहेजें",

    loan_bike: "बाइक लोन",
    loan_car: "कार लोन",
    loan_home: "होम लोन",
    loan_personal: "पर्सनल लोन",
    loan_education: "एजुकेशन लोन",
    loan_custom: "कस्टम लोन",

    section_emi: "EMI सारांश",
    label_monthly_emi: "मासिक EMI",
    label_total_payable: "कुल देय राशि",
    label_total_interest: "कुल ब्याज",
    label_loan_amount_res: "लोन राशि",

    section_outstanding: "बकाया बैलेंस",
    label_outstanding: "बकाया मूलधन",
    label_principal_paid: "अब तक चुकाया गया मूलधन",
    label_interest_paid: "अब तक चुकाया गया ब्याज",
    label_remaining_months: "शेष महीने",

    section_prepayment: "अग्रिम भुगतान विश्लेषण",
    label_no_prepayment: "प्रभाव देखने के लिए अग्रिम भुगतान राशि दर्ज करें।",
    tab_reduce_emi: "EMI कम करें",
    tab_reduce_tenure: "अवधि कम करें",
    label_new_emi: "नई मासिक EMI",
    label_new_tenure: "नई शेष अवधि",
    label_interest_saved: "बचाया गया ब्याज",
    label_months_saved: "बचाए गए महीने",
    label_old_emi: "वर्तमान EMI",
    label_original_interest: "मूल शेष ब्याज",
    recommended: "अनुशंसित",

    section_closure: "आज लोन बंद करें",
    label_closure_amount: "लोन बंद करने की राशि",
    label_future_interest: "बचाया गया भविष्य का ब्याज",
    label_continued_total: "जारी रहने पर कुल राशि",
    closure_note: "आज लोन बंद करने से भविष्य का ब्याज पूरी तरह बचता है।",

    section_amortization: "किश्त अनुसूची",
    col_month: "महीना",
    col_emi: "EMI",
    col_principal: "मूलधन",
    col_interest: "ब्याज",
    col_balance: "शेष",
    amort_paid_label: "चुकाया",
    show_full_schedule: "पूरी अनुसूची देखें",
    hide_schedule: "अनुसूची छुपाएं",

    section_export: "सारांश निर्यात करें",
    btn_copy: "कॉपी करें",
    btn_download: "TXT डाउनलोड करें",
    copied: "कॉपी हो गया!",
    downloaded: "डाउनलोड हो गया!",

    section_history: "लोन इतिहास",
    history_empty: "अभी तक कोई रिकॉर्ड सहेजा नहीं गया।",
    btn_load: "लोड करें",
    btn_delete: "हटाएं",
    btn_clear_all: "सभी हटाएं",
    confirm_clear: "सभी सहेजे गए रिकॉर्ड साफ करें?",
    record_saved: "रिकॉर्ड सफलतापूर्वक सहेजा गया।",
    record_deleted: "रिकॉर्ड हटाया गया।",
    records_cleared: "सभी रिकॉर्ड साफ किए गए।",

    loan_amount_error: "लोन राशि ₹0 से अधिक होनी चाहिए।",
    rate_error: "ब्याज दर नकारात्मक नहीं हो सकती।",
    tenure_error: "लोन अवधि कम से कम 1 महीना होनी चाहिए।",
    emis_paid_error: "भरी गई EMI नकारात्मक नहीं हो सकती।",
    emis_exceed_error: "भरी गई EMI कुल अवधि से अधिक नहीं हो सकती।",
    prepayment_exceed_error: "अग्रिम भुगतान राशि बकाया मूलधन से अधिक नहीं हो सकती।",

    months: "महीने",
    years: "साल",
    na: "N/A",
    footer: "© 2026 स्मार्ट EMI लोन प्लानर। सभी गणनाएं केवल योजना उद्देश्यों के लिए अनुमान हैं।"
  },

  te: {
    appName: "స్మార్ట్ EMI లోన్ ప్లానర్",
    language_name: "తెలుగు",
    loan_closed: "లోన్ పూర్తిగా ముగిసింది",
    appTagline: "తెలివిగా ప్లాన్ చేయండి. తక్కువ వడ్డీ చెల్లించండి.",
    nav_home: "కాలిక్యులేటర్",
    nav_about: "గురించి",
    nav_privacy: "గోప్యత",

    section_loan_details: "లోన్ వివరాలు",
    label_borrower_name: "రుణగ్రహీత పేరు",
    label_loan_type: "లోన్ రకం",
    label_loan_amount: "లోన్ మొత్తం (₹)",
    label_annual_rate: "వార్షిక వడ్డీ రేటు (%)",
    label_tenure: "లోన్ వ్యవధి (నెలలు)",
    label_emis_paid: "ఇప్పటికే చెల్లించిన EMI లు",
    label_prepayment: "అదనపు చెల్లింపు మొత్తం (₹)",
    placeholder_name: "రుణగ్రహీత పేరు నమోదు చేయండి",
    placeholder_amount: "ఉదా. 500000",
    placeholder_rate: "ఉదా. 12",
    placeholder_tenure: "ఉదా. 60",
    placeholder_emis_paid: "ఉదా. 12",
    placeholder_prepayment: "ఉదా. 50000 (ఐచ్ఛికం)",
    btn_calculate: "లెక్కించండి",
    btn_reset: "రీసెట్",
    btn_save: "రికార్డు సేవ్ చేయండి",

    loan_bike: "బైక్ లోన్",
    loan_car: "కార్ లోన్",
    loan_home: "హోమ్ లోన్",
    loan_personal: "పర్సనల్ లోన్",
    loan_education: "ఎడ్యుకేషన్ లోన్",
    loan_custom: "కస్టమ్ లోన్",

    section_emi: "EMI సారాంశం",
    label_monthly_emi: "నెలవారీ EMI",
    label_total_payable: "చెల్లించాల్సిన మొత్తం",
    label_total_interest: "మొత్తం వడ్డీ",
    label_loan_amount_res: "లోన్ మొత్తం",

    section_outstanding: "పెండింగ్ బ్యాలెన్స్",
    label_outstanding: "మిగిలిన అసలు",
    label_principal_paid: "ఇప్పటివరకు చెల్లించిన అసలు",
    label_interest_paid: "ఇప్పటివరకు చెల్లించిన వడ్డీ",
    label_remaining_months: "మిగిలిన నెలలు",

    section_prepayment: "అదనపు చెల్లింపు విశ్లేషణ",
    label_no_prepayment: "ప్రభావం చూడటానికి అదనపు చెల్లింపు మొత్తం నమోదు చేయండి.",
    tab_reduce_emi: "EMI తగ్గించండి",
    tab_reduce_tenure: "వ్యవధి తగ్గించండి",
    label_new_emi: "కొత్త నెలవారీ EMI",
    label_new_tenure: "కొత్త మిగిలిన వ్యవధి",
    label_interest_saved: "ఆదా అయిన వడ్డీ",
    label_months_saved: "ఆదా అయిన నెలలు",
    label_old_emi: "ప్రస్తుత EMI",
    label_original_interest: "అసలు మిగిలిన వడ్డీ",
    recommended: "సిఫారసు చేయబడింది",

    section_closure: "ఈరోజు లోన్ మూసివేయండి",
    label_closure_amount: "లోన్ మూసివేయడానికి మొత్తం",
    label_future_interest: "భవిష్యత్తు వడ్డీ ఆదా",
    label_continued_total: "కొనసాగిస్తే మొత్తం",
    closure_note: "ఈరోజు లోన్ మూసివేయడం వల్ల భవిష్యత్తు వడ్డీ పూర్తిగా ఆదా అవుతుంది.",

    section_amortization: "వాయిదా షెడ్యూల్",
    col_month: "నెల",
    col_emi: "EMI",
    col_principal: "అసలు",
    col_interest: "వడ్డీ",
    col_balance: "బ్యాలెన్స్",
    amort_paid_label: "చెల్లించారు",
    show_full_schedule: "పూర్తి షెడ్యూల్ చూపించు",
    hide_schedule: "షెడ్యూల్ దాచు",

    section_export: "సారాంశం ఎగుమతి",
    btn_copy: "కాపీ చేయండి",
    btn_download: "TXT డౌన్లోడ్",
    copied: "కాపీ అయింది!",
    downloaded: "డౌన్లోడ్ అయింది!",

    section_history: "లోన్ చరిత్ర",
    history_empty: "ఇంకా ఏ రికార్డులు సేవ్ చేయబడలేదు.",
    btn_load: "లోడ్ చేయండి",
    btn_delete: "తొలగించండి",
    btn_clear_all: "అన్నీ తొలగించు",
    confirm_clear: "అన్ని సేవ్ చేసిన రికార్డులు తొలగించాలా?",
    record_saved: "రికార్డు విజయవంతంగా సేవ్ చేయబడింది.",
    record_deleted: "రికార్డు తొలగించబడింది.",
    records_cleared: "అన్ని రికార్డులు తొలగించబడ్డాయి.",

    loan_amount_error: "లోన్ మొత్తం ₹0 కంటే ఎక్కువగా ఉండాలి.",
    rate_error: "వడ్డీ రేటు ప్రతికూలంగా ఉండకూడదు.",
    tenure_error: "లోన్ వ్యవధి కనీసం 1 నెల ఉండాలి.",
    emis_paid_error: "చెల్లించిన EMI లు ప్రతికూలంగా ఉండకూడదు.",
    emis_exceed_error: "చెల్లించిన EMI లు మొత్తం వ్యవధి కంటే ఎక్కువగా ఉండకూడదు.",
    prepayment_exceed_error: "అదనపు చెల్లింపు మొత్తం మిగిలిన అసలు కంటే ఎక్కువగా ఉండకూడదు.",

    months: "నెలలు",
    years: "సంవత్సరాలు",
    na: "వర్తించదు",
    footer: "© 2026 స్మార్ట్ EMI లోన్ ప్లానర్. అన్ని లెక్కలు ప్రణాళిక అవసరాల కోసం అంచనాలు మాత్రమే."
  }

};

// Active language
let currentLang = localStorage.getItem("slp_language") || "en";

function setLanguage(lang) {
  if (Translations[lang]) {
    currentLang = lang;
    localStorage.setItem("slp_language", lang);
  }
}

function t(key) {
  return (Translations[currentLang] && Translations[currentLang][key])
    ? Translations[currentLang][key]
    : (Translations["en"][key] || key);
}

function getCurrentLang() { return currentLang; }
