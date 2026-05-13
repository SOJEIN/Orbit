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
- Proyecto inicializado con `@react-native-community/cli`
- App corriendo en dispositivo físico Android via USB
- Fast Refresh funcionando
- **Siguiente paso:** configurar editor, limpiar código base y construir arquitectura de carpetas

## Cómo correr
```
npx react-native run-android
```

## Arquitectura de carpetas planeada
```
src/
├── app/
├── components/
│   ├── common/
│   └── features/
├── features/
│   ├── auth/
│   ├── tasks/
│   └── calendar/
├── hooks/
├── services/
├── store/
├── types/
├── utils/
└── constants/
```

## Convenciones
- Nombrar componentes en PascalCase
- Hooks con prefijo `use`
- Servicios en camelCase
- Tipos/interfaces con prefijo I o sufijo Type según contexto
