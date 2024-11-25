const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const APPID = process.env.APPID;
const LANGUAGE = process.env.LANGUAGE;

// [GET] /
module.exports.index = (req, res) => {
  console.log("WTF");
  res.render("index.html");
};

// [GET] /api/weather
module.exports.weather = async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  if (/\d/.test(city)) {
    return res
      .status(400)
      .json({ error: "City name must not contain numbers" });
  }

  const prompt = `Give me a name and country of it don't give anymore. For example: Ho Chi Minh City, VN. Now give me info about it ${city}. Remember only give it in english format`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const cityGenerativeAI = response
    .text()
    .trim()
    .replace(/[\r\n]+/g, "");

  console.log(cityGenerativeAI);
  const apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityGenerativeAI}&lang=${LANGUAGE}&APPID=${APPID}`;
  axios
    .get(apiWeather)
    .then((response) => {
      const data = response.data;
      const basicData = {
        location: data.name,
        country: data.sys.country,
        coordinates: `Lat: ${data.coord.lat}, Lon: ${data.coord.lon}`,
        temperature: data.main.temp,
        weather: data.weather[0].main,
        description: data.weather[0].description,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        rainLastHour: data.rain?.["1h"] || "No data",
      };
      res.json(basicData);
    })
    .catch((error) => {
      res.status(500).json({ error: `Not valid city name ${city}` });
    });
};
