const express = require("express");
const app = express();
const port = 9090;
const apiRoutes = require(__dirname + "/routes/api");
const helmet = require("helmet");

/* Setup the database */
const { Model } = require("objection");
const Knex = require("knex");
const knexFile = require("./knexfile.js");
const knex = Knex(knexFile.development);
// Initialize express-session
const session = require("express-session");
// Knex session storage
const KnexSessionStore = require("connect-session-knex")(session);
// Secret key for session
const key = require("./config/keys");
// Origin
const domain = require("./config/domain");
//CORS
const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: domain.origin,
  })
);

app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

//use helmet
app.use(helmet());
// Give the knex instance to objection.
Model.knex(knex);
//initializes KnexSessionStore
const store = new KnexSessionStore({ knex });
// Implements express-session
app.use(
  session({
    secret: key.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 6000000,
    },
    store: store,
  })
);

// API routes

app.use("/api/v1", apiRoutes);

/* Start the server, KEEP AT THE BOTTOM  */

const server = app.listen(port, (error) => {
  if (error) {
    console.log("Error while trying to run Express.");
  }
  console.log("Server is running on port", server.address().port);
});
