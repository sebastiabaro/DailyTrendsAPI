import { Router } from 'express';
import FeedController from '../controllers/feedController';

const feedRoutes = Router();
const feedController = new FeedController();

// GET: Obtiene todas las noticias
feedRoutes.get('/news', (req, res) => {
    void feedController.getAllNews(req, res);
});

// POST: Crea una nueva noticia
feedRoutes.post('/news', (req, res) => {
    void feedController.createNews(req, res);
});

// PUT: Actualiza una noticia existente
feedRoutes.put('/news/:id', (req, res) => {
    void feedController.updateNews(req, res);
});

// DELETE: Elimina una noticia existente
feedRoutes.delete('/news/:id', (req, res) => {
    void feedController.deleteNews(req, res);
});

export default feedRoutes;
