"use strict"

let express=require("express");

let serv=express();

require("dotenv").config();

 const Port=process.env.PORT


 

//  console.log(Port)
// serv.listen(Port,()=>{

// console.log(Port);

// })

// serv.get('/test',(req,res)=>{
//     res.send('your server is working fine!!')
// })
