////DARK MODE TOGGLE
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}
document.getElementById("change-theme-btn").addEventListener('click', ()=>{
    document.documentElement.classList.toggle('dark');
  
    if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
})

////SETTINGS POPUP TOGGLE
document.getElementById("settings-open-btn").addEventListener('click', ()=>{
    document.getElementById("settings-popup").classList.remove("popup-hidden");
    document.getElementById("overlay").classList.remove("popup-hidden");
})
document.getElementById("settings-close-btn").addEventListener('click', ()=>{
    document.getElementById("settings-popup").classList.add("popup-hidden");
    document.getElementById("overlay").classList.add("popup-hidden");
})





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