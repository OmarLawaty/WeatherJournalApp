// Setup empty JS object to act as placeHolder for sent All requests
projectData = {};

// Require Express
const express = require('express');
const app = express();

//require Body-parser 
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are telling express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Require cors
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 8080;

//startup up the server
app.listen(port, listening);

//Callback to tell status
function listening(){
    console.log('server running');
    console.log(`running on localhost:${port}`);
};

//GET route that returns the projectData object
app.get('/all', sendData)

function sendData (request, response) {
    response.send(projectData)
}

// POST route
app.post('/addWeatherData', addData)

function addData(request, response) {
    projectData.temperature = request.body.temperature;
    projectData.date = request.body.date;
    projectData.user_response = request.body.user_response;
    response.end();
    console.log(projectData)
}