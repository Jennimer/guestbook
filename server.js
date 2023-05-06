var express = require('express');
var fs = require('fs');
var app = express();
app.use(express.static('public'))
app.use(express.static('files'))
const cors = require('cors');

app.use(cors());
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const corsOptions ={
    origin: PORT,
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
//Let's give the material from the public folder
app.use(express.static("./public/home"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/home.html')
})
app.use(express.static("./public/style.css"));

// Serve a form to the user
app.get("/newmessage", (req, res) => {
  res.sendFile(__dirname + '/public/form.html');
});
app.get("/ajaxmessage", (req, res) => {

  res.sendFile(__dirname + '/public/ajaxform.html');
});
app.get("/dataroute", (req, res) => {

  res.sendFile(__dirname + '/guestdata.json');
});

// POST

app.post('/writemessage', (req, res) => {

  var data = require('./guestdata.json');
  const user = {
    id: data.length + 1,
    name: req.body.name,
    date: new Date(),
    country: req.body.country,
    message: req.body.message
  }
  data.push(user);
    // Convert the JSON object to a string format
    var jsonStr = JSON.stringify(data);

    // Write data to a file
    fs.writeFile("guestdata.json", jsonStr, err => {
      if (err) throw err;
      console.log("It's saved!");
    });
    console.log(JSON.stringify(user));
    res.redirect('/ajaxmessage');
  });
  

//Route for sending post data
//Route to handle POST form requests.



app.get("/guestbook", (req, res) => {
  var data = require('./guestdata.json');

  //parse result in the table
  var results =  '<table id="guestbooktable" border="3px"' + 
  '<thead>' +
    '<tr>' +
    '<th>Name</th>' +
    '<th>Date</th>' +
    '<th>Country</th>' +
    '<th>Message</th>' +
    '</tr>' +
    '</thead>'
  for (var i = 0; i < data.length; i++) {
    results +=
      '<tr>' +
      '<td>' + data[i].name + '</td>' +
      '<td>' + data[i].date + '</td>' +
      '<td>' + data[i].country + '</td>' +
      '<td>' + data[i].message + '</td>' +
      '</tr>' +
      '<tr></tr>' 
      
  }
  res.send(results);
});

// IF route cannot be found
app.get("*", function (request, response) {
  response.status(404).send("Can't find the requested page");
  //response.send("Can't find the requested page", 404);
});
//web server creation with Express

app.listen(PORT, function () {
  console.log("Example app is listening on port", PORT);
});

