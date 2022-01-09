const express = require("express")
const app = express()
app.use(express.json())
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

//Get all tasks
app.get("/api/tasks", (req, res) => {
    Task.find()
        .then((tasks) => {
            res.json(tasks)
        })
        .catch((err) => {
            res.json(err)
        })
})

//Create a task
app.post("/api/tasks", (req, res) => {
    const body = req.body
    const task = new Task(body)
    task.save()
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
            res.json(err)
        })
})

//Find one task
app.get("/api/tasks/:id", (req, res) => {
    const id = req.params.id
    Task.findById(id)
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
            res.json(err)
        })
})

//Update task
app.put("/api/tasks/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    Task.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
            res.json(err)
        })
})

//Delete Operation
app.delete("/api/tasks/:id", (req, res) => {
    const id = req.params.id
    Task.findByIdAndDelete(id)
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
            res.json(err)
        })
})



app.listen(port, () => {
    console.log("Server is running on port", port)
})