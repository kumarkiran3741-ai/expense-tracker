const STORAGE_KEY = "expense-tracker-transactions";

// Get transactions from Local Storage
export const getTransactions = () => {
  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
};

// Save transactions to Local Storage
export const saveTransactions = (transactions) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(transactions)
  );
};