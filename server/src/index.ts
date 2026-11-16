import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { prisma } from "./db.ts";
import { makeSlug, projectSchema } from "./validation.ts";

const app = express();
const port = Number(process.env.PORT || 4000);
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      formAction: ["'self'"],
      frameAncestors: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      connectSrc: ["'self'"]
    }
  }
}));
app.use(cors({ origin: clientUrl.split(",").map((item) => item.trim()) }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", async (_req, res, next) => {
  try {
    const projectCount = await prisma.project.count();
    res.json({ status: "ok", database: "connected", projectCount });
  } catch (error) {
    next(error);
  }
});

// READ: return all portfolio projects, with featured work first.
app.get("/api/projects", async (_req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
    });
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

// CREATE: validate the payload and persist a new project with Prisma.
app.post("/api/projects", async (req, res, next) => {
  try {
    const parsed = projectSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Please check the project details.", errors: parsed.error.flatten() });
    }

    const project = await prisma.project.create({
      data: { ...parsed.data, slug: makeSlug(parsed.data.title) }
    });
    return res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

// UPDATE: edit an existing project by its numeric ID.
app.put("/api/projects/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) return res.status(400).json({ message: "Invalid project ID." });

    const parsed = projectSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Please check the project details.", errors: parsed.error.flatten() });
    }

    const project = await prisma.project.update({
      where: { id },
      data: { ...parsed.data, slug: makeSlug(parsed.data.title) }
    });
    return res.json(project);
  } catch (error) {
    next(error);
  }
});

// DELETE: permanently remove a project by its numeric ID.
app.delete("/api/projects/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) return res.status(400).json({ message: "Invalid project ID." });

    await prisma.project.delete({ where: { id } });
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// In production, serve the built React app from the same Node process.
const clientDist = path.resolve(__dirname, "../../client/dist");
app.use(express.static(clientDist));
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(clientDist, "index.html"), (error) => {
    if (error && !res.headersSent) res.status(404).send("Build the client first with npm run build.");
  });
});

app.use((error, _req, res, _next) => {
  if (error?.code === "P2025") return res.status(404).json({ message: "Project not found." });
  if (error?.code === "P2002") return res.status(409).json({ message: "A project with that title already exists. Try a different title." });
  console.error(error);
  return res.status(500).json({ message: "Something went wrong while accessing the project database." });
});

const server = app.listen(port, () => {
  console.log(`Samu Creatives API is running at http://localhost:${port}`);
});

async function shutdown() {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
