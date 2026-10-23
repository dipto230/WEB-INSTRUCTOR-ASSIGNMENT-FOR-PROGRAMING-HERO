<div align="center">

# Project Portal — Submission & Review

**A simple, organized platform for students to submit projects and mentors to review them.**

[Live Frontend](https://project-submission-portal-mu.vercel.app/) · [Backend Deployment](https://project-submission-programming-hero.vercel.app/)

</div>

---

## Overview

Project Portal is a web application designed to simplify the student project submission and review workflow. Students can create an account, submit project details with GitHub and live-demo links, and track review progress. Mentors can inspect submissions, provide feedback, and approve or reject projects from a review dashboard.

## Screenshots

### Homepage

![Project Portal homepage](docs/screenshots/homepage.png)

### Mentor Review Dashboard

![Mentor review dashboard showing submission statistics and project list](docs/screenshots/review-dashboard.png)

## Features

### Student
- Register and sign in to an account.
- Submit a project with its name, repository URL, live URL, and description.
- View personal submissions and their current status.
- Track whether a submission is pending, approved, or rejected.

### Mentor
- View and review student project submissions.
- Filter submissions by status.
- Open GitHub repositories and live project demos.
- Approve or reject submissions and leave review feedback.
- View dashboard statistics for total, pending, approved, and rejected submissions.

### Security and validation
- Role-based access for `STUDENT` and `MENTOR`.
- Request validation using Zod.
- Password hashing and JWT-based authentication utilities.
- Rate limiting and centralized error handling in the backend.
- Database constraints to prevent a student from submitting the same repository URL more than once.

> Security note: These are documented project capabilities based on the supplied source structure. Review the implementation and deployment configuration before relying on them in production.

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript |
| UI | Tailwind CSS 4, Base UI, Lucide React, Sonner |
| Forms and validation | React Hook Form, Zod |
| API client | Axios |
| Backend | Node.js, Express 5, TypeScript |
| Database | PostgreSQL |
| ORM | Prisma 7 with PostgreSQL adapter |
| Authentication utilities | JSON Web Token (JWT), bcryptjs |
| Deployment | Vercel links supplied for the frontend and backend |

## Architecture

```text
project-submission-portal/
├── frontend/
│   └── src/
│       ├── actions/auth/       # Login and signup server actions
│       ├── app/                # Home, auth, student and mentor pages
│       ├── components/
│       │   ├── home/           # Landing page sections
│       │   ├── mentor/         # Review dashboard components
│       │   └── student/        # Student submission components
│       ├── hooks/              # Client-side hooks
│       ├── lib/                # API, auth and utility helpers
│       └── types/              # Frontend TypeScript types
│
├── backend/
│   ├── prisma/                 # Prisma schema and seed (if present)
│   └── src/
│       ├── config/             # Prisma client setup
│       ├── middlewares/        # Auth, validation, rate limit, errors
│       ├── modules/
│       │   ├── auth/           # Authentication routes/controller/service
│       │   ├── review/         # Mentor review workflow
│       │   └── submission/     # Submission workflow
│       ├── types/
│       └── utils/              # AppError, JWT and password helpers
│
└── docs/
    └── screenshots/
```

*The diagram is a high-level overview. Keep the actual folder names and file locations in sync with the repository.*

## Data Model

### User

- `id`: unique user identifier
- `name`: user's display name
- `email`: unique email address
- `passwordHash`: hashed password
- `role`: `STUDENT` or `MENTOR`
- `createdAt`, `updatedAt`: timestamps

### Submission

- `id`: unique submission identifier
- `projectName`: project title
- `repoUrl`: GitHub repository URL
- `liveLink`: deployed project URL
- `description`: project summary
- `status`: `PENDING`, `APPROVED`, or `REJECTED`
- `studentId`: owner of the submission
- `reviewedById`, `reviewedAt`, `reviewNote`: review metadata
- `createdAt`, `updatedAt`: timestamps

The supplied Prisma model includes a compound unique constraint on `[studentId, repoUrl]` and indexes for student, status, and creation time.

## Getting Started

### Prerequisites

- Node.js (use a version supported by your installed dependencies)
- pnpm
- PostgreSQL database
- Environment variables for the database and authentication

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_REPOSITORY_FOLDER>
```

### 2. Install frontend dependencies

```bash
cd frontend
pnpm install
```

Create `frontend/.env.local` and configure the API URL variable used by `src/lib/api.ts`. For example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Use the exact variable name expected by your existing API client if it differs.

Start the frontend:

```bash
pnpm dev
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd backend
pnpm install
```

Create `backend/.env` with your database connection string and JWT secret, using the exact variable names read by your backend configuration. Example placeholders:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
JWT_SECRET="replace-with-a-long-random-secret"
PORT=5000
```

**Do not commit real secrets or production credentials.** Add `.env` and `.env.local` to `.gitignore`.

### 4. Generate Prisma Client and prepare the database

Check the project's `prisma.config.ts` and Prisma schema first. With Prisma 7, database URL configuration may live in `prisma.config.ts`, and the project may use a generated client output path and PostgreSQL driver adapter. Follow the setup already used by this repository rather than copying a Prisma 6 tutorial.

Run the project's configured generation/migration commands, for example:

```bash
pnpm prisma:generate
pnpm prisma:migrate
```

If these scripts are not available in your current `package.json`, use the equivalent commands defined by the project. Review migrations before applying them to any shared or production database.

### 5. Run the backend

```bash
pnpm dev
```

The supplied backend scripts indicate that the development server starts with `tsx watch src/server.ts`.

## Submission Workflow

1. A student signs in and submits project information.
2. The backend validates the request and associates the submission with the authenticated student.
3. A mentor views the submission in the review dashboard.
4. The mentor reviews the project and records a decision and feedback.
5. The student can check the updated submission status.

The backend should derive the student identity from the verified authentication context rather than trusting a user ID sent in the request body. Mentor-only review operations should verify the caller's role on the server.

## API Modules

The backend is organized by feature:

- **Auth:** signup and login routes, controllers, services, and validation.
- **Submission:** create and retrieve student submissions.
- **Review:** mentor review operations and validation.
- **Middleware:** authentication, request validation, rate limiting, and error handling.

For exact endpoint paths, HTTP methods, request bodies, and response formats, see the route files in `backend/src/modules/`. They are intentionally not guessed here.

## Deployment

- **Frontend:** https://project-submission-portal-mu.vercel.app/
- **Backend deployment URL provided:** https://project-submission-programming-hero.vercel.app/

Confirm that the second URL is the API deployment and configure the frontend API environment variable accordingly. Also configure production environment variables, database connectivity, CORS allowed origins, and secure authentication settings.

## Repository Checklist

- [ ] Add the actual GitHub repository URL above.
- [ ] Confirm the frontend and backend deployment URLs.
- [ ] Add `.env.example` files with placeholders only.
- [ ] Verify `.gitignore` excludes secrets, dependencies, and build output.
- [ ] Confirm database migration and Prisma Client generation instructions.
- [ ] Test signup, login, submission creation, and mentor review on a clean setup.
- [ ] Confirm the deployed API's health check or documented base route.

## Author

**Dipto Roy**

B.Tech Computer Science & Engineering student · Full-Stack Web Development

---

<div align="center">

Built to make student project submissions and mentor feedback easier to manage.

</div>
