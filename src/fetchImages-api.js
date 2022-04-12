const axios = require('axios').default;
export default class ImagesApiServise {
    constructor() {
        this.inputValue = '';
        this.page = 1;
    }
    fetchImages(inputValue) {
        console.log(this);
       return axios.get(`https://pixabay.com/api/?key=26678014-2cea77333fe97e3b1fabd9511&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
            .then(response => {
                this.page += 1;
                return response.data.hits;
            // console.log(response.data.hits)
            // if (response.data.hits.length === 0) {
            //     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            //     return;
            // }
            // const images = response.data.hits.map(image => console.log(image.tags));
            });
        
        
}
set value(newValue) {
    this.inputValue = newValue;
    }
    resetPage() {
        this.page = 1;
    }
}
    // fetch(`https://pixabay.com/api/?key=26678014-2cea77333fe97e3b1fabd9511&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`)
    //     .then(response => response.json()).then(console.log); 