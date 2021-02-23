"use strict"

let express=require("express");


let serv=express();

require("dotenv").config();
let cors=require("cors");
const { query } = require("express");
const sup =require("superagent")
 const Port=process.env.PORT 
// console.log(sup);
 serv.use(cors());
 const pg =require('pg');


//  console.log(Port)
serv.listen(Port,()=>{

// console.log(Port);

})
// let DATABASE_URL="postgresql://ayoubk:1234@localhost:5432/ayoub"
// client.connect()



// const client = new pg.Client(process.env.DATABASE_URL);

const client = new pg.Client({ connectionString: process.env.DATABASE_URL,   ssl: { rejectUnauthorized: false } });
serv.get("/location",Location)
serv.get("/weather",Weather)
serv.get("/parks",Parks)
serv.get("/add",add)

function add(req,res){
    
    let firstName = "dddd";
    let lastName = "aaaaa";
    let SQL = `INSERT INTO locations VALUES ($1,$2,"2","3") RETURNING *;`;
    let safeValues = [firstName,lastName];
    client.query(SQL,safeValues)
    .then((result)=>{
        // console.log("d");
        // res.send(result.rows);
        // res.send('data has been inserted!!');
    })

}
function Parks(req,res){

 let c=req.query.search_query
    let key = process.env.PARK_K;
    let url =`https://developer.nps.gov/api/v1/parks?q=${c}&api_key=${key}`
//   console.log(url);



    sup.get(url).then(parkData=>{


let Arr=[];
for(let e=0;e<parkData.body.data.length;e++){
 
    let parkInfo=new getPark(parkData,e)
    Arr.push(parkInfo)

}        

// console.log(parkData.body.data[0].url);
res.send(Arr)
    })
    // console.log(Arr);
    
}
function getPark(data,i){
let Data=data.body.data
    this.name=Data[i].fullName

  
   this.address=Data[i].addresses[0].line1+Data[i].addresses[0].city+Data[i].addresses[0].stateCode+Data[i].addresses[0].postalCode
    this.fee=Data[i].entranceFees[0].cost
    this.url=Data[i].url
}
function Weather(req,res){

    const cityN=req.query.search_query
    let key = process.env.WETH_K;
let url=`https://api.weatherbit.io/v2.0/forecast/daily?city=${cityN}&key=${key}`

sup.get(url).then(wethData=>{
    
   
// console.log(wethData.body.data.length);
//     }

    let weather = wethData.body.data.map( function(n,i) {
        return new getWeather(wethData,i) ;
      });
    res.send(weather)

})

}

// let dataW=require("./Data/weather.json")
    // console.log(dataW.data);
    // console.log(dataW);

   
    
    // }


//    let index;



function getWeather(d,x){


 
  this.forecast=d.body.data[x].weather.description;
  this.time=d.body.data[x].valid_date;
//   console.log(A[0].valid_date);

//   console.log(A[0]);

//   console.log(forecastArr);

}

function Location(req,res){
    // http://localhost:1500/location?city=amman
    const cityN=req.query.city
    let trigger=false;
    // const cityN='ak'
    // console.log(cityN);

    let key = process.env.LOC_K;
    let url= `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${cityN}&format=json`
    // let data = require('./Data/location.json');
 
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


serv.get('/',(req,res)=>{
    res.send('home page');
})
serv.use('*',(req,res)=>{
    res.status(404).send('not found page')
});

client.connect();
