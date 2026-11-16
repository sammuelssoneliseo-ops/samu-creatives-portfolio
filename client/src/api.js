const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options
  });

  if (response.status === 204) return null;
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || "The request could not be completed.");
  return payload;
}

export const projectsApi = {
  list: () => request("/api/projects"),
  create: (data) => request("/api/projects", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => request(`/api/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id) => request(`/api/projects/${id}`, { method: "DELETE" }),
  health: () => request("/api/health")
};
