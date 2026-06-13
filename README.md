# Smart EMI Loan Planner

A free, privacy-friendly, offline-first loan planning tool that helps borrowers calculate EMI, outstanding balance, prepayment savings, loan closure amount, and amortization schedules.

## Features

* EMI Calculator
* Outstanding Loan Balance Calculator
* Loan Prepayment Analysis
* Reduce EMI vs Reduce Tenure Comparison
* Loan Closure Estimation
* Full Amortization Schedule
* Loan History Storage
* TXT Report Export
* Dark / Light Theme
* Multilingual Support

  * English
  * हिन्दी (Hindi)
  * తెలుగు (Telugu)

## Supported Loan Types

* Personal Loan
* Home Loan
* Car Loan
* Bike Loan
* Education Loan
* Custom Loan

## Technology Stack

* HTML5
* Tailwind CSS
* Vanilla JavaScript (ES6)
* Browser localStorage

No backend server is required.

## Project Structure

```text
smart-emi-loan-planner/
│
├── index.html
├── about.html
├── privacy.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── calculator.js
│   ├── translations.js
│   ├── storage.js
│   ├── export.js
│   └── app.js
│
└── README.md
```

## Calculations Included

### EMI Formula

EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)

Where:

* P = Principal Amount
* r = Monthly Interest Rate
* n = Loan Tenure in Months

### Outstanding Balance

Calculates the remaining principal after a specified number of EMIs.

### Prepayment Analysis

Provides two strategies:

1. Reduce EMI
2. Reduce Tenure

Shows potential interest savings for each option.

### Loan Closure

Calculates:

* Current outstanding principal
* Future interest avoided
* Total amount payable if loan continues

## Privacy

All calculations happen inside the browser.

No data is sent to any server.

Stored locally:

* Loan History
* Language Preference
* Theme Preference

Not used:

* Cookies
* Analytics
* Tracking
* Advertisements

## Running Locally

Simply open:

```text
index.html
```

in any modern browser.

No installation required.

## Deployment

### GitHub Pages

1. Push repository to GitHub
2. Open Settings
3. Open Pages
4. Select:

   * Source: Deploy from branch
   * Branch: main
5. Save

### Vercel

```bash
vercel --prod
```

## Disclaimer

All calculations are estimates based on standard reducing-balance loan formulas.

Actual values may vary depending on lender policies, charges, foreclosure fees, and account-specific conditions.

Always verify final figures with your bank or financial institution.

## License

MIT License
