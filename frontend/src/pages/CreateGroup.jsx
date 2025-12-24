import { useState } from "react";
import API from "../services/api";

function CreateGroup() {
  const [name, setName] = useState("");
  const [members, setMembers] = useState("");

  const createGroup = async () => {
    await API.post("/groups/create", {
      name,
      members: members.split(",")
    });
    alert("Group Created");
  };

  return (
  <div className="card">
    <h2>Create Group</h2>

    <div className="row">
      <input
        placeholder="Group Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Members (comma separated)"
        onChange={(e) => setMembers(e.target.value)}
      />

      <button className="btn-primary" onClick={createGroup}>
        Create
      </button>
    </div>
  </div>
);

}

export default CreateGroup;
