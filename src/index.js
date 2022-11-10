import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryInput.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange() {
  let searchCountryName = countryInput.value.trim();
  if (searchCountryName === '') {
    clearAll();
    return;
  } else
    fetchCountries(searchCountryName)
      .then(countryNames => {
        if (countryNames.length < 2) {
          createCountrieCard(countryNames);
        } else if (countryNames.length <= 10 && countryNames.length >= 2) {
          createCountrieList(countryNames);
        } else {
          clearAll();
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      .catch(() => {
        clearAll();
        Notiflix.Notify.failure('Oops, there is no country with that name.');
      });
}

function createCountrieCard(countries) {
  clearAll();
  const country = countries[0];
  const readyCard = `<div>
            <img src="${
              country.flags.svg
            }" alt="Country flag" width="60", height="40">
            <h2> ${country.name.official}</h2>
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Languages: ${Object.values(country.languages).join(',')}</p>
    </div>`;
  countryInfo.innerHTML = readyCard;
}

function createCountrieList(countries) {
  clearAll();
  const readyList = countries
    .map(
      country =>
        `<li>
            <img src="${country.flags.svg}" alt="Country flag" width="40", height="30">
            ${country.name.official}
        </li>`
    )
    .join('');
  countryList.insertAdjacentHTML('beforeend', readyList);
}

function clearAll() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
