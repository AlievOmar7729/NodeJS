const { default: mongoose } = require("mongoose");
const validator = require('validator');
const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: 'Error: Email is invalid'
        },
    },
    password: {
        type: String,
        minLength: 7,
        required: true,
        trim: true,
        validate:{
            validator: (value) => {
                return !value.toLowerCase().includes('password');
            },
            message: 'Password can\'t have value "password" or contain it'
        }
    }
})
const someUser = mongoose.model("User", User)
module.exports = someUser