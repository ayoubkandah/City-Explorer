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


//  console.log(Port)
serv.listen(Port,()=>{

// console.log(Port);

})

serv.get("/location",Location)
serv.get("/weather",Weather)
serv.get("/parks",Parks)

function Parks(req,res){
 let c=req.query.search_query
    let key = process.env.PARK_K;
    let url =`https://developer.nps.gov/api/v1/parks?q=${c}&api_key=${key}`
  console.log(url);
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
    // console.log(cityN);

    let key = process.env.LOC_K;
    let url= `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${cityN}&format=json`
    // let data = require('./Data/location.json');
// res.send(url)
    sup.get(url).then(locData=>{

        let fstLoc= new getLocation(cityN,locData.body[0])
        // onsole.log(locData);c
        // console.log(locData.body[0].display_name);
        // console.log(fstLoc);
res.send(fstLoc)

    })
//    let fstLoc= new getLocation(data);
// //    console.log(fstLoc);
// res.send(fstLoc)
// }
}

function getLocation(city,data){

this.search_query=city;
this.formatted_query=data.display_name;
this.latitude=data.lat;
this.longitude=data.lat;


}

serv.get('/',(req,res)=>{
    res.send('home page');
})
serv.use('*',(req,res)=>{
    res.status(404).send('not found page')
})