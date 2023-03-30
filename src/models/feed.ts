import { Schema, model } from 'mongoose';

/**
 * Esquema de Mongoose para el modelo Feed.
 *
 * Define la estructura de los documentos Feed en la base de datos MongoDB.
 * Incluye los campos: title, description, url, newspaper y createdAt.
 */
const FeedSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    url: { type: String, required: true },
    newspaper: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

/**
 * Modelo Feed utilizando el esquema FeedSchema.
 *
 * Representa una noticia agregada del periódico en la base de datos.
 * Los documentos Feed incluyen información sobre el título, la descripción, la URL, el periódico y la fecha de creación.
 */
const Feed = model('Feed', FeedSchema);

export default Feed;
