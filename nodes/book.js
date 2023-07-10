const express=require('express');
const config=require('config');
const appforemp=express.Router();
const mysql=require('mysql2');
const { request } = require('http');
const { error } = require('console');
var connection =mysql.createConnection({
    host    :   config.get("host"),
    user    :   config.get("user"),
    password    :   config.get("manager"),
    database    :   config.get("punedac"),
});



appforemp.get("/", (request, response)=>{
    
    connection.query("select * from Book_Tb", (error, result)=>{
                if(error==null)
                {
                    var data = JSON.stringify(result) 
                    response.setHeader("Content-Type","application/json");
                    response.write(data);
                } 
                else
                {
                    console.log(error);
                    response.setHeader("Content-Type","application/json");
                    response.write(error)
                }
                response.end();
    })

})



appforemp.post("/",(request,response)=>{
   
   var query = `insert into Book_Tb values(${request.body.Bno},'${request.body.Bname}','${request.body.BAuthor}','${request.body.BType}',${request.body.Bprice},'${request.body.BPdate}','${request.body.Blang}')` ;
   connection.query(query,(error,result)=>{
        if(error==null){
            var data=JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            response.write(data);
        }
        else{
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error);
        }
        response.end();
    })
})

appforemp.put("/:Bno",(request,response)=>{

  var query=`update Book_Tb set price='${request.body.Bprice}',language='${request.body.Blang}' where id=${request.params.Bno}`;  
  connection.query(query,(error,result)=>{
        if(error==null){
            var data=JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            response.write(data);
        }
        else{
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error);
        }
        response.end();
    })
})



module.exports=appforemp;