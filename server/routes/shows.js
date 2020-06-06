const router = require("express").Router();
const { isAuthenticated } = require(__dirname + "/../helpers/auth.js");

router.post("/add", (req, res) => {
  if (req.body) {
    console.log(req.body.show.tags);
    return res.status(200).send({ response: "added" });
  }
});

module.exports = router;
