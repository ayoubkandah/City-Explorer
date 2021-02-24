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
 const client = new pg.Client(process.env.DATABASE_URL);
 client.connect();

 function Movies(req,res){
    let cityM=req.query.search_query
    let movieKey=process.env.MOV_KEY
  let url=`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${cityM}`  
  sup.get(url).then(movData=>{
  let movARR=[]
    // console.log(movData.body.results[0].total_votes);
    let sortedData=movData.body.results.sort(function(a, b){return b.vote_average - a.vote_average})
  // console.log(sortedData);
      for(let x=0;x<20;x++){
        let dataMov=new getMovies(sortedData[x])
  movARR.push(dataMov)
  
    }
  
  // console.log(movARR);
  res.send(movARR)
    function getMovies(data){
  this.title=data.title
  this.overview=data.overview
  this.average_votes=data.vote_average
  this.total_votes=data.vote_count
  this.image_url=data.poster_path
  this.popularity=data.popularity
  this.released_on=data.release_date
  
  
  
  /*
  
    "title": "Sleepless in Seattle",
      "overview": "A young boy who tries to set his dad up on a date after the death of his mother. He calls into a radio station to talk about his dad’s loneliness which soon leads the dad into meeting a Journalist Annie who flies to Seattle to write a story about the boy and his dad. Yet Annie ends up with more than just a story in this popular romantic comedy.",
      "average_votes": "6.60",
      "total_votes": "881",
      "image_url": "https://image.tmdb.org/t/p/w500/afkYP15OeUOD0tFEmj6VvejuOcz.jpg",
      "popularity": "8.2340",
      "released_on": "1993-06-24"
  
      "adult": false,
  "backdrop_path": "/tfxzrp1myGDKl30FTozuJW7cR7X.jpg",
  "genre_ids": [],
  "id": 107100,
  "original_language": "en",
  "original_title": "Seattle Superstorm",
  "overview": "An object is shot down over Seattle and the debris begins to effect the local weather ultimately threatening the whole world.",
  "popularity": 9.31,
  "poster_path": "/8rLZUMaoJ8iof4mo8pRI3AULg3v.jpg",
  "release_date": "2012-03-31",
  "title": "Seattle Superstorm",
  "video": false,
  "vote_average": 5.4,
  "vote_count": 30
  
  */
    }
  
  })
  
  }


  module.exports.Movies = Movies;