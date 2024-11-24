const weather = require("./weather.router");

module.exports = (app) => {
  app.use("/", weather);
};
