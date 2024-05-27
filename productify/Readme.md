# API RESTful para Gestión de Productos

## Descripción

Esta aplicación es un sistema de gestión de productos en un inventario. Permite a los usuarios gestionar productos, incluyendo la creación, lectura, actualización y eliminación de productos. La aplicación también proporciona funcionalidades de filtrado y paginación para mejorar la usabilidad de la API.

## Características

- **Gestión de Productos**: Crear, leer, actualizar y eliminar productos.
- **Filtrado y Paginación**: Mejorar la usabilidad de la API mediante la implementación de filtros y paginación.
- **Autenticación con Google**: Inicio de sesión mediante autenticación con Google.
- **Home Page**: Página inicial de la aplicación.
- **Admin Panel**: Panel de administración para gestionar usuarios y productos.
- **Servicio de Imágenes**: Integración con un servicio de imágenes para manejar imágenes de productos.

## Requisitos

- Cualquier framework de tu elección tanto para el backend como para el frontend.
- En el backend, se recomienda el uso de PostgreSQL, pero se puede usar cualquier otra base de datos relacional.

## Diagrama Entidad-Relación (ER)

```mermaid
erDiagram
    USER ||--o{ PRODUCT : manages
    USER {
        string id PK
        string username
        string password
        string email
        string google_id
    }
    PRODUCT {
        int id PK
        string user_id FK
        string name
        string description
        float price
        int quantity
        datetime created_at
        datetime updated_at
    }
```

## Diagrama de Secuencia.

```mermaid
sequenceDiagram
    participant User
    participant App
    participant Google
    participant Database
    participant ImageService

    User ->> App: GET /
    App ->> User: Retorna Home Page

    User ->> App: POST /google-login (google_token)
    App ->> Google: Verifica token de Google
    Google -->> App: Token válido
    App ->> Database: Verifica si el usuario existe
    Database -->> App: Usuario encontrado
    App -->> User: Inicio de sesión exitoso

    Note over User,App: Autenticación con Google

    alt Usuario autenticado
        User ->> App: GET /products
        App ->> Database: Obtiene todos los productos de la tabla PRODUCT
        Database -->> App: Lista de productos
        App -->> User: Retorna lista de productos

        User ->> App: GET /products/:id (product_id)
        App ->> Database: Obtiene producto por ID de la tabla PRODUCT
        Database -->> App: Producto obtenido
        App -->> User: Retorna producto

        User ->> App: POST /products (name, description, price, quantity, image_url)
        App ->> Database: Inserta producto en tabla PRODUCT
        Database -->> App: Producto creado exitosamente
        App ->> ImageService: Sube imagen del producto
        ImageService -->> App: Imagen subida exitosamente
        App -->> User: Confirmación de producto creado

        User ->> App: PUT /products/:id (product_id, name, description, price, quantity, image_url)
        App ->> Database: Actualiza producto en tabla PRODUCT
        Database -->> App: Producto actualizado exitosamente
        App ->> ImageService: Actualiza imagen del producto
        ImageService -->> App: Imagen actualizada exitosamente
        App -->> User: Confirmación de producto actualizado

        User ->> App: DELETE /products/:id (product_id)
        App ->> Database: Elimina producto de la tabla PRODUCT
        Database -->> App: Producto eliminado exitosamente
        App ->> ImageService: Elimina imagen del producto
        ImageService -->> App: Imagen eliminada exitosamente
        App -->> User: Confirmación de producto eliminado

        User ->> App: GET /products?filter=name&value=xyz
        App ->> Database: Filtra productos por nombre
        Database -->> App: Lista de productos filtrados
        App -->> User: Retorna lista de productos filtrados

        User ->> App: GET /products?page=1&limit=10
        App ->> Database: Paginación de productos
        Database -->> App: Lista de productos paginados
        App -->> User: Retorna lista de productos paginados
    else Usuario no autenticado
        User ->> App: Acceso denegado
    end

```

## Referencia para el Frontend

### Páginas y Componentes

1. **Home Page**:
   - Página inicial de la aplicación.

2. **Página de Inicio de Sesión con Google**:
   - Botón para iniciar sesión con Google.

3. **Página de Registro e Inicio de Sesión**:
   - Formulario de registro (username, email, password).
   - Formulario de inicio de sesión (username, password).
   - Manejo de errores y validaciones.

4. **Lista de Productos**:
   - Tabla o lista que muestra todos los productos.
   - Funcionalidades de filtrado y paginación.
   - Botones para ver, editar y eliminar cada producto.

5. **Detalle del Producto**:
   - Mostrar información detallada del producto seleccionado.
   - Opción para volver a la lista de productos.

6. **Formulario de Producto**:
   - Formulario para crear o editar un producto.
   - Campos para nombre, descripción, precio y cantidad.
   - Botón de guardar o actualizar producto.

7. **Admin Panel**:
   - Panel de administración para gestionar usuarios y productos.

### Ejemplos Visuales

- **Home Page**:
  [Inserta aquí una imagen representativa de la Home Page]

- **SignUp/SignIn**:
  ![SignUp](./signup.webp)

- **Gestor de Productos**:
  ![Products](./products.webp)

## Recomendaciones Adicionales

- **Autenticación y Autorización**: Implementar autenticación basada en tokens (JWT) para asegurar que solo los usuarios autenticados puedan gestionar productos.
- **Validación de Datos**: Asegurarse de que todos los datos enviados por los usuarios sean válidos y seguros.
- **Documentación**: Utilizar herramientas como Swagger para documentar la API y facilitar su uso a otros desarrolladores.
- **Pruebas**: Implementar pruebas unitarias y de integración para asegurar la calidad del código y la funcionalidad de la aplicación.
- **Despliegue**: Considerar el despliegue en servicios de hosting como Heroku, AWS o Vercel para que la aplicación esté disponible públicamente.

Esta estructura te ayudará a crear una aplicación de gestión de productos robusta y escalable, adecuada para aprender y mejorar habilidades en desarrollo web.
