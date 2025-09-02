const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const List = require("../models/list.js");
const Task = require("../models/task.js");

// Index Route

router.get("/", wrapAsync(async (req, res) => {
    const allLists = await List.find({});
    res.render("lists/index.ejs", {
        allLists
    });
}));

// New Route
router.get("/new", (req, res) => {
    res.render("lists/new.ejs");
});

// Show Route
router.get("/:id", wrapAsync(async (req, res) => {
    const {id} = req.params;
    const list = await List.findById(id).populate("tasks");
    if (!list) {
        return res.redirect("/lists");
    }
    res.render("lists/show.ejs", {
        list
    });
}));

// Create Route
router.post("/", wrapAsync(async (req, res) => {
    const newList = new List(req.body.list);
    await newList.save();
    req.flash("success","New Listing Created!");
    res.redirect("/lists");
}));

// Delete Route
router.delete("/:id", wrapAsync(async (req, res) => {
    const {id} = req.params;
    await List.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/lists");
}));

module.exports = router;
