import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35796421-236293f5f82a44e4cff98c104';

export default class ImagePixabayApi {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
    }

    async fetchImages() {
        const parametersApi = new URLSearchParams({
            key: API_KEY,
            q: this.searchQuery,
            page: this.page,
            per_page: this.per_page,
            image_type: "photo",
            orientation: "horizontal",
        })

        const url = `${BASE_URL}?${parametersApi}`;

        try {
            const response = await axios.get(url)
            this.incrementPage()
            return response.data
        } catch (error) {
            Notify.failure("Error");
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