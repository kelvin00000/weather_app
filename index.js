// fetch("https://api.openweathermap.org/data/2.5/weather?q=kumasi&appid=a54398c98f1d1ee76bc81c14c54b576d")
// .then(res => res.json())
// .then(value => console.log(value))
// .catch(error => console.error(error))

// async function getWeatherUpdate(city){
//     const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a54398c98f1d1ee76bc81c14c54b576d`);
//     const data = result.json();
//     console.log(data.main.temp);
// }
// getWeatherUpdate('kumasi');
document.getElementById("continue-btn").addEventListener('click', ()=> console.log("working"))