import './css/styles.css';
import fetchCountries from "./js/fetchCountries"
import debounce from "lodash.debounce";


const DEBOUNCE_DELAY = 300;
const input = document.getElementById("search-box");

input.addEventListener('input', debounce(getNameOfCountry,DEBOUNCE_DELAY));


let name;

function getNameOfCountry(e) {
    name = e.target.value.trim();
    if (name.length === 0) return
    console.log(name);
    fetchCountries(name)
};