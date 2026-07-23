const pages = Array.from(document.querySelectorAll("[data-page-panel]"));
const navLinks = Array.from(document.querySelectorAll("[data-page]"));

function setActivePage(pageName) {
  pages.forEach((page) => {
    page.classList.toggle("is-active", page.dataset.pagePanel === pageName);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.page === pageName);
  });
}

function scrollToPage(pageName) {
  const page = document.querySelector(`[data-page-panel="${pageName}"]`);
  if (page) {
    page.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const pageName = link.dataset.page;
    setActivePage(pageName);
    scrollToPage(pageName);
  });
});

setActivePage("home");
