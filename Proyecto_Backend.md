# SERVIDOR EXPRESS

Servidor **Express** y base de datos **MongoDB** para la gestión de datos de un sistema de **alquiler de vehículos.**

## REQUISITOS

Tener instaladas las siguientes aplicaciones:

- -**Visual Studio Code**
- -**Node.js** *(Versión LTS más reciente)*

## INSTALACIÓN

Siga los siguientes pasos:

1. 1º --- Abrir la carpeta de la aplicación con **VS CODE**
2. 2º --- Instalar las dependencias mediante la ejecución del comando "**npm install**" en la terminal

## USO

Para ejecutar la aplicación, escribiremos en la terminal lo siguiente:

```bash
npm run start
```

## HTTP REQUEST DISPONIBLES

### Rutas de coche:

| MÉTODO | ENDPOINT | FÚNCION |
|:------:|:--------:|:-------:|
| GET | /api/v1/coches | Obtener lista completa de coches |
| POST | /api/v1/coches/CreateCar | Publicar un nuevo coche |
| PUT | /api/v1/coches/:id (id del coche) | Actualizar datos del coche |
| DELETE | /api/v1/coches/:id (id del coche) | Borrar el coche de la base de datos |


### Rutas de usuarios:

| MÉTODO | ENDPOINT | FÚNCION |
|:------:|:--------:|:-------:|
| GET | /api/v1/users | Obtener lista completa de usuarios |
| POST | /api/v1/users/login <br> /api/v1/users/register | - Iniciar sesión <br> - Registrar usuario |
| PUT | /api/v1/users/:id (id del usuario) | Actualizar datos del usuario |
| DELETE | /api/v1/users/:id (id del usuario) | Borrar el usuario de la base de datos |


## ROLES Y PERMISOS

| ROL | PERMISO |
| :-: | :-----: |
| ADMIN | - Publicar coches <br> - Eliminar coches/usuarios <br> - Actualizar datos de coches/usuarios |
| USUARIO | - Modificar únicamente sus propios datos (**Excepto rol**) <br> - Eliminar exclusivamente su propia cuenta |
