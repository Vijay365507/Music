// ---------- Theme Toggle ----------
function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const btn = document.getElementById("themeToggle");
  if (btn) btn.textContent = theme === "dark" ? "☀ Light" : "🌙 Dark";
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const current = document.body.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }
}

// ---------- Navbar login state ----------
function updateNavForUser() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const profileLink = document.getElementById("profileNavLink");
  if (profileLink) {
    profileLink.textContent = user ? user.name : "Login";
    profileLink.href = user ? "profile.html" : "login.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  updateNavForUser();
});