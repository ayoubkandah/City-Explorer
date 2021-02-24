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

 function Parks(req,res){

    let c=req.query.search_query
       let key = process.env.PARK_K;
       let url =`https://developer.nps.gov/api/v1/parks?q=${c}&api_key=${key}`
       sup.get(url).then(parkData=>{
   
   
   let Arr=[];
   for(let e=0;e<parkData.body.data.length;e++){
    
       let parkInfo=new getPark(parkData,e)
       Arr.push(parkInfo)
   
   }        
   
   res.send(Arr)
       })
   
       function getPark(data,i){
           let Data=data.body.data
               this.name=Data[i].fullName
           
             
              this.address=Data[i].addresses[0].line1+Data[i].addresses[0].city+Data[i].addresses[0].stateCode+Data[i].addresses[0].postalCode
               this.fee=Data[i].entranceFees[0].cost
               this.url=Data[i].url
           }
       
   }
   
   module.exports.Parks = Parks;