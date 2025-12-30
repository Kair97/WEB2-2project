const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherContent = document.getElementById("weatherContent");
const newList = document.getElementById("newList");
const currencyInfo = document.getElementById("currencyInfo");

let map = null;
let marker = null;

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === ""){
        alert("Please enter a city name");
        return;
    }

    getWeather(city);
    getNews(city);
    getCurrency(city);

});

async function getWeather(city) {
    try {
        const response = await fetch(`/api/weather?city=${city}`);
        const data = await response.json();

        if (data.error){
            alert(data.error);
            return;
        }

        weatherContent.innerHTML = `
            <p>Temperature: ${data.temp} °C</p>
            <p>Feels Like: ${data.feels} °C</p>
            <p>Description: ${data.desc}</p>
            <p>Humidity: ${data.humidity}%</p>
            <p>Pressure: ${data.pressure} hPa</p>
            <p>Wind Speed: ${data.wind} m/s</p>
        `;

        showMap(data.lat, data.lon, city);

    } catch(err) {
        alert("Failed to load weather");
    }
}

function showMap(lat, lon, city) {
    if (!map) {
        map = L.map("map").setView([lat, lon], 10);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap"
        }).addTo(map);

        marker = L.marker([lat, lon]).addTo(map);

    } else {
        map.setView([lat, lon], 10);
        marker.setLatLng([lat, lon]);
    }

    marker.bindPopup(city).openPopup();
}

async function getNews(city) {
    try {
        const response = await fetch(`/api/news?city=${city}`);
        const data = await response.json();

        if (data.error) {
            newList.innerHTML = `<li>Error: ${data.error}</li>`;
            return;
        }

        if (!data.data || data.data.length === 0) {
            newList.innerHTML = `<li>No news articles found for ${city}</li>`;
            return;
        }

        const articlesHtml = data.data.map((article) => {
            return `
                <li style="margin-bottom: 15px; padding: 10px; border-left: 3px solid #2c6bed;">
                    <strong>${article.title}</strong><br>
                    <small>${article.description || 'No description'}</small><br>
                    <a href="${article.url}" target="_blank" style="color: #2c6bed;">Read more →</a>
                    <small style="color: #666;"> - ${article.source}</small>
                </li>
            `;
        }).join('');

        newList.innerHTML = articlesHtml;

    } catch(err) {
        newList.innerHTML = `<li>Failed to load news: ${err.message}</li>`;
    }
}

async function getCurrency(city) {
    try {
        const response = await fetch(`/api/currency?city=${city}`);
        const data = await response.json();

        if (data.error) {
            currencyInfo.innerHTML = `<p>Error: ${data.error}</p>`;
            return;
        }

        if (!data.data || !data.data.currency) {
            currencyInfo.innerHTML = `
                <p>Currency information not available</p>
                <p>${data.message || ''}</p>
            `;
            return;
        }

        const currencyData = data.data;

        currencyInfo.innerHTML = `
            <p><strong>Currency: ${currencyData.currency}</strong></p>
            <p>Country: ${currencyData.country}</p>
            <p>1 USD = ${currencyData.exchangeRate.perUSD.toFixed(2)} ${currencyData.currency}</p>
            <p>1 ${currencyData.currency} = ${currencyData.exchangeRate.toUSD.toFixed(4)} USD</p>
        `;

    } catch(err) {
        currencyInfo.innerHTML = `<p>Failed to load currency: ${err.message}</p>`;
    }
}
