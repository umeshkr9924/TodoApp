var express = require('express');
var app = express();
const bodyParser = require("body-parser");
var server = require('http').createServer(app);
//var io = require('socket.io').listen(server);
var port = process.env.PORT || 3000;

var fs = require('fs');
var data = fs.readFileSync('data.json'); 
var elements = JSON.parse(data); 

var cors = require('cors')
app.use(cors()) // for accessing localhost:3000 from client side

server.listen(port);

app.use(express.static("public"));
app.use(express.static("views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
	extended: true
})); 



app.get('/',function(request,response) {
	fs.readFile(__dirname+"/"+"data.json","utf-8",function(error,data){
        if(error){
            response.writeHead(404,{"Content-Type":"text/plain"});
            response.end("Page Not Found");
        } else {
        	response.setHeader("Content-Type", "application/json")
            response.status(200).send(data);
        }
    });  
});
