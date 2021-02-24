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
function Location(req,res){
  
    // http://localhost:1500/location?city=amman
    const cityN=req.query.city
  
    let trigger=false;
    // const cityN='ak'
    // console.log(cityN);

    let key = process.env.LOC_K;
    let url= `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${cityN}&format=json`
    // let data = require('./Data/location.json');
if(cityN==null){
    let SQL = `SELECT * FROM locations;`;

    client.query(SQL)
    
    .then(result =>{

res.send(result.rows)
    });

}
let SQL = `SELECT * FROM locations;`;
    client.query(SQL)
    .then(result =>{
        result.rows.forEach((element,i) => {
            if(element.search_query==cityN){
                // console.log("sdsadsas");
                // index=result.rows.search_query. indexOf('dddsadsa ');
              
                // index=i;
          
      trigger=true;
                
            }
        });

///// GET DATA FROM DATABASE
  if(trigger){
   
let SQL=`SELECT * FROM locations WHERE search_query='${cityN}';`

client.query(SQL)
    .then(result =>{
// console.log(index);
        // console.log(cityN,result.rows[index].formatted_query);
        // console.log(index);
        //  console.log(cityN,result.rows[0].search_query);
      let x=new getLocationfromDAtaB(cityN,result.rows[0])
     
        function getLocationfromDAtaB(city,data){

            this.search_query=city;
            this.formatted_query=data.formatted_query;
            this.latitude=data.latitude;
            this.longitude=data.longitude;
            
            
            }
            res.send(x)
         
    })




  }else if(!trigger){
console.log("SSdasdsa");
    sup.get(url).then(locData=>{
        // console.log(locData);
        // console.log(cityN,locData.body[0].display_name);
    let fstLoc= new getLocation(cityN,locData.body[0])

function getLocation(city,data){

    this.search_query=city;
    this.formatted_query=data.display_name;
    this.latitude=data.lat;
    this.longitude=data.lat;
    
    
    }
    let citynam = fstLoc.search_query;
    let formN = fstLoc.formatted_query;
    let lati = fstLoc.latitude;
    let long = fstLoc.longitude;
    let sql=`INSERT INTO locations VALUES($1,$2,$3,$4);`
    let allRes=[citynam,formN,lati,long]
    client.query(sql,allRes)
    .then((result)=>{
        // res.send(result.rows);
        // res.send('data has been inserted!!');
    })



// console.log(fstLoc);
    res.send(fstLoc)
})
  }

  
    })



        // onsole.log(locData);c
        // console.log(locData.body[0].display_name);
        // console.log(fstLoc);



//    let fstLoc= new getLocation(data);
// //    console.log(fstLoc);
// res.send(fstLoc)
// }
}


module.exports.Location = Location;