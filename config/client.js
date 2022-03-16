require('dotenv').config();
const BASE_URL = (process.env.NODE_ENV === "development") ?
    "http://localhost:8080" : "https://edwork.mdbgo.io";

module.exports = {
    BASE_URL
}