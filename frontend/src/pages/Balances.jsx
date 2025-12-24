import { useState } from "react";
import API from "../services/api";

function Balances() {
  const [groupId, setGroupId] = useState("");
  const [balances, setBalances] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);

 const getExpenseBalance = () => {
  if (!selectedExpense) return balances;

  const exp = expenses.find(e => e._id === selectedExpense);
  if (!exp) return {};

  const result = {};
  exp.splits.forEach(s => {
    result[s.user] = -s.value;
  });

  result[exp.paidBy] =
    (result[exp.paidBy] || 0) + exp.amount;

  return result;
};


  const loadBalances = async () => {
  const groupRes = await API.get(`/groups/${groupId}`);
  setBalances(groupRes.data.balances);

  const expenseRes = await API.get(`/expenses/group/${groupId}`);
  setExpenses(expenseRes.data);
};


  // 👇 THIS FUNCTION WAS MISSING
  const getOwesList = () => {
    if (!balances) return [];

    const owes = [];
    const creditors = [];
    const debtors = [];

    Object.entries(balances).forEach(([user, amount]) => {
      if (amount > 0) creditors.push({ user, amount });
      if (amount < 0) debtors.push({ user, amount: -amount });
    });

    debtors.forEach(debtor => {
  creditors.forEach(creditor => {
    // 🚫 Skip self-owes-self
    if (debtor.user === creditor.user) return;

    if (debtor.amount > 0 && creditor.amount > 0) {
      const pay = Math.min(debtor.amount, creditor.amount);
      owes.push(`${debtor.user} owes ${creditor.user} ₹${pay}`);
      debtor.amount -= pay;
      creditor.amount -= pay;
    }
  });
});


    return owes;
  };

  return (
    <div className="card">
      <h2>Balances</h2>

      <div className="row">
        <input
          placeholder="Group ID"
          onChange={(e) => setGroupId(e.target.value)}
        />
        <button className="btn-danger" onClick={loadBalances}>
          View Balances
        </button>
      </div>

      {expenses.length > 0 && (
      <div className="card">
        <h3>Expense History</h3>
        {expenses.map((exp) => (
          <p key={exp._id}>
            {exp.description} – ₹{exp.amount} (Paid by {exp.paidBy})
          </p>
        ))}
      </div>
    )}

    {expenses.length > 0 && (
  <select onChange={(e) => setSelectedExpense(e.target.value)}>
    <option value="">View net group balance</option>
    {expenses.map(exp => (
      <option key={exp._id} value={exp._id}>
        {exp.description} – ₹{exp.amount}
      </option>
    ))}
  </select>
)}

      {balances && (
        <>
          {Object.entries(getExpenseBalance).map(([user, amount]) => (
            <p
              key={user}
              className={amount >= 0 ? "balance-positive" : "balance-negative"}
            >
              {user}: ₹{amount}
            </p>
          ))}

          <div className="owes-box">
            <strong>Who owes whom:</strong>
            {getOwesList().map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Balances;
