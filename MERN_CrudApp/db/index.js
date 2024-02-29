const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")

const app = express()
app.use(express.json())
const PORT = 5000;

app.use(cors())

mongoose.connect("mongodb+srv://anisha:anisha06@cluster0.mep4s87.mongodb.net/CRUD?retryWrites=true&w=majority").then(() => {
    console.log("Connection Done");
}).catch((err) => {
    console.log(err);
})

// user Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

//create user -> send kra h postman se
app.post("/createuser", async (req, res) => {
    try {
        const bodyData = req.body;
        const user = new User(bodyData)
        const userData = await user.save()
        res.send(userData)
    } catch (error) {
        res.send(error)
    }
})

//read all user
app.get("/readalluser", async (req, res) => {
    try {
        const userData = await User.find({})
        res.send(userData)
    } catch (error) {
        res.send(error)
    }
})

//read one user at a time
app.get("/read/:id", async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById({ _id: id })
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

//update user info
app.put("/updateuser/:id", async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

//delete user
app.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByIdAndDelete({ _id: id })
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})

// mongodb+srv://anisha:anisha06@cluster0.mep4s87.mongodb.net/CRUD?retryWrites=true&w=majority