const { log } = require('console');
const express=require('express')
const https=require('https')
const bodyParser=require("body-parser")
const app=express();
app.use(bodyParser.urlencoded({extended:true})) //necessary code to start parsing through the body of the post request
app.get("/",(req,res)=>{
res.sendFile(__dirname+"/index.html")

//res.send("Server is up and running")
})
app.post("/",(req,res)=>{

    //console.log("Post request received")

const query=req.body.cityName
const apiKey="8a17e92fd60c05b3fbe2c286b827fe24";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey;
https.get(url,(response)=>{
console.log(response.statusCode);
response.on("data",(data)=>{
const weatherData=JSON.parse(data) //used to convert hexadecimal json output to a string
const temp=weatherData.main.temp;
const icon=weatherData.weather[0].icon;
const imgURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
res.write("<h1>The temperature at "+query+" is "+temp+" degrees celcius </h1>")
res.write("<p> The server is up and running </p>")
res.write("<img src=" + imgURL +">")
res.send()
})
})
})



app.listen(3000,()=>{
    console.log("Server running at port 3000")
})