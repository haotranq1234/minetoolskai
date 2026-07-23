const smallCapsMap = {
  a: "ᴀ",
  b: "ʙ",
  c: "ᴄ",
  d: "ᴅ",
  e: "ᴇ",
  f: "ꜰ",
  g: "ɢ",
  h: "ʜ",
  i: "ɪ",
  j: "ᴊ",
  k: "ᴋ",
  l: "ʟ",
  m: "ᴍ",
  n: "ɴ",
  o: "ᴏ",
  p: "ᴘ",
  q: "ǫ",
  r: "ʀ",
  s: "ꜱ",
  t: "ᴛ",
  u: "ᴜ",
  v: "ᴠ",
  w: "ᴡ",
  x: "x",
  y: "ʏ",
  z: "ᴢ"
};

const pages = Array.from(document.querySelectorAll("[data-page-panel]"));
const navLinks = Array.from(document.querySelectorAll("[data-page]"));
const inputText = document.querySelector("#inputText");
const outputText = document.querySelector("#outputText");
const copyButton = document.querySelector("#copyButton");
const statusText = document.querySelector("#status");

function convertToSmallCaps(text) {
  return text.replace(/[A-Za-z]/g, (letter) => smallCapsMap[letter.toLowerCase()] || letter);
}

function updateOutput() {
  if (!inputText || !outputText) {
    return;
  }

  outputText.value = convertToSmallCaps(inputText.value);
  if (statusText) {
    statusText.textContent = "";
  }
}

async function copyOutput() {
  const value = outputText?.value || "";

  if (!value) {
    if (statusText) {
      statusText.textContent = "Chưa có nội dung để copy.";
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(value);
    if (statusText) {
      statusText.textContent = "Đã copy vào clipboard.";
    }
  } catch {
    outputText.focus();
    outputText.select();
    document.execCommand("copy");
    if (statusText) {
      statusText.textContent = "Đã copy vào clipboard.";
    }
  }
}

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

inputText?.addEventListener("input", updateOutput);
copyButton?.addEventListener("click", copyOutput);

updateOutput();
setActivePage("home");
