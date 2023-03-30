import axios from 'axios';

abstract class Scraper {
    protected url: string;

    constructor(url: string) {
        this.url = url;
    }

    /**
     * Método abstracto para obtener las noticias desde la página web del periódico.
     *
     * @returns {Promise<Array<FeedData>>} - Un array de objetos FeedData con la información de las noticias.
     */
    abstract fetchNews(): Promise<FeedData[]>;

    /**
     * Método para realizar una solicitud HTTP GET y obtener el contenido de la página web.
     *
     * @param {string} url - La URL de la página web.
     * @returns {Promise<string>} - El contenido de la página web en formato string.
     */
    protected async fetchPageContent(): Promise<string> {
        try {
            const response = await axios.get(this.url);
            return response.data;
        } catch (error) {
            console.error(`Error fetching page content for ${this.url}:`, error);
            throw error;
        }
    }
}

export interface FeedData {
    title: string;
    description?: string;
    url: string;
    newspaper: string;
}

export default Scraper;
