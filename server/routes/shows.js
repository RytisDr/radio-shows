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
    return res.status(404).send({ error: "No shows added yet." });
  }
});
/////////////////////////////////////////////////////////////////////////////////
router.post("/add", isAuthenticated, async (req, res) => {
  const userId = req.session.user.id;
  if (req.body) {
    const { name, tags, user, key, updated_time, url } = req.body.show;

    if (name && tags && user && key && url && updated_time) {
      const api_endpoint = "https://api.mixcloud.com" + key;
      const show = {
        title: name,
        //tags: tags,
        api_endpoint: api_endpoint,
        url: url,
        date_released: updated_time,
      };
      try {
        const userShows = await User.query()
          .findByIds(userId)
          .withGraphFetched("shows");
        const foundShows = userShows[0].shows;
        let exists = false;
        foundShows.forEach((elm) => {
          if (elm.api_endpoint == api_endpoint) {
            exists = true;
          }
        });
        if (exists) {
          return res.status(404).send({ response: "Already added" });
        }
        await Shows.query()
          .insert(show)
          .then((show) => {
            return UserShows.query().insert({
              user_id: req.session.user.id,
              show_id: show.id,
            });
          });
        return res.status(200).send({ response: "Show Added" });
      } catch (error) {
        console.log(error);
        return res.status(404).send({ response: "DB error" });
      }
    }
    return res.status(404).send({ response: "Wrong data received" });
  }
  return res.status(404).send({ response: "No data received" });
});
/////////////////////////////////////////////////////////////////////////////////
router.delete("/remove", isAuthenticated, async (req, res) => {
  const userId = req.session.user.id;
  if (req.body.id) {
    const showId = req.body.id;

    try {
      const showUser = await Shows.query()
        .withGraphFetched("user")
        .findById(showId);
      console.log(showUser);
      return res.status(200).send({ response: "Removed" });
    } catch (error) {
      console.log(error);
    }
  }
  return res.status(404).send({ response: "Wrong data" });
});
module.exports = router;
