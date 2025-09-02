require('dotenv').config(); 
const mongoose = require("mongoose");
const { data: initialTasks } = require("./data.js"); 
const Task = require("../models/task.js"); 

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/todoApp';

async function main() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

main()
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.log("Error connecting to DB:", err));

const initDB = async () => {
    try {
        await Task.deleteMany({});
        console.log("Existing tasks cleared.");
        await Task.insertMany(initialTasks);
        console.log("Initial tasks were added to the DB.");
    } catch (err) {
        console.log("Error initializing DB:", err);
    }
};

module.exports = initDB;

