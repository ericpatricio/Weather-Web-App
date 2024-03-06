import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
const APIKey = "8f325a133259c7862911e0823f225d6a";

// "https://api.openweathermap.org/data/2.5/weather?q=orlando&appid=8f325a133259c7862911e0823f225d6a"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { data: "" });
});

app.post("/", async (req, res) => {
  try {
    let search = req.body.search;
    // search = getCurrentLocation();

    const url = `${API_URL}q=${search}&appid=${APIKey}&units=imperial`;
    let response = await axios.get(url);
    res.render("index.ejs", { data: response.data });
  } catch (error) {
    res.render("index.ejs", { data: null });
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// Get current geolocation
function getCurrentLocation() {
  const successCallback = position => {
    console.log(position);
  };

  const errorCallback = error => {
    console.log(error);
  };

  return navigator.geolocation.watchPosition(successCallback, errorCallback);
}