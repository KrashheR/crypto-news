const searchFieldButton = document.querySelector('.search-field__button');
const searchFieldInputText = document.querySelector('.search-field__input-text');

console.log(searchFieldButton);

searchFieldButton.addEventListener('onclick', () => {
  if (searchFieldInputText.display === none) {
    console.log('LOL');
  }
});
