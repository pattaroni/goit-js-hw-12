import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery .gallery-link', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

export function createGallery(images) {
  const markup = imagesTemplate(images);
  galleryList.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryList.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-visible');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
}

function imageTemplate(image) {
  return `<li class="image-item">
        <a class='gallery-link' href='${image.largeImageURL}'>
            <img src="${image.webformatURL}" alt="${image.tags
    .split(',')
    .slice(0, 3)
    .join(',')}" class='image'/>
        </a>
        <div class="image-info">
          <p><span class='title'>Likes:</span><span class='counts'>${
            image.likes
          }</span></p>
          <p><span class='title'>Views:</span><span class='counts'>${
            image.views
          }</span></p>
          <p><span class='title'>Comments:</span><span class='counts'>${
            image.comments
          }</span></p>
          <p><span class='title'>Downloads:</span><span class='counts'>${
            image.downloads
          }</span></p>
        </div>
      </li>`;
}

function imagesTemplate(images) {
  return images.map(imageTemplate).join('');
}
