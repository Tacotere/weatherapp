//default city is Boise, ID, USA
let data1 = JSON.parse(localStorage.getItem("data1"));

if (data1 === null) {
  data1 = "Boise, USA";
}

//currentDay and nameDay are functions used for projections
let currentDay = () => {
  let date = new Date();
  let day = date.getDay();

  return day;
};

let nameDay = (num) => {
  if (num >= 7) {
    num = num - 7;
  }

  switch (num) {
    case 0:
      dayOutput = "Sun";
      break;
    case 1:
      dayOutput = "Mon";
      break;
    case 2:
      dayOutput = "Tue";
      break;
    case 3:
      dayOutput = "Wed";
      break;
    case 4:
      dayOutput = "Thu";
      break;
    case 5:
      dayOutput = "Fri";
      break;
    case 6:
      dayOutput = "Sat";
      break;
  }

  return dayOutput;
};

//function to grab images for projections

let getImg = (weather) => {
  switch (weather) {
    case "Rain":
      img =
        "http://www.newdesignfile.com/postpic/2014/10/rain-cloud-weather-icon_191515.png";
      break;
    case "Sunny":
      img =
        "https://icons-for-free.com/iconfiles/png/512/sunny+temperature+weather+icon-1320196637430890623.png";
      break;
    case "Clouds":
      img = "https://image.flaticon.com/icons/png/512/2930/2930014.png";
      break;
    case "Clear":
      img =
        "https://cdn3.iconfinder.com/data/icons/weather-610/64/weather_sun_sunny_cloud-512.png";
  }
  return img;
};

//converts Kelvin to Fahrenheit

let convertKelvin = (kelvin) => {
  Fdegree = Math.floor((9 / 5) * (kelvin - 273) + 32);
  return Fdegree;
};

// ------------- Main (First) Weather Display ---------- //

//Populates default city's 1st half of weather data
async function getCurrentWeather1() {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${data1}&appid=9d7a9a132d47022faca7ad4802838e35`
    );

    let array = response.data;
    let kelvin = array.main.temp;
    let true_temp = convertKelvin(kelvin);

    let temp_display = document.querySelector("#currentTemp");
    let city_display = document.querySelector("#currentCity");
    let weather_desc = document.querySelector("#weatherDesc");
    let humidity = document.querySelector("#humid");
    let wind = document.querySelector("#wind");

    temp_display.innerHTML = `${true_temp}°`;
    city_display.innerHTML = data1;
    weather_desc.innerHTML = array.weather[0].main;
    wind.innerHTML = `<img id = "windpic" src = "https://image.flaticon.com/icons/png/512/959/959711.png"></img><div id = "windNum"> ${array.wind.speed}<span class = "unit"> mph<span> </div>`;
    humidity.innerHTML = `<img id = "humidpic" src = "https://image.flaticon.com/icons/png/512/606/606797.png"></img><div id = "humidNum"> ${array.main.humidity}<span class = "unit"> % </span> </div>`;
  } catch (error) {
    console.log(error);
  }
}

//Populates default city's projections (2nd half of weather data)
async function projections1() {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/onecall?lat=43.6150&lon=-116.2023&appid=9d7a9a132d47022faca7ad4802838e35"
    );

    let array = response.data;

    let i;
    for (i = 0; i < 4; i++) {
      let box = document.querySelector(`#day${i}`);

      if (i === 0) {
        box.innerHTML = `<div class = "day"> Tom. </div>`;
      } else {
        box.innerHTML = `<div class = "day"> ${nameDay(
          currentDay() + i + 1
        )}</div>`;
      }

      box.innerHTML += `<img src = ${getImg(
        array.daily[i].weather[0].main
      )}></img>`;
      box.innerHTML += `<div class = "degreeBox"> ${convertKelvin(
        array.daily[i].temp.day
      )}° </div>`;
    }
  } catch (error) {
    console.log(error);
  }
}

getCurrentWeather1();
projections1();

// ------------- Sidebar (Second) Weather Display ---------- //

//Populates the default screen
let searchedCity = null;

if (searchedCity === null) {
  let sidebarCity = document.querySelector("#currentCity2");
  let sidebarTemp = document.querySelector("#tempText");
  let sidebarProjection = document.querySelector("#projectionText");

  sidebarCity.innerHTML = "No city researched";
  sidebarTemp.innerHTML = "No weather to display. Search for a city.";
  sidebarProjection.innerHTML += "No forecast to display. Search for a city.";
}

//Populates the 1st half of weather data
async function getCurrentWeather2(entered_data) {
  let temp_display2 = document.querySelector("#currentTemp2");
  let city_display2 = document.querySelector("#currentCity2");
  let temp_text = document.querySelector("#tempText");
  let weather_desc2 = document.querySelector("#weatherDesc2");
  let humidity2 = document.querySelector("#humid2");
  let wind2 = document.querySelector("#wind2");
  let sidebarProjection = document.querySelector("#projectionContainer2");

  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${entered_data}&appid=9d7a9a132d47022faca7ad4802838e35`
    );

    let array = response.data;

    let kelvin = array.main.temp;
    let true_temp = convertKelvin(kelvin);
    sidebarProjection.style.width = "50%";
    sidebarProjection.style.justifyContent = "space-evenly";

    sidebarProjection.innerHTML = `


    <div class="projectionBox2" id="sday0"></div>
    <div class="projectionBox2" id="sday1"></div>
    <div class="projectionBox2" id="sday2"></div>
    <div class="projectionBox2" id="sday3"></div>`;

    city_display2.innerHTML = entered_data;
    temp_display2.innerHTML = `${true_temp}°`;
    weather_desc2.innerHTML = array.weather[0].main;
    temp_text.textContent = " ";
    wind2.innerHTML = `<img class = "smallpic2" id = "windpic2" src = "https://image.flaticon.com/icons/png/512/959/959711.png"></img><div class = "windHumidVal" id = "windNum2"> ${array.wind.speed}<span class = "unit"> mph<span> </div>`;
    humidity2.innerHTML = `<img class = "smallpic2" id = "humidpic2" src = "https://image.flaticon.com/icons/png/512/606/606797.png"></img><div class = "windHumidVal" id  = "humidNum2"> ${array.main.humidity}<span class = "unit"> % </span> </div>`;
  } catch (error) {
    console.log(error);
    city_display2.innerHTML =
      "Sorry could not find that city. Please try again";
    sidebarProjection.textContent = " ";
    temp_text.textContent = " ";
    weather_desc2.textContent = " ";
    temp_display2.textContent = " ";
    wind2.textContent = " ";
    humidity2.textContent = " ";
    temp_text.textContent = " ";
  }
}

//Collects Lat and Lng data
async function getLatLng(data) {
  try {
    const response = await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=9d7a9a132d47022faca7ad4802838e35`
      )
      .then((res) => {
        lon = res.data.coord.lon;
        lat = res.data.coord.lat;
      });
  } catch (error) {
    console.log(error);
  }
}

//Uses Lat and Lng Data to form projection (2nd half of weather data)
async function projections2() {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=9d7a9a132d47022faca7ad4802838e35`
    );

    let array = response.data;

    let i;
    for (i = 0; i < 4; i++) {
      let box = document.querySelector(`#sday${i}`);

      if (i === 0) {
        box.innerHTML = `<div class = "day"> Tom. </div>`;
      } else {
        box.innerHTML = `<div class = "day"> ${nameDay(
          currentDay() + i + 1
        )}</div>`;
      }
      box.innerHTML += `<img src = ${getImg(
        array.daily[i].weather[0].main
      )}></img>`;
      box.innerHTML += `<div class = "degreeBox"> ${convertKelvin(
        array.daily[i].temp.day
      )}° </div>`;
    }
  } catch (error) {
    console.log(error);
  }
}

// Button function to utilize all the previous functions

let form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let data2 = document.querySelector("#searchbar").value;

  getCurrentWeather2(data2);
  getLatLng(data2);

  setTimeout(projections2, 120);
});

// ------------------------------------------DONE ---------------------------------------//

// Code that Didn't Work - will investigate later

// async function getLat(data) {
//   try {
//     const response = await axios.get(
//       `https://www.mapquestapi.com/geocoding/v1/address?key=vJebn2CqoNAK9NeQuEPY6TO9Lj6n52cT&inFormat=kvp&outFormat=json&location=${data}&thumbMaps=false`
//     );
//     let lat = response.data.results[0].locations[0].latLng.lat.toFixed(4);
//     return lat;
//     // lat.then((lat_value) => {
//     //   console.log(lat_value);
//     //   return lat_value;
//     // });
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function getLng(data) {
//   try {
//     const response = await axios.get(
//       `https://www.mapquestapi.com/geocoding/v1/address?key=vJebn2CqoNAK9NeQuEPY6TO9Lj6n52cT&inFormat=kvp&outFormat=json&location=${data}&thumbMaps=false`
//     );
//     let lng = response.data.results[0].locations[0].latLng.lng.toFixed(4);
//     return lng;
//   } catch (error) {
//     console.log(error);
//   }
// }

// let collectLat = () => {
//   getLat(data2).then((value1) => {
//     console.log(value1);
//     return value1;
//   });
// };
// let collectLng = () => {
//   getLng(data2).then((value2) => {
//     console.log(value2);
//     return value2;
//   });
// };

// async function getLatLng(data) {
// try{
//   const response =  await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=9d7a9a132d47022faca7ad4802838e35`
//     )}
//     .then((res) => {
//       lon = res.data.coord.lon;
//       lat = res.data.coord.lat;
//     })
//     .catch((error) => {
//       console.log(error);
//     }
// }}
