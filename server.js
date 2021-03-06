// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { query } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function (req, res){
  res.json({unix: Math.round((new Date())), utc: new Date().toUTCString()});
})


// your first API endpoint... 
app.get("/api/:date",

function (req, res) {
  let date = req.params.date
  if (Number.isNaN(Date.parse(date)) &&  date.length === parseInt(date).toString().length){

    var unix = parseInt(date)
    var utc = new Date(parseInt(date))
    console.log(utc)
    
    utc = utc.toUTCString()
    if (utc === "Invalid Date"){
      res.json({error: "Invalid Date"})
      return
    }
  }
  else{
    var unix = Date.parse(date)
    
    if (Number.isNaN(unix)){
      console.log("dwadaw")
      res.json({error: "Invalid Date"})
      return
    }
    var utc = new Date(date).toUTCString()
  }
  res.json({unix: unix, utc: utc});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
