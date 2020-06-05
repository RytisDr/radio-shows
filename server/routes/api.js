const express = require("express");
const app = express();
const usersRoute = require(__dirname + "/users.js");
const showsRoute = require(__dirname + "/shows.js");
app.use("/users", usersRoute);
app.use("/shows", showsRoute);

module.exports = app;
