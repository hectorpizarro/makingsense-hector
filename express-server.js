const express = require("express");
const path = require("path");
const logger = require("morgan");
const Axios = require("Axios");
require("dotenv").config();

Axios.defaults.baseURL = process.env.BASE_URL;
Axios.defaults.headers.common["Referer"] = process.env.REFERER;

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// All React assets are static, server as requested
app.use(express.static(path.join(__dirname, "build")));

// === Route paths

// /ping route for testing purposes
app.get("/ping", (req, res) => res.send("pong")); // Test API

app.get("/characters", async (req, res) => {
  const { offset, orderBy, limit } = req.query;
  const params = {
    offset,
    orderBy,
    limit,
    apikey: process.env.REACT_APP_MARVEL_API_KEY
  };
  try {
    const response = await Axios.get("/characters", { params });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.message);
  }
});

app.get("/characters/:id", async (req, res) => {
  const { id } = req.params;
  const params = { apikey: process.env.REACT_APP_MARVEL_API_KEY };
  try {
    const response = await Axios.get(`/characters/${id}`, { params });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.message);
  }
});

// Default route loads build/index.html
app.use((req, res) =>
  res.sendFile(path.join(__dirname, "build", "index.html"))
);

app.listen(process.env.PORT || 9001);
