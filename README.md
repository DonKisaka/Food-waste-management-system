# Food Waste Management System

End-to-end platform that connects food donors, collection centers, waste processors, and administrators to reduce food waste.  
This repository is a monorepo containing both the Spring Boot backend API and the Next.js frontend dashboard.

## Repository Layout

| Path | Description |
| --- | --- |
| `foodwastesystem/` | Spring Boot 3 backend (Java 25, Maven Wrapper, PostgreSQL, JWT auth). |
| `frontend/` | Next.js 16 application (React 19, App Router, Axios, React Hook Form). |

## Key Features

- JWT-based authentication (signup/login) with password validation.
- CRUD for food donors, collection centers, waste processors, and waste items.
- MapStruct + DTO layer to decouple persistence models from API contracts.
- PostgreSQL persistence with JPA/Hibernate and Hikari connection pooling.
- Docker and Docker Compose support for local parity with Railway/Vercel deployments.
- Modern frontend with protected routes, server actions, form validation (Zod), and Tailwind-based UI.

## Tech Stack

- **Backend:** Spring Boot 3.5, Java 25, Spring Security, MapStruct, JWT (jjwt), PostgreSQL.
- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Axios, React Hook Form, Zod.
- **Infrastructure:** Docker, Docker Compose, Railway (backend + PostgreSQL), Vercel (frontend).

## Prerequisites

- Java 21+ (Java 25 recommended to match `pom.xml`).
- Node.js 18+ (Next.js 16 requirement).
- Docker Desktop (optional but recommended for Compose workflow).
- Maven Wrapper (`./mvnw` / `mvnw.cmd`) included — no global Maven needed.

## Backend Setup (`foodwastesystem/`)

```bash
cd foodwastesystem
# Install dependencies and run in dev mode
./mvnw spring-boot:run         # or mvnw.cmd on Windows
```

The API listens on `http://localhost:8080` (or on `$PORT` when provided).

### Backend Environment Variables

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `DATABASE_URL` | ✅ | `jdbc:postgresql://localhost:5432/food_waste` | JDBC URL for PostgreSQL. |
| `DATABASE_USERNAME` | ✅ | `foodsystem` | DB username. |
| `DATABASE_PASSWORD` | ✅ | `foodsystempass` | DB password. |
| `HIBERNATE_DDL_AUTO` | Optional | `update` | Schema strategy (`update`, `validate`, etc.). |
| `SHOW_SQL` | Optional | `true` | Enables SQL logs. |
| `JWT_SECRET_KEY` | ✅ | sample key in `application.properties` | Secret used to sign JWTs (replace in production). |
| `JWT_EXPIRATION_TIME` | Optional | `86400000` | Token lifetime in ms. |
| `CORS_ALLOWED_ORIGINS` | ✅ (prod) | `http://localhost:3000` | Comma-separated list of allowed origins (`https://your-vercel-app.vercel.app,http://localhost:3000`). |
| `PORT` | Optional | `8080` | Override server port (Railway injects this). |

### Run with Docker Compose

```bash
cd foodwastesystem
docker compose up --build
```

This starts:
- `postgres-db`: PostgreSQL 16 with persisted volume.
- `food_waste_app`: Spring Boot service bound to `http://localhost:8080`.

### Build Production Jar / Image

```bash
./mvnw clean package -DskipTests
# app jar will be in target/

docker build -t food-waste-app .
```

## Frontend Setup (`frontend/`)

```bash
cd frontend
cp .env.local.example .env.local   # create your env file (see below)
npm install
npm run dev                        # http://localhost:3000
```

Create `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8080      # for local dev
```

When deploying, set `NEXT_PUBLIC_API_URL` to your Railway backend URL (e.g., `https://<railway-service>.up.railway.app`) in Vercel Project Settings → Environment Variables (Production + Preview + Development) and redeploy.

### Frontend Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js dev server. |
| `npm run build` | Production build. |
| `npm run start` | Run built app (used by Vercel). |
| `npm run lint` | ESLint checks. |

## Testing

- **Backend:** `./mvnw test`
- **Frontend:** (Add React/Playwright tests as needed). Currently relies on manual verification; consider integrating unit/end-to-end suites for critical flows.

## Deployment Notes

### Railway (Backend + PostgreSQL)

1. Connect repository or use `railway up` inside `foodwastesystem/`.
2. Provision a PostgreSQL service and use variable references:<br>
   `DATABASE_URL=jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/${{Postgres.PGDATABASE}}`  
   `DATABASE_USERNAME=${{Postgres.PGUSER}}`  
   `DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}`
3. Set `CORS_ALLOWED_ORIGINS` with your Vercel domain(s).
4. Railway auto-detects the Dockerfile (multi-stage build) and injects `PORT`.

### Vercel (Frontend)

1. Import the `frontend/` directory as the project.
2. Set `NEXT_PUBLIC_API_URL` to the public Railway backend URL.
3. Redeploy to propagate environment changes.

## Troubleshooting

- **403 from Vercel frontend:** Ensure `CORS_ALLOWED_ORIGINS` includes the exact Vercel domain and Railway has been redeployed.
- **`ECONNREFUSED` locally:** Confirm backend is running on `localhost:8080` and `.env.local` points to it.
- **Docker permission errors (`mvnw`):** The Dockerfile already runs `chmod +x mvnw`, but you may need to reset line endings if edited on Windows.
- **Database migrations:** `HIBERNATE_DDL_AUTO=update` is convenient but consider `validate` or dedicated migrations (Flyway/Liquibase) for production stability.

## Contributing

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Write tests first when adding backend logic.
4. Submit a pull request describing changes, tests, and deployment considerations.

---

Need help deploying or extending the platform? Open an issue with details about your environment (OS, Java/Node versions, and deployment target).

