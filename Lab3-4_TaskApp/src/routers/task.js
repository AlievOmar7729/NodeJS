const Task = require("../../models/task");
const { Router } = require('express')
const express = require("express");
const router = new express.Router();

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.status(200).send(task)
    }
    catch (error) {
        res.status(500).send(error)
    }
});

router.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(200).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).send("Task not found");
        }
        res.status(200).send(task);
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.patch('/tasks/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const updateData = req.body
        const task = await Task.findByIdAndUpdate(id, updateData)
        if (!task) {
            console.log('Error of updating. Maybe task is not exist')
        }
        res.send(updateData)
    } catch (e) {
        next(e)
    }
})

module.exports = router