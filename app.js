//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//34c83a34f28be4ab26e8844da214082a

const weatherapi = {
    key: "34c83a34f28be4ab26e8844da214082a",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
}

const searchinputbox = document.getElementById('input');

//event listener function 

searchinputbox.addEventListener('keypress', (event) => {

    if (event.keyCode == 13) {
        console.log(searchinputbox.value);
        getwetherreport(searchinputbox.value);
        document.querySelector('.weather-body').style.display = "block";
    }
});

//get wether report
function getwetherreport(city) {
    fetch(`${weatherapi.baseUrl}?q=${city}&appid=${weatherapi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showweatherreport);
}

//show weather report
function showweatherreport(weather) {
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name},${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.floor(weather.main.temp)}&deg;C`;


    let minmaxtemp = document.getElementById('min-max');
    minmaxtemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weathertype = document.getElementById('weather');
    weathertype.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todaydate = new Date();
    date.innerText = datemanage(todaydate);

    if (weathertype.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('/img/clear.jpg')";
    } else if (weathertype.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url('/img/cloud.jpg')";
    } else if (weathertype.textContent == 'Haze') {
        document.body.style.backgroundImage = "url('/img/haze.jpg')";
    } else if (weathertype.textContent == 'Sunny') {
        document.body.style.backgroundImage = "url('/img/sunny.jpg')";
    } else if (weathertype.textContent == 'Rain') {
        document.body.style.backgroundImage = "url('/img/rain.jpg')";
    } else if (weathertype.textContent == 'Snow') {
        document.body.style.backgroundImage = "url('/img/snow.jpg')";
    } else {
        document.body.style.backgroundImage = "url('/img/thunderstorm.jpg')";
    }
}

//date manage

function datemanage(datearg) {
    let days = ["sunday", "monday", "wednesday", "thursday", "friday", "saturday"];

    let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "december"];

    let year = datearg.getFullYear();
    let month = months[datearg.getMonth()];
    let date = datearg.getDate();
    let day = days[datearg.getDay()];

    return `${date} ${month} ${day} ${year}`;
}