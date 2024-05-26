const express = require("express");
const User = require("../../models/user");
const { Router } = require('express')
const router = Router()
const auth = require("../middleware/auth");


router.get('/users',auth, async (req, res) => {
    try{
        const users = await User.find();
        res.send(users);
    } catch(error){
        res.status(500).send(error)
    }
});

router.get('/users/:id', auth,async (req, res) => {
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

router.delete('/users/:id', auth,async (req, res) => {
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

router.patch('/users/:id',auth, async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            throw new Error("Not existing")
        }

        const fields = ['name', 'password', 'age', 'email']
        fields.forEach(field => {
            if (req.body[field]) {
                user[field] = req.body[field]
            }
        })

        await user.save()
        res.send(user)
    } catch(e) {
        next(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findOneByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch(e) {
        res.status(400).send(e.message);
    }
})

router.get('/users/me', auth, async (req, res) => {
    console.log(req.user)
    res.send(req.user);
})

router.post("/users/logout", auth, async(req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save()
        res.send("User logout")
    }catch(e){
        res.status(500).send()
    }
})

router.post("/users/logoutAll", auth, async(req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send("All tokens have been removed");
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router