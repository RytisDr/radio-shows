const router = require("express").Router();
//For Knex transaction
const knex = require("knex");
//Authenticate middleware
const { isAuthenticated } = require(__dirname + "/../helpers/auth.js");
//Show model
const Shows = require("../models/Shows");
//UserShows model
const UserShows = require("../models/UserShows");
router.get("/get", isAuthenticated, (req, res) => {
  return res.status(200).send({ response: "My shows here" });
});
router.post("/add", isAuthenticated, (req, res) => {
  if (req.body) {
    const { name, tags, user, key, updated_time } = req.body.show;
    if (name && tags && user && key && updated_time) {
      const endpoint = "https://api.mixcloud.com" + key;
      const show = {
        title: name,
        //tags: tags,
        endpoint: endpoint,
        date_released: updated_time,
      };
      try {
        const newFavoriteShow = Shows.query()
          .insert(show)
          .then((show) => {
            return UserShows.query().insert({
              user_id: req.session.user.id,
              show_id: show.id,
            });
          });
      } catch (error) {
        return res.status(404).send({ response: "DB error" });
      }

      return res.status(200).send({ response: "Show Added" });
    } else {
      return res.status(404).send({ response: "Wrong data received" });
    }
  } else {
    return res.status(404).send({ response: "No data received" });
  }
});
router.delete("/remove", isAuthenticated, (req, res) => {});
module.exports = router;
