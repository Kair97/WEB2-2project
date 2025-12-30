const express = require("express");
const dotenv = require("dotenv");

const weatherRoute = require("./routes/weather");
const newsRoute = require("./routes/news");
const currencyRoute = require("./routes/currency");

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use("/api/weather", weatherRoute);
app.use("/api/news", newsRoute);
app.use("/api/currency", currencyRoute);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, ()=>{
    console.log("Server is running on port: " + port);
});
