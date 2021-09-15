
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



//tro ly ao
var SpeechRecognition=SpeechRecognition||webkitSpeechRecognition;
let recognition=new SpeechRecognition();
const microphone=$('.fa-microphone')
const synth=window.speechSynthesis;

recognition.lang = 'vi-VI';
recognition.continuous=false;

const speak=(text)=>{
    if(synth.speaking){
        console.log('Busy, Speaking.....')
        return;
    }
    const utter=new SpeechSynthesisUtterance(text);
    utter.onend=()=>{
        console.log('SpeechSynthesisUtterance.onend')
    }
    utter.onerror=(error)=>{
        console.error('SpeechSynthesisUtterance.onerror',error)
    }
    synth.speak(utter)
}
handleVoice=(text)=>{
    console.log(text)
    const handleText=text.toLowerCase();
    if(handleText.includes('thời tiết tại')){
        const location=handleText.split('tại')[1].trim();
        search.value=location
        const changeEvent=new Event('change')
        search.dispatchEvent(changeEvent)
        return;
    }
    if(handleText.includes('thay đổi màu nền'))
    {
        const color=handleText.split('màu nền')[1].trim();
        $('.container').style.background=color
        return;
    }
    if(handleText.includes('màu mặc định'))
    {
        $('.container').style.background=''
        return;
    }
    if(handleText.includes('mấy giờ')){
        const textToSpeech = `${moment().hours()} hours ${moment().minutes()} minutes`
        console.log(textToSpeech)
        speak(textToSpeech)
        return;
    }
    
    speak('Try again')
}
microphone.addEventListener('click',(e)=>{
    e.preventDefault();
    recognition.start();
    $('.voice-icon').classList.add('recording')
})
recognition.onspeechend=()=>{
    recognition.stop()
    $('.voice-icon').classList.remove('recording')
}
recognition.onerror=(error)=>{
    console.error(error)
    $('.voice-icon').classList.remove('recording')
}

recognition.onresult=(e)=>{
   const text=e.results[0][0].transcript
   handleVoice(text)
}
