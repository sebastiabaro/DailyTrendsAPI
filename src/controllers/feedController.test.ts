import request from 'supertest';
import { connectDatabase, disconnectDatabase } from '../utils/database';
import app from '../index';

jest.setTimeout(30000); // 30 segundos

beforeAll(async () => {
    // Conectarse a la base de datos antes de ejecutar las pruebas
    console.log = jest.fn();
    console.error = jest.fn();
    await connectDatabase();
});

afterAll(async () => {
    await disconnectDatabase();
});

describe('FeedController', () => {
    let newsId: string;

    // Prueba la creación de un elemento de noticia
    it('debería crear una noticia', async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await request(app).post('/api/news').send({
            title: 'Test title',
            url: 'https://www.example.com/test-url',
            newspaper: 'Test newspaper',
        });

        expect(response.status).toBe(201);
        expect(response.body.data).toHaveProperty('title');
        expect(response.body.data).toHaveProperty('url');
        expect(response.body.data).toHaveProperty('newspaper');
        newsId = response.body.data._id;
    });

    // Prueba la obtención de todas las noticias
    it('debería obtener todas las noticias', async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await request(app).get('/api/news');

        expect(response.status).toBe(200);
        expect(response.body.news.length).toBeGreaterThan(0);
    });

    // Prueba la actualización de un elemento de noticia
    it('debería actualizar una noticia', async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await request(app).put(`/api/news/${newsId}`).send({
            title: 'Updated test title',
            url: 'https://www.example.com/updated-test-url',
            newspaper: 'Updated test newspaper',
        });

        expect(response.status).toBe(200);
        expect(response.body.data.title).toBe('Updated test title');
        expect(response.body.data.url).toBe('https://www.example.com/updated-test-url');
        expect(response.body.data.newspaper).toBe('Updated test newspaper');
    });

    // Prueba la eliminación de un elemento de noticia
    it('debería eliminar una noticia', async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await request(app).delete(`/api/news/${newsId}`);

        expect(response.status).toBe(200);
    });
});
