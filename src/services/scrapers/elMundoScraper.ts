import Scraper, { type FeedData } from './scraper';
import cheerio from 'cheerio';

class ElMundoScraper extends Scraper {
    constructor() {
        super(process.env.ELMUNDO_URL != null ? process.env.ELMUNDO_URL : 'https://www.elmundo.es/');
    }

    /**
     * Método para obtener las noticias desde la página web de El Mundo.
     *
     * @returns {Promise<Array<FeedData>>} - Un array de objetos FeedData con la información de las noticias.
     */
    async fetchNews(): Promise<FeedData[]> {
        try {
            const pageContent = await this.fetchPageContent();
            const $ = cheerio.load(pageContent);
            const newsData: FeedData[] = [];

            // Seleccionamos el bloque div que contiene los artículos
            const section = $('div[data-b-name="headlines_a"]');
            // Seleccionamos los artículos dentro del bloque
            section.find('article.ue-c-cover-content').each((_, element) => {
                const linkElement = $(element).find('a.ue-c-cover-content__link');
                const url = linkElement.attr('href') as string;
                const titleElement = $(element).find('h2.ue-c-cover-content__headline');
                const title = titleElement.text().trim();
                const newspaper = 'El Mundo';

                const newsItem: FeedData = {
                    title,
                    url,
                    newspaper,
                };

                newsData.push(newsItem);
            });

            return newsData;
        } catch (error) {
            console.error('Error fetching news from El Mundo:', error);
            throw error;
        }
    }
}

export default ElMundoScraper;
