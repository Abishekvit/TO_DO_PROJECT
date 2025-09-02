const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const List = require("../models/list.js");
const Task = require("../models/task.js");
const {listSchema,taskSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const validateList = (req,res,next)=>{
    let result =listSchema.validate(req.body);
    console.log(result);
    if(result.error){
        let errMsg = result.error.details.map((el)=> el.message).join(",");
        next(new ExpressError(400,result.error));
    }
    else{
        next();
    }
}
// Index Route

router.get("/", wrapAsync(async (req, res) => {
    const allLists = await List.find({}).populate("tasks");
    res.render("lists/index.ejs", {allLists});
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
    res.render("lists/show.ejs", {list});
}));

// Create Route
router.post("/", validateList,wrapAsync(async (req, res) => {
    const newList = new List(req.body.list);
    await newList.save();
    req.flash("success","New Listing Created!");
    res.redirect("/lists");
}));

// Edit Route (GET)
router.get("/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const list = await List.findById(id);
    if (!list) {
        req.flash("error", "List not found!");
        return res.redirect("/lists");
    }
    res.render("lists/edit.ejs", { list });
}));

// Update Route (PUT)
router.put("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await List.findByIdAndUpdate(id, { ...req.body.list });
    req.flash("success", "List Updated!");
    res.redirect(`/lists/${id}`);
}));

// Delete Route
router.delete("/:id", wrapAsync(async (req, res) => {
    const {id} = req.params;
    await List.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/lists");
}));

module.exports = router;
