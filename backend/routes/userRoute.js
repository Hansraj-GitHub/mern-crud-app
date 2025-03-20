const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const router = express.Router();

// Create User (POST)
router.post("/", async (req, res) => {
    const { name, email, age } = req.body;

    try {
        const userAdded = await User.create({ name, email, age });
        res.status(201).json(userAdded);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message }); // Fix: Use `res.status(400)` instead of `res.send(400)`
    }
});

// Get All Users (GET)
router.get("/", async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll); // Fix: Changed status from 201 to 200 (standard for GET)
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

// Get Single User (GET)
router.get("/:id", async (req, res) => { // Fix: Added `/:id` to get a single user
    const { id } = req.params;
    try {
        const singleUser = await User.findById(id);
        if (!singleUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(singleUser);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

// Delete User (DELETE)
router.delete("/:id", async (req, res) => { // Fix: Changed from `get` to `delete`
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});


// put /patch
router.patch("/:id", async (req, res) => { // Fix: Changed from `get` to `delete`
    const { id } = req.params;
    const {name,email,age} = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id,req.body,{
            new:true,
        });
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;
