import axios from 'axios';
import { Notify } from 'notiflix';

const API_KEY = '35796421-236293f5f82a44e4cff98c104';
const URL_API = 'https://pixabay.com/api/';

// export let count = null;
// export let totalHitsValue = null;

export default class pixabayApiPictures {
    constructor() {
        this.perPage = 40;
        this.page = 1;
        this.searchQuery = '';
        this.hits = 0;
    }

    async getImages() {
        const parametersApi = new URLSearchParams({
            key: API_KEY,
            q: this.searchQuery,
            page: this.page,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        });
        const url = `${URL_API}?${parametersApi}`;

        try {
            const response = await axios.get(url);
            this.incrementPage()
            return response;
        } catch (error) {
            Notify.failure('Error');
        }

    }
    
    incrementPage() {
            this.page += 1;
    }
    
    resetPage() {
        this.page = 1;
    }
    get searchQuery() {
    return this.query;
    }

    set searchQuery(newQuery) {
    this.query = newQuery;
    }
}


