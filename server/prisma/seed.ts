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
  },
  {
    slug: "singko-short-film",
    title: "SINGKO — Short Film",
    category: "SHORT FILM / FILMMAKING",
    description: "A short film starring Robert Ponteras, Mitch Tenorio, and Nikkie Sabuquel.",
    year: 2026,
    coverTheme: "orange",
    featured: true,
    videoUrl: "https://youtu.be/Vwd8tN-ban0"
  },
  {
    slug: "graphicos-sig-intro-video",
    title: "GRAPHICOS SIG — Introductory Video",
    category: "INTRODUCTORY VIDEO",
    description: "An introductory video for the GRAPHICOS Orientation SIG.",
    year: 2026,
    coverTheme: "blue",
    featured: true,
    videoUrl: "https://youtu.be/yiLM29IQDi4"
  },
  {
    slug: "rvl-creatives-documentary",
    title: "RVL Creatives — Documentary",
    category: "DOCUMENTARY / FILMMAKING",
    description: "A documentary video sample from RVL Creatives.",
    year: 2023,
    coverTheme: "teal",
    featured: true,
    videoUrl: "https://youtu.be/bX6tyN8x_NA"
  },
  {
    slug: "ginhawell-tv-advertisement",
    title: "GinhaWell — TV Advertisement",
    category: "TV ADVERTISEMENT / COMMERCIAL",
    description: "A GinhaWell TV advertisement featured at the 6th Annual Advertising Congress.",
    year: 2026,
    coverTheme: "violet",
    featured: true,
    videoUrl: "https://youtu.be/1HTQwVVQlxI"
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
  console.log(`Seed complete — ${sampleProjects.length} portfolio projects are available.`);
} catch (error) {
  console.error("Could not seed projects:", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
