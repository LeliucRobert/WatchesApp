/** @format */

const BASE_URL = "http://127.0.0.1:8000/api/watch/"; // Update if your API is under another path

export async function fetchWatches() {
  const res = await fetch("http://localhost:8000/api/watches/");
  const data = await res.json();
  console.log(data);
  return data;
}

export async function createWatch(watchData) {
  const response = await fetch("http://localhost:8000/api/watches/create/", {
    method: "POST",

    body: watchData,
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Watch successfully created:", data);
  } else {
    const errors = await response.text();
    console.error("Failed to create watch:", errors);
  }
}

export async function updateWatch(id, data) {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteWatch(id) {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: "DELETE",
  });
  return res.ok;
}
