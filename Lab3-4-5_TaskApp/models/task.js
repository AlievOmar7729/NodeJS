const { default: mongoose } = require("mongoose");
const validator = require('validator');
//Create model
const Task = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        trim: true
    },
    description: {
        type:String,
        required:true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})
const someTask = mongoose.model('Task', Task);
module.exports = someTask;