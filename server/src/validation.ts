import { z } from "zod";

function isYouTubeUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;

    const videoId = url.hostname === "youtu.be"
      ? url.pathname.slice(1).split("/")[0]
      : ["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)
        ? url.searchParams.get("v") || url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1]
        : null;

    return /^[\w-]{11}$/.test(videoId || "");
  } catch {
    return false;
  }
}

export const projectSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters.").max(90),
  category: z.string().trim().min(2, "Add a project category.").max(50),
  description: z.string().trim().min(10, "Description must be at least 10 characters.").max(500),
  year: z.coerce.number().int().min(2000).max(2100),
  coverTheme: z.enum(["blue", "orange", "violet", "teal", "mono"]).default("blue"),
  featured: z.boolean().default(false),
  videoUrl: z.preprocess(
    (value) => value === "" ? null : value,
    z.string().trim().url().max(2048).refine(isYouTubeUrl, "Enter a valid YouTube video link.").nullable().optional()
  )
});

export function makeSlug(value) {
  const base = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);
  return base || `project-${Date.now()}`;
}
