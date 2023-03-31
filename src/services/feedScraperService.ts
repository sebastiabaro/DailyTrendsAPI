import { type FeedData } from './scrapers/scraper';
import ElPaisScraper from './scrapers/elPaisScraper';
import ElMundoScraper from './scrapers/elMundoScraper';
import Feed from '../models/feed';

class FeedScraperService {
    private readonly elPaisScraper: ElPaisScraper;
    private readonly elMundoScraper: ElMundoScraper;

    constructor() {
        this.elPaisScraper = new ElPaisScraper();
        this.elMundoScraper = new ElMundoScraper();
    }

    /**
     * Obtiene las noticias de los periódicos utilizando las clases scraper.
     *
     * @returns {Promise<void>}
     */
    async fetchAndStoreNews(): Promise<void> {
        try {
            const elPaisNews = await this.elPaisScraper.fetchNews();
            const elMundoNews = await this.elMundoScraper.fetchNews();
            const allNews = [...elPaisNews, ...elMundoNews];

            // Guardar las noticias en la base de datos
            for (const newsItem of allNews) {
                await this.saveNewsItem(newsItem);
            }
        } catch (error) {
            console.error('Error fetching and storing news:', error);
            throw error;
        }
    }

    /**
     * Guarda un elemento de noticias en la base de datos si no existe previamente.
     *
     * @param {FeedData} newsItem - El objeto FeedData con la información de la noticia.
     * @returns {Promise<void>}
     */
    private async saveNewsItem(newsItem: FeedData): Promise<void> {
        try {
            const existingFeed = await Feed.findOne({ url: newsItem.url });

            if (existingFeed == null) {
                const feed = new Feed(newsItem);
                await feed.save();
            }
        } catch (error) {
            console.error('Error saving news item:', error);
            throw error;
        }
    }

    /**
     * Inicia el servicio de scraping y guarda las noticias en la base de datos cada cierto tiempo.
     * Utiliza setInterval para ejecutar la función fetchAndStoreNews periódicamente.
     * @param {number} interval - El intervalo en milisegundos entre cada ejecución de la función fetchAndStoreNews.
     */
    start(interval: number): void {
        console.log('Starting FeedScraperService...');
        // Ejecutar la función de scraping inmediatamente al inicio
        void this.fetchAndStoreNews();

        // Programar la función de scraping para que se ejecute periódicamente
        setInterval(() => {
            void this.fetchAndStoreNews();
        }, interval);
    }
}

export default FeedScraperService;
