const Task = require("../../models/task");
const { Router } = require('express')
const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ owner: {
                _id: req.user._id
            }});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ owner: {
                _id: req.user._id
            }});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            throw new Error("Not existing")
        }
        const belongs = task.owner._id.toString() === req.user._id.toString()
        if (!belongs) {
            return res.status(404).send({
                error: "IdError",
                message: "This task is not yours"
            })
        }
        await task.populate('owner')
        res.status(200).send(task)
    }
    catch (error) {
        res.status(500).send(error)
    }
});

router.post('/tasks', auth, async (req, res) => {
    try {
        const task = new Task({...req.body, owner: {
                _id: req.user._id
            }});
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findById(taskId);
        if (task.owner._id.toString() !== req.user._id.toString()) {
            return res.status(404).send({
                error: "IdError",
                message: "This task is not yours"
            });
        }
        if (!task) {
            return res.status(404).send("Task not found");
        }
        await Task.deleteOne(task)
        res.status(200).send(task);
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.patch('/tasks/:id', auth, async (req, res, next) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findById(taskId);
        if (task.owner._id.toString() !== req.user._id.toString()) {
            return res.status(404).send({
                error: "IdError",
                message: "This task is not yours"
            });
        }
        if (!task) {
            return res.status(404).send("Task not found");
        }
        const updateData = req.body
        await Task.updateOne(task, updateData)
        res.status(200).send(task);
    } catch (e) {
        next(e)
    }
})

module.exports = router