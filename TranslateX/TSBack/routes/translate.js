const express = require("express");
const router = express.Router();
const { translateText } = require("../controllers/translateController");

// Endpoint: POST /api/translate
router.post("/", translateText);

module.exports = router;
