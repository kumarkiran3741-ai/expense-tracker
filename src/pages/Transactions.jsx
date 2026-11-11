
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

  const handleAddTransaction = (newTransaction) => {
    const updatedTransactions = [
      ...transactions,
      newTransaction,
    ];

    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  return (
    <div className="transactions-page">
      <h1>Transactions</h1>

      <TransactionForm
        onAddTransaction={handleAddTransaction}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Transactions;
