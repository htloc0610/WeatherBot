const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

// Use body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Router
const route = require("./src/routers/index.router");

// Public file
app.use(express.static(path.join(__dirname, "public")));

// Use router
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
