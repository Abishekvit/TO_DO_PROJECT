const express = require("express");
const router = express.Router({
    mergeParams: true
});
const wrapAsync = require("../utils/wrapAsync.js");
const Task = require("../models/task.js");
const List = require("../models/list.js");
const {taskSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const validateTask = (req,res,next)=>{
    let result =taskSchema.validate(req.body);
    console.log(result);
    if(result.error){
        let errMsg = result.error.details.map((el)=> el.message).join(",");
        next(new ExpressError(400,result.error));
    }
    else{
        next();
    }
}
// New Task Route
router.get("/new", (req, res) => {
    const listId = req.params.listId;
    res.render("tasks/new.ejs", {listId});
});

// Create Task Route
router.post("/",validateTask,wrapAsync(async (req, res) => {
    const {listId} = req.params;
    const list = await List.findById(listId);
    if (!list) {
        req.flash("error","Invalid Listing");
        return res.redirect("/lists");
    }

    const newTask = new Task(req.body.task);
    await newTask.save();
    list.tasks.push(newTask);
    await list.save();
    req.flash("success","New Task Created!");
    res.redirect(`/lists`);
}));

// Edit Task Route
router.get("/:taskId/edit", wrapAsync(async (req, res) => {
    const { listId, taskId } = req.params;
    const list = await List.findById(listId);
    if (!list) {
        req.flash("error", "List not found!");
        return res.redirect("/lists");
    }
    const task = await Task.findById(taskId);
    if (!task) {
        req.flash("error", "Task not found!");
        return res.redirect(`/lists/${listId}`);
    }
    res.render("tasks/edit.ejs", { list, task });
}));

// Update Task Route
router.put("/:taskId", wrapAsync(async (req, res) => {
    const {
        listId,
        taskId
    } = req.params;
    await Task.findByIdAndUpdate(taskId, {
        ...req.body.task
    });
    req.flash("success","Updated Task!");
    res.redirect(`/lists`);
}));

// Delete Task Route
router.delete("/:taskId", wrapAsync(async (req, res) => {
    const {
        listId,
        taskId
    } = req.params;
    await List.findByIdAndUpdate(listId, {
        $pull: {
            tasks: taskId
        }
    });
    await Task.findByIdAndDelete(taskId);
    req.flash("success","Deleted Task!");
    res.redirect(`/lists`);
}));

// Task Completion Route - toggling 
router.post("/:taskId/complete",wrapAsync(async (req, res) => {
    const {listId,taskId} = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
        return res.redirect(`/lists/${listId}`);
    }
    task.completed = !task.completed;
    await task.save();
    req.flash("success","Hurray Task completed");
    res.redirect(`/lists/${listId}`);
}));

module.exports = router;
