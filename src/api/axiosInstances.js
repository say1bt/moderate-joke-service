const axios = require("axios");
const { LOCALHOST_BASE_URL } = require("../constants/api_constants");

const localJokeService = axios.create({
  baseURL: LOCALHOST_BASE_URL,
});

module.exports = localJokeService;
