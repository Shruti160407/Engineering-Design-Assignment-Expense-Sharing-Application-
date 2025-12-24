const router = require("express").Router();
const { addExpense } = require("../controllers/expenseController");
const expenseController = require("../controllers/expenseController");

router.post("/add", addExpense);

router.get("/group/:groupId", expenseController.getExpensesByGroup);


module.exports = router;
