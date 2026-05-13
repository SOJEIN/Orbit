# Orbit — Agenda App

Aplicación móvil de agenda/productividad para portafolio profesional.

## Stack
- React Native CLI (no Expo)
- TypeScript
- Firebase (Auth + Firestore)
- Zustand — estado global de la app (sesión, UI state)
- RTK Query (Redux Toolkit) — consumo de APIs
- Principios SOLID aplicados en toda la arquitectura
- Android (dispositivo físico via USB) + iOS compatible

## Contexto del proyecto
- Código público en GitHub — priorizar calidad profesional
- Arquitectura escalable (Feature-Sliced simplificada)
- Dinámica mentor-mentee: paso a paso, explicando decisiones

## Estado actual
- Auth completo: Login, Register, Logout (Firebase Auth)
- Feature Tasks completa: CRUD, tareas diarias con reset automático, tareas de una sola vez
- Feature Calendar: vista por fecha con marcadores de tareas
- RTK Query + Firestore integrados con adapters local/server
- Diseño consistente con tema morado (#6C63FF)
- Splash screen configurado (react-native-bootsplash)
- Ícono de app personalizado
- README profesional

**Siguiente paso:** iOS setup (Firebase + pod install), notificaciones push, editar tarea

## Cómo correr
```
npx react-native run-android
```

## Arquitectura de carpetas
```
src/
├── app/
│   └── navigation/
├── assets/
│   ├── images/
│   └── bootsplash/
├── components/
│   └── common/
├── features/
│   ├── auth/
│   │   ├── screens/
│   │   └── styles/
│   ├── tasks/
│   │   ├── api/
│   │   ├── adapters/local/ + server/
│   │   ├── components/
│   │   ├── models/local/ + server/
│   │   ├── screens/
│   │   ├── styles/
│   │   └── utils/
│   └── calendar/
│       ├── screens/
│       └── styles/
├── hooks/
├── services/firebase/
├── store/
└── types/
```

## Convenciones
- Componentes en PascalCase
- Hooks con prefijo `use`
- Servicios en camelCase
- Modelos con sufijo `Local` o `Server` según contexto
- Adapters en `adapters/local/` y `adapters/server/`
