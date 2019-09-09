const express = require("express");
const New = require("./../models/New");
const { catchErrors, checkRoles } = require("./../middleware");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/news", async (req, res, next) => {
  const isAdmin = req.user ? req.user.role === "ADMIN" : false;
  const news = await New.find().populate("author");
  res.render("news/index", { news, isAdmin });
  console.log(news);
});

router.get("/news/add/", checkRoles("EDITOR"), (req, res) => {
  res.render("news/create");
});

router.post("/news/add", checkRoles("EDITOR"), async (req, res) => {
  const { title, body } = req.body;
  const { _id } = req.user;

  await New.create({ title, body, author: _id });
  res.redirect("/news");
});

router.get("/news/:id", async (req, res) => {
  const newOne = New.findById(req.params.id);
  res.render("news/details", { new: newOne });
});

router.get("/news/:id/delete", checkRoles("ADMIN"), async (req, res) => {
  const { id } = req.params;
  await New.findByIdAndDelete(id);
  res.redirect("/news");
});

module.exports = router;
