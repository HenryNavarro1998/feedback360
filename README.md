# Sistema de Evaluación de Empleados

## Descripción
Sistema web para la gestión y evaluación del desempeño de empleados, implementando una arquitectura moderna basada en React para el frontend y Node.js para el backend, con MongoDB como base de datos.

## Configuración y Ejecución

### Requisitos del Sistema
- Node.js (v14 o superior)
- MongoDB (v4.4 o superior)
- npm o yarn como gestor de paquetes
- Git

### Pasos de Configuración

1. **Clonar el Repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd feedback360
```

2. **Configuración del Backend**
```bash
# Instalar dependencias
cd backend
npm install

# Configurar variables de entorno
cp .env.example .env

# Variables necesarias en .env:
PORT=3000
MONGODB_URI=mongodb://localhost:27017/employee-evaluation
JWT_SECRET=4V#rFf$34@x7W%Jk$d3D9!mP^Gn
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

3. **Configuración del Frontend**
```bash
# Instalar dependencias
cd frontend
npm install

# Configurar variables de entorno
cp .env.example .env

# Variables necesarias en .env:
VITE_API_URL=http://localhost:3000/api
```

### Ejecución del Proyecto

1. **Iniciar MongoDB**
```bash
# Asegúrate de que MongoDB esté corriendo
mongod
```

2. **Iniciar el Backend**
```bash
cd backend
npm run dev
```

3. **Iniciar el Frontend**
```bash
cd frontend
npm run dev
```

4. **Acceder al Sistema**
- Frontend: http://localhost:5173
- API: http://localhost:3000/api

## Estructura y Decisiones de Diseño

### Arquitectura del Proyecto

```
proyecto/
├── backend/          # Servidor API REST
│   ├── src/
│   │   ├── controllers/  # Lógica de negocio
│   │   ├── models/       # Modelos de datos
│   │   ├── routes/       # Rutas de API
│   │   ├── middleware/   # Middlewares
│   │   └── config/       # Configuraciones
│   └── tests/           # Pruebas unitarias
│
├── frontend/         # Aplicación React
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── contexts/     # Contextos globales
│   │   ├── pages/        # Páginas principales
│   │   ├── services/     # Servicios de API
│   │   └── styles/       # Estilos globales
│   └── tests/           # Pruebas de componentes
```

### Decisiones de Diseño Principales

1. **Arquitectura Frontend**
   - React con Vite para mejor rendimiento y DX
   - Styled Components para estilos modulares
   - Context API para estado global
   - Diseño de componentes basado en Atomic Design

2. **Arquitectura Backend**
   - API REST con Express
   - MongoDB para flexibilidad en el modelo de datos
   - JWT para autenticación stateless
   - Middleware de autorización basado en roles

3. **Modelo de Datos**
```javascript
// Usuario
{
  email: String,
  password: String, // Hasheado con bcrypt
  role: ['admin', 'manager', 'employee'],
  employee: ObjectId
}

// Evaluación
{
  evaluationModel: ObjectId,
  employee: ObjectId,
  evaluator: ObjectId,
  status: ['pending', 'in_progress', 'completed'],
  responses: [{
    question: ObjectId,
    answer: String,
    score: Number
  }]
}
```

### Estructura de la Base de Datos

```
┌──────────────┐       ┌──────────────┐
│    Users     │       │  Employees   │
├──────────────┤       ├──────────────┤
│ _id          │       │ _id          │
│ email        │       │ firstName    │
│ password     │       │ lastName     │
│ role         │──┐    │ position     │
│ employee     │──┼────│ department   │
│ createdAt    │  │    │ managerId    │──┐
│ updatedAt    │  │    │ createdAt    │  │
└──────────────┘  │    │ updatedAt    │  │
                  │    └──────────────┘  │
                  │                      │
┌──────────────┐  │    ┌──────────────┐ │
│ Evaluations  │  │    │  EvalModels  │ │
├──────────────┤  │    ├──────────────┤ │
│ _id          │  │    │ _id          │ │
│ modelId      │──┼────│ name         │ │
│ employeeId   │──┘    │ description  │ │
│ evaluatorId  │──┐    │ questions    │ │
│ status       │  │    │ active       │ │
│ responses    │  │    │ createdAt    │ │
│ deadline     │  │    │ updatedAt    │ │
│ createdAt    │  │    └──────────────┘ │
│ updatedAt    │  │                     │
└──────────────┘  │    ┌──────────────┐ │
                  │    │  Questions    │ │
┌──────────────┐  │    ├──────────────┤ │
│  Responses   │  │    │ _id          │ │
├──────────────┤  │    │ text         │ │
│ _id          │  │    │ type         │ │
│ evaluationId │──┘    │ options      │ │
│ questionId   │       │ required     │ │
│ answer       │       │ weight       │ │
│ score        │       │ createdAt    │ │
│ createdAt    │       │ updatedAt    │ │
│ updatedAt    │       └──────────────┘ │
└──────────────┘                        │
                     ┌──────────────┐   │
                     │  Feedback    │   │
                     ├──────────────┤   │
                     │ _id          │   │
                     │ evaluationId │   │
                     │ providerId   │───┘
                     │ receiverId   │
                     │ content      │
                     │ createdAt    │
                     │ updatedAt    │
                     └──────────────┘
```

#### Relaciones Principales:

1. **Users - Employees (1:1)**
   - Cada usuario está asociado con un empleado
   - El campo `employee` en Users referencia a Employees

2. **Employees - Employees (N:1)**
   - Relación jerárquica manager-empleado
   - `managerId` referencia al empleado que es manager

3. **Evaluations - EvalModels (N:1)**
   - Cada evaluación usa un modelo de evaluación
   - `modelId` referencia al modelo usado

4. **Evaluations - Responses (1:N)**
   - Cada evaluación tiene múltiples respuestas
   - `evaluationId` en Responses referencia a la evaluación

5. **Questions - EvalModels (N:1)**
   - Cada modelo tiene múltiples preguntas
   - Las preguntas están embebidas en el modelo

6. **Feedback - Evaluations (N:1)**
   - Cada evaluación puede tener múltiple feedback
   - `evaluationId` en Feedback referencia a la evaluación

#### Índices Principales:
```javascript
// Users
{ email: 1 }  // Único
{ role: 1 }   // Para búsquedas por rol

// Employees
{ managerId: 1 }  // Para búsquedas de equipos
{ department: 1 } // Para agrupación por departamento

// Evaluations
{ employeeId: 1, status: 1 }  // Para búsquedas de evaluaciones por empleado
{ evaluatorId: 1, status: 1 } // Para búsquedas de evaluaciones por evaluador
{ deadline: 1 }               // Para búsquedas por fecha límite

// Responses
{ evaluationId: 1 }  // Para búsquedas de respuestas por evaluación
```

4. **Seguridad Implementada**
   - Autenticación JWT
   - Encriptación de contraseñas
   - Validación de roles
   - Sanitización de inputs
   - Rate limiting
   - CORS configurado

### Patrones de Diseño Utilizados

1. **Frontend**
   - Container/Presentational Pattern
   - Custom Hooks para lógica reutilizable
   - Higher Order Components para funcionalidad común
   - Render Props para componentes flexibles

2. **Backend**
   - MVC modificado
   - Repository Pattern para acceso a datos
   - Middleware Pattern
   - Service Layer Pattern

## Guías de Desarrollo

### Convenciones de Código
- ESLint + Prettier configurados
- Conventional Commits
- TypeScript para tipos seguros

### Flujo de Trabajo Git
1. Crear rama feature/fix
2. Desarrollar y probar
3. Crear PR
4. Code review
5. Merge a main

### Pruebas
- Jest para pruebas unitarias
- React Testing Library para componentes
- Supertest para API endpoints

## Solución de Problemas Comunes

1. **Error de Conexión MongoDB**
```bash
# Verificar servicio MongoDB
sudo service mongodb status

# Verificar URI en .env
MONGODB_URI=mongodb://localhost:27017/employee-evaluation
```

2. **Errores de CORS**
```javascript
// Verificar configuración en backend
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
```

3. **Problemas de Autenticación**
- Verificar token en localStorage
- Comprobar fecha de expiración del token
- Validar configuración de JWT_SECRET

## Mantenimiento

### Backups
```bash
# Backup de base de datos
mongodump --db employee-evaluation --out ./backup

# Restaurar backup
mongorestore --db employee-evaluation ./backup/employee-evaluation
```

### Monitoreo
- Morgan para logs de API
- Winston para logs de aplicación
- Sentry para tracking de errores

### Actualizaciones
1. Backup de datos
2. Pull de cambios
3. Instalar dependencias
4. Ejecutar migraciones
5. Reiniciar servicios

## Soporte

Para reportar problemas o solicitar ayuda:
1. Revisar la documentación
2. Buscar en Issues existentes
3. Crear nuevo Issue con:
   - Descripción del problema
   - Pasos para reproducir
   - Logs relevantes
   - Entorno (versiones) 