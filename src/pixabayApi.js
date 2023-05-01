import axios from 'axios';
import { Notify } from 'notiflix';

const API_KEY = '35796421-236293f5f82a44e4cff98c104';
const URL_API = 'https://pixabay.com/api/';

export default class pixabayApiPictures {
    constructor() {
        this.perPage = 40;
        this.page = 1;
        this.searchQuery = '';
    }

    async fetchApiPictures() {
        const parametersApi = new URLParametersApi({
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
            this.additionPage()
            return response
        } catch (error) {
            Notify.failure('Error');
        }

    }
    
    additionPage() {
            this.page += 1;
    }
    
    resetPage() {
        this.page = 1;
    }
    }

