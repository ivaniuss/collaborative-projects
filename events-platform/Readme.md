# Exclusive Events Platform

## Descripción

Exclusive Events Platform es una plataforma en línea que permite a los usuarios crear y gestionar eventos exclusivos. Los usuarios pueden inscribirse en estos eventos especificando sus habilidades, y los organizadores pueden aceptar o rechazar las solicitudes de participación. Los eventos tienen un límite de participación y solo se seleccionan los usuarios más adecuados.

## Características

- **Gestión de Usuarios**: Registro e inicio de sesión utilizando username y password, así como autenticación con redes sociales (Google).
- **Gestión de Roles**: Roles de organizador y participante.
- **Gestión de Eventos**: Creación, actualización y eliminación de eventos por parte de los organizadores.
- **Inscripción a Eventos**: Inscripción de participantes en los eventos mencionando sus habilidades.
- **Filtrado y Paginación**: Búsqueda de eventos y navegación a través de los resultados.
- **Notificaciones**: Envío de notificaciones a los participantes sobre la aceptación o rechazo de su inscripción.
- **Límite de Participación**: Establecimiento de un límite máximo de participantes por evento.

## Requisitos
- Cualquier framework de tu elección tanto para Backend como para Frontend.
- Para el Backend, se recomienda usar PostgreSQL como base de datos, pero se puede usar cualquier otra base de datos relacional.

## Diagrama Entidad-Relación (ER)

```mermaid
erDiagram
    USER ||--o{ EVENT : creates
    USER ||--o{ PARTICIPATION : enrolls
    EVENT ||--o{ PARTICIPATION : includes
    USER {
        string id PK
        string username
        string password
        string email
        string google_id
        string role
    }
    EVENT {
        int id PK
        string user_id FK
        string title
        string description
        string category
        string image_url
        datetime event_date
        datetime created_at
        datetime updated_at
        int participant_limit
    }
    PARTICIPATION {
        int id PK
        string user_id FK
        string event_id FK
        string skills
        datetime applied_at
        string status
    }
```

## Diagrama de Secuencia

```mermaid
sequenceDiagram
    participant User
    participant App
    participant Database
    participant ImageService

    User ->> App: POST /login (username/password) o /login/google (Google OAuth)
    alt Inicio de sesión con username/password
        App ->> Database: Verifica credenciales de usuario
        Database -->> App: Credenciales válidas
    else Inicio de sesión con Google
        App ->> Google: Autenticación con Google
        Google -->> App: Token de acceso
        App ->> Database: Verifica si el usuario existe
        Database -->> App: Usuario no existe
        App ->> Database: Crea nuevo usuario en tabla USER
        Database -->> App: Usuario creado exitosamente
    end
    App -->> User: Inicio de sesión exitoso

    Note over User,App: Autenticación obligatoria

    alt Usuario autenticado como Organizador
        User ->> App: POST /events (title, description, category, event_date, participant_limit, image)
        App ->> ImageService: Sube imagen
        ImageService -->> App: URL de la imagen
        App ->> Database: Inserta evento en tabla EVENT con URL de imagen
        Database -->> App: Evento creado exitosamente
        App -->> User: Confirmación de evento creado

        User ->> App: PUT /events/:id (event_id, title, description, category, event_date, participant_limit, image)
        App ->> ImageService: Sube nueva imagen
        ImageService -->> App: Nueva URL de la imagen
        App ->> Database: Actualiza evento en tabla EVENT
        Database -->> App: Evento actualizado exitosamente
        App -->> User: Confirmación de evento actualizado

        User ->> App: DELETE /events/:id (event_id)
        App ->> Database: Elimina evento de la tabla EVENT
        Database -->> App: Evento eliminado exitosamente
        App -->> User: Confirmación de evento eliminado

        User ->> App: GET /participations/:event_id
        App ->> Database: Obtiene inscripciones para el evento
        Database -->> App: Lista de inscripciones
        App -->> User: Retorna lista de inscripciones

        User ->> App: PUT /participations/:id (participation_id, status)
        App ->> Database: Actualiza estado de la inscripción
        Database -->> App: Estado de inscripción actualizado
        App -->> User: Confirmación de estado actualizado

    else Usuario autenticado como Participante
        User ->> App: GET /events
        App ->> Database: Obtiene eventos con filtrado y paginación
        Database -->> App: Lista de eventos
        App -->> User: Retorna lista de eventos

        User ->> App: POST /participations (event_id, skills)
        App ->> Database: Inserta inscripción en tabla PARTICIPATION
        Database -->> App: Inscripción creada exitosamente
        App -->> User: Confirmación de inscripción creada

        User ->> App: GET /events/:id (event_id)
        App ->> Database: Obtiene detalles del evento
        Database -->> App: Detalles del evento
        App -->> User: Retorna detalles del evento

        User ->> App: GET /participations/status
        App ->> Database: Obtiene estado de inscripciones
        Database -->> App: Lista de inscripciones con estado
        App -->> User: Retorna lista de inscripciones con estado
    else Usuario no autenticado
        User ->> App: Acceso denegado
    end
```

## Referencia para el Frontend

### Páginas y Componentes

1. **Home Page**:
   - Página inicial de la aplicación con eventos destacados y recomendaciones.

2. **Página de Inicio de Sesión**:
   - Formulario de inicio de sesión con username y password.
   - Botones para iniciar sesión con Google.

3. **Lista de Eventos**:
   - Tabla o lista que muestra todos los eventos.
   - Funcionalidades de filtrado y paginación.
   - Botones para ver detalles e inscribirse en cada evento.

4. **Detalle del Evento**:
   - Mostrar información detallada del evento seleccionado.
   - Opción para volver a la lista de eventos.

5. **Formulario de Evento** (solo para organizadores):
   - Formulario para crear o editar un evento.
   - Campos para título, descripción, categoría, fecha del evento, límite de participantes e imagen.
   - Botón de guardar o actualizar evento.

6. **Admin Panel** (solo para organizadores):
   - Panel de administración para gestionar eventos y revisar inscripciones.

7. **Página de Inscripciones**:
   - Lista de inscripciones realizadas por el usuario.
   - Estado de cada inscripción (pendiente, aceptada, rechazada).

### Ejemplos Visuales

- **Home Page**:
  [Inserta aquí una imagen representativa de la Home Page]

- **SignUp/SignIn**:
  ![SignUp](./signup.webp)

- **Gestor de Eventos**:
  ![Events](./events.webp)

## Ejemplos de Eventos

1. **Eventos de Juegos**:
   - Torneos de videojuegos.
   - Maratones de juegos.
   - Sesiones de juego colaborativas.

2. **Eventos Profesionales**:
   - Conferencias y seminarios.
   - Talleres de capacitación.
   - Reuniones de networking.

3. **Eventos Sociales**:
   - Reuniones de clubes y asociaciones.
   - Eventos de voluntariado.
   - Encuentros culturales y artísticos.

4. **Eventos Deportivos**:
   - Torneos de deportes.
   - Clases de fitness y bienestar.
   - Campamentos de entrenamiento.