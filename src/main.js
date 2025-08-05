import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElem = document.querySelector('.form');

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
  handleSearch(query);
});

function handleSearch(query) {
  clearGallery();
  showLoader();
  getImagesByQuery(query)
    .then(images => {
      if (images.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }
      createGallery(images);
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
