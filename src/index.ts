import express from 'express';
import bodyParser from 'body-parser';
import { connectDatabase } from './utils/database';
import feedRoutes from './routes/feedRoutes';
import FeedScraperService from './services/feedScraperService';
import * as dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Crea la aplicación Express
const app = express();

// Configurar el middleware de rate limiting
const apiLimiter = rateLimit({
    windowMs: process.env.RATELIMIT_MSDELAY != null ? +process.env.RATELIMIT_MSDELAY : 5 * 1000, // 5 segundos en milisegundos
    max: process.env.RATELIMIT_MAXREQUESTS != null ? +process.env.RATELIMIT_MAXREQUESTS : 4, // Límite de solicitudes por IP en la ventana de tiempo especificada
    message: 'Has excedido el límite de solicitudes permitidas. Por favor, intenta de nuevo más tarde.',
});

// Configura el middleware body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configura la aplicación para usar JSON
app.use(express.json());

// Configura las rutas
app.use('/api', apiLimiter, feedRoutes);

// Configura el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT != null ? +process.env.PORT : 3000;

// Crea una instancia de FeedScraperService
const feedScraperService = new FeedScraperService();

/**
 * Función anónima autoejecutable que inicializa la aplicación.
 * Intenta conectarse a la base de datos y, si tiene éxito, inicia el servidor Express.
 */
void (async () => {
    try {
        // Intenta conectarse a la base de datos
        await connectDatabase();

        // Inicia el FeedScraperService
        feedScraperService.start(process.env.SERVICE_INTERVAL != null ? +process.env.SERVICE_INTERVAL : 60000 * 60); // Ejecuta el scraping cada 60 minutos

        // Inicia el servidor Express
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        // Muestra el error en la consola si no se pudo iniciar el servidor
        console.error('Error starting the server:', error);
    }
})();

export default app;
