import { useState } from "react";

function getToday() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  return new Date(today.getTime() - offset * 60000)
    .toISOString()
    .split("T")[0];
}

function TransactionForm({onAddTransaction }) {
  const [type, setType] = useState("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(getToday());

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim() || Number(amount) <= 0 || !date) 
     {
      alert("Please enter valid transaction details.");
      return;
    }

    const newTransaction = {
      id: crypto.randomUUID(),
      type,
      description: description.trim(),
      amount: Number(amount),
      category,
      date,
    };

    onAddTransaction(newTransaction);

    // Clear the form
    setDescription("");
    setAmount("");
    setCategory("Food");
    setDate(getToday());
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h2>Add Transaction</h2>

      <label>Transaction Type</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <label>Description</label>
      <input
        type="text"
        placeholder="Example: Monthly salary"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label>Amount (₹)</label>
      <input
        type="number"
        placeholder="Enter amount"
        min="0.01"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <label>Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Salary">Salary</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
      </select>

      <label>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;