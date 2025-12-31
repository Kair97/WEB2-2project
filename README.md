# Weather & City Information App

A comprehensive web application that provides real-time weather information, latest news, currency exchange rates, and interactive maps for any city worldwide.

## 🌟 Features

- **Weather Information**: Get current weather conditions including temperature, humidity, pressure, wind speed, and weather description
- **Interactive Map**: View the city location on an interactive map powered by Leaflet
- **Latest News**: Fetch and display the latest news articles related to the searched city
- **Currency Exchange Rates**: Display currency exchange rates for the city's country with USD conversion
- **Responsive Design**: Modern, mobile-friendly interface built with Bootstrap
- **Real-time Data**: All information is fetched from live APIs

## 🚀 Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **APIs**: 
  - OpenWeatherMap API (Weather data)
  - NewsAPI (News articles)
  - ExchangeRate-API (Currency exchange rates)
- **Libraries**: 
  - Axios (HTTP requests)
  - Leaflet (Interactive maps)
  - Bootstrap 5 (UI framework)
  - dotenv (Environment variables)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kair97/WEB2-2project.git
   cd WEB2-2project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   OPENWEATHER_API_KEY=your_openweather_api_key_here
   EXCHANGERATE_API_KEY=your_exchangerate_api_key_here
   NEWS_API_KEY=your_news_api_key_here
   ```

4. **Get API Keys**
   
   - **OpenWeatherMap**: Sign up at [https://openweathermap.org/api](https://openweathermap.org/api) (Free tier available)
   - **ExchangeRate-API**: Sign up at [https://www.exchangerate-api.com/](https://www.exchangerate-api.com/) (Free tier: 1,500 requests/month)
   - **NewsAPI**: Sign up at [https://newsapi.org/](https://newsapi.org/) (Free tier: 100 requests/day for development)

5. **Start the server**
   ```bash
   node app.js
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📖 Usage

1. Enter a city name in the search input field
2. Click the "Get Info" button
3. View the following information:
   - **Weather**: Current temperature, feels-like temperature, description, humidity, pressure, and wind speed
   - **Map**: Interactive map showing the city location
   - **News**: Latest news articles related to the city
   - **Currency**: Exchange rates for the country's currency

## 🔌 API Endpoints

### Weather API
```
GET /api/weather?city={cityName}
```
Returns weather information for the specified city.

### News API
```
GET /api/news?city={cityName}
```
Returns latest news articles related to the city.

### Currency API
```
GET /api/currency?city={cityName}
```
Returns currency exchange rates for the city's country.

## 📁 Project Structure

```
weather-app/
├── app.js                 # Main server file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (not in git)
├── .gitignore            # Git ignore file
├── routes/
│   ├── weather.js        # Weather route handler
│   ├── news.js           # News route handler
│   └── currency.js       # Currency route handler
└── public/
    ├── index.html        # Main HTML file
    ├── css/
    │   └── style.css     # Custom styles
    └── js/
        └── script.js     # Frontend JavaScript
```

## 🌍 Supported Countries

The app supports currency information for 70+ countries including:
- North America: USA, Canada, Mexico
- Europe: UK, Germany, France, Italy, Spain, and more
- Asia: China, Japan, India, South Korea, and more
- Oceania: Australia, New Zealand
- South America: Brazil, Argentina, Chile, and more
- Africa: South Africa, Egypt, Nigeria, and more

## 🛠️ Development

### Running in Development Mode
```bash
node app.js
```

The server will start on port 3000 by default.

### Environment Variables
Make sure to create a `.env` file with your API keys. Never commit this file to version control.

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Kair97**

- GitHub: [@Kair97](https://github.com/Kair97)

## 🙏 Acknowledgments

- OpenWeatherMap for weather data
- NewsAPI for news articles
- ExchangeRate-API for currency exchange rates
- Leaflet for interactive maps
- Bootstrap for UI components

## 📞 Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

**Note**: Make sure to keep your `.env` file secure and never share your API keys publicly.

