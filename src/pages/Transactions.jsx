import { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import {
  getTransactions,
  saveTransactions,
} from "../utils/storage";

function Transactions() {
  const [transactions, setTransactions] = useState(
    () => getTransactions()
  );

  const [editingTransaction, setEditingTransaction] = useState(null);

  // Add a new transaction
  const handleAddTransaction = (newTransaction) => {
    const updatedTransactions = [
      ...transactions,
      newTransaction,
    ];

    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  // Start editing a transaction
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  // Save the updated transaction
  const handleUpdateTransaction = (updatedTransaction) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === updatedTransaction.id
        ? updatedTransaction
        : transaction
    );

    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
    setEditingTransaction(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  return (
    <div className="transactions-page">
      <h1>Transactions</h1>

      <TransactionForm
        onAddTransaction={handleAddTransaction}
        editingTransaction={editingTransaction}
        onUpdateTransaction={handleUpdateTransaction}
        onCancelEdit={handleCancelEdit}
      />

      <h2>Transaction History</h2>

      {transactions.length === 0 ? (
        <p>No transactions yet. Add your first transaction!</p>
      ) : (
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div>
                <h3>{transaction.description}</h3>
                <p>
                  {transaction.category} | {transaction.date}
                </p>
              </div>

              <strong>
                {transaction.type === "income" ? "+" : "-"}
                ₹{transaction.amount.toLocaleString("en-IN")}
              </strong>

              <button onClick={() => handleEdit(transaction)}>
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Transactions;