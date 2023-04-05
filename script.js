

const p = document.getElementById('text');
const q = document.getElementById('heure');
let date = new Date()
date.toLocaleDateString("de-DE")
// console.log(date)
// on affiche la date du jour et on la formate en string pour le format voulu
let newdate = new Date().toISOString()
console.log(newdate)
// console.log(newdate.substring(14,16))
// CREER UN SET INTERVAL ICI AUSSI
// on déclare des variables pour les insérer dans l'URL et avoir la température du jour
let ds, ms, ys, heure, minutes, comparTemp;
ds = newdate.substring(8,10)
// console.log(ds)
ms = newdate.substring(5,7)
// console.log(ms)
ys = newdate.substring(0,4)
heure = parseInt(newdate.substring(11,13))+2
minutes = newdate.substring(14,16)
// console.log(heure)


let emoji = ""
// pour avoir les coordonnées

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position);
  } else {
    return
  }
}

getLocation();
function position(position){
    let latitude = position.coords.latitude;
    // console.log(latitude)
    let longitude = position.coords.longitude;
    // console.log(longitude)

fetch('https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+longitude+'&hourly=temperature_2m&start_date='+ ys +'-' + ms  + '-'+ ds + '&end_date='+ ys + '-'+ ms +'-'+ ds)
.then((resp) => resp.json())
.then((data) => {
    // console.log(data)
    // pour récuperer la date du jour
    const times = data.hourly.time
    let temps = data.hourly.temperature_2m
    // console.log(temps)
    // Avoir la date
        for (let a of times) {
            comparTemp= parseInt(a.substring(11,13))
            // console.log(a)
            if (heure == comparTemp){
            p.innerHTML = `<br><span>Heure:  </span> ${a.substring(11,14)} ${a.substring(14,16).innerHTML = minutes}`
            console.log(minutes)
            }
        }
        // Avoir la température
        for (let b of temps) {
// Différents emoji selon la température
            switch (true) {
                case b <= 5 :
                   emoji = "🥶";
                //    console.log(emoji)
                    break;
                case b>5 && b <= 13 :
                    emoji = '😰'
                    break;
                case b >13 && b <=25 :
                    emoji = '😎'
                    break;
                case b >25 :
                    emoji = '🔥'
                    break;
            } 
            // Afficher la température + emoji
            let indiceb = (heure-1)
            // console.log(temps[indiceb])
            if (temps[indiceb]){
            q.innerHTML = `<br><span>Température:  </span>${temps[indiceb]}°C ${emoji}`
            }
    }
    });
} setInterval(getLocation, 5000);