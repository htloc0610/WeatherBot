const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

// Router
const route = require("./src/routers/index.router");

// Public file
app.use(express.static(path.join(__dirname, "public")));

// Use router
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
