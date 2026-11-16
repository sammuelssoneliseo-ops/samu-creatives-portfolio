import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters.").max(90),
  category: z.string().trim().min(2, "Add a project category.").max(50),
  description: z.string().trim().min(10, "Description must be at least 10 characters.").max(500),
  year: z.coerce.number().int().min(2000).max(2100),
  coverTheme: z.enum(["blue", "orange", "violet", "teal", "mono"]).default("blue"),
  featured: z.boolean().default(false)
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
