const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/groups", require("./routes/groupRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/settlements", require("./routes/settlementRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
