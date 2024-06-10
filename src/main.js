import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { searchImage } from './js/pixabay-api.js';
import { addImages, clearGallery, lightbox } from './js/render-functions.js';

const form = document.querySelector('.image-search-form');
const loader = document.querySelector('.loading-indicator');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentPage = 1;
let currentQuery = '';
let totalPages = 0;

loadMoreBtn.style.display = 'none';

form.addEventListener('submit', async event => {
  event.preventDefault();

  clearGallery();
  currentQuery = event.target.elements.inputSearch.value.trim();
  currentPage = 1;

  if (!currentQuery) {
    iziToast.error({
      title: 'Error',
      message: 'The search field cannot be empty. Please enter your query.',
      position: 'topRight',
    });
    return;
  }

  showLoader();
  loadMoreBtn.style.display = 'none';

  try {
    const data = await searchImage(currentQuery, currentPage);
    totalPages = Math.ceil(data.totalHits / 15);
    if (!data.hits.length) {
      iziToast.error({
        message: `Sorry, there are no images matching your search query. Please try again!`,
        messageColor: '#FAFAFB',
        color: '#EF4040',
        position: 'topRight',
      });
    } else {
      setTimeout(() => {
        addImages(data.hits);
        lightbox.refresh();
        loadMoreBtn.style.display = currentPage < totalPages ? 'block' : 'none';
      }, 2000);
    }
  } catch (error) {
    iziToast.error({
      message: `An error occurred: ${error.message}`,
      messageColor: '#FAFAFB',
      color: '#EF4040',
      position: 'topRight',
    });
  } finally {
    setTimeout(hideLoader, 2000);
  }
  form.reset();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  showLoader();

  try {
    const data = await searchImage(currentQuery, currentPage);
    if (!data.hits.length || currentPage > totalPages) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#FAFAFB',
        color: '#17A2B8',
        position: 'topRight',
      });
    } else {
      addImages(data.hits);
      lightbox.refresh();
      if (currentPage >= totalPages) {
        loadMoreBtn.style.display = 'none';
        iziToast.show({
          message: "We're sorry, but you've reached the end of search results.",
          messageColor: '#FAFAFB',
          color: '#17A2B8',
          position: 'topRight',
        });
      }
    }
  } catch (error) {
    iziToast.error({
      message: `An error occurred: ${error.message}`,
      messageColor: '#FAFAFB',
      color: '#EF4040',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }

  smoothScroll();
});

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
