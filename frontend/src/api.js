// src/api.js
const BASE_URL = "http://127.0.0.1:8000";

export async function fetchData(filters = {}) {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/data?${query}`);
  const data = await res.json();
  return data;
}
