// Declaring the variables
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".weather");
let hi_low = document.querySelector(".hi-low");
let city = document.querySelector(".city");
let date = document.querySelector(".date");
const kelvin = 273;
// API ID
const api = "6d055e39ee237af35ca066f35474e9df";
let cityvalue = "Mumbai";
// API URL
let currentdate;
let cityname;
let lat;
let lon;
let ampm;
var searchbox = document.getElementById("searchbox");
searchbox.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        getweather(false);
    }
});

function changeTimezone(date, ianatz) {

    // suppose the date is 12:00 UTC
    var invdate = new Date(date.toLocaleString('en-US', {
        timeZone: ianatz
    }));

    // then invdate will be 07:00 in Toronto
    // and the diff is 5 hours
    var diff = date.getTime() - invdate.getTime();

    // so 12:00 in Toronto is 17:00 UTC
    return new Date(date.getTime() - diff); // needs to substract

}

function getweather(check) {
    if (check) {
        cityname = cityvalue;
    }
    else {
        cityname = document.getElementsByClassName("search-box")[0].value;
    }
    // const timeElapsed = Date.now();
    // const today = new Date(timeElapsed);



    // console.log(cityname);
    const base = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=6d055e39ee237af35ca066f35474e9df`;
    // Calling the API
    fetch(base)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            // console.log(data.name + ", " + data.sys.country);
            city.textContent = data.name + ", " + data.sys.country;
            weather_details=data.weather[0].description;
            if(weather_details.indexOf('clouds')!=-1)
            {
                document.body.style.backgroundImage = "url('images/clouds.jpg')";
            }
            else if(weather_details.indexOf('rain')!=-1)
            {
                document.body.style.backgroundImage = "url('images/rain.jpg')";
            }
            else if(weather_details.indexOf('sunny')!=-1)
            {
                document.body.style.backgroundImage = "url('images/sunny.jpg')";
            }
            else if(weather_details.indexOf('clear sky')!=-1)
            {
                document.body.style.backgroundImage = "url('images/clearsky.jpg')";
            }
            else if(weather_details.indexOf('haze')!=-1 || weather_details.indexOf('mist')!=-1)
            {
                document.body.style.backgroundImage = "url('images/haze.jpg')";
            }
            else 
            {
                document.body.style.backgroundImage = "url('images/bg.jpg')";
            }
            temperature.textContent = Math.floor(data.main.temp - kelvin) + "°C";
            summary.textContent = weather_details;
            hi_low.textContent = Math.floor(data.main.temp_min - kelvin) + "°C" + "/" + Math.floor(data.main.temp_max - kelvin) + "°C"

            lat = data.coord.lat;
            lon = data.coord.lon;
            timezoneapi = "https://api.wheretheiss.at/v1/coordinates/" + lat + "," + lon;
            fetch(timezoneapi)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    const here = new Date();
                    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    // console.log();
                    convertedDatetime = changeTimezone(here, data.timezone_id);
                    hours = convertedDatetime.getHours();
                    let hh;
                    if (hours > 12) {
                        ampm = "PM";
                        hh = hours - 12;
                    }
                    else if (hours == 0) {
                        ampm = "AM";
                        hh = 12;
                    }
                    else {
                        ampm = "AM";
                        hh = hours;
                    }
                    currentdate = days[convertedDatetime.getDay()] + ", " + convertedDatetime.getDate() + " " + months[convertedDatetime.getMonth()] + " " + convertedDatetime.getFullYear() + ", " + hh + ":" + convertedDatetime.getMinutes() + " " + ampm;
                    date.textContent = currentdate;
                });
        });
}
window.addEventListener("load", () => {
    getweather(true);
});

