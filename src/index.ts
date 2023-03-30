// import { connectDatabase } from './utils/database';
import ElPaisScraper from './services/scrapers/elPaisScraper';
import ElMundoScraper from './services/scrapers/elMundoScraper';

/**
 * Función anónima autoejecutable que inicializa la aplicación.
 * Intenta conectarse a la base de datos.
 */
void (async () => {
    try {
        // Intenta conectarse a la base de datos
        // await connectDatabase();
        const elpais = new ElPaisScraper();
        const news = await elpais.fetchNews();
        news.forEach((t) => {
            console.log(t);
        });

        const elmundo = new ElMundoScraper();
        const newsm = await elmundo.fetchNews();
        newsm.forEach((t) => {
            console.log(t);
        });
    } catch (error) {
        // Muestra el error en la consola si no se pudo iniciar el servidor
        console.error('Error starting the server:', error);
    }
})();
