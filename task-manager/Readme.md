# Task Management App

## Descripción

Esta aplicación es un sistema de gestión de tareas que permite a los usuarios crear y gestionar tareas. Cada tarea tiene un estado asociado y está asignada a un usuario específico.

## Características

- **Gestión de Usuarios**: Registro, inicio de sesión y autenticación de usuarios.
- **Gestión de Tareas**: Creación, actualización y eliminación de tareas.
- **Gestión de Estados**: Cada tarea tiene un estado que puede ser actualizado.

## Requisitos
- Cualquier framework de tu elección tanto para Back como para Front
- En caso estes realizando el Backend para este proyecto se decidió usar PostgreSQL pero se puede usar cualquier otra base de datos relacional

## Diagrama Entidad-Relación (ER)

```mermaid

erDiagram
    USER ||--o{ TASK : has
    USER {
        string id PK
        string username PK
        string password
        string email
    }
    TASK || -- || STATE : has
    TASK {
        int id PK
        string user_id FK
        int state_id FK
        string title
        string description
        datetime update

    }
    STATE {
        int id PK
        string name PK
    }
```

## Diagrama de Secuencia
```mermaid
sequenceDiagram
    participant User
    participant App
    participant Database

    User ->> App: POST /register (username, password, email)
    App ->> Database: Verifica si el username ya existe
    Database -->> App: No existe
    App ->> Database: Inserta nuevo usuario en tabla USER
    Database -->> App: Usuario registrado exitosamente
    App -->> User: Confirmación de registro exitoso

    User ->> App: POST /login (username, password)
    App ->> Database: Verifica credenciales de usuario
    Database -->> App: Credenciales válidas
    App -->> User: Inicio de sesión exitoso

    Note over User,App: Autenticación obligatoria

    alt Usuario autenticado
        User ->> App: GET /tasks
        App ->> Database: Obtiene todas las tareas de la tabla TASK
        Database -->> App: Lista de tareas
        App -->> User: Retorna lista de tareas

        User ->> App: GET /tasks/:id (task_id)
        App ->> Database: Obtiene tarea por ID de la tabla TASK
        Database -->> App: Tarea obtenida
        App -->> User: Retorna tarea

        User ->> App: POST /tasks (title, description, state_id)
        App ->> Database: Inserta tarea en tabla TASK
        Database -->> App: Tarea creada exitosamente
        App -->> User: Confirmación de tarea creada

        User ->> App: PUT /tasks/:id (task_id, new_state_id)
        App ->> Database: Actualiza estado en tabla TASK
        Database -->> App: Estado actualizado exitosamente
        App -->> User: Confirmación de estado actualizado

        User ->> App: DELETE /tasks/:id (task_id)
        App ->> Database: Elimina tarea de la tabla TASK
        Database -->> App: Tarea eliminada exitosamente
        App -->> User: Confirmación de tarea eliminada

        User ->> App: GET /states
        App ->> Database: Obtiene todos los estados de la tabla STATE
        Database -->> App: Lista de estados
        App -->> User: Retorna lista de estados

        User ->> App: GET /states/:id (state_id)
        App ->> Database: Obtiene estado por ID de la tabla STATE
        Database -->> App: Estado obtenido
        App -->> User: Retorna estado
    else Usuario no autenticado
        User ->> App: Acceso denegado
    end

```

## Diseño de referencia para el Frontend

- **SignUp/SignIn**:
  ![SignUp](./signup.webp)

- **Gestor de Tareas**:
  ![Tasks](./tasks.webp)