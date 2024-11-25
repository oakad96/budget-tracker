# Budget Tracker Application

A modern web application for tracking personal finances, built with Next.js, TypeScript, and Tailwind CSS. Features include expense tracking, income management, interactive charts and graphs, PDF report generation, and category-based analysis.

## Features

- Track income and expenses with detailed categorization
- Visualize spending patterns with interactive charts
- Generate detailed PDF financial reports
- Filter and analyze transactions by date ranges
- Responsive design that works on desktop and mobile
- Dark mode support

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/budget-tracker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd budget-tracker
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Add your income and expenses
2. Categorize your transactions
3. View reports and analytics
4. Export financial reports as PDF

## Technologies Used

- Next.js 13+
- TypeScript
- Tailwind CSS
- Shadcn UI
- jsPDF
- recharts

## Fake Data

Paste following script to console to generate fake data.

```typescript
(() => {
  const CATEGORIES = [
    "Housing",
    "Utilities",
    "Food",
    "Transportation",
    "Healthcare",
    "Entertainment",
  ];

  // Simple UUID generator for the browser
  function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const transactions = [];
  const now = new Date();

  // Generate data for the last 12 months
  for (let month = 11; month >= 0; month--) {
    const date = new Date();
    date.setMonth(now.getMonth() - month);

    // Generate 8-12 transactions per month
    const transactionsCount = Math.floor(Math.random() * 5) + 8;

    for (let i = 0; i < transactionsCount; i++) {
      const category =
        CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      const type = Math.random() > 0.3 ? "expense" : "income";
      const amount = Math.floor(Math.random() * 900) + 100;

      const randomDay = Math.floor(Math.random() * 28) + 1;
      date.setDate(randomDay);

      transactions.push({
        id: uuidv4(),
        type,
        amount,
        category,
        description: `${type} for ${category}`,
        date: date.toISOString(),
      });
    }
  }

  const budgets = CATEGORIES.map((category) => ({
    category,
    limit: Math.floor(Math.random() * 1000) + 1000,
  }));

  const budgetData = {
    transactions,
    budgets,
  };

  // Save to localStorage
  localStorage.setItem("budgetData", JSON.stringify(budgetData));

  console.log("Sample data generated and saved to localStorage!");
  console.log("Generated:", budgetData);

  return "Data generation complete! Refresh the page to see the changes.";
})();
```
