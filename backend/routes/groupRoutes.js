const router = require("express").Router();
const { createGroup, getGroup } = require("../controllers/groupController");

router.post("/create", createGroup);
router.get("/:id", getGroup);

module.exports = router;
