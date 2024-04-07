// Importing necessary packages
var express = require("express");
var bodyParser = require("body-parser");
const mysql = require("mysql2");
var app = express();
var errmsg = ''

// setting up ejs and body parser
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Connecting to mysql db
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "form_validation",
    password: "root" 
});

// Home page
app.get("/", function(req,res){
    // Select users count
    var q = "SELECT COUNT(*) AS count FROM users"

    // Fetch the results and show
    connection.query(q, function(error, results){
        if(error) throw error;
        var count_num = results[0].count
        res.render("index", {count_num: count_num, errmsg: errmsg})
    })
})

app.post("/register", function(req, res){

    // Saving data to mysql
    var person ={
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };

    connection.query("INSERT INTO users SET ?", person, function(error, results) {
        if (error) {
            errmsg = error.message
            res.redirect("/");
        } else {
            errmsg = ''
            res.render("register");
        }
    });
});


app.listen(8080, function(){
    console.log("Server running on port: 8080")
})