// lib/fetcher.ts

export async function apiFetch(url: string, options: any = {}) {
  const token = typeof window !== "undefined" 
    ? localStorage.getItem("token") 
    : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  };

  const res = await fetch(url, { ...options, headers });
  const data = await res.json();
  return { res, data };
}
