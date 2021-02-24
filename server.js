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
serv.listen(Port,()=>{
})

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
// const client = new pg.Client({ connectionString: process.env.DATABASE_URL,   ssl: { rejectUnauthorized: false } });
let locationData=require('./location')
let WeatherData=require('./weather')
let parkData=require('./park')
let yelpData=require('./yelp');
let movData=require('./movies');
const { get } = require("superagent");
serv.get("/location",locationData.Location)
serv.get("/weather",WeatherData.Weather)
serv.get("/parks",parkData.Parks)
serv.get("/yelp",yelpData.Yelp)
serv.get("/movies",movData.Movies)


serv.get('/',(req,res)=>{
    res.send('home page');
})
serv.use('*',(req,res)=>{
    res.status(404).send('not found page')
});




