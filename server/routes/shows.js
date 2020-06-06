const router = require("express").Router();
const { isAuthenticated } = require(__dirname + "/../helpers/auth.js");

router.post("/add", (req, res) => {
  return res.status(200).send({ response: "Show added." });
});

module.exports = router;
