//setting up API request data
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let key = '661daa7377189bfe425b6af1f07ac279';

// get today's date
let date = new Date();
let newDate = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

// Event listner for the generate button 
document.querySelector('#generate').addEventListener('click', (e) =>{
  e.preventDefault();

  // getting user inputs 
  const postCode = document.querySelector('#zip').value;
  const feelings = document.querySelector('#feelings').value;

  // calling the function that gets the temp
  getTemperature(baseURL, postCode, key)

  .then(function (data){
      // Add data to POST request
      postData('http://localhost:8080/addWeatherData', {temperature: data.main.temp, date: newDate, user_response: feelings } )
      // Function which updates UI
      .then(function() {
          updateUI()
      });
  });
});


// Function returns temp data
const getTemperature = async (baseURL, code, key)=>{
    // Getting the request 
    const response = await fetch(baseURL + code + '&APPID=' + key);

    try {
        const data = await response.json();
        return data;
    }

    catch(error) {
        console.log('error', error);
    }
}

// Function POST the data 
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
  });
}

// Update UI function 
const updateUI = async () => {
    const request = await fetch('http://localhost:8080/all');
    try {

        //Request data to update the UI 
        const allData = await request.json();

        //Convert temp from Kelvin to cesius 
        const celsius = allData.temperature - 273.15;

        document.querySelector('#date').innerHTML = allData.date;
        document.querySelector('#temp').innerHTML = celsius.toFixed(2) + '°C' ;
        document.querySelector('#content').innerHTML = allData.user_response;
    }
    catch (error) {
        console.log('error', error);
    }
}