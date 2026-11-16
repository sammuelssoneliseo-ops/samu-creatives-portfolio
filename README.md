# Samu Creatives — Portfolio + Prisma CRUD Studio

A responsive personal portfolio for **Samu Creatives**, built around a blue-and-orange visual system, glassmorphism panels, and dimensional app-style icons for Adobe creative tools and CapCut. The site presents Samu as a freelance video editor, filmmaker, graphic designer, and virtual assistant, with X / Twitter as the primary social channel.

The project also includes a small **Studio** workspace (`/studio`) that manages portfolio projects. The React interface calls an Express API, and the API uses **Prisma ORM** to create, retrieve, update, and delete records in a persistent SQLite database.

> The included project records are starter/demo content. Replace them with real client or personal work before publishing the portfolio.

## Features

- Responsive portfolio homepage with Work, Services, About, X / Twitter, and Contact sections.
- Blue/orange visual palette, translucent glass panels, subtle motion, and CSS-built 3D-style Adobe / CapCut app tiles.
- Portfolio project cards are read from the database rather than hard-coded in the UI.
- Studio dashboard at `/studio` with create, read, update, and delete actions.
- Input validation with Zod and helpful API error responses.
- Persistent SQLite file stored at `server/prisma/dev.db` after setup.
- Seed script that adds four editable sample projects.
- GitHub-ready repository structure and environment examples.

## Technology stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 19 + Vite | Portfolio UI and Studio CRUD interface |
| Routing | React Router | Homepage and `/studio` route |
| Styling | CSS | Responsive layout, glass effect, color system, 3D-style app tiles |
| Icons | Lucide React + CSS app glyphs | Interface icons and Adobe / CapCut-inspired tiles |
| Backend | Node.js + Express 5 | REST API for project records |
| ORM | Prisma ORM 7 | Schema, migrations, and database queries |
| Database | SQLite + better-sqlite3 adapter | Local persistent database file |
| Validation | Zod | Validates create/update payloads |

## Project structure

```text
samu-creatives/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx              # Portfolio, Studio, forms, CRUD UI
│   │   ├── api.js               # Frontend API client
│   │   ├── main.jsx             # React entry point
│   │   └── styles.css           # Visual system and responsive styling
│   ├── .env.example             # X profile URL configuration
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── prisma/
│   │   ├── migrations/          # Checked-in initial migration
│   │   ├── schema.prisma        # Project model
│   │   └── seed.ts              # Starter portfolio records
│   ├── src/
│   │   ├── db.ts                # Prisma Client + SQLite adapter
│   │   ├── index.ts             # Express API and static hosting
│   │   └── validation.ts       # Zod schema and slug helper
│   ├── .env.example
│   ├── package.json
│   └── prisma.config.ts
├── .gitignore
├── package.json                # npm workspaces and root scripts
└── README.md
```

## Requirements

- Node.js **22.12+** (recommended) and npm. The server TypeScript files are executed with `tsx`.
- Git (for version control and pushing to GitHub).

## Database configuration

The app uses a local SQLite database so you can run it without creating a remote database account.

1. Copy `server/.env.example` to `server/.env`.
2. Keep the default value for local development:

   ```env
   DATABASE_URL="file:./prisma/dev.db"
   PORT=4000
   CLIENT_URL="http://localhost:5173"
   ```

3. Prisma reads the connection URL from `server/prisma.config.ts`. The schema is in `server/prisma/schema.prisma` and the generated TypeScript client is written to `server/src/generated/prisma/`.
4. The database file is created when the migration is applied. It is intentionally ignored by Git; commit migration files, not your local database file.

## Install and run locally

Run these commands from the project root (`samu-creatives/`).

### 1. Install dependencies

```bash
npm install
```

### 2. Add environment files

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

On Windows PowerShell, use:

```powershell
Copy-Item server/.env.example server/.env
Copy-Item client/.env.example client/.env
```

Edit `client/.env` and replace `https://x.com/yourhandle` with your actual X / Twitter profile URL.

### 3. Generate Prisma Client, migrate, and seed the database

```bash
npm run db:setup
```

This runs the Prisma client generator, applies the checked-in migration, and inserts the sample projects. The seed script uses `upsert`, so rerunning it will not create duplicate copies of the four sample records.

### 4. Start the app

```bash
npm run dev
```

Open:

- Portfolio: <http://localhost:5173>
- Studio CRUD dashboard: <http://localhost:5173/studio>
- API health check: <http://localhost:4000/api/health>

The Vite development server proxies `/api` requests to the Express API on port `4000`.

## CRUD API reference

| Method | Endpoint | Prisma operation | Description |
|---|---|---|---|
| `GET` | `/api/projects` | `project.findMany()` | Retrieve portfolio project records |
| `POST` | `/api/projects` | `project.create()` | Create a new project |
| `PUT` | `/api/projects/:id` | `project.update()` | Update an existing project |
| `DELETE` | `/api/projects/:id` | `project.delete()` | Delete a project |
| `GET` | `/api/health` | `project.count()` | Check API and database connectivity |

### Example project payload

```json
{
  "title": "A New Visual Story",
  "category": "VIDEO EDITING / FILMMAKING",
  "description": "A short description of the creative concept and the work delivered.",
  "year": 2026,
  "coverTheme": "orange",
  "featured": true
}
```

Supported `coverTheme` values: `blue`, `orange`, `violet`, `teal`, and `mono`.

## Useful commands

```bash
npm run dev          # Run Vite and Express together
npm run build        # Build the React app for production
npm run start        # Run the Express server (after building the client)
npm run db:setup     # Generate Prisma Client, migrate, and seed
npm run db:generate  # Regenerate Prisma Client after schema changes
npm run db:migrate   # Create/apply development migrations
npm run db:seed      # Insert or update sample projects
npm run db:studio    # Open Prisma Studio to inspect records
```

When changing `schema.prisma`, run `npm run db:generate` after the migration so the generated client matches the schema.

## GitHub setup

Create an empty repository on GitHub (for example, `samu-creatives`), then run from this folder:

```bash
git init
git add .
git commit -m "Initial commit: Samu Creatives portfolio and Prisma CRUD app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/samu-creatives.git
git push -u origin main
```

Do **not** commit `.env` files, `node_modules`, the generated Prisma Client, or `server/prisma/dev.db`. The `.gitignore` file already excludes them.

## Production notes

- The Studio route is an educational/demo CRUD workspace and currently has **no authentication**. Do not expose it publicly as an unrestricted admin panel. Add authentication and authorization before deploying it for real client content.
- Local SQLite is suitable for a classroom demonstration, portfolio prototype, and single-instance app. For hosting on platforms with ephemeral filesystems or multiple server instances, move to a managed persistent database (for example PostgreSQL) and update the Prisma datasource/adapter configuration.
- Configure `CLIENT_URL` for your deployed frontend origin and set `DATABASE_URL` in the hosting provider's secret/environment settings.
- Replace the sample projects, X profile URL, and sample contact email (`hello@samucreatives.com`) with your own real content before launch.

## Learning outcomes demonstrated

1. **Database connectivity:** Prisma Client connects to a local SQLite database through the better-sqlite3 driver adapter.
2. **ORM model:** The `Project` model defines the project table and its fields in `schema.prisma`.
3. **CRUD:** Express endpoints call Prisma's `findMany`, `create`, `update`, and `delete` methods.
4. **Persistence:** Records are written to `server/prisma/dev.db`, so they remain available after restarting the app.
5. **Separation of concerns:** React handles presentation, Express handles HTTP routes, Prisma handles data access, and SQLite stores the data.
