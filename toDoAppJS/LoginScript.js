// DOM Elements
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const authSection = document.getElementById("auth-section");
const profileSection = document.getElementById("profile-section");
const profileUsername = document.getElementById("profile-username");
const profileData = document.getElementById("profile-data");
const saveDataButton = document.getElementById("save-data");
const logoutButton = document.getElementById("logout");

// Helper Functions
function saveUserData(username, password, data = "") {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  users[username] = { password, data };
  localStorage.setItem("users", JSON.stringify(users));
}

function getUserData(username) {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  return users[username];
}

function authenticateUser(username, password) {
  const user = getUserData(username);
  return user && user.password === password;
}

// Event Handlers
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  if (getUserData(username)) {
    alert("Username already exists!");
    return;
  }

  saveUserData(username, password);
  alert("Registration successful! You can now log in.");
  registerForm.reset();
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (authenticateUser(username, password)) {
    alert("Login successful!");
    loadProfile(username);
  } else {
    alert("Invalid username or password!");
  }

  loginForm.reset();
});

saveDataButton.addEventListener("click", () => {
  const username = profileUsername.textContent;
  const data = profileData.value;

  const user = getUserData(username);
  saveUserData(username, user.password, data);

  alert("Data saved!");
});

logoutButton.addEventListener("click", () => {
  authSection.style.display = "block";
  profileSection.style.display = "none";
  profileUsername.textContent = "";
  profileData.value = "";
});

// Profile Management
function loadProfile(username) {
  const user = getUserData(username);
  if (!user) return;

  profileUsername.textContent = username;
  profileData.value = user.data || "";

  authSection.style.display = "none";
  profileSection.style.display = "block";
  window.location.href = "index.html";
}
