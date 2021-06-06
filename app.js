const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){
    console.log("Post request received.");

    const units = "imperial"
    const query = req.body.cityName;
    const apiKey = "bc468322e0e2f7d28eb0eb25ebd4863a";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units

    https.get(url, function (response){
    
    console.log(response.statusCode)

    response.on("data", function(data){
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const weatherDesc = weatherData.weather[0].description
    const queryName = weatherData.name
    const icon = weatherData.weather[0].icon
    const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    res.write("<h1>The temperature in " + queryName + " is " + temp + " degrees Fahrenheit.</h1>");
    res.write("<p>The weather is currently " + weatherDesc + ".<p>");
    res.write("<img src=" + iconURL + ">")
    res.send();

    console.log(weatherDesc);
    
    console.log(temp);
});

});


})




app.listen(3000, function () {
    console.log("Server is running on port 3000.");
});