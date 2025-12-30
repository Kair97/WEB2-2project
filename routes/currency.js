const express = require('express');
const axios = require('axios');

const router = express.Router();

const countryToCurrency = {
    'US': 'USD',
    'CA': 'CAD',
    'MX': 'MXN',
    'GB': 'GBP',
    'DE': 'EUR',
    'FR': 'EUR',
    'IT': 'EUR',
    'ES': 'EUR',
    'NL': 'EUR',
    'BE': 'EUR',
    'AT': 'EUR',
    'PT': 'EUR',
    'GR': 'EUR',
    'IE': 'EUR',
    'FI': 'EUR',
    'PL': 'PLN',
    'CZ': 'CZK',
    'HU': 'HUF',
    'RO': 'RON',
    'SE': 'SEK',
    'NO': 'NOK',
    'DK': 'DKK',
    'CH': 'CHF',
    'RU': 'RUB',
    'UA': 'UAH',
    'TR': 'TRY',
    'CN': 'CNY',
    'JP': 'JPY',
    'KR': 'KRW',
    'IN': 'INR',
    'ID': 'IDR',
    'TH': 'THB',
    'MY': 'MYR',
    'SG': 'SGD',
    'PH': 'PHP',
    'VN': 'VND',
    'BD': 'BDT',
    'PK': 'PKR',
    'LK': 'LKR',
    'KZ': 'KZT',
    'UZ': 'UZS',
    'KG': 'KGS',
    'TJ': 'TJS',
    'TM': 'TMT',
    'MN': 'MNT',
    'IL': 'ILS',
    'SA': 'SAR',
    'AE': 'AED',
    'IQ': 'IQD',
    'IR': 'IRR',
    'AU': 'AUD',
    'NZ': 'NZD',
    'BR': 'BRL',
    'AR': 'ARS',
    'CL': 'CLP',
    'CO': 'COP',
    'PE': 'PEN',
    'VE': 'VES',
    'ZA': 'ZAR',
    'EG': 'EGP',
    'NG': 'NGN',
    'KE': 'KES',
    'GH': 'GHS',
    'MA': 'MAD',
    'DZ': 'DZD',
    'TZ': 'TZS',
    'ET': 'ETB',
    'UG': 'UGX',
};

router.get("/", async(req, res) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({error: "City is required"});
        }

        const weatherApiKey = process.env.OPENWEATHER_API_KEY;
        
        if (!weatherApiKey) {
            return res.status(500).json({
                error: "Weather API key is not configured",
                message: "Please add OPENWEATHER_API_KEY to your .env file"
            });
        }

        const weatherResponse = await axios.get(
            'https://api.openweathermap.org/data/2.5/weather',
            {
                params: {
                    q: city.trim(),
                    appid: weatherApiKey,
                    units: 'metric'
                }
            }
        );

        const countryCode = weatherResponse.data.sys.country;
        const currencyCode = countryToCurrency[countryCode];

        if (!currencyCode) {
            return res.status(200).json({
                success: true,
                message: `Currency information not available for ${countryCode}`,
                country: countryCode,
                currency: null
            });
        }

        const apiKey = process.env.EXCHANGERATE_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error: "Currency API key is not configured",
                message: "Please add EXCHANGERATE_API_KEY to your .env file"
            });
        }
        
        const currencyApiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
        
        const currencyResponse = await axios.get(currencyApiUrl);
        
        const rates = currencyResponse.data.conversion_rates;
        const currencyRate = rates[currencyCode];

        if (!currencyRate) {
            return res.status(200).json({
                success: true,
                message: `Exchange rate not available for ${currencyCode}`,
                country: countryCode,
                currency: currencyCode
            });
        }

        const reverseRate = 1 / currencyRate;

        res.json({
            success: true,
            data: {
                country: countryCode,
                currency: currencyCode,
                exchangeRate: {
                    perUSD: currencyRate,
                    toUSD: reverseRate
                }
            }
        });

    } catch(error) {
        console.error('Currency API Error:', error.message);
        
        if (error.response) {
            const statusCode = error.response.status;
            
            if (statusCode === 404) {
                return res.status(404).json({
                    error: "City not found",
                    message: `Could not find information for "${req.query.city}"`
                });
            }
        }
        
        res.status(500).json({
            error: "Failed to fetch currency data",
            message: error.message || "Unknown error occurred"
        });
    }
});

module.exports = router;
