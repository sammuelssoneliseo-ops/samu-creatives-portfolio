import "dotenv/config";
import { prisma } from "../src/db.ts";

const sampleProjects = [
  {
    slug: "afterglow-brand-film",
    title: "Afterglow — Brand Film",
    category: "FILMMAKING / VIDEO EDITING",
    description: "A cinematic brand film concept built around warm light, deliberate pacing, and a story that stays with the viewer.",
    year: 2026,
    coverTheme: "orange",
    featured: true
  },
  {
    slug: "northstar-visual-identity",
    title: "Northstar — Visual Identity",
    category: "GRAPHIC DESIGN / BRANDING",
    description: "A clean visual direction exploring bold typography, a focused color system, and flexible social-first brand assets.",
    year: 2026,
    coverTheme: "blue",
    featured: true
  },
  {
    slug: "blue-hour-social-campaign",
    title: "Blue Hour — Social Campaign",
    category: "CREATIVE DIRECTION / SOCIAL",
    description: "A sample campaign system designed for short-form storytelling, consistent layouts, and scroll-stopping motion.",
    year: 2025,
    coverTheme: "violet",
    featured: false
  },
  {
    slug: "studio-notes-content-kit",
    title: "Studio Notes — Content Kit",
    category: "VIRTUAL ASSISTANCE / CONTENT",
    description: "A content operations concept combining calendar planning, asset organization, and a repeatable publishing workflow.",
    year: 2025,
    coverTheme: "teal",
    featured: false
  }
];

try {
  for (const project of sampleProjects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project
    });
  }
  console.log(`Seed complete — ${sampleProjects.length} sample projects are available.`);
} catch (error) {
  console.error("Could not seed projects:", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
