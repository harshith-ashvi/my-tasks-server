const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 3033

mongoose.connect("mongodb://localhost:27017/jan09")
    .then(() => {
        console.log("Database is running")
    })
    .catch((err) => {
        console.log("Error is running database", err)
    })


//Creating Schema
const Schema = mongoose.Schema

const taskSchema = new Schema({
    "title": {
        type: String,
        required: [true, "Title is required"]
    },
    "description": {
        type: String
    },
    "completed": {
        type: Boolean,
        default: false
    },
    "dueDate": {
        type: Date
    },
    "createdAt": {
        type: Date,
        default: Date.now
    }
})

//Created Model
const Task = mongoose.model("Task", taskSchema)


//Welcome Message from site
app.get("/", (req, res) => {
    res.send("Welcome to My Tasks website")
})




app.listen(port, () => {
    console.log("Server is running on port", port)
})