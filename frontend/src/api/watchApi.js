/** @format */

const BASE_URL = "http://127.0.0.1:8000/watch"; // Update if your API is under another path

export async function fetchWatches() {
  const res = await fetch(BASE_URL);
  return await res.json();
}

export async function createWatch(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function updateWatch(id, data) {
  const res = await fetch(`${BASE_URL}/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteWatch(id) {
  const res = await fetch(`${BASE_URL}/${id}/`, {
    method: "DELETE",
  });
  return res.ok;
}
