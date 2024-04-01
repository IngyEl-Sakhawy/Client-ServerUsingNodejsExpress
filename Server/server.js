

const express = require("express");
const res = require("express/lib/response");
let app = express();
const PORT = process.env.PORT || 7019;
const path = require("path");
const bodyParser = require("body-parser");//deprecated

//Middleware Body parser comes with the express
// app.use(bodyParser.urlencoded({extended:true }));//format
app.use(express.urlencoded({extended:true }));
app.use(bodyParser.json());
const fs = require("fs");

var Profile = fs.readFileSync("../Client/profile.html","utf-8");

//Middleware
app.get("*",(req,res,next)=>{
    console.log("Processing");
    next();//picks the suitable next stop
})

app.get("/home.html",(req, res)=>{ 
    res.sendFile(path.join(__dirname,"../Client/home.html"));
})
app.get("/profile.html",(req, res)=>{ 
    res.sendFile(path.join(__dirname,"../Client/profile.html"));
})
app.get("/style.css", (req, res)=> {
    res.sendFile(path.join(__dirname,"../Client/style.css"));
})

// app.post("/profile.html",(req,res)=>{
//     console.log("post");
//     // console.log(req.url);
//     // res.sendFile(path.join(__dirname,"../Client/profile.html"));
//     console.log(req.body.name);
//     let userName = req.body.name;
//     let userEmail = req.body.email;
//     let userNumber = req.body.number;
//     let userAddress = req.body.address;

//     const replacedHtml = Profile
//         .replace('{UserName}', userName)
//         .replace('{UserNumber}', userNumber)
//         .replace('{UserEmail}', userEmail)
//         .replace('{UserAddress}', userAddress);

//         res.send(replacedHtml);
//     // res.redirect("/profile.html");

//     // next();
// })

app.post("/profile.html", (req, res) => {
    console.log("POST request received");
    const { name, email, number, address } = req.body;

    // Replace placeholders in the HTML with form data
    const replacedHtml = Profile
        .replace('{UserName}', name)
        .replace('{UserNumber}', number)
        .replace('{UserEmail}', email)
        .replace('{UserAddress}', address);

    res.send(replacedHtml);
});

app.all("*",(req,res)=>{ 
        res.send("Invalid URL");
})

app.listen(7019, ()=>{console.log("http://localhost:"+PORT)});

