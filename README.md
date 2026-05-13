<h1 align="center">
  <br>
  Orbit — Digital Agenda
  <br>
</h1>

<p align="center">
  A modern productivity app for managing daily routines and one-time tasks, built as a professional portfolio project.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.76-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=flat-square&logo=firebase" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-RTK_Query-764ABC?style=flat-square&logo=redux" />
  <img src="https://img.shields.io/badge/Platform-Android-3DDC84?style=flat-square&logo=android" />
</p>

---

## Features

- **Authentication** — Email/password login and registration with Firebase Auth
- **Daily tasks** — Recurring tasks that reset automatically every day
- **One-time tasks** — Tasks scheduled for a specific date
- **Calendar view** — Visual overview of tasks by date with dot markers
- **Task management** — Create, complete, and delete tasks in real time
- **Persistent state** — All data synced with Firestore, survives app restarts

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native CLI (no Expo) |
| Language | TypeScript |
| Navigation | React Navigation 6 |
| Global state | Zustand |
| Server state / API | RTK Query (Redux Toolkit) |
| Backend | Firebase Auth + Firestore |
| Calendar | react-native-calendars |
| Splash screen | react-native-bootsplash |

## Architecture

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

### Key design decisions

- **Zustand** handles session and UI state — lightweight, zero boilerplate
- **RTK Query** manages Firestore data fetching with automatic cache invalidation
- **Adapters pattern** decouples server data shape from UI data shape — Firestore changes never break the UI
- **`completedDate: string | null`** instead of `completed: boolean` enables daily task reset without extra logic

## Getting Started

### Prerequisites

- Node.js 18+
- React Native CLI environment ([setup guide](https://reactnative.dev/docs/environment-setup))
- Android Studio + Android SDK
- A Firebase project with **Firestore** and **Email/Password Auth** enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/orbit.git
cd orbit

# Install dependencies
npm install

# Run on Android
npx react-native run-android
```

### Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication → Email/Password**
3. Enable **Firestore Database** (Standard edition)
4. Download `google-services.json` and place it at `android/app/google-services.json`
5. Create the following Firestore composite index:

| Collection | Field | Order |
|---|---|---|
| Tasks | userId | Ascending |
| Tasks | createdAt | Descending |

### Firestore Security Rules

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

## Project Status

| Feature | Status |
|---|---|
| Auth (Login / Register) | ✅ Done |
| Daily & one-time tasks | ✅ Done |
| Calendar view | ✅ Done |
| App icon & splash screen | ✅ Done |
| iOS support | 🔄 Planned |
| Push notifications | 🔄 Planned |
| Edit task | 🔄 Planned |

---

<p align="center">Built with focus on clean architecture, scalability, and real-world patterns.</p>
