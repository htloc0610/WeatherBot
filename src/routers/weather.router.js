const express = require("express");
const router = express.Router();

// define the home page route
router.get("/", (req, res) => {
  res.render("index.html");
});

router.post("/api/weather", (req, res) => {
  console.log(req.params);

  res.json({ message: "Nice" });
});

module.exports = router;
