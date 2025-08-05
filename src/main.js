import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElem = document.querySelector('.form');
const showMoreBtn = document.querySelector('.show-more-btn');
const scrollToTopBtn = document.querySelector('.scroll-to-top');

let page = 1;
let total = 0;
const imagePerPage = 15;
let searchQuery = '';

formElem.addEventListener('submit', e => {
  e.preventDefault();
  const query = formElem.elements['search-text'].value.trim();
  if (!query) {
    iziToast.error({
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }
  searchQuery = query;
  page = 1;
  handleSearch(query);
});

showMoreBtn.addEventListener('click', () => {
  showLoader();
  getImagesByQuery(searchQuery, page)
    .then(images => {
      if (images.hits.length === 0) {
        iziToast.error({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
        hideLoadMoreButton();
        return;
      }
      createGallery(images.hits);
      page++;
      const card = document.querySelector('.gallery .image-item');
      if (card) {
        const cardHeight = card.getBoundingClientRect().height;
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
      if (page > Math.ceil(total / imagePerPage)) {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    })
    .catch(() => {
      iziToast.error({
        message: 'Error loading images',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });
});

function handleSearch(query) {
  clearGallery();
  hideLoadMoreButton();
  showLoader();
  getImagesByQuery(query, page)
    .then(images => {
      if (images.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        hideLoadMoreButton();
        return;
      }
      total = images.totalHits;
      createGallery(images.hits);
      page++;
      if (page > Math.ceil(total / imagePerPage)) {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      } else {
        showLoadMoreButton();
      }
    })
    .catch(() => {
      iziToast.error({
        message: 'Error loading images',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
