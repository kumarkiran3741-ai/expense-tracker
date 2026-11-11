const STORAGE_KEY = "expense-tracker-transactions";

// Get saved transactions
export const getTransactions = () => {
  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
};

// Save transactions
export const saveTransactions = (transactions) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(transactions)
  );
};