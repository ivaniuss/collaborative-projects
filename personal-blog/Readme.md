# Personal Blog App

## Descripción

Esta aplicación es un sistema de blog personal que permite a los usuarios crear, editar y eliminar publicaciones de blog. Los usuarios pueden ver todas las publicaciones existentes y acceder a los detalles de cada una.

## Características

- **Gestión de Publicaciones**: Creación, actualización y eliminación de publicaciones de blog.
- **Visualización de Publicaciones**: Visualización de todas las publicaciones y detalles de cada una.
- **Gestión de Imágenes**: Integración con un servicio externo para la subida y gestión de imágenes.

## Requisitos

- Cualquier framework de tu elección tanto para Backend como para Frontend.
- MongoDB como base de datos.
- Servicio externo para la gestión de imágenes (ejemplo: Cloudinary, AWS S3, etc.)

## Esquema de la Base de Datos

```json
{
  "collections": {
    "blogs": {
      "fields": {
        "id": "ObjectId",
        "title": "string",
        "content": "string",
        "imagen" : "string",
        "createdAt": "datetime",
        "updatedAt": "datetime"
      }
    }
  }
}
```

## Diagrama de Secuencia
```mermaid
sequenceDiagram
    participant User
    participant App
    participant Database
    participant ImageService

    User ->> App: GET /api/blogs
    App ->> Database: Consulta todas las publicaciones en la colección BLOG
    Database -->> App: Lista de publicaciones
    App -->> User: 200 OK, Muestra la lista de publicaciones

    User ->> App: GET /api/blogs/:id
    App ->> Database: Consulta detalles de la publicación en la colección BLOG
    Database -->> App: Detalles de la publicación
    App -->> User: 200 OK, Muestra los detalles de la publicación

    User ->> App: POST /api/blogs (title, content, image)
    App ->> ImageService: Sube la imagen
    ImageService -->> App: URL de la imagen
    App ->> Database: Inserta nueva publicación en la colección BLOG con la URL de la imagen
    Database -->> App: Publicación creada exitosamente
    App -->> User: 201 Created, Confirmación de publicación creada

    User ->> App: PUT /api/blogs/:id (title, content, image)
    App ->> ImageService: Actualiza la imagen (opcional)
    ImageService -->> App: URL de la imagen actualizada
    App ->> Database: Actualiza publicación en la colección BLOG con la URL de la imagen actualizada
    Database -->> App: Publicación actualizada exitosamente
    App -->> User: 200 OK, Confirmación de publicación actualizada

    User ->> App: DELETE /api/blogs/:id
    App ->> Database: Consulta detalles de la publicación en la colección BLOG
    Database -->> App: Detalles de la publicación con URL de la imagen
    App ->> ImageService: Elimina la imagen
    ImageService -->> App: Confirmación de imagen eliminada
    App ->> Database: Elimina publicación de la colección BLOG
    Database -->> App: Publicación eliminada exitosamente
    App -->> User: 204 No Content, Confirmación de publicación eliminada
```
## Diseño de referencia para el Frontend

  - **Web**
![Dashboard](./blogs.png)
  - **Mobile-Responsive**
  ![Dashboard-responsive](./blogs-responsive.png)

