//user to replace with own API
let weatherAPI = '399dc43dded6a47a3e546abbd02f0303';

function updateImage(conditionData, h){
    let conditionImg = document.getElementById("conditionImg");
    let condition = conditionData.toLowerCase();
    if(condition.includes("clear")) {
        if(h > 6 && h < 18) {
            conditionImg.src = "./icons/sun-icon.png";
        } else {
        conditionImg.src = "./icons/moon-icon.png";
        }
    } else if (condition.includes("clouds") && !condition.includes("rain") && !condition.includes("drizzle")) {
        conditionImg.src = "./icons/clouds-icon.png";
    } else if (condition.includes("rain") || condition.includes("drizzle") && !condition.includes("thunderstorm")) {
        conditionImg.src = "./icons/rain-icon.png";
    } else if (condition.includes("thunderstorm")) {
        conditionImg.src = "./icons/thunderstorm-icon.png";
    } else if (condition.includes("snow")) {
        conditionImg.src = "./icons/snow-icon.png";
    } else if (condition.includes("mist" || condition.includes("smoke") || condition.includes("haze") || condition.includes("sand") || condition.includes("fog") || condition.includes("dust") || condition.includes("ash"))) {
        conditionImg.src = "./icons/fog-icon.png";
    } else if (condition.includes("qualls" || "tornado")) {
        conditionImg.src = "./icons/wind-icon.png";
    }
};

function getUKTime(timezone) {
    let tempDate = new Date()
    let tempHours = tempDate.getUTCHours();  
    let tempMins = tempDate.getUTCMinutes();
    return totalSeconds = ((tempHours * 60) + tempMins) * 60;
};

function calculateLocationTime(locationSeconds, conditionData) {
    let time = document.getElementById("time");
    locationSeconds = Number(locationSeconds);
    var h = Math.floor(locationSeconds / 3600);
    var m = Math.floor(locationSeconds % 3600 / 60);
    if(h >= 24) {
        h = h - 24;
    };
    let amPM;
    if(h < 12) {
        amPM = "am";
    } else {
        amPM = "pm";
    };
    if (m >= 10) {
        time.textContent = h + ":" + m + amPM;
    } else {
        time.textContent = h + ":" + "0" + m + amPM;
    };
    updateImage(conditionData, h);
};

function getCurrentTime(timezone, conditionData) {
    let UKseconds = getUKTime(timezone);
    let locationSeconds = UKseconds + timezone;
    calculateLocationTime(locationSeconds, conditionData);
};

function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
        return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
};

function updatePage(temp, feelsLike, name, country, conditionData, timezone) {
    //id's divs to hold info
    let cityName = document.getElementById("cityName");
    let countryName = document.getElementById("countryName");
    let cityTemp = document.getElementById("cityTemp");
    let cityTempFeels = document.getElementById("cityTempFeels");
    let condition = document.getElementById("condition");
    //add if-else for temp
    //updates
    cityName.textContent = name;
    countryName.textContent = country;
    cityTemp.textContent = temp.toFixed(0) + "°";
    cityTempFeels.textContent = feelsLike.toFixed(0) + "°";
    condition.textContent = titleCase(conditionData);
    getCurrentTime(timezone, conditionData);
}

// uses async/await function to get weather deets
async function getWeather(unitUrl) {
    let citySearch = document.getElementById("search");        
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    //add if-else for temp
    let userCity = search.userText.value;
    const response = await fetch(baseUrl + userCity + unitUrl, {mode: 'cors'});
    const weatherData = await response.json();
    const temp = weatherData.main.temp;
    const feelsLike = weatherData.main.feels_like;
    const name = weatherData.name;
    const country = weatherData.sys.country;
    const conditionData = weatherData.weather[0].description;
    const timezone = weatherData.timezone;
    updatePage(temp, feelsLike, name, country, conditionData, timezone);
}; 

let unitSwitch = document.getElementById("unitSwitch");

function getWeatherInUnit() {
    let unit = (unitSwitch.checked) ? 'imperial' : 'metric';
    let url = '&units=' + unit + '&appid=';
    getWeather(url + weatherAPI);
};

//button to submit user selection
let submit = document.getElementById("submit");
    search.addEventListener("click", () =>{
    getWeatherInUnit();
    event.preventDefault();
});

unitSwitch.addEventListener("change", function() {
    if (this.checked) {
        getWeatherInUnit();
      } else {
        getWeatherInUnit();
      }
});

/* For reference - example using promises rather than async/await
uses promises to get weather deets
    function promiseWeather() {
        const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=' + weatherAPI
        fetch(baseUrl, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response.main.temp)
        })
        .catch(function(err) {
            console.log("Oh no", err)
        })
    }
promiseWeather();

const { getTime } = require("date-fns");
*/