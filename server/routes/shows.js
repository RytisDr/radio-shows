const router = require("express").Router();
const { isAuthenticated } = require(__dirname + "/../helpers/auth.js");

router.post("/add", (req, res) => {
  if (req.body) {
    return res.status(200).send({ response: "added" });
  }
});

module.exports = router;
