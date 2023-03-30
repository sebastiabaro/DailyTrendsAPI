import { connectDatabase } from './utils/database';

/**
 * Función anónima autoejecutable que inicializa la aplicación.
 * Intenta conectarse a la base de datos.
 */
void (async () => {
    try {
        // Intenta conectarse a la base de datos
        await connectDatabase();
    } catch (error) {
        // Muestra el error en la consola si no se pudo iniciar el servidor
        console.error('Error starting the server:', error);
    }
})();
