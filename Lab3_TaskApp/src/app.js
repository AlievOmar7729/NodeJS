const express = require('express')
require('../db/connecting')
const User = require('../models/user')
const Task = require('../models/task')

const userRouter = require("./routers/user.js")
const taskRouter = require("./routers/task.js")

const  PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () =>{
    console.log(`Server is listening on ${PORT}`)
})


















// const user = new User({
//     name: 'Omar',
//     age: 19,
//     email: 'omaraliev7729@gmail.com',
//     password: '112233445566'})
// user.save()
//     .then(() => console.log(user))
//     .catch((error) => console.error(error));
//
// const task = new Task({
//     title:'Title',
//     description: 'Description',
//     completed: false
// });
// task.save()
//     .then(() => console.log(task))
//     .catch((error) => console.error(error));


