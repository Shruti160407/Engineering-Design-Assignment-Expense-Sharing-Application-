import CreateGroup from "./pages/CreateGroup";
import AddExpense from "./pages/AddExpense";
import Balances from "./pages/Balances";

function App() {
  return (
    <div className="app-container">
      <h1>Expense Splitter</h1>
      <CreateGroup />
      <AddExpense />
      <Balances />
    </div>
  );
}

export default App;
