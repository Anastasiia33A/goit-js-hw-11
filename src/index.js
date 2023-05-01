
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { pixabayApiPictures } from './pixabayApi';
import { pixabayApiPictures } from "./pixabayApi";
import { placementPictur } from "./placementPictures";

const formSearch = document.querySelector('search-form');
const resultsDiv = document.querySelector('.gallery');
// const BtnMore = document.querySelector('.load-more');
formSearch.addEventListener('submit', onBtnMore);
  
  const pixabayPicturesMore = new pixabayApiPictures();
  function onBtnMore(e) {
    e.preventDefault();
    if (e.target.elements.searchQuery.value === '') {
      return;
    }
    resultsDiv.innerHTML = '';
    pixabayPicturesMore.page = 1;
    pixabayPicturesMore.searchQuery = e.target.elements.searchQuery.value.trim();
    pixabayPicturesMore.hits = 0;
    pixabayPicturesMore.getImages().then(placementPictur);
  }

  function pixabayApiPictures() {
    pixabayPicturesMore.page += 1;
    pixabayPicturesMore.getImages().then(placementPictur).cathc(error => console.log(error));
  }



//   const searchTerm = document.querySelector('.img-search').value;
//   const response = await fetch(`/search?query=${searchTerm}`);
//   const data = await response.json();
//   displayResults(data);
// });
// function displayResults(data) {
//   resultsDiv.innerHTML = '';
//   data.forEach((result) => {
//     const resultDiv = document.createElement('div');
//     resultDiv.textContent = result.title;
//     resultsDiv.appendChild(resultDiv);
//   });
