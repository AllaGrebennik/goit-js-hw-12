'use strict';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

const form = document.querySelector(".form");
const qSearch = document.querySelector(".input-text");
const gallery = document.querySelector(".gallery");
const spinnerOnOff = document.querySelector(".loader");
const loadMoreFotos = document.querySelector(".load-more-btn")

let totalPages;

spinnerOnOff.style.display = "none";
loadMoreFotos.style.display = "none";

let searchParams = {
    key: "41702324-4ff2c897c89b5acf667452ea5",
    q: "",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 40,
    page: 1,
};
    
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    gallery.textContent = "";
    searchParams.q = qSearch.value;
    searchParams.page = 1;
    await fetchFotos()
});

loadMoreFotos.addEventListener('click', async (e) => {
    e.preventDefault();
    searchParams.page++;
    await fetchFotos();
    window.scrollBy({
        top: gallery.firstElementChild.getBoundingClientRect().height*2,
        left: 0,
        behavior: "smooth",
    });
});

async function fetchFotos() {
    spinnerOnOff.style.display = "block"; 
    loadMoreFotos.style.display = "none";
    const searchParamsCurrent = new URLSearchParams(searchParams);
    return await axios.get(`https://pixabay.com/api/?${searchParamsCurrent}`)
        .then((response) => {
            totalPages = Math.ceil(response.data.totalHits / searchParams.per_page);
            if (totalPages === 0) {
                return iziToast.error({
                    position: 'topRight',
                    maxWidth: 350,
                    message: "Sorry, there are no images matching your search query. Please try again!"
                });
            } else if (searchParams.page >= totalPages) {
                iziToast.info({
                    position: 'topRight',
                    maxWidth: 350,
                    message: "We're sorry, but you've reached the end of search results."});
            }
            else loadMoreFotos.style.display = "block";
            return renderFotos(response.data);
        })
        .catch((error) => {
            return iziToast.error({
                position: 'topRight',
                title: "Error",
                message: `${error.message}`
            })
        })
        .finally(() => spinnerOnOff.style.display = "none");  
};

function renderFotos(fotos) {
    const markup = fotos.hits.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads
    }) => `
        <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
            <img
                class="gallery-image"
                src="${webformatURL}"
                alt="${tags}"/>
            </a>
            <div class="info-item">
                <div class="info-image">
                    <h3 class="info-key">Likes</h3>
                    <p class="info-value">${likes}</p>
                </div>
                <div class="info-image">
                    <h3 class="info-key">Views</h3>
                    <p class="info-value">${views}</p>
                </div>
                <div class="info-image">
                    <h3 class="info-key">Comments</h3>
                    <p class="info-value">${comments}</p>
                </div>
                <div class="info-image">
                    <h3 class="info-key">Downloads</h3>
                    <p class="info-value">${downloads}</p>
                </div>
            </div>  
        </li>`).join("");
    gallery.insertAdjacentHTML("beforeend",markup);
    lightbox.refresh();
}