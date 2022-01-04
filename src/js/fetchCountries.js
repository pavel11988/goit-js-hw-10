import '../css/styles.css';
import Notiflix from 'notiflix';



export default function fetchCountries(name) {

   
    const countryInfo = document.querySelector(".country-info");
    const countryList = document.querySelector(".country-list");

    fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        return response.json();
    })
    .then(countries => {

        console.log(countries);

        let name;
        let capital;
        let population;
        let flags;
        let languages;
        let language = [];
        countryInfo.innerHTML = ' ';
        countryList.innerHTML = ' ';

        if (countries.length < 11) {
            const country = countries[0];

            country.languages.map(i => {
                language.push(i.name)
            })
            
            name = country.name;
            capital = country.capital;
            population = country.population;
            languages = language.join(', ');
            flags = country.flags.svg;
            let markup = [];

            if (countries.length === 1){

                const markup = `
                <div class="info-card">
                    <img src="${flags}" alt="${name}" width="140" height="70" class="info-image">
                    <h1 class="info-title">
                    ${name}
                    </h1>
                    <p class="info-text">
                        capital: ${capital}
                    </p>
                    <p class="info-text">
                        population: ${population}
                    </p>
                    <p class="info-text">
                        languages: ${languages}
                    </p>
                </div>
                `;
                console.log(markup);
                countryInfo.innerHTML = ' ';
                countryInfo.innerHTML += markup;
            }


            else {
                
                countries.forEach(country => {
                    console.log(country.flags.svg);
                    markup.push(`
                        <li class="list-card">
                            <img src="${country.flags.svg}" alt="${country.name}" width="80" height="40" class="list-image">
                            <p class="list-text">
                            ${country.name}
                            </p>
                        </li>    
                `);
                });
                countryList.innerHTML = ' ';
                countryList.innerHTML += markup.join("");    
            }

        }

        if (countries.length > 11) {
            return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            
        }

        if (countries.status === 404) {
            return Notiflix.Notify.failure("Oops, there is no country with that name");
        }

        })

    .catch(error => {
        console.log(error);
    })
}