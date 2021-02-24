"use strict"

let express=require("express");

let serv=express();

require("dotenv").config();
let cors=require("cors");
const { query } = require("express");
const sup =require("superagent")
 const Port=process.env.PORT 
 serv.use(cors());
 const pg =require('pg');
//  const client = new pg.Client(process.env.DATABASE_URL);
const client = new pg.Client({ connectionString: process.env.DATABASE_URL,   ssl: { rejectUnauthorized: false } });

 client.connect();

 function Weather(req,res){

    const cityN=req.query.search_query
    let key = process.env.WETH_K;
let url=`https://api.weatherbit.io/v2.0/forecast/daily?city=${cityN}&key=${key}`

sup.get(url).then(wethData=>{
// console.log(wethData.body.data);
    let weather = wethData.body.data.map( function(n,i) {
        return new getWeather(wethData,i) ;
      });
      // console.log(weather);
    res.send(weather)

})
function getWeather(d,x){
    this.forecast=d.body.data[x].weather.description;
    this.time=d.body.data[x].valid_date;
  }
  
}
module.exports.Weather = Weather;