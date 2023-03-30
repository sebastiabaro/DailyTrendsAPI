import { connect } from 'mongoose';

/**
 * Conecta a la base de datos utilizando Mongoose.
 *
 * La función utiliza la variable de entorno MONGODB_URI para obtener la URI de conexión a MongoDB.
 * Si MONGODB_URI no está disponible, se utiliza la conexión local predeterminada: 'mongodb://127.0.0.1:27017/daily-trends'.
 *
 * @returns {Promise<void>} Promesa que se resuelve cuando la conexión a la base de datos se realiza correctamente.
 * @throws Si la conexión a la base de datos falla, se registra el error y se cierra el proceso.
 */
export async function connectDatabase(): Promise<void> {
    try {
        const uri = process.env.MONGODB_URI != null || 'mongodb://127.0.0.1:27017/daily-trends';
        await connect(uri as string);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}
