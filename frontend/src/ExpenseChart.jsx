import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ExpenseChart({ transactions }) {
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const categoryTotals = {};

  expenseTransactions.forEach((transaction) => {
    const category = transaction.category;

    categoryTotals[category] =
      (categoryTotals[category] || 0) +
      Number(transaction.amount);
  });

  const data = {
    labels: Object.keys(categoryTotals),

    datasets: [
  {
    label: "Expenses",
    data: Object.values(categoryTotals),

    backgroundColor: [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#2ECC71",
      "#E74C3C",
    ],

    borderColor: "#ffffff",
    borderWidth: 2,
     hoverOffset: 15,
  },
],
  };

  return (
<div
  style={{
    maxWidth: "380px",
    width: "100%",
    margin: "30px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  }}
>      <h2 className="chart-title">
  📊 Expense Analytics
</h2>
      <Pie
  data={data}
  options={{
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
    },
  }}
/>
    </div>
  );
}

export default ExpenseChart;