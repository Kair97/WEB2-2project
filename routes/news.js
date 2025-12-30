const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({error: "City is required"});
        }

        const apiKey = process.env.NEWS_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error: "News API key is not configured",
                message: "Please add NEWS_API_KEY to your .env file"
            });
        }
        
        const newsApiUrl = 'https://newsapi.org/v2/everything';
        
        const response = await axios.get(newsApiUrl, {
            params: {
                q: city.trim(),
                apiKey: apiKey,
                language: 'en',
                sortBy: 'publishedAt',
                pageSize: 5
            }
        });

        const articles = response.data.articles;

        const formattedArticles = articles.map((article) => {
            return {
                title: article.title || 'No title',
                description: article.description || 'No description',
                url: article.url,
                source: article.source.name || 'Unknown',
                publishedAt: article.publishedAt
            };
        });

        res.json({
            success: true,
            data: formattedArticles,
            count: formattedArticles.length
        });

    } catch(error) {
        console.error('News API Error:', error.message);
        
        if (error.response) {
            const statusCode = error.response.status;
            
            if (statusCode === 401) {
                return res.status(500).json({
                    error: "Invalid News API key",
                    message: "Please check your NEWS_API_KEY in .env file"
                });
            }
        }
        
        res.status(500).json({
            error: "Failed to fetch news",
            message: error.message || "Unknown error occurred"
        });
    }
});

module.exports = router;
