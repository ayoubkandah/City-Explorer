"use strict"

let express=require("express");
const send = require("send");

let serv=express();

require("dotenv").config();

 const Port=process.env.PORT




//  console.log(Port)
serv.listen(Port,()=>{

// console.log(Port);

})

serv.get("/location",Location)
serv.get("/weather",Weather)

function Weather(req,res){

    let dataW=require("./Data/weather.json")
    // console.log(dataW.data);
    // console.log(dataW);

    let arr=[]
    for(let j=0;j<dataW.data.length;j++){
        let data=new getWeather(dataW,j)
    arr.push(data)
    
    }

   
    // console.log(allData.forecast);
    console.log(arr.time);
    res.send(arr)

}

function getWeather(d,x){
  let A=d.data;
  this.forecast=A[x].weather.description;
  this.time=A[x].valid_date;
  console.log(A[0].valid_date);

//   console.log(A[0]);

//   console.log(forecastArr);

}

function Location(req,res){

    let data = require('./Data/location.json');

   let fstLoc= new getLocation(data);
//    console.log(fstLoc);
res.send(fstLoc)
}


function getLocation(data){

this.search_query="Lynnwood";
this.formatted_query=data[0].display_name;
this.latitude=data[0].lat;
this.longitude=data[0].lat;


}