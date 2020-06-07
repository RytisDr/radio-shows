const router = require("express").Router();
//Authenticate middleware
const { isAuthenticated } = require(__dirname + "/../helpers/auth.js");
//Show model
const Shows = require("../models/Shows");
//User model
const User = require("../models/User");
//UserShows model
const UserShows = require("../models/UserShows");
/////////////////////////////////////////////////////////////////////////////////
router.get("/get", isAuthenticated, async (req, res) => {
  const userId = req.session.user.id;
  const userShows = await User.query()
    .findByIds(userId)
    .withGraphFetched("shows");
  const shows = userShows[0].shows;
  if (shows.length) {
    return res.status(200).send({ response: shows });
  } else {
    return res.status(404).send({ response: "No shows added yet." });
  }
});
/////////////////////////////////////////////////////////////////////////////////
router.post("/add", isAuthenticated, async (req, res) => {
  const userId = req.session.user.id;
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
        const userShows = await User.query()
          .findByIds(userId)
          .withGraphFetched("shows");
        const foundShows = userShows[0].shows;
        let exists = false;
        foundShows.forEach((elm) => {
          if (elm.endpoint == endpoint) {
            exists = true;
          }
        });
        if (exists) {
          return res.status(404).send({ response: "Already added" });
        } else {
          await Shows.query()
            .insert(show)
            .then((show) => {
              return UserShows.query().insert({
                user_id: req.session.user.id,
                show_id: show.id,
              });
            });
          return res.status(200).send({ response: "Show Added" });
        }
      } catch (error) {
        return res.status(404).send({ response: "DB error" });
      }
    } else {
      return res.status(404).send({ response: "Wrong data received" });
    }
  } else {
    return res.status(404).send({ response: "No data received" });
  }
});
/////////////////////////////////////////////////////////////////////////////////
router.delete("/remove", isAuthenticated, (req, res) => {});
module.exports = router;
