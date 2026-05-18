<h1 align="center">
  <br>
  Orbit — Digital Agenda
  <br>
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.76-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=flat-square&logo=firebase" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-RTK_Query-764ABC?style=flat-square&logo=redux" />
  <img src="https://img.shields.io/badge/Platform-Android-3DDC84?style=flat-square&logo=android" />
</p>

<p align="center">
  🌐 <a href="#english">English</a> | <a href="#español">Español</a>
</p>

---

<h2 id="english">🇺🇸 English</h2>

A modern productivity app for managing daily routines and one-time tasks, built as a professional portfolio project.

### Features

- **Authentication** — Email/password and Google Sign-In via Firebase Auth
- **Daily tasks** — Recurring tasks that reset automatically every day
- **One-time tasks** — Tasks scheduled for a specific date
- **Calendar view** — Visual overview of tasks by date with dot markers
- **Task management** — Create, edit, complete, and delete tasks in real time
- **Delete confirmation** — Alert dialog before removing any task
- **Pull to refresh** — Swipe down to sync tasks from Firestore
- **Animations** — Card entry, checkbox bounce and empty state via Reanimated
- **Persistent state** — All data synced with Firestore, survives app restarts

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native CLI (no Expo) |
| Language | TypeScript |
| Navigation | React Navigation 6 |
| Global state | Zustand |
| Server state / API | RTK Query (Redux Toolkit) |
| Backend | Firebase Auth + Firestore |
| Animations | React Native Reanimated |
| Calendar | react-native-calendars |
| Splash screen | react-native-bootsplash |

### Architecture

This project follows a **Feature-Sliced Design** pattern. Each feature is fully self-contained:

```
src/
├── app/
│   └── navigation/          # RootNavigator, AuthNavigator, MainNavigator
├── assets/
│   ├── images/              # Source assets
│   └── bootsplash/          # Generated splash assets
├── components/
│   └── common/              # Reusable UI: Button, Input
├── features/
│   ├── auth/
│   │   ├── screens/         # LoginScreen, RegisterScreen
│   │   └── styles/
│   ├── tasks/
│   │   ├── api/             # RTK Query endpoints (CRUD)
│   │   ├── adapters/        # local/ and server/ data mappers
│   │   ├── components/      # CreateTaskModal
│   │   ├── models/          # local/ and server/ TypeScript interfaces
│   │   ├── screens/         # TasksScreen
│   │   ├── styles/
│   │   └── utils/           # taskHelpers (isCompletedToday, today)
│   └── calendar/
│       ├── screens/         # CalendarScreen
│       └── styles/
├── hooks/                   # useAuth
├── services/
│   └── firebase/            # authService, firebase config
├── store/
│   ├── auth/                # Zustand authStore
│   └── index.ts             # Redux store + RTK Query middleware
└── types/                   # Navigation types
```

**Key design decisions:**
- **Zustand** handles session and UI state — lightweight, zero boilerplate
- **RTK Query** manages Firestore data fetching with automatic cache invalidation
- **Adapters pattern** decouples server data shape from UI data shape
- **`completedDate: string | null`** instead of `completed: boolean` enables daily task reset without extra logic

### Getting Started

#### Prerequisites
- Node.js 18+
- React Native CLI environment ([setup guide](https://reactnative.dev/docs/environment-setup))
- Android Studio + Android SDK
- A Firebase project with **Firestore** and **Email/Password Auth** enabled

#### Installation

```bash
git clone https://github.com/SOJEIN/Orbit.git
cd orbit
npm install
npx react-native run-android
```

#### Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication → Email/Password**
3. Enable **Firestore Database** (Standard edition)
4. Download `google-services.json` → place at `android/app/google-services.json`
5. Create composite index:

| Collection | Field | Order |
|---|---|---|
| Tasks | userId | Ascending |
| Tasks | createdAt | Descending |

#### Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /Tasks/{taskId} {
      allow read: if request.auth != null
        && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null
        && request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null
        && resource.data.userId == request.auth.uid;
    }
  }
}
```

### Project Status

| Feature | Status |
|---|---|
| Auth (Login / Register) | ✅ Done |
| Google Sign-In | ✅ Done |
| Daily & one-time tasks | ✅ Done |
| Edit task | ✅ Done |
| Delete confirmation | ✅ Done |
| Pull to refresh | ✅ Done |
| Animations (Reanimated) | ✅ Done |
| Calendar view | ✅ Done |
| App icon & splash screen | ✅ Done |
| Push notifications | 🔄 Planned |
| iOS support | 🔄 Planned |

---

<h2 id="español">🇨🇴 Español</h2>

Una app de productividad moderna para gestionar rutinas diarias y tareas puntuales, desarrollada como proyecto de portafolio profesional.

### Funcionalidades

- **Autenticación** — Login y registro con email/contraseña y Google Sign-In via Firebase Auth
- **Tareas diarias** — Tareas recurrentes que se reinician automáticamente cada día
- **Tareas de una vez** — Tareas programadas para una fecha específica
- **Vista de calendario** — Visualización de tareas por fecha con marcadores
- **Gestión de tareas** — Crear, editar, completar y eliminar tareas en tiempo real
- **Confirmación al eliminar** — Diálogo de alerta antes de borrar cualquier tarea
- **Pull to refresh** — Desliza hacia abajo para sincronizar con Firestore
- **Animaciones** — Entrada de cards, bounce en checkbox y estado vacío con Reanimated
- **Estado persistente** — Todos los datos sincronizados con Firestore

### Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | React Native CLI (sin Expo) |
| Lenguaje | TypeScript |
| Navegación | React Navigation 6 |
| Estado global | Zustand |
| Estado del servidor / API | RTK Query (Redux Toolkit) |
| Backend | Firebase Auth + Firestore |
| Animaciones | React Native Reanimated |
| Calendario | react-native-calendars |
| Splash screen | react-native-bootsplash |

### Arquitectura

El proyecto sigue el patrón **Feature-Sliced Design**. Cada feature es completamente autocontenida:

```
src/
├── app/
│   └── navigation/          # RootNavigator, AuthNavigator, MainNavigator
├── assets/
│   ├── images/              # Assets fuente
│   └── bootsplash/          # Assets generados del splash
├── components/
│   └── common/              # UI reutilizable: Button, Input
├── features/
│   ├── auth/
│   │   ├── screens/         # LoginScreen, RegisterScreen
│   │   └── styles/
│   ├── tasks/
│   │   ├── api/             # Endpoints RTK Query (CRUD)
│   │   ├── adapters/        # Mapeadores local/ y server/
│   │   ├── components/      # CreateTaskModal
│   │   ├── models/          # Interfaces TypeScript local/ y server/
│   │   ├── screens/         # TasksScreen
│   │   ├── styles/
│   │   └── utils/           # taskHelpers (isCompletedToday, today)
│   └── calendar/
│       ├── screens/         # CalendarScreen
│       └── styles/
├── hooks/                   # useAuth
├── services/
│   └── firebase/            # authService, configuración firebase
├── store/
│   ├── auth/                # Zustand authStore
│   └── index.ts             # Redux store + middleware RTK Query
└── types/                   # Tipos de navegación
```

**Decisiones de diseño clave:**
- **Zustand** maneja sesión y estado de UI — ligero, sin boilerplate
- **RTK Query** gestiona el fetching de Firestore con invalidación automática de caché
- **Patrón Adapters** desacopla la forma del dato del servidor del dato de la UI
- **`completedDate: string | null`** en vez de `completed: boolean` permite el reset diario sin lógica extra

### Cómo correr el proyecto

#### Prerequisitos
- Node.js 18+
- Entorno React Native CLI ([guía de setup](https://reactnative.dev/docs/environment-setup))
- Android Studio + Android SDK
- Un proyecto Firebase con **Firestore** y **Auth Email/Password** habilitados

#### Instalación

```bash
git clone https://github.com/SOJEIN/Orbit.git
cd orbit
npm install
npx react-native run-android
```

#### Configuración Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilita **Authentication → Correo electrónico/Contraseña**
3. Habilita **Firestore Database** (edición Standard)
4. Descarga `google-services.json` → colócalo en `android/app/google-services.json`
5. Crea el índice compuesto:

| Colección | Campo | Orden |
|---|---|---|
| Tasks | userId | Ascendente |
| Tasks | createdAt | Descendente |

#### Reglas de seguridad Firestore

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /Tasks/{taskId} {
      allow read: if request.auth != null
        && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null
        && request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null
        && resource.data.userId == request.auth.uid;
    }
  }
}
```

### Estado del proyecto

| Funcionalidad | Estado |
|---|---|
| Auth (Login / Register) | ✅ Listo |
| Google Sign-In | ✅ Listo |
| Tareas diarias y de una vez | ✅ Listo |
| Editar tarea | ✅ Listo |
| Confirmar antes de eliminar | ✅ Listo |
| Pull to refresh | ✅ Listo |
| Animaciones (Reanimated) | ✅ Listo |
| Vista de calendario | ✅ Listo |
| Ícono y splash screen | ✅ Listo |
| Notificaciones push | 🔄 Planeado |
| Soporte iOS | 🔄 Planeado |

---

<p align="center">Construido con enfoque en arquitectura limpia, escalabilidad y patrones del mundo real.</p>
