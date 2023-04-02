import { type Request, type Response } from 'express';
import Feed from '../models/feed';

class FeedController {
    /**
     * Crea y guarda una nueva noticia en la base de datos.
     * @param {Request} req - La solicitud HTTP.
     * @param {Response} res - La respuesta HTTP.
     */
    async createNews(req: Request, res: Response): Promise<void> {
        try {
            const newsData = req.body;
            const news = new Feed(newsData);
            await news.save();
            res.status(201).json({ message: 'News created', data: news });
        } catch (error) {
            console.error('Error creating news:', error);
            res.status(500).json({ error: 'Error creating news' });
        }
    }

    /**
     * Obtiene todas las noticias almacenadas en la base de datos.
     * @param {Request} req - La solicitud HTTP.
     * @param {Response} res - La respuesta HTTP.
     */
    async getAllNews(req: Request, res: Response): Promise<void> {
        try {
            const news = await Feed.find();
            res.status(200).json({ news });
        } catch (error) {
            console.error('Error fetching all news:', error);
            res.status(500).json({ error: 'Error fetching all news' });
        }
    }

    /**
     * Actualiza una noticia existente en la base de datos.
     * @param {Request} req - La solicitud HTTP.
     * @param {Response} res - La respuesta HTTP.
     */
    async updateNews(req: Request, res: Response): Promise<void> {
        try {
            const newsId = req.params.id;
            const newsData = req.body;

            const updatedNews = await Feed.findByIdAndUpdate(newsId, newsData, { new: true });
            if (updatedNews != null) {
                res.status(200).json({ message: 'News updated', data: updatedNews });
            } else {
                res.status(404).json({ error: 'News not found' });
            }
        } catch (error) {
            console.error('Error updating news:', error);
            res.status(500).json({ error: 'Error updating news' });
        }
    }

    /**
     * Elimina una noticia existente en la base de datos.
     * @param {Request} req - La solicitud HTTP.
     * @param {Response} res - La respuesta HTTP.
     */
    async deleteNews(req: Request, res: Response): Promise<void> {
        try {
            const newsId = req.params.id;

            const deletedNews = await Feed.findByIdAndDelete(newsId);
            if (deletedNews != null) {
                res.status(200).json({ message: 'News deleted', data: deletedNews });
            } else {
                res.status(404).json({ error: 'News not found' });
            }
        } catch (error) {
            console.error('Error deleting news:', error);
            res.status(500).json({ error: 'Error deleting news' });
        }
    }
}

export default FeedController;
