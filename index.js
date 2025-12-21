////DARK MODE TOGGLE
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}
document.querySelectorAll(".theme-btn").forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.documentElement.classList.toggle('dark');
    
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    })
})

////SETTINGS POPUP TOGGLE
document.getElementById("settings-open-btn").addEventListener('click', ()=>{
    document.getElementById("settings-popup").classList.remove("popup-hidden");
    document.getElementById("overlay").classList.remove("popup-hidden");
});
document.getElementById("settings-close-btn").addEventListener('click', ()=>{
    document.getElementById("settings-popup").classList.add("popup-hidden");
    document.getElementById("overlay").classList.add("popup-hidden");
});
document.getElementById("overlay").addEventListener('click', ()=>{
    document.getElementById("settings-popup").classList.add("popup-hidden");
    document.getElementById("overlay").classList.add("popup-hidden");
});



////MAIN
let defaultName = localStorage.getItem("defaultname");
let defaultCity = localStorage.getItem("defaultcity");
let defaultUnit = localStorage.getItem("defaultunit");

if(defaultName===null && defaultCity===null && defaultUnit===null) {
    document.getElementById("welcome-screen").style.display = 'flex';
    document.getElementById("main-screen").style.display = 'none';
}
else{
    document.getElementById("welcome-screen").style.display = 'none';
    document.getElementById("main-screen").style.display = 'flex';
    displayData(defaultName, defaultCity, defaultUnit);
    setInterval(()=>{
        displayData(defaultName, defaultCity, defaultUnit);
    }, 1800000);
}


function runApp(){
    const userName = document.getElementById("user-name").value.trim();
    const userCity = document.getElementById("user-city").value.trim();
    const unit = document.querySelector('input[name="units"]:checked');
    let userUnit;
    if(userName===''||userCity===''||!unit) {
        alert('Please fill in all fields');
        return;
    }
    if(unit.value==="Celcius") userUnit="&units=metric";
    else userUnit="&units=imperial"

    localStorage.setItem("defaultname", userName);
    localStorage.setItem("defaultcity", userCity);
    localStorage.setItem("defaultunit", userUnit);

    document.getElementById("loader").classList.remove("popup-hidden");
    document.getElementById("main-overlay").classList.remove("popup-hidden");
    displayData(userName, userCity, userUnit);

    setTimeout(()=>{
        document.getElementById("loader").classList.add("popup-hidden");
        document.getElementById("main-overlay").classList.add("popup-hidden");

        document.getElementById("welcome-screen").style.display = 'none';
        document.getElementById("main-screen").style.display = 'flex';
    }, 2000)
}
document.getElementById("continue-btn").addEventListener('click', ()=>{
    runApp()
});


function displayData(name, city, unit){
    //NAME DISPLAY
    document.getElementById("user-name-display").innerHTML = name;

    //WEATHER INFO DISPLAY
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a54398c98f1d1ee76bc81c14c54b576d${unit}`)
    .then(res => res.json())
    .then(value => {
        console.log(value);
        if(value.sys.country===undefined){
            displayData(defaultName, defaultCity);
            return;
        }
        //HEADER
        document.getElementById("user-city-value").innerHTML = value.name;
        const countryName = new Intl.DisplayNames(['en'], { type: 'region' });
        document.getElementById("user-region-value").innerHTML = countryName.of(value.sys.country);
        const localTime = new Date(new Date().getTime()+value.timezone*1000);
        const hours = localTime.getUTCHours();
        let timeOfDayContainer = document.getElementById("timeofday");
        if(hours>=0&&hours<12) timeOfDayContainer.innerHTML = "Morning";
        else if(hours>11&&hours<17) timeOfDayContainer.innerHTML = "Afternoon";
        else timeOfDayContainer.innerHTML = "Evening";
        
        //MAIN WEATHER INFO
        document.getElementById("main-temp-value").innerHTML = Math.round(value.main.feels_like);
        document.getElementById("weather-condition-value").innerHTML = value.weather[0].main;
        document.getElementById("min-temp-value").innerHTML = Math.round(value.main.temp_min);
        document.getElementById("max-temp-value").innerHTML = Math.round(value.main.temp_max);
        document.getElementById("temp-value").innerHTML = Math.round(value.main.temp);
        //UNIT ADJUSTMENT
        const unitContainer = document.querySelectorAll(".temp-unit-value");
        if(unit==="&units=imperial") unitContainer.forEach(container=>container.innerHTML="F");
        else unitContainer.forEach(container=>container.innerHTML="C")

        //WETHER DETAILS
        document.getElementById("humidity-value").innerHTML = value.main.humidity;
        document.getElementById("pressure-value").innerHTML = value.main.pressure;
        document.getElementById("windgust-value").innerHTML = value.wind.gust;
        document.getElementById("windspeed-value").innerHTML = value.wind.speed;
        document.getElementById("description-value").innerHTML = value.weather[0].description;
        document.getElementById("sealevel-value").innerHTML = value.main.sea_level;
        document.getElementById("groundlevel-value").innerHTML = value.main.grnd_level;
        let windDirContainer = document.getElementById("winddirection-value");
        if(value.wind.deg===0) windDirContainer.innerHTML = "North";
        else if(value.wind.deg>0&&value.wind.deg<90) windDirContainer.innerHTML = "North East";
        else if(value.wind.deg===90) windDirContainer.innerHTML = "East";
        else if(value.wind.deg>90&&value.wind.deg<180) windDirContainer.innerHTML = "East South";
        else if(value.wind.deg===180) windDirContainer.innerHTML = "South";
        else if(value.wind.deg>180&&value.wind.deg<270) windDirContainer.innerHTML = "South West";
        else if(value.wind.deg===270) windDirContainer.innerHTML = "West";
        else windDirContainer = "North West";
        //UNIT ADJUSTMENT
        const unitConversionContainer = document.querySelectorAll(".unit-conversion-value");
        if(unit==="&units=imperial") unitConversionContainer.forEach(container=>container.innerHTML="(mph)");
        else unitConversionContainer.forEach(container=>container.innerHTML="(m/s)")

        //ANIMATIONS
        if(value.weather[0].main==="Clouds") {
            document.getElementById("rain-animation").style.display = 'none';
            document.getElementById("sun-animation").style.display = 'none';
            document.getElementById("cloud-animation").style.display = 'block';
        }
        else if(value.weather[0].main==="Clear"||value.weather[0].main==="Sunny") {
            document.getElementById("rain-animation").style.display = 'none';
            document.getElementById("cloud-animation").style.display = 'none';
            document.getElementById("sun-animation").style.display = 'block';
        }
        else if(value.weather[0].main==="Rain"||value.weather[0].main==="Thunderstorm") {
            document.getElementById("cloud-animation").style.display = 'none';
            document.getElementById("sun-animation").style.display = 'none';
            document.getElementById("rain-animation").style.display = 'block';
        }   
    })
    .catch(error => {
        console.error(error);
        if(error.message === "Failed to fetch") alert("Please check your internet connection");
        else if(error.message === "Cannot read properties of undefined (reading 'country')") alert("Not a valid city or region, try again");
    });
}


////DIFFERENT CITY SEARCH
document.getElementById("search-city-btn").addEventListener('click', ()=>{
    const citySearchInput = document.getElementById("city-search").value.trim();
    if(citySearchInput===""){
        alert("please fill out this field");
        return;
    }
    document.getElementById("loader").classList.remove("popup-hidden");
    document.getElementById("main-overlay").classList.remove("popup-hidden");
    setTimeout(()=>{
        document.getElementById("loader").classList.add("popup-hidden");
        document.getElementById("main-overlay").classList.add("popup-hidden");
        displayData(defaultName, citySearchInput, defaultUnit);
    }, 2000)
});


////DEFAULT VALUES CHANGE
function changeDefaults(){
    const changedName = document.getElementById("changed-name").value.trim();
    const changedCity = document.getElementById("changed-city").value.trim();
    const changedUnit = document.querySelector('input[name="units"]:checked');
    let userUnit;
    if(changedName===""||changedCity===""||!changedUnit){
        alert("please fill in all fields");
        return;
    }
    if(changedUnit.value==="Celcius") userUnit="&units=metric";
    else userUnit="&units=imperial"

    localStorage.setItem("defaultname", changedName);
    localStorage.setItem("defaultcity", changedCity);
    localStorage.setItem("defaultunit", userUnit);

    document.getElementById("settings-popup").classList.add("popup-hidden");
    document.getElementById("overlay").classList.add("popup-hidden");

    document.getElementById("loader").classList.remove("popup-hidden");
    document.getElementById("main-overlay").classList.remove("popup-hidden");
    
    setTimeout(()=>{
        document.getElementById("loader").classList.add("popup-hidden");
        document.getElementById("main-overlay").classList.add("popup-hidden");
        displayData(changedName, changedCity, userUnit);
    }, 2000)
}
document.getElementById("change-default-button").addEventListener('click', ()=> {changeDefaults()});