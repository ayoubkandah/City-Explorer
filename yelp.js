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

 function Yelp(req,res){
    const cityN=req.query.search_query
    let page=req.query.page
    const yelp = require('yelp-fusion');
    
    const apiKey = process.env.YELP_K;
    // const apiKey ='2321321'
    const searchRequest = {
    
      location: `'${cityN}'`,
      limit:(( (page -1) * 2) + 2)  ,
      offset:(( (page -1) * 2) + 1)
    };
    
    let client = yelp.client(apiKey);
    
    client.search(searchRequest).then(response => {
    if(searchRequest.limit<=20){
        
    
    
      let firstResult = response.jsonBody.businesses[searchRequest.offset-1];
    
      let secondeResult = response.jsonBody.businesses[searchRequest.offset];
    
    
    // console.log(index);
      let dataARR=[]
      let x=new getYELD(firstResult)
      let y=new getYELD(secondeResult)
      dataARR.push(x)
      dataARR.push(y)
      function getYELD(data){
    this.name=data.name
    this.image_url=data.image_url
    this.price=data.rating
    this.url=data.url
      }
      res.send(dataARR)

      
    }else{res.send(null)}
    })
    
    
    }
    module.exports.Yelp = Yelp;