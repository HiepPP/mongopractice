var express = require("express");
var passport = require("passport");
var User = require("./models/user");

var router = express.Router();

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.get("/", (req, res, next) => {
  User.find()
    //.sort({ createdat: "descending" })
    .exec((err, users) => {
      if (err) {
        return next(err);
      }
      console.log(users);
      res.render("index", { users: users });
    });
});

router.post(
  "/signup",
  (req, res, next) => {
    let username = req.body.username;
    let passWord = req.body.password;

    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (user) {
        req.flash("error", "user alredy exist");
        return res.redirect("/signup");
      }
      let newUser = new User({
        username: username,
        password: passWord
      });
      newUser.save(next);
    });
  }
  // passport.authenticate("login", {
  //   successRedirect: "/",
  //   failureRedirect: "/signup",
  //   failureFlash: true
  // })
);

router.get("/users/:username", (req, res, next) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(404);
    }
    res.render("profile", { user: user });
  });
});

module.exports = router;
