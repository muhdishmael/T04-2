// Highlight the current page in the nav and show a status message.
const page = location.pathname.split("/").pop();

document.querySelectorAll("nav a").forEach(function (link) {
  if (link.getAttribute("href") === page) {
    link.classList.add("active");
  }
});

document.getElementById("status").textContent =
  "You are on: " + document.title.split(" - ")[0];