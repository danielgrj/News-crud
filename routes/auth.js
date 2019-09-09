const router = require("express").Router();
const User = require("../models/User");
const passport = require("../config/passport");
const { checkRoles, catchErrors } = require("./../middleware");

const isLoggedIn = (req, res, next) =>
  req.isAuthenticated() ? next() : res.redirect("/login");

router.get("/signup", (req, res, next) => {
  const config = {
    title: "Sign up",
    action: "/signup",
    button: "Sign up",
    signup: true
  };
  res.render("auth/form", config);
});

router.post(
  "/signup",
  catchErrors(async (req, res, next) => {
    const user = await User.register({ ...req.body }, req.body.password);
    res.redirect("/login");
  })
);

router.get("/login", (req, res, next) => {
  const config = {
    title: "Log in",
    action: "/login",
    button: "Log in"
  };
  res.render("auth/form", config);
});

router.post(
  "/login",
  passport.authenticate("local"),
  async (req, res, next) => {
    console.log(req.user, req.session);
    res.redirect("/profile");
  }
);

router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("auth/profile", { user: req.user });
  console.log(req.user);
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
});

router.get("/private", checkRoles("ADMIN"), (req, res, next) => {
  res.send("admin");
});

module.exports = router;
