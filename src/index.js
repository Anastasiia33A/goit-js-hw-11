
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { pixabayApiPictures } from './pixabayApi';
import { pixabayApiPictures } from "./pixabayApi";
import { placementPictures } from "./placementPictures";

const formSearch = document.querySelector('.search-form');
const resultsDiv = document.querySelector('.gallery');
const BtnMore = document.querySelector('.load-more');
const superviseDiv = document.querySelector('.supervise');

const pictures = new pixabayApiPictures();

formSearch.addEventListener('submit', onBtnMore);
  
   function onBtnMore(e) {
     e.preventDefault();
    if (e.target.elements.searchQuery.value === '') {
      return;
    }
    resultsDiv.innerHTML = '';
    pictures.hits = 0;
    pictures.page = 1;
    pictures.searchQuery = e.target.elements.searchQuery.value.trim();
    pictures.getImages().then(placementPictures);
  }

  function pixabayApiPicturesMore() {
    pictures.page += 1;
    pictures.getImages().then(placementPictures).catch(error => console.log(error));
  }

const onEntry = entries => {
    entries.forEach(entry => {
    if (entry.isIntersecting && count > totalHitsValue) {
      return;
    } else if (
      entry.isIntersecting &&
      pixabayPicturesMore.searchQuery !== '' &&
      count !== totalHitsValue
    ) {
      pixabayApiPicturesMore();
    }
  });
};
 const supervise = new IntersectionObserver(onEntry, options);

 supervise.observe(superviseDiv);
