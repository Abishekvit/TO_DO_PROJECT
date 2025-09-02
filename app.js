require('dotenv').config();
const express = require("express");
const app = express();
const initDB = require("./init/index.js");
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL ;
const path = require("path");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// middlewares

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.engine("ejs",ejsMate);


// EXPRESS SESSION
const session = require("express-session");
const flash = require("connect-flash");


// Connection to Atlas
app.use(methodOverride("_method"));

async function main() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connected to DB");
    await initDB();
}
main().catch(err => console.log("Error connecting to DB:", err));

app.listen(1010, () =>{
    console.log("server is listening to port 1010");
})


app.get("/:any",(req,res,next) =>{
    next(new ExpressError(500,"Page Not Found!"));
});
app.use((err,req,res,next)=>{
    let{statusCode=500, message="Error"} = err;
    res.status(statusCode).render("error.ejs",{err});
    // res.status(statusCode).send(message);
});
app.get("/", (req,res) =>{
    res.send("Hi, I am root ");
})
