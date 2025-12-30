const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get("/", async(req, res) => {
    const city = req.query.city;
    
    if (!city) {
        return res.status(400).json({error: "City is required"});
    }
    
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data;
        
        res.json({
            temp: data.main.temp,
            feels: data.main.feels_like,
            desc: data.weather[0].description,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind: data.wind.speed,
            lat: data.coord.lat,
            lon: data.coord.lon
        });

    } catch(error) {
        res.status(500).json({error: "City not found or API error"});
    }

});

module.exports = router;
