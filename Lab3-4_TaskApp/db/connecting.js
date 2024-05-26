const mongoose = require("mongoose");
require("dotenv").config({path: "../.env"});


const connectionString = process.env.MONGO_URL;
mongoose.connect(connectionString)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });
