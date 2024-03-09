import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

const API_URL = "https://api.openweathermap.org/data/2.5/weather?";

// "https://api.openweathermap.org/data/2.5/weather?q=orlando&appid=8f325a133259c7862911e0823f225d6a"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs", { data: "" });
});

app.post("/", async (req, res) => {
  try {
    let search = req.body.search;

    const url = `${API_URL}q=${search}&appid=${process.env.API_KEY}&units=imperial`;
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
