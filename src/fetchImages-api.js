const axios = require('axios').default;
const API_KEY = '26678014-2cea77333fe97e3b1fabd9511';
const BASE_URL = 'https://pixabay.com/api';

export default class ImagesApiServise {
    constructor() {
        this.inputValue = '';
        this.page = 1;
    }
    async fetchImages(inputValue) {
        const response = await axios.get(`${BASE_URL}/?key=${API_KEY}&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
        this.page += 1; 
        return response.data;    
}
set value(newValue) {
    this.inputValue = newValue;
    }
    resetPage() {
        this.page = 1;
    }
}
   