const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

// sanity check
server.get("/", (req, res) => res.status(200).json({ api: "I am up!" }));

module.exports = server;
