// index.js is our pretend server

var express = require("express"); // this requires you use express
var app = express();  // this is how we are going to use the express command and then I can just use the "app" when express is needed;
					  // app is an object of express
var http = require('http').Server(app);  // prebuilt module of node

// When we get a req for a static file(html/css(not going to change), respond with that folder and file)
app.use(express.static(__dirname + '/public'));  

// Request on the root route, a '/' occurs, then runs the function
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// This is telling the app to listen for port 3000,;PORT is important for when we deploy
// 
app.listen(process.env.PORT || 3000, function() {
	console.log("listening on *3000");
});
