const express = require("express");

const router = express.Router();
const { registerUser, loginUser, currentUserInfo } = require("../controllers/userController")
const validateToken = require("../middleware/validateTokenHandler")

// middlewhere: helps us validate token which client is sending in request as token

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUserInfo);

module.exports = router;
