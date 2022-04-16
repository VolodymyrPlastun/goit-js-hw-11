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

async function OnSubmitSearch (evt) {
  evt.preventDefault();

  refs.loadMoreBtn.classList.remove('is-hidden');

  clearGallery();
  
  imagesApi.value = evt.currentTarget.elements.searchQuery.value;

  if (imagesApi.inputValue === '') {
    Notiflix.Notify.warning('Please, enter your request');
    return;
  }
  const searchImages = await imagesApi.fetchImages();
          if (searchImages.hits.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                return;
        } else {
    Notiflix.Notify.success(`Hooray! We found ${searchImages.totalHits} images.`);
       }
  
  imagesApi.resetPage();
  const createImages = await createGalleryMarckup(searchImages);
}

async function onLoadMore() {
  const searchImages = await imagesApi.fetchImages();
  const createImages = await createGalleryMarckup(searchImages);
    console.log(searchImages);

    if (searchImages.hits.length === 0) {
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      refs.loadMoreBtn.classList.remove('is-hidden');
                return;
  }
}

async function createGalleryMarckup(images) {
  const galleryImages = await images.hits;
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.gallery.insertAdjacentHTML('beforeend', imagesMarcup(galleryImages));
   
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

let gallery = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionDelay: 250});

// Не работает infinite scroll
  // refs.gallery.addEventListener('scroll', function() {
  //     if (refs.gallery.scrollTop + refs.gallery.clientHeight >= refs.gallery.scrollHeight) {
  //       imagesApi.fetchImages().then(createGalleryMarckup);
  //       console.log('end of page');
  // }
  // })
