import ElMundoScraper from './scrapers/elMundoScraper';
import ElPaisScraper from './scrapers/elPaisScraper';
import FeedScraperService from './feedScraperService';
import Feed from '../models/feed';
import { connectDatabase, disconnectDatabase } from '../utils/database';

jest.setTimeout(30000); // 30 segundos

beforeAll(async () => {
    // Conectarse a la base de datos antes de ejecutar las pruebas
    console.log = jest.fn();
    console.error = jest.fn();
    await connectDatabase();
});

afterAll(async () => {
    // Desconectarse de la base de datos después de que finalicen las pruebas
    await disconnectDatabase();
});

describe('Scraper', () => {
    describe('ElMundoScraper', () => {
        // Comprueba si se obtienen noticias desde el periódico El Mundo
        it('debería obtener noticias', async () => {
            const scraper = new ElMundoScraper();
            const news = await scraper.fetchNews();
            expect(news.length).toBeGreaterThan(0);
        });

        // Comprueba si las propiedades de los artículos se extraen correctamente en El Mundo
        it('debería extraer correctamente las propiedades de los artículos', async () => {
            const scraper = new ElMundoScraper();
            const news = await scraper.fetchNews();

            expect(news[0]).toHaveProperty('title');
            expect(news[0]).toHaveProperty('url');
            expect(news[0]).toHaveProperty('newspaper');
        });
    });

    // Pruebas para la clase ElPaisScraper
    describe('ElPaisScraper', () => {
        // Comprueba si se obtienen noticias desde el periódico El País
        it('debería obtener noticias', async () => {
            const scraper = new ElPaisScraper();
            const news = await scraper.fetchNews();
            expect(news.length).toBeGreaterThan(0);
        });

        // Comprueba si las propiedades de los artículos se extraen correctamente en El Pais
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
            await new Promise((resolve) => setTimeout(resolve, 1000));
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
