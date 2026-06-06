import ExpenseChart from "./ExpenseChart";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Login from "./components/Login";

function App() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
const [filterCategory, setFilterCategory] = useState("all");

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
  `https://fullstack-expense-tracker-1-34rh.onrender.com/api/transactions?userId=${localStorage.getItem("userId")}`
);

      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
  const loadData = async () => {
    await fetchTransactions();
  };

  loadData();
}, []);

  const addTransaction = async () => {
    if (!amount || !category) {
      alert("Please enter amount and category");
      return;
    }

    const newTransaction = {
  amount,
  type,
  category,
  note,
  userId: localStorage.getItem("userId"),
};

    try {
      if (editingId) {
  await axios.put(
    `https://fullstack-expense-tracker-1-34rh.onrender.com/api/transactions/${editingId}`,
    newTransaction
  );
} else {
  await axios.post(
    "https://fullstack-expense-tracker-1-34rh.onrender.com/api/transactions",
    newTransaction
  );
}

      await fetchTransactions();

      setAmount("");
      setType("expense");
      setCategory("");
      setNote("");
      setEditingId(null);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const deleteTransaction = async (id) => {
  try {
    await axios.delete(
      `https://fullstack-expense-tracker-1-34rh.onrender.com/api/transactions/${id}`
    );

    fetchTransactions();
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
};

const editTransaction = (transaction) => {
  setAmount(transaction.amount);
  setType(transaction.type);
  setCategory(transaction.category);
  setNote(transaction.note);

  setEditingId(transaction._id);
};

  const balance = transactions.reduce(
    (total, transaction) =>
      transaction.type === "income"
        ? total + Number(transaction.amount)
        : total - Number(transaction.amount),
    0
  );

  const income = transactions.reduce(
  (total, transaction) =>
    transaction.type === "income"
      ? total + Number(transaction.amount)
      : total,
  0
);

const expense = transactions.reduce(
  (total, transaction) =>
    transaction.type === "expense"
      ? total + Number(transaction.amount)
      : total,
  0
);

let funnyMessage = "";

if (balance < 0) {
  funnyMessage =
    "⚠️ Alert: Expenses are higher than income.";
} else if (balance < 500) {
  funnyMessage =
    "📉 Low Balance: Keep an eye on your spending.";
} else if (balance < 2000) {
  funnyMessage =
  "✅ Stable: Your finances are under control.";
} else if (balance < 5000) {
  funnyMessage =
    "📈 Healthy Savings: You're managing money well.";
} else {
  funnyMessage =
    "🏆 Excellent: Strong financial position maintained.";
}



console.log(transactions);

  return (
<div className={`container ${darkMode ? "dark" : ""}`}>
        <h1 className="title">💰 Expense Tracker</h1>
      <button
  className="theme-btn"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>

      <div className="balance-card">
  <h2>💳 Balance</h2>
  <p>₹{balance}</p>
</div>


      <div className="summary">
  <div className="card income-card">
    <h3>💰 Income</h3>
    <p>₹{income}</p>
  </div>

  <div className="card expense-card">
    <h3>💸 Expense</h3>
    <p>₹{expense}</p>
  </div>
</div>

<div className="funny-message">
  {funnyMessage}
</div>

      <div className="form">
        <input
          type="number"
          placeholder="Enter Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select type</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Others">Others</option>
        </select>

        <input
          type="text"
          placeholder="Description"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button onClick={addTransaction}>
  {editingId ? "Update Transaction" : "Add Transaction"}
</button>
      </div>
      <ExpenseChart transactions={transactions} />
      <input
  type="text"
  placeholder="🔍 Search transactions..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="search-box"
/>
<div className="filters">

  <select
    value={filterType}
    onChange={(e) => setFilterType(e.target.value)}
  >
    <option value="all">All Types</option>
    <option value="income">Income</option>
    <option value="expense">Expense</option>
  </select>

  <select
    value={filterCategory}
    onChange={(e) => setFilterCategory(e.target.value)}
  >
    <option value="all">All Categories</option>
    <option value="Food">Food</option>
    <option value="Travel">Travel</option>
    <option value="Bills">Bills</option>
    <option value="Shopping">Shopping</option>
    <option value="Entertainment">Entertainment</option>
    <option value="Health">Health</option>
    <option value="Education">Education</option>
    <option value="Others">Others</option>
  </select>

</div>
      <div className="transactions">
        <h3>Transactions</h3>
        

        {transactions
  .filter((transaction) => {
  const matchesSearch =
    transaction.note
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

  const matchesType =
    filterType === "all" ||
    transaction.type === filterType;

  const matchesCategory =
    filterCategory === "all" ||
    transaction.category === filterCategory;

  return (
    matchesSearch &&
    matchesType &&
    matchesCategory
  );
})
  .map((transaction) => (
  <div
    key={transaction._id}
   className={`transaction-item ${
  transaction.type === "income"
    ? "income-transaction"
    : "expense-transaction"
}`}
  >
   <div>
  <strong>
    {transaction.type === "income" ? "💰" : "💸"} {transaction.category}
  </strong>

  <p>₹{transaction.amount}</p>

  <div>
  <small>{transaction.note}</small>

  <br />

  <small>
    📅 {new Date(transaction.date).toLocaleDateString()}
  </small>

  <br />

  <small>
    🕒 {new Date(transaction.date).toLocaleTimeString()}
  </small>
</div>
</div>
    <button
  onClick={() => editTransaction(transaction)}
  className="edit-btn"
>
  ✏️
</button>
    <button
      onClick={() => deleteTransaction(transaction._id)}
      className="delete-btn"
    >
      🗑
    </button>
  </div>
))}
      </div>
    </div>
  );
}

export default App;