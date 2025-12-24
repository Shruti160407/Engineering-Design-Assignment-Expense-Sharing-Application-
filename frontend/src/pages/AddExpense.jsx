import { useEffect, useState } from "react";
import API from "../services/api";

function AddExpense() {
  const [data, setData] = useState({
    groupId: "",
    description: "",
    amount: "",
    paidBy: "",
    splitType: "EQUAL"
  });

  const [members, setMembers] = useState([]);
  const [splitValues, setSplitValues] = useState({});

  // Fetch group members when groupId changes
  useEffect(() => {
    const fetchGroup = async () => {
      if (!data.groupId) return;
      try {
        const res = await API.get(`/groups/${data.groupId}`);
        setMembers(res.data.members);

        // Initialize split inputs
        const initial = {};
        res.data.members.forEach(m => (initial[m] = ""));
        setSplitValues(initial);
      } catch (err) {
        setMembers([]);
      }
    };

    fetchGroup();
  }, [data.groupId]);

  const handleSplitChange = (user, value) => {
    setSplitValues({ ...splitValues, [user]: value });
  };

  const submitExpense = async () => {
    let splits = [];

    if (data.splitType === "EQUAL") {
      const share = data.amount / members.length;
      splits = members.map(m => ({ user: m, value: share }));
    }

    if (data.splitType === "EXACT") {
      splits = Object.entries(splitValues).map(([user, value]) => ({
        user,
        value: Number(value)
      }));
    }

    if (data.splitType === "PERCENT") {
      splits = Object.entries(splitValues).map(([user, percent]) => ({
        user,
        value: (data.amount * Number(percent)) / 100
      }));
    }

    await API.post("/expenses/add", {
      ...data,
      splits
    });

    alert("Expense Added");
  };

  return (
    <div className="card">
      <h2>Add Expense</h2>

      <div className="row">
        <input
          placeholder="Group ID"
          onChange={e => setData({ ...data, groupId: e.target.value })}
        />
        <input
          placeholder="Description"
          onChange={e => setData({ ...data, description: e.target.value })}
        />
      </div>

      <div className="row">
        <input
          placeholder="Amount"
          type="number"
          onChange={e => setData({ ...data, amount: Number(e.target.value) })}
        />
        <input
          placeholder="Paid By"
          onChange={e => setData({ ...data, paidBy: e.target.value })}
        />
        <select
          onChange={e => setData({ ...data, splitType: e.target.value })}
        >
          <option value="EQUAL">Equal</option>
          <option value="EXACT">Exact</option>
          <option value="PERCENT">Percent</option>
        </select>
      </div>

      {/* Dynamic inputs for EXACT & PERCENT */}
      {data.splitType !== "EQUAL" && members.length > 0 && (
        <div className="card" style={{ background: "#f9f9f9" }}>
          <strong>
            {data.splitType === "EXACT"
              ? "Enter exact amounts"
              : "Enter percentages"}
          </strong>

          {members.map(user => (
            <div className="row" key={user}>
              <label style={{ width: "100px" }}>{user}</label>
              <input
                type="number"
                placeholder={data.splitType === "EXACT" ? "Amount" : "Percent"}
                value={splitValues[user]}
                onChange={e => handleSplitChange(user, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      <button className="btn-success" onClick={submitExpense}>
        Add Expense
      </button>
    </div>
  );
}

export default AddExpense;
