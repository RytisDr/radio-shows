const router = require("express").Router();
//User Model
const User = require("../models/User");
//bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;
// Origin
const domain = require("../config/domain");

const sendMail = require(__dirname + "/../helpers/mail.js");
//#############################################
/*
GET 
GET 
POST 
DELETE 
PUT 
PATCH
*/
//#############################################

router.get("/auth-check", async (req, res, next) => {
  try {
    if (!req.session.user) {
      throw res.status(403).send({ response: "Unauthenticated" });
    }
    res.status(200).send({ response: "Authenticated" });
  } catch (err) {
    next();
  }
});
router.get("/logout", async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) throw res.status(500).send({ response: "Unable to log-out." });
      res
        .status(200)
        .clearCookie("connect.sid")
        .send({ response: "Logged-out" });
    });
  } catch (err) {
    next(err);
  }
});
//#############################################
// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const users = await User.query().select().where({ email: email }).limit(1); //database query for user with the email specified, limit(1) stops the search after first match
    const user = users[0];

    if (!user) {
      return res.status(404).send({ response: "Wrong email" });
    }
    bcrypt.compare(password, user.password, (error, isSame) => {
      if (error) {
        return res.status(500).send({ response: "Server error" });
      }
      if (!isSame) {
        return res.status(404).send({ response: "check the credentials" });
      } else {
        req.session.user = { email: user.email, id: user.id };
        return res.status(200).send({ response: "Logged-in" });
      }
    });
  } else {
    return res.status(404).send({ response: "Missing email or password" });
  }
});
//#############################################
//REGISTER USER

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    if (password.length < 8) {
      res.statusMessage =
        "Password is too short. Must be at least 8 characters long.";
      return res.status(400).send();
    } else {
      bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
        if (error) {
          return res.status(500).send({ response: "Server error" });
        }
        try {
          const existingUser = await User.query()
            .select()
            .where({ email: email })
            .limit(1);
          if (existingUser[0]) {
            res.statusMessage = "User with this email already exists";
            return res.status(400).send();
          } else {
            const newUser = await User.query().insert({
              email,
              password: hashedPassword,
            });
            return res
              .status(200)
              .send({ response: "User created with email: " + newUser.email });
          }
        } catch (error) {
          return res.status(500).send({ response: "DB error" });
        }
      });
    }
  } else {
    return res.status(404).send({ response: "Missing fields" });
  }
});
//#############################################
//RESET PWD
router.post("/reset-request", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.query().findOne({ email }).throwIfNotFound();
    const recoveryToken = crypto.randomBytes(48).toString("hex");
    await user.$query().patch({
      password_recovery_token: recoveryToken,
    });
    mailBody = `<p>You have requested to reset your password, click <a href="${domain.origin}/recovery?token=${recoveryToken}&id=${user.id}">here</a></p>`;
    const sentEmail = await sendMail(user.email, "Password reset", mailBody);
    if (!!sentEmail) {
      throw res.status(500).send({
        response: "Email not sent",
      });
    }
    res.status(200).send({ response: "Email succesfully sent" });
  } catch (err) {
    res.status(err.statusCode).send({ response: "User not found" });
  }
});
router.post("/recovery", async (req, res) => {
  const { id, token, password } = req.body;
  if (id && token && password) {
    const user = await User.query().findById(id).throwIfNotFound();
    if (token != user.password_recovery_token) {
      res.status(400).send({ response: "Invalid token" });
    } else {
      bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
        await user.$query().patch({
          password: hashedPassword,
        });
        res.status(200).send({ response: "Password changed" });
        if (error) {
          return res.status(500).send({ response: "Server error" });
        }
      });
    }
  } else {
    res.status(400).send({ response: "Missing info" });
  }
});

module.exports = router;
