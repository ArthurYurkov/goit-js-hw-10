import { Notify } from 'notiflix';
import countryCardTpl from './templates/countryTemplate.hbs';
import countryListTemplate from './templates/countryListTemplate.hbs';

export const refs = {
  DEBOUNCE_DELAY: 300,
  countryCard: document.querySelector('.country-info'),
  search: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
};

export function fetchCountries(searchInput) {
  fetch(
    `https://restcountries.com/v2/name/${searchInput}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        refs.countryCard.innerHTML = '';
        refs.list.innerHTML = '';
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      renderCountryCard(data);
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function renderCountryCard(newCountry) {
  refs.countryCard.innerHTML = '';
  refs.list.innerHTML = '';
  if (newCountry.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  if (newCountry.length === 1) {
    const markup = newCountry.map(countryCardTpl);
    refs.countryCard.innerHTML = markup;
    return;
  }
  if (newCountry.length >= 2 && newCountry.length <= 10) {
    const markup = newCountry.map(countryListTemplate).join('');
    refs.list.innerHTML = markup;
  }
}
