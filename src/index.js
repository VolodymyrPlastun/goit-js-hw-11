import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import ImagesApiServise from './fetchImages-api';
import imagesMarcup from './gallery.hbs';

const imagesApi = new ImagesApiServise();
const refs = {
    form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

refs.form.addEventListener('submit', OnSubmitSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function OnSubmitSearch (evt) {
    evt.preventDefault();

    imagesApi.value = evt.currentTarget.elements.searchQuery.value;
  imagesApi.resetPage();
  imagesApi.fetchImages().then(createGalleryMarckup);
  // imagesApi.fetchImages().then(searchImages);
}

function onLoadMore() {
 imagesApi.fetchImages().then(createGalleryMarckup);
  // imagesApi.fetchImages().then(searchImages);
}

function createGalleryMarckup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imagesMarcup(images));
}

// function searchImages(images) {
//     // console.log(images);
//      const galleryMarcup = images.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
//          return `<div class="photo-card">
//   <a class="gallery__link" href="${largeImageURL}">
//     <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
//     <div class="info">
//       <p class="info-item">
//         <b>${likes}</b>
//       </p>
//       <p class="info-item">
//         <b>${views}</b>
//       </p>
//       <p class="info-item">
//         <b>${comments}</b>
//       </p>
//       <p class="info-item">
//         <b>${downloads}</b>
//       </p>
//     </div>
//   </a>
// </div>`
//      }).join('');
//     refs.gallery.insertAdjacentHTML('beforeend', galleryMarcup);
// }

// let gallery = new SimpleLightbox('.gallery a');