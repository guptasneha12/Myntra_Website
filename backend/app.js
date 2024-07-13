
// // types of modules
// // 1. file based
// // 2. built in modules
// // 3. 3rd party modules


// creating server using built in module
// const http=require('http');  // built in module

// const server=http.createServer((req,res)=>{
// console.log("Server created");
// res.end(" not working");
// });


// // listen to server
// server.listen(5000,"localhost",()=>{
//     console.log("server is running on 5000");
// })





const express=require("express");
const app=express();
const PORT=5000;
const cors =require('cors');
const mongoose=require('mongoose');
const {mongoUrl}=require("./keys");
require('./models/model');
require('./models/post');

app.use(cors());
app.use(express.json());
app.use(require('./routes/auth'));

app.use(require("./routes/createPost"))
app.use(require("./routes/user"));
mongoose.connect(mongoUrl);
mongoose.connection.on("connected",()=>{
    console.log('successfully connected');
})

mongoose.connection.on("error",()=>{
    console.log('failed to connect');
})



app.listen(PORT,()=>{
    console.log("Server is running on " + PORT);
})