import Scraper, { type FeedData } from './scraper';
import cheerio from 'cheerio';

class ElPaisScraper extends Scraper {
    constructor() {
        super(process.env.ELPAIS_URL != null ? process.env.ELPAIS_URL : 'https://elpais.com/');
    }

    /**
     * Método para obtener las noticias desde la página web de El País.
     *
     * @returns {Promise<Array<FeedData>>} - Un array de objetos FeedData con la información de las noticias.
     */
    async fetchNews(): Promise<FeedData[]> {
        try {
            const pageContent = await this.fetchPageContent();
            const $ = cheerio.load(pageContent);
            const newsData: FeedData[] = [];

            // Seleccionamos la sección portada_apertura
            const section = $('section[data-dtm-region="portada_apertura"]');

            // Seleccionamos los artículos dentro de la sección
            section.find('article.c').each((_, element) => {
                const titleElement = $(element).find('h2.c_t');
                const title = titleElement.text().trim();
                const url = titleElement.find('a').attr('href') as string;
                const description = $(element).find('p.c_d').text().trim();
                const newspaper = 'El País';

                const newsItem: FeedData = {
                    title,
                    description,
                    url,
                    newspaper,
                };

                newsData.push(newsItem);
            });

            return newsData;
        } catch (error) {
            console.error('Error fetching news from El País:', error);
            throw error;
        }
    }
}

export default ElPaisScraper;
