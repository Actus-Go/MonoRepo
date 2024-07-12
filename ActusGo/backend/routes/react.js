const express = require("express");
const { reactPost, getReacts } = require("../controllers/react");
const { authUser } = require("../middlwares/auth");

const router = express.Router();
router.put("/reactPost", authUser, reactPost);
router.get("/getReacts/:id", authUser, getReacts);
module.exports = router;
