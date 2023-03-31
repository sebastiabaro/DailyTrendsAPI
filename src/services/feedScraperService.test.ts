import ElMundoScraper from './scrapers/elMundoScraper';
import ElPaisScraper from './scrapers/elPaisScraper';
import FeedScraperService from './feedScraperService';
import Feed from '../models/feed';
import { connectDatabase, disconnectDatabase } from '../utils/database';

beforeAll(async () => {
    // Conectarse a la base de datos antes de ejecutar las pruebas
    await connectDatabase();
});

afterAll(async () => {
    // Desconectarse de la base de datos después de que finalicen las pruebas
    await disconnectDatabase();
});

describe('Scraper', () => {
    describe('ElMundoScraper', () => {
        it('debería obtener noticias', async () => {
            const scraper = new ElMundoScraper();
            const news = await scraper.fetchNews();
            expect(news.length).toBeGreaterThan(0);
        });

        it('debería extraer correctamente las propiedades de los artículos', async () => {
            const scraper = new ElMundoScraper();
            const news = await scraper.fetchNews();

            expect(news[0]).toHaveProperty('title');
            expect(news[0]).toHaveProperty('url');
            expect(news[0]).toHaveProperty('newspaper');
        });
    });

    describe('ElPaisScraper', () => {
        it('debería obtener noticias', async () => {
            const scraper = new ElPaisScraper();
            const news = await scraper.fetchNews();
            expect(news.length).toBeGreaterThan(0);
        });

        it('debería extraer correctamente las propiedades de los artículos', async () => {
            const scraper = new ElPaisScraper();
            const news = await scraper.fetchNews();

            expect(news[0]).toHaveProperty('title');
            expect(news[0]).toHaveProperty('url');
            expect(news[0]).toHaveProperty('newspaper');
        });
    });

    describe('FeedScraperService', () => {
        it('debería almacenar noticias en la base de datos', async () => {
            const scraperService = new FeedScraperService();

            // Llama al método fetchAndStoreNews()
            await scraperService.fetchAndStoreNews();

            // Espera un tiempo razonable (3 segundos en este ejemplo) para que las noticias se descarguen y almacenen
            await new Promise((resolve) => setTimeout(resolve, 3000));

            // Consulta la base de datos y verifica que se hayan insertado noticias
            const storedNews = await Feed.find();
            expect(storedNews.length).toBeGreaterThan(0);
        });
    });
});
