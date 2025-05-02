/** @format */
import API from "./axios"; // Make sure path is correct

export async function fetchWatches(queryString = "") {
  try {
    const response = await API.get(`/watches/?${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching watches:", error);
    return { results: [], count: 0 };
  }
}

export async function fetchFilteredWatches(filters = {}) {
  try {
    const query = new URLSearchParams(filters).toString();
    const response = await API.get(`/watches/?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error filtering watches:", error);
    return { results: [], count: 0 };
  }
}

export async function fetchSortedWatches(sortKey = "") {
  try {
    const query = new URLSearchParams({ sort_by: sortKey }).toString();
    const response = await API.get(`/watches/?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error sorting watches:", error);
    return { results: [], count: 0 };
  }
}

export async function createWatch(watchData) {
  try {
    const response = await API.post("/watches/create/", watchData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Watch successfully created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to create watch:", error.response?.data || error);
    throw error;
  }
}

export async function updateWatch(id, watchData) {
  try {
    const response = await API.patch(`/watches/${id}/update/`, watchData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Update failed:", error.response?.data || error);
    throw new Error("Failed to update watch");
  }
}

export async function deleteWatch(id) {
  try {
    const response = await API.delete(`/watches/${id}/delete/`);
    return response.status === 204;
  } catch (error) {
    console.error("Delete failed:", error);
    return false;
  }
}

export async function fetchMyWatches() {
  try {
    const res = await API.get("/watches/my-watches/");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch user's watches:", error);
    return [];
  }
}
