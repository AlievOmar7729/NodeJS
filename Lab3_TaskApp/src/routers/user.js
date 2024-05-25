const User = require("../../models/user");
const { Router } = require('express')
const express = require("express");
const router = new express.Router();


router.get('/users', async (req, res) => {
    try{
        const users = await User.find();
        res.send(users);
    } catch(error){
        res.status(500).send(error)
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).send(user)
    }
    catch (error){
        res.status(500).send(error)
    }
});

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user);
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(400).send("Internal Server Error");
    }
});

router.patch('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body
        const updatedUser = await User.findByIdAndUpdate(id, updateData)
        if (!updatedUser) {
            console.log('Error of updating. Maybe user is not exist')
        }
        res.status(200).send(updateData)
    } catch(e) {
        next(e)
    }
})

module.exports = router