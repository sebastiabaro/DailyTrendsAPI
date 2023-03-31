import { connectDatabase, disconnectDatabase } from './database';
import { connection as mongooseConnection } from 'mongoose';

beforeAll(async () => {
    // Conectarse a la base de datos antes de ejecutar las pruebas
    await connectDatabase();
});

afterAll(async () => {
    // Desconectarse de la base de datos después de que finalicen las pruebas
    await disconnectDatabase();
});

describe('Database', () => {
    it('debería conectarse a la base de datos correctamente', () => {
        // Verifica si el estado de la conexión es igual a 1 (conectado)
        expect(mongooseConnection.readyState).toBe(1);
    });
});
