import "dotenv/config";
import { prisma } from "../src/db.ts";

const videoProjects = [
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
  for (const project of videoProjects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project
    });
  }
  console.log(`Seed complete — ${videoProjects.length} video projects are available.`);
} catch (error) {
  console.error("Could not seed projects:", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
