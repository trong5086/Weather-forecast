
const API_KEY='7124c6db9a91dbabd1c6f0694cfcb126'
const DEFAULT_VALUE='--'
const $=document.querySelector.bind(document)
let search=document.querySelector('#input-search')
let city=$('.weather-location')
let state=$('.weather-state')
let icon=$('.weather-icon')
let degree=$('.weather-degree')
let sunRise=$('.sunrise')
let sunSet=$('.sunset')
let humidity=$('.humidity')
let windSpeed=$('.wind-speed')

search.addEventListener('change', function(e){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${API_KEY}&lang=vi&units=metric`)
    .then(async response=>{
        const data=await response.json()
        console.log(data)
        city.innerHTML=data.name||DEFAULT_VALUE
        state.innerHTML=data.weather[0].description||DEFAULT_VALUE
        icon.setAttribute('src',`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        degree.innerHTML=Math.round(data.main.temp)||DEFAULT_VALUE
        sunRise.innerHTML=moment.unix(data.sys.sunrise).format('H:mm')||DEFAULT_VALUE
        sunSet.innerHTML=moment.unix(data.sys.sunset).format('H:mm')||DEFAULT_VALUE
        humidity.innerHTML=data.main.humidity||DEFAULT_VALUE
        windSpeed.innerHTML=(data.wind.speed*3.6).toFixed(2)||DEFAULT_VALUE
    })
})

    
