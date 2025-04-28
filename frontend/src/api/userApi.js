/** @format */

export async function loginUser(username, password) {
  const res = await fetch("http://localhost:8000/api/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    // credentials: "include", // VERY IMPORTANT! 🔥 Send cookies
  });
  const data = await res.json();
  console.log(data);

  if (res.ok) {
    alert("Login successful!");
    // Redirect to dashboard or refresh page
  } else {
    alert(data.error || "Login failed.");
  }
}

export async function registerUser(username, password) {
  const res = await fetch("http://localhost:8000/api/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  console.log(data);

  if (res.ok) {
    alert("Registered successfully! Now you can login.");
  } else {
    alert(data.error || "Registration failed.");
  }
}

export async function logoutUser() {
  const res = await fetch("http://localhost:8000/api/logout/", {
    method: "POST",
    credentials: "include",
  });

  if (res.ok) {
    alert("Logged out successfully!");
  } else {
    alert("Failed to logout.");
  }
}
