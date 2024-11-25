const express = require("express");
const router = express.Router();

const controller = require("../controllers/weather.controller");

// define the home page route
router.get("/", controller.index);

router.get("/api/weather", controller.weather);

module.exports = router;
