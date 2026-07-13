// Dark-mode toggle with persistence
const toggle = document.getElementById("theme-toggle");
const root = document.documentElement;

// Respect saved choice, else system preference
const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initial = saved || (prefersDark ? "dark" : "light");
setTheme(initial);

toggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(next);
  localStorage.setItem("theme", next);
});

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  toggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

// Auto-update footer year
document.getElementById("year").textContent = new Date().getFullYear();
