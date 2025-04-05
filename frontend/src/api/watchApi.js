/** @format */

const BASE_URL = "http://127.0.0.1:8000/api/watch/"; // Update if your API is under another path

export async function fetchWatches() {
  const res = await fetch("http://localhost:8000/api/watches/");
  const data = await res.json();

  return data;
}

export async function fetchFilteredWatches(filters = {}) {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`http://localhost:8000/api/watches/?${query}`);
  const data = await res.json();
  return data;
}

export async function fetchSortedWatches(sortKey = "") {
  const query = new URLSearchParams({ sort_by: sortKey }).toString();
  const res = await fetch(`http://localhost:8000/api/watches/?${query}`);
  const data = await res.json();
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

export async function updateWatch(id, watchData) {
  const response = await fetch(
    `http://localhost:8000/api/watches/${id}/update/`,
    {
      method: "PATCH",

      body: watchData,
    }
  );
  if (!response.ok) {
    const error = await response.text();
    console.error("Update failed:", error);
    throw new Error("Failed to update watch");
  }

  return await response.json();
}

export async function deleteWatch(id) {
  const res = await fetch(`http://localhost:8000/api/watches/${id}/delete/`, {
    method: "DELETE",
  });
  return res.ok;
}
