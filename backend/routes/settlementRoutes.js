const router = require("express").Router();
const { settleUp } = require("../controllers/settlementController");

router.post("/settle", settleUp);

module.exports = router;
