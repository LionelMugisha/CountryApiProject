const region = document.getElementById("region");
const search = document.getElementById("search");
const outputInfo = document.getElementById("outputInfo");

let info = []

//defining events
window.addEventListener("load", getCountry);
region.addEventListener("change", filterCountriesInformation);
document.addEventListener('keypress', searchCountry);

//getting element from api
async function getCountry(){
    const resp = await fetch("https://restcountries.com/v3.1/all");
    const info = await resp.json();
    // console.log(info);

    //destructuring
    const displayInformation = (newInfo = info) => {
        info.forEach(countries => {
            const {flags,name, capital, population, region, subregion} = countries;
            const country = {
            flag: `${flags.png}`,
            name: `${name.common}`,
            capital: `${capital}`,
            population: `${population.toLocaleString("en")}`,
            region: `${region}`,
            subregion: `${subregion}`
            }
            showCountry(country);
        })
    }
    displayInformation()
    updateCountriesInfo()
}

//display
function showCountry(country) {
    info.push(country);
    updateCountriesInfo();
}

//generate a new array
function updateCountriesInfo(infoUpdate = info){
    outputInfo.innerHTML = '';
    infoUpdate.forEach(country => {
        const newDiv = document.createElement("div");
		newDiv.className = "container rounded-lg shadow-lg bg-white pb-4";
		newDiv.innerHTML = `
                    <div class="col-md-3 p-4">
                    <div class="card" style="width: 17rem;">
                    <img class="card-img-top" src="${country.flag}" alt="The country flag is for ${country.name.common}">
                    <div class="card-body">
                      <h5 class="card-title">${country.name}</h5>
                      <p class="card-text">${country.capital}</p>
                      <p class="card-text">${country.population.toLocaleString("en")}</p>
                      <p class="card-text">${country.region}</p>
                      <p class="card-text">${country.subregion}</p>
                    </div>
                  </div>
                    </div>
        `;
        outputInfo.append(newDiv);
    })
}

//search for the country
function searchCountry(e){
    if(e.keyCode === 13){
        searchForCountryInformation(); 
    }        
}

async function filterCountriesInformation() {
    info = []
    const url = `https://restcountries.com/v3.1/region/${region.value}`;
	const res = await fetch(url);
	let data = await res.json();

    const displayInformation = () => {
        data.forEach(countries => {
            const {flags,name, capital, population, region, subregion} = countries;
            const country = {
            flag: `${flags.png}`,
            name: `${name.common}`,
            capital: `${capital}`,
            population: `${population.toLocaleString("en")}`,
            region: `${region}`,
            subregion: `${subregion}`
            }
            showCountry(country);
        })
    }
    displayInformation();
	updateCountriesInfo(info);

}

async function searchForCountryInformation() {
    info = []
    const urls = `https://restcountries.com/v3.1/name/${search.value}`;
	const res = await fetch(urls);
	let data = await res.json();

    const displayInformation = () => {
        data.forEach(countries => {
            const {flags,name, capital, population, region, subregion} = countries;
            const country = {
            flag: `${flags.png}`,
            name: `${name.common}`,
            capital: `${capital}`,
            population: `${population.toLocaleString("en")}`,
            region: `${region}`,
            subregion: `${subregion}`
            }
            showCountry(country);
        })
    }
    displayInformation();
	updateCountriesInfo(info);
}