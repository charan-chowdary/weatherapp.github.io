const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){

  res.sendFile(__dirname + "/index.html");

  app.post("/report", function(req, res){
    const query = req.body.CityName;
    const apiKey = "bbad1fe46ef4f5e39e6777f02d5a5e1b";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
          const weatherdata = JSON.parse(data);
          console.log(weatherdata);
          const temperature = weatherdata.main.temp;
          const icon = weatherdata.weather[0].icon;
          const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
          const weatherdescription = weatherdata.weather[0].description;
          res.write("<h1>The Temperature of "+ query +" is around " + temperature + " degrees celsius.</h1>");
          res.write("<p>THE WEATHER IS CURRENTLY " + weatherdescription + "</p>");
          res.write("<img src="+ imageUrl + ">");
          res.send();
        })
    })

  })



  })




app.listen(3000, function(){
  console.log("the server is running on the port 3000.")
})
