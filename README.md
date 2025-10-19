# Taller Web II - Proyecto Node.js

## Pasos para levantar el proyecto

### 1 Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>

```
### 2 Instalar dependencias
```bash
npm install
```

### 3 Crear archivo .env
```bash
DATABASE_URL=<URL_DE_TU_BASE_DE_DATOS> ejemplo: "mysql://root:password@localhost:3306/nombre_bd" -- IMPORTANTE: Crear la BD primero
TOKEN_SECRET=<TU_SECRET_PARA_ACCESS_TOKEN>
REFRESH_SECRET=<TU_SECRET_PARA_REFRESH_TOKEN>
PORT=3000 o el que te funcione

```


### 4 Generar tablas en la base de datos
```bash
npx prisma migrate reset

```

### 5 Levantar el servidor
```bash
npm run dev