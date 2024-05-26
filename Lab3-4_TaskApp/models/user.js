const { default: mongoose } = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})
User.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

User.statics.findOneByCredentials = async (email, password) => {
    const user = await someUser.findOne({ email })
    if (!user) {
        throw new Error("Incorrect email")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error("Incorrect password")
    }
    return user
}

User.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, "kdweueksdsjfij")
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}


const someUser = mongoose.model("User", User)
module.exports = someUser

