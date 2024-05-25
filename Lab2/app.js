const express = require("express");
const hbs = require("hbs");
const fetch = require("node-fetch");
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const cities = require('./cities.json');

let app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000");
});

app.get('/login', (req, res) => {
    res.send('This is a Login Page');
});

app.get('/geolocation', (req, res) => {
    res.render('geolocation');
});

let latitude;
let longitude;

app.post('/', (req, res) => {
    latitude = req.body.latitude;
    longitude = req.body.longitude;
    console.log(latitude, longitude);
    res.status(200).json({ message: 'Coordinates received successfully' });
});

app.get('/weather', async (req, res) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}&units=metric`;
    const response = await fetch(url);
    const weather = await response.json();
    res.render('weather', { cities: cities, latitude, longitude, weather });
});

app.get('/script.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'public', 'script.js'));
});

app.get('/weather/:city', async (req, res) => {
    let city = req.params.city || req.query.city;
    if (!city) {
        res.render("404");
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`;
    const response = await fetch(url);
    const weather = await response.json();
    res.render('weather', { cities: cities, city, weather });
});
