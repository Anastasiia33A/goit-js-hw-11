import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from "notiflix/build/notiflix-notify-aio";
import ImagePixabayApi from "./js/pixabayApi";
import { placementPictures, resultsDiv } from "./js/placementPictures";

const form = document.querySelector(".search-form");
const BtnMore = document.querySelector(".load-more");

form.addEventListener("submit", submitForm);
BtnMore.addEventListener("click", onLoadMore);

const imagePixabayApi = new ImagePixabayApi();

let lightbox = new SimpleLightbox(".gallery a", {
    captionType: 'attr',
    captionsData: 'alt',
    captionDelay: '100',
    navText: ['⇦', '⇨']
});

let totalImages = 0;

async function submitForm(e) {
    e.preventDefault();

    clearGallery();
    const searchQuery = imagePixabayApi.query = e.currentTarget.elements.searchQuery.value.trim()
    if (!searchQuery) {
        withoutAsking();
        return;
    }

   imagePixabayApi.resetPage()
    try {
        const response = await imagePixabayApi.fetchImages(searchQuery);
        const totalHits = response.totalHits;
        totalImages += imagePixabayApi.per_page;

        if (response.hits.length === 0) {
            errorMessage();
            form.reset();
            return;
        }

        placementPictures(response.hits);

        Notify.info(`Hooray! We found ${totalHits} images.`);
        
        lightbox.refresh();

        BtnMore.classList.remove("is-hidden");

        if (response.hits.length < imagePixabayApi.per_page) {
            BtnMore.classList.add("is-hidden")
        }

        form.reset()
    } catch (error) {
        errorMessage
    }
}

async function onLoadMore(searchQuery) {
    try {
        const response = await imagePixabayApi.fetchImages(searchQuery);
        totalImages += imagePixabayApi.per_page;

        if (totalImages >= response.totalHits) {
            placementPictures(response.hits)
            BtnMore.classList.add("is-hidden");
            scrollIsBtn();
            lightbox.refresh();

            Notify.failure("We're sorry, but you've reached the end of search results!");
            return;
        }

        placementPictures(response.hits);
        scrollIBtn();
        lightbox.refresh();
    }   catch (error) {
            errorMessage;
    }
}

    function scrollIsBtn() {
        const { height: cardHeight } = document
            .querySelector(".gallery")
            .firstElementChild.getBoundingClientRect();
     
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
    }

function clearGallery() {
    resultsDiv.innerHTML = "";
    BtnMore.classList.add("is-hidden");
}

function withoutAsking() {
    Notify.warning("Please enter a request!");
}

function errorMessage() {
    Notify.failure("Sorry, there are no images matching your search query. Please try again!");
}
