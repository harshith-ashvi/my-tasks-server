const express = require("express")
const app = express()
const port = 3033

//Welcome Message from site
app.get("/", (req, res) => {
    res.send("Welcome to My Tasks website")
})


app.listen(port, () => {
    console.log("Server is running on port", port)
})