import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import { refs } from './fetchCountries.js';

refs.search.addEventListener('input', debounce(onInput, refs.DEBOUNCE_DELAY));

function onInput(event) {
  const searchInput = event.target.value.trim();
  if (event.target.value.length !== 0) {
    fetchCountries(searchInput);
  }
  if (event.target.value.length === 0) {
    refs.countryCard.innerHTML = '';
    refs.list.innerHTML = '';
  }
}
