// Central API service — all backend calls go through here.
// Base URL comes from the Vite environment variable set in .env
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  message: string;
  id: string;
}

export interface ProjectFromAPI {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  ongoing?: boolean;
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export async function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail ?? `Server error: ${res.status}`);
  }

  return res.json();
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export async function fetchProjects(): Promise<ProjectFromAPI[]> {
  const res = await fetch(`${API_BASE}/projects`);

  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }

  const data = await res.json();
  
  // Normalize data defensively in case the backend returns older schema properties
  return data.map((item: any) => ({
    ...item,
    githubUrl: item.githubUrl || item.github || '',
    liveUrl: item.liveUrl || item.liveDemo || '',
  }));
}

// ─── Auth Helper ──────────────────────────────────────────────────────────────
function getAuthHeaders() {
  const token = localStorage.getItem('admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

// ─── Admin Auth ───────────────────────────────────────────────────────────────
export async function loginAdmin(username: string, password: string): Promise<{ access_token: string }> {
  // OAuth2 expects form data format for login
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString(),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail ?? 'Login failed');
  }

  return res.json();
}

// ─── Admin Projects ───────────────────────────────────────────────────────────
export async function createProject(project: Omit<ProjectFromAPI, 'id'>): Promise<{ message: string; id: string }> {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(project),
  });

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail ?? 'Failed to create project');
  }

  return res.json();
}

export async function updateProject(id: string, project: Omit<ProjectFromAPI, 'id'>): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(project),
  });

  if (!res.ok) {
    if (res.status === 401) {
        localStorage.removeItem('admin_token');
        window.location.href = '/admin/login';
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail ?? 'Failed to update project');
  }

  return res.json();
}

export async function deleteProject(id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    if (res.status === 401) {
        localStorage.removeItem('admin_token');
        window.location.href = '/admin/login';
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail ?? 'Failed to delete project');
  }

  return res.json();
}

