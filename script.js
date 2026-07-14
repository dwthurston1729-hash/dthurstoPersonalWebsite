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
}

// Spreadsheet-style sortable tables
document.querySelectorAll(".fav-table").forEach((table) => {
  const headers = table.querySelectorAll("thead th");
  headers.forEach((th, index) => {
    th.classList.add("sortable");
    th.addEventListener("click", () => sortTable(table, index, th, headers));
  });
});

function sortTable(table, col, th, headers) {
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.rows);
  const ascending = th.dataset.sortDir !== "asc"; // toggle direction

  // Reset all header indicators, then mark the active one
  headers.forEach((h) => {
    delete h.dataset.sortDir;
    h.classList.remove("sorted-asc", "sorted-desc");
  });
  th.dataset.sortDir = ascending ? "asc" : "desc";
  th.classList.add(ascending ? "sorted-asc" : "sorted-desc");

  const cellText = (row) => (row.cells[col] ? row.cells[col].textContent.trim() : "");
  const asNumber = (s) => parseFloat(s.replace(/[^0-9.\-]/g, ""));
  const numeric = rows.every((r) => {
    const stripped = cellText(r).replace(/[^0-9.\-]/g, "");
    return stripped !== "" && !isNaN(stripped);
  });

  rows.sort((a, b) => {
    const x = cellText(a);
    const y = cellText(b);
    if (numeric) {
      return ascending ? asNumber(x) - asNumber(y) : asNumber(y) - asNumber(x);
    }
    return ascending ? x.localeCompare(y) : y.localeCompare(x);
  });

  rows.forEach((r) => tbody.appendChild(r));
}

// Editable "Memorized?" cells — saved in this browser via localStorage,
// keyed by the poem title so entries survive page updates.
document.querySelectorAll("td.col-memo").forEach((cell) => {
  const titleCell = cell.parentElement.querySelector(".col-title");
  const key = "memo:" + (titleCell ? titleCell.textContent.trim() : cell.cellIndex);
  const saved = localStorage.getItem(key);
  if (saved) cell.textContent = saved;
  cell.addEventListener("blur", () => {
    const val = cell.textContent.trim();
    if (val) localStorage.setItem(key, val);
    else localStorage.removeItem(key);
  });
});

// Collapsible favorite sub-sections — click a category heading to expand/collapse
document.querySelectorAll(".fav-group .sub-title").forEach((title) => {
  title.addEventListener("click", () => {
    title.parentElement.classList.toggle("collapsed");
  });
});
