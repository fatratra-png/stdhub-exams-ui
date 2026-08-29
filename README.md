# STDExams — UI

Frontend web application of the **STDExams** platform for **HEI STDhub**, built for managing and taking online exams within the HEI Madagascar community.

This project is the web client (SPA) that consumes the STDExams REST API (see the "API" section below).

---

## Table of Contents

- [Project overview](#project-overview)
- [Features](#features)
  - [Admin space](#admin-space)
  - [Student space](#student-space)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration (environment variables)](#configuration-environment-variables)
- [Available commands](#available-commands)
- [End-to-end tests (Cypress)](#end-to-end-tests-cypress)
- [Consumed API](#consumed-api)
- [Deployment](#deployment)

---

## Project overview

STDExams is an online exam management application with **two distinct roles**:

- **Admin**: runs the platform (students, courses, exams, questions, results).
- **Student**: browses their available exams, takes them, and checks their results.

Authentication uses a school email account (`@mail.hei.school`) — only institutional email logins are allowed.

The interface language is **French**.

---

## Features

### Admin space

- **Dashboard**: global statistics (number of students, courses, and exams).
- **Student management**: list, create, edit, and deactivate student accounts.
- **Course management**: list, create, edit, and delete courses.
- **Exam management**:
  - create / edit / delete exams (linked to a course);
  - add, edit, and delete **questions** of an exam.
- **Per-exam results**: view student results (`/admin/exams/:id/results`).
- **Profile**: view the admin profile (`/admin/profile`).

### Student space

- **My exams**: list of available exams (home page `/student`).
- **Taking an exam**: answer an exam's questions (`/student/exams/:id`) then submit the answers.
- **Exam result**: immediate result view after submission (`/student/exams/:id/result`).
- **Results history**: list of all obtained results (`/student/results`).
- **Profile**: view the profile (`/student/profile`).

Navigation is protected by role (`RoleRoute`): a student cannot access the admin space and vice versa.

---

## Tech stack

| Layer | Technology | Version used |
| ----- | ---------- | ------------ |
| UI framework | [React](https://react.dev) | ^19.2.8 |
| Language | JavaScript (JSX, ESM) | — |
| Build / Bundler | [Vite](https://vite.dev) | ^8.2.0 |
| React compiler | `@vitejs/plugin-react` plugin (React Compiler enabled) | ^6.0.4 |
| Routing | [React Router DOM](https://reactrouter.com) | ^7.18.2 |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 + `@tailwindcss/vite` plugin | ^4.3.3 |
| Icons | Font Awesome (`@fortawesome/react-fontawesome`) | ^3.5.0 |
| Fonts | Google Fonts — **Quicksand** | — |
| E2E tests | [Cypress](https://www.cypress.io) | ^15.21.1 |
| Lint | ESLint + `eslint-plugin-react-hooks` / `react-refresh` | ^10.8.0 |

> **Note**: the React Compiler is enabled (via `@rolldown/plugin-babel` + `babel-plugin-react-compiler`), which slightly impacts dev & build performance.

**Node**: `>= 20.19` (required by Vite 8) — tested on Node `v22.x` (npm `10.x`).

---

## Project structure

```
├── cypress/                  # Cypress end-to-end tests
│   ├── e2e/                  #   Scenarios (login, admin-exams, my-exam, role-route)
│   └── support/              #   Custom commands (cy.loginAs)
├── public/                   # Static assets (logos, icons)
├── src/
│   ├── api/                  # HTTP calls to the REST API (fetch client)
│   ├── components/
│   │   ├── courses/          #   Course-related components
│   │   ├── dashboard/        #   Student forms/lists
│   │   ├── exam/             #   Exam-related components
│   │   ├── layout/           #   Sidebar + Navbar of the authenticated space
│   │   ├── login/            #   Login + role-based route guard
│   │   ├── questions/        #   Question-related components
│   │   └── ui/               #   Small reusable components
│   ├── contexts/             # React contexts (Auth, Toast)
│   ├── hooks/                # Custom hooks
│   ├── pages/                # Pages of the admin / student spaces
│   │   ├── admin/
│   │   └── student/
│   ├── services/             # Services (auth, profile, students, courses)
│   └── utils/                # Utilities (dates)
│   ├── App.jsx               # Route definitions
│   ├── index.css             # Global styles + Tailwind theme
│   └── main.jsx              # Entry point (React root + Router + AuthProvider)
├── .env.example              # Environment variables template
├── cypress.config.js         # Cypress config (baseUrl: http://localhost:5173)
├── eslint.config.js          # ESLint config (flat config)
├── index.html                # HTML entry page
└── vite.config.js            # Vite config (React, Tailwind, Babel/React Compiler)
```

---

## Prerequisites

| Tool | Minimum version |
| ---- | --------------- |
| [Node.js](https://nodejs.org) | >= 20.19 |
| npm | >= 10 |

Check your installation:

```bash
node -v
npm -v
```

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/fatratra-png/stdhub-exams-ui.git
cd stdhub-exams-ui

# 2. Install dependencies
npm install
```

> This project does not use `yarn` or `pnpm`: stick with **npm**.

---

## Configuration (environment variables)

Copy the template file then adjust the value:

```bash
cp .env.example .env
```

| Variable | Description | Default value |
| -------- | ----------- | ------------- |
| `VITE_API_URL` | Base URL of the API (see OpenAPI spec, development server) | `http://localhost:3000` |

The client reads this variable at startup (`src/api/apiClient.js`). Without a `.env` file, the fallback URL is `http://localhost:3000`.

---

## Available commands

All commands are run from the project root using **npm**.

### Start the development server

```bash
npm run dev
```

Starts Vite in dev mode with HMR. By default available at **http://localhost:5173** (config in `cypress.config.js`).

### Production build

```bash
npm run build
```

Generates the optimized bundle in the `dist/` folder.

> **Note**: the React Compiler is active, which can slow down the build.

### Preview the build

```bash
npm run preview
```

Serves the `dist/` content locally to verify the production build.

### Lint

```bash
npm run lint
```

Runs ESLint over the whole project (flat config, ignored folders: `dist`).

### End-to-end tests (Cypress)

The dev server must be running (`npm run dev`), then:

```bash
# Interactive mode (graphical interface)
npx cypress open

# Headless mode (CI)
npx cypress run
```

The tests use local auth fixtures (fake JWT) via the `cy.loginAs('ADMIN' | 'STUDENT')` command. Covered scenarios:

- `login.cy.js` — login
- `role-route.cy.js` — role-based route protection
- `admin-exams.cy.js` — admin exam CRUD
- `my-exam.cy.js` — taking an exam as a student

---

## Consumed API

The frontend is a **backend-less SPA**: it consumes the STDExams REST API (swagger/OpenAPI) served at the `VITE_API_URL`.

The HTTP client (`src/api/apiClient.js`) automatically adds the `Authorization: Bearer <token>` header from the token stored in `localStorage`.

**Used endpoints:**

| Method | Endpoint | Role | Used by UI for |
| ------ | -------- | ---- | -------------- |
| POST | `/api/auth/login` | Public | Login |
| GET | `/api/students` | Admin | Student list + stats |
| POST | `/api/students` | Admin | Create a student |
| PUT | `/api/students/:id` | Admin | Edit a student |
| DELETE | `/api/students/:id` | Admin | Deactivate a student |
| GET | `/api/courses` | Admin | Course list + stats |
| POST | `/api/courses` | Admin | Create a course |
| PUT | `/api/courses/:id` | Admin | Edit a course |
| DELETE | `/api/courses/:id` | Admin | Delete a course |
| GET | `/api/exams` | Admin | Exam list + stats |
| GET | `/api/exams?courseId=:id` | Admin | Filter exams by course |
| GET | `/api/exams/:id` | Admin | Exam details |
| POST | `/api/exams` | Admin | Create an exam |
| PUT | `/api/exams/:id` | Admin | Edit an exam |
| DELETE | `/api/exams/:id` | Admin | Delete an exam |
| GET | `/api/exams/:id/questions` | Admin | Exam questions |
| POST | `/api/exams/:id/questions` | Admin | Add a question |
| PUT | `/api/questions/:id` | Admin | Edit a question |
| DELETE | `/api/questions/:id` | Admin | Delete a question |
| GET | `/api/exams/:id/results` | Admin | Results of an exam |
| GET | `/api/my/exams` | Student | My available exams |
| GET | `/api/my/exams/:id` | Student | View an exam |
| POST | `/api/my/exams/:id/submit` | Student | Submit the answers |
| GET | `/api/my/results` | Student | My results |

---

## Deployment

The production build (`npm run build`) outputs a **fully static** `dist/` folder (HTML/CSS/JS). It can be deployed on any static host (Netlify, Vercel, GitHub Pages, nginx, etc.).

Since routing is handled client-side with `BrowserRouter`, configure a **fallback rewrite of unknown routes to `index.html`** (SPA rewrite).

> 🔒 **Security**: never commit the `.env` file (already ignored in `.gitignore`).