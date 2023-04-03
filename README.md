# DailyTrendsAPI

DailyTrendsAPI es una API que recopila y almacena noticias de diferentes periódicos. Permite a los usuarios acceder y gestionar las noticias recopiladas.

## Instalación

1. Clona este repositorio:

git clone https://github.com/sebastiabaro/DailyTrendsAPI.git

2. Navega a la carpeta del proyecto e instala las dependencias:

cd DailyTrendsAPI
npm install

3. Crea un archivo `.env` en la raíz del proyecto y añade las variables de entorno necesarias, como el puerto y las configuraciones de la base de datos.

4. Inicia la aplicación:

npm start

## Uso

La API expone varios endpoints para interactuar con las noticias:

- `GET /api/news`: Obtiene todas las noticias almacenadas en la base de datos.
- `POST /api/news`: Crea una nueva noticia.
- `PUT /api/news/:id`: Actualiza una noticia existente por su ID.
- `DELETE /api/news/:id`: Elimina una noticia por su ID.

## Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

npm test

## UML

![UML](/DailyTrendsUML.png)