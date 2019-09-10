const express = require("express");
const accountsRouter = require("./accounts/accounts-router");

const server = express();

server.use(express.json());

// sanity check
server.get(`/`, (req, res) => res.status(200).json({ api: "I am up!" }));

server.use(`/api/accounts`, accountsRouter);

module.exports = server;
