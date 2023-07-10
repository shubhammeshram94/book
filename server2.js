const express=require('express')
const emprouts=require('./nodes/emps');
const cors=require('cors')

const app=express();
app.use(cors('*'))

app.get('/',(request,response)=>{
    response.send('welcome to server')
})



app.listen(7474,()=>{
    console.log("server stated@7474")
})



