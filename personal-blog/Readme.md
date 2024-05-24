# Personal Blog App

## Descripción

Esta aplicación es un sistema de blog personal que permite a los usuarios crear, editar y eliminar publicaciones de blog. Los usuarios pueden ver todas las publicaciones existentes y acceder a los detalles de cada una.

## Características

- **Gestión de Publicaciones**: Creación, actualización y eliminación de publicaciones de blog.
- **Visualización de Publicaciones**: Visualización de todas las publicaciones y detalles de cada una.

## Requisitos

- Cualquier framework de tu elección tanto para Backend como para Frontend.
- MongoDB como base de datos.

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

    User ->> App: Visualiza todas las publicaciones
    App ->> Database: Consulta todas las publicaciones en la colección BLOG
    Database -->> App: Lista de publicaciones
    App -->> User: Muestra la lista de publicaciones

    User ->> App: Ve detalles de una publicación (id)
    App ->> Database: Consulta detalles de la publicación en la colección BLOG
    Database -->> App: Detalles de la publicación
    App -->> User: Muestra los detalles de la publicación

    User ->> App: Crea nueva publicación (title, content, image)
    App ->> Database: Inserta nueva publicación en la colección BLOG
    Database -->> App: Publicación creada exitosamente
    App -->> User: Confirmación de publicación creada

    User ->> App: Actualiza publicación (id, title, content, image)
    App ->> Database: Actualiza publicación en la colección BLOG
    Database -->> App: Publicación actualizada exitosamente
    App -->> User: Confirmación de publicación actualizada

    User ->> App: Elimina publicación (id)
    App ->> Database: Elimina publicación de la colección BLOG
    Database -->> App: Publicación eliminada exitosamente
    App -->> User: Confirmación de publicación eliminada
```
## Diseño de referencia para el Frontend

![Dashboard](./blogs.png)
