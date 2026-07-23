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

const pagePanels = Array.from(document.querySelectorAll("[data-page-panel]"));
const pageLinks = Array.from(document.querySelectorAll("[data-page]"));

const smallCapsInput = document.querySelector("#inputText");
const smallCapsOutput = document.querySelector("#outputText");
const smallCapsCopyButton = document.querySelector("#copySmallCapsButton");
const smallCapsStatus = document.querySelector("#smallCapsStatus");

const hexInput = document.querySelector("#hexInput");
const colorPicker = document.querySelector("#colorPicker");
const previewSwatch = document.querySelector("#previewSwatch");
const previewHex = document.querySelector("#previewHex");
const hexStatus = document.querySelector("#hexStatus");

const outputTargets = {
  hexOutput: document.querySelector("#hexOutput"),
  rgbOutput: document.querySelector("#rgbOutput"),
  decimalOutput: document.querySelector("#decimalOutput"),
  mmoItemsOutput: document.querySelector("#mmoItemsOutput"),
  itemsAdderOutput: document.querySelector("#itemsAdderOutput")
};

function isPageName(value) {
  return pagePanels.some((panel) => panel.dataset.pagePanel === value);
}

function openPage(pageName, { scroll = true, updateHash = true } = {}) {
  pagePanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.pagePanel === pageName);
  });

  pageLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.page === pageName);
  });

  if (updateHash) {
    history.replaceState(null, "", `#${pageName}`);
  }

  if (scroll) {
    const panel = document.querySelector(`[data-page-panel="${pageName}"]`);
    panel?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function convertToSmallCaps(text) {
  return text.replace(/[A-Za-z]/g, (letter) => smallCapsMap[letter.toLowerCase()] || letter);
}

function setSmallCapsStatus(message) {
  if (smallCapsStatus) {
    smallCapsStatus.textContent = message;
  }
}

function updateSmallCaps() {
  if (!smallCapsInput || !smallCapsOutput) {
    return;
  }

  smallCapsOutput.value = convertToSmallCaps(smallCapsInput.value);
  setSmallCapsStatus("");
}

async function copyText(value, statusNode) {
  if (!value) {
    if (statusNode) {
      statusNode.textContent = "Chưa có nội dung để copy.";
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(value);
    if (statusNode) {
      statusNode.textContent = "Đã copy";
    }
  } catch {
    if (statusNode) {
      statusNode.textContent = "Đã copy";
    }
    const temp = document.createElement("textarea");
    temp.value = value;
    temp.style.position = "fixed";
    temp.style.opacity = "0";
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
  }
}

function normalizeHexInput(value) {
  const trimmed = value.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(trimmed)) {
    return null;
  }

  return trimmed.toUpperCase();
}

function formatLeatherOutputs(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);
  const decimal = parseInt(hex, 16);

  return {
    hexDisplay: `#${hex}`,
    rgbDisplay: `Red: ${red}\nGreen: ${green}\nBlue: ${blue}`,
    decimalDisplay: String(decimal),
    mmoItemsDisplay: `color:\n  red: ${red}\n  green: ${green}\n  blue: ${blue}`,
    itemsAdderDisplay: `color: "#${hex}"`,
    previewColor: `#${hex}`
  };
}

function setLeatherStatus(message, isError = false) {
  if (!hexStatus) {
    return;
  }

  hexStatus.textContent = message;
  hexStatus.classList.toggle("is-error", isError);
}

function setLeatherOutputsEmpty() {
  Object.values(outputTargets).forEach((node) => {
    if (node) {
      node.textContent = "—";
    }
  });

  if (previewSwatch) {
    previewSwatch.style.background = "linear-gradient(135deg, rgba(200, 255, 24, 0.08), rgba(112, 255, 218, 0.03)), rgba(255, 255, 255, 0.03)";
  }

  if (previewHex) {
    previewHex.textContent = "—";
  }
}

function updateLeatherConverter(source = "input") {
  if (!hexInput || !colorPicker) {
    return;
  }

  const normalized = normalizeHexInput(hexInput.value);
  if (!normalized) {
    setLeatherStatus("Mã HEX không hợp lệ. Dùng #FFAA00 hoặc FFAA00.", true);
    setLeatherOutputsEmpty();
    return;
  }

  const outputs = formatLeatherOutputs(normalized);
  if (source !== "picker") {
    colorPicker.value = outputs.previewColor;
  }

  if (previewSwatch) {
    previewSwatch.style.background = outputs.previewColor;
  }
  if (previewHex) {
    previewHex.textContent = outputs.hexDisplay;
  }

  if (outputTargets.hexOutput) {
    outputTargets.hexOutput.textContent = outputs.hexDisplay;
  }
  if (outputTargets.rgbOutput) {
    outputTargets.rgbOutput.textContent = outputs.rgbDisplay;
  }
  if (outputTargets.decimalOutput) {
    outputTargets.decimalOutput.textContent = outputs.decimalDisplay;
  }
  if (outputTargets.mmoItemsOutput) {
    outputTargets.mmoItemsOutput.textContent = outputs.mmoItemsDisplay;
  }
  if (outputTargets.itemsAdderOutput) {
    outputTargets.itemsAdderOutput.textContent = outputs.itemsAdderDisplay;
  }

  setLeatherStatus("HEX hợp lệ.");
}

function bindCopyButtons() {
  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", async () => {
      const targetId = button.dataset.copyTarget;
      const target = targetId ? document.querySelector(`#${targetId}`) : null;
      const value = target?.textContent || "";
      await copyText(value, hexStatus);
    });
  });
}

pageLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const pageName = link.dataset.page;
    if (isPageName(pageName)) {
      openPage(pageName);
    }
  });
});

smallCapsInput?.addEventListener("input", updateSmallCaps);
smallCapsCopyButton?.addEventListener("click", async () => {
  await copyText(smallCapsOutput?.value || "", smallCapsStatus);
});

hexInput?.addEventListener("input", () => updateLeatherConverter("input"));
colorPicker?.addEventListener("input", () => {
  if (!hexInput || !colorPicker) {
    return;
  }

  hexInput.value = colorPicker.value.toUpperCase();
  updateLeatherConverter("picker");
});

bindCopyButtons();

updateSmallCaps();
updateLeatherConverter();

const initialPage = location.hash.replace("#", "");
openPage(isPageName(initialPage) ? initialPage : "home", { scroll: false, updateHash: false });
