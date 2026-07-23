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

const yamlInput = document.querySelector("#yamlInput");
const yamlFileInput = document.querySelector("#yamlFileInput");
const yamlSourcePreview = document.querySelector("#yamlSourcePreview");
const yamlOutputPreview = document.querySelector("#yamlOutputPreview");
const yamlStatus = document.querySelector("#yamlStatus");
const translateButton = document.querySelector("#translateButton");
const copyYamlButton = document.querySelector("#copyYamlButton");
const downloadYamlButton = document.querySelector("#downloadYamlButton");

const outputTargets = {
  hexOutput: document.querySelector("#hexOutput"),
  rgbOutput: document.querySelector("#rgbOutput"),
  decimalOutput: document.querySelector("#decimalOutput"),
  mmoItemsOutput: document.querySelector("#mmoItemsOutput"),
  itemsAdderOutput: document.querySelector("#itemsAdderOutput")
};

const protectedIdentifiers = new Set([
  "MiniMessage",
  "MMOItems",
  "ItemsAdder",
  "PlaceholderAPI",
  "MythicMobs",
  "Placeholder",
  "Placeholderapi"
]);

const glossaryPhrases = [
  ["attack speed", "tốc độ đánh"],
  ["attack damage", "sát thương tấn công"],
  ["critical strike", "đòn chí mạng"],
  ["critical chance", "tỉ lệ chí mạng"],
  ["increase damage", "tăng sát thương"],
  ["decrease damage", "giảm sát thương"],
  ["deal damage", "gây sát thương"],
  ["take damage", "nhận sát thương"],
  ["drop chance", "tỉ lệ rơi"],
  ["max health", "máu tối đa"],
  ["health points", "điểm máu"],
  ["movement speed", "tốc độ di chuyển"],
  ["damage resistance", "kháng sát thương"],
  ["right click", "nhấp chuột phải"],
  ["left click", "nhấp chuột trái"],
  ["while holding", "khi cầm"],
  ["when equipped", "khi trang bị"],
  ["on hit", "khi đánh trúng"],
  ["on kill", "khi tiêu diệt"],
  ["set bonus", "hiệu ứng bộ"],
  ["item lore", "mô tả vật phẩm"],
  ["legendary sword", "kiếm huyền thoại"],
  ["legendary armor", "giáp huyền thoại"],
  ["legendary", "huyền thoại"],
  ["epic", "sử thi"],
  ["rare", "hiếm"],
  ["uncommon", "khá hiếm"],
  ["common", "thường"],
  ["increase", "tăng"],
  ["decrease", "giảm"],
  ["damage", "sát thương"],
  ["health", "máu"],
  ["speed", "tốc độ"],
  ["strength", "sức mạnh"],
  ["defense", "phòng thủ"],
  ["attack", "tấn công"],
  ["armor", "giáp"],
  ["helmet", "mũ"],
  ["chestplate", "áo giáp"],
  ["leggings", "quần giáp"],
  ["boots", "ủng"],
  ["sword", "kiếm"],
  ["bow", "cung"],
  ["axe", "rìu"],
  ["shield", "khiên"],
  ["poison", "độc"],
  ["fire", "lửa"],
  ["ice", "băng"],
  ["lightning", "sét"],
  ["cooldown", "thời gian hồi"],
  ["duration", "thời lượng"],
  ["reward", "phần thưởng"],
  ["bonus", "thưởng"],
  ["chance", "tỉ lệ"],
  ["message", "thông báo"],
  ["welcome", "chào mừng"],
  ["success", "thành công"],
  ["failure", "thất bại"],
  ["error", "lỗi"],
  ["enabled", "bật"],
  ["disabled", "tắt"],
  ["description", "mô tả"],
  ["title", "tiêu đề"],
  ["level", "cấp"],
  ["experience", "kinh nghiệm"],
  ["requirement", "yêu cầu"],
  ["requirements", "yêu cầu"],
  ["unlock", "mở khóa"],
  ["unlocks", "mở khóa"],
  ["chance to", "có tỉ lệ"],
  ["increase by", "tăng thêm"],
  ["decrease by", "giảm đi"]
];

const glossaryWords = new Map([
  ["legendary", "huyền thoại"],
  ["epic", "sử thi"],
  ["rare", "hiếm"],
  ["common", "thường"],
  ["uncommon", "khá hiếm"],
  ["increase", "tăng"],
  ["decrease", "giảm"],
  ["damage", "sát thương"],
  ["health", "máu"],
  ["speed", "tốc độ"],
  ["strength", "sức mạnh"],
  ["defense", "phòng thủ"],
  ["attack", "tấn công"],
  ["armor", "giáp"],
  ["helmet", "mũ"],
  ["chestplate", "áo giáp"],
  ["leggings", "quần giáp"],
  ["boots", "ủng"],
  ["sword", "kiếm"],
  ["bow", "cung"],
  ["axe", "rìu"],
  ["shield", "khiên"],
  ["poison", "độc"],
  ["fire", "lửa"],
  ["ice", "băng"],
  ["lightning", "sét"],
  ["cooldown", "thời gian hồi"],
  ["duration", "thời lượng"],
  ["reward", "phần thưởng"],
  ["bonus", "thưởng"],
  ["chance", "tỉ lệ"],
  ["message", "thông báo"],
  ["welcome", "chào mừng"],
  ["success", "thành công"],
  ["failure", "thất bại"],
  ["error", "lỗi"],
  ["enabled", "bật"],
  ["disabled", "tắt"],
  ["description", "mô tả"],
  ["title", "tiêu đề"],
  ["level", "cấp"],
  ["experience", "kinh nghiệm"],
  ["requirement", "yêu cầu"],
  ["requirements", "yêu cầu"],
  ["unlock", "mở khóa"],
  ["unlocks", "mở khóa"],
  ["amount", "số lượng"],
  ["value", "giá trị"],
  ["item", "vật phẩm"],
  ["items", "vật phẩm"],
  ["player", "người chơi"],
  ["players", "người chơi"],
  ["weapon", "vũ khí"],
  ["armor", "giáp"],
  ["set", "bộ"],
  ["bonus", "thưởng"],
  ["skill", "kỹ năng"],
  ["skills", "kỹ năng"],
  ["ability", "kỹ năng"],
  ["abilities", "kỹ năng"],
  ["chance", "tỉ lệ"],
  ["right", "phải"],
  ["left", "trái"],
  ["hit", "đánh trúng"],
  ["kill", "tiêu diệt"],
  ["equip", "trang bị"],
  ["equiped", "trang bị"],
  ["holding", "cầm"],
  ["healths", "máu"],
  ["speed", "tốc độ"]
]);

const yamlWordPattern = /([A-Za-z][A-Za-z'-]*)/g;

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

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function highlightYaml(codeElement, text) {
  if (!codeElement) {
    return;
  }

  codeElement.textContent = text || "";
  if (window.hljs?.highlightElement) {
    window.hljs.highlightElement(codeElement);
  }
}

function renderSourcePreview() {
  if (!yamlInput || !yamlSourcePreview) {
    return;
  }

  highlightYaml(yamlSourcePreview, yamlInput.value);
}

function splitInlineComment(line) {
  let inSingle = false;
  let inDouble = false;
  let escapeNext = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (inDouble && char === "\\") {
      escapeNext = true;
      continue;
    }

    if (char === "'" && !inDouble) {
      inSingle = !inSingle;
      continue;
    }

    if (char === '"' && !inSingle) {
      inDouble = !inDouble;
      continue;
    }

    if (char === "#" && !inSingle && !inDouble) {
      const before = index === 0 ? " " : line[index - 1];
      if (/\s/.test(before)) {
        return {
          code: line.slice(0, index).replace(/\s+$/, ""),
          comment: line.slice(index)
        };
      }
    }
  }

  return { code: line, comment: "" };
}

function findTopLevelColon(line) {
  let inSingle = false;
  let inDouble = false;
  let escapeNext = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (inDouble && char === "\\") {
      escapeNext = true;
      continue;
    }

    if (char === "'" && !inDouble) {
      inSingle = !inSingle;
      continue;
    }

    if (char === '"' && !inSingle) {
      inDouble = !inDouble;
      continue;
    }

    if (char === ":" && !inSingle && !inDouble) {
      return index;
    }
  }

  return -1;
}

function escapeForRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function preserveCaseReplacement(sourceWord, replacement) {
  if (!replacement) {
    return replacement;
  }

  if (sourceWord === sourceWord.toUpperCase()) {
    return replacement.toUpperCase();
  }

  if (sourceWord[0] === sourceWord[0].toUpperCase()) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  }

  return replacement;
}

function preserveCaseFromPhrase(sourcePhrase, replacement) {
  if (!replacement) {
    return replacement;
  }

  const firstChar = sourcePhrase.trim().charAt(0);
  if (firstChar && firstChar === firstChar.toUpperCase()) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  }

  return replacement;
}

function protectTokens(text) {
  const tokens = [];
  const pattern = /&#[0-9A-Fa-f]{6}|&[0-9a-fk-orA-FK-OR]|<[^>\n]+>|%[^%\s]+%|\$\{[^}]+\}|\{@[^}]+\}/g;

  const protectedText = text.replace(pattern, (match) => {
    const tokenId = `__${tokens.length}__`;
    tokens.push(match);
    return tokenId;
  });

  return { protectedText, tokens };
}

function restoreTokens(text, tokens) {
  return text.replace(/__(\d+)__/g, (_, index) => tokens[Number(index)] ?? "");
}

function translateWord(word) {
  const mapped = glossaryWords.get(word.toLowerCase());
  return mapped ? preserveCaseReplacement(word, mapped) : word;
}

function translateTextSegment(text) {
  if (!text) {
    return text;
  }

  const preserved = protectTokens(text);
  let translated = preserved.protectedText;

  glossaryPhrases
    .slice()
    .sort((a, b) => b[0].length - a[0].length)
    .forEach(([source, target]) => {
      const regex = new RegExp(`(^|[^A-Za-z0-9_])${escapeForRegExp(source)}(?=$|[^A-Za-z0-9_])`, "gi");
      translated = translated.replace(regex, (match, prefix) => {
        const matchedPhrase = match.slice(prefix.length);
        return `${prefix}${preserveCaseFromPhrase(matchedPhrase, target)}`;
      });
    });

  translated = translated.replace(yamlWordPattern, (word) => translateWord(word));
  return restoreTokens(translated, preserved.tokens);
}

function isSimpleConstant(value) {
  if (/^\d+(\.\d+)?$/.test(value)) {
    return true;
  }

  if (/^(true|false|null|~)$/i.test(value)) {
    return true;
  }

  if (/^[A-Z0-9_:-]+$/.test(value) && /[A-Z]/.test(value)) {
    return true;
  }

  return protectedIdentifiers.has(value);
}

function quoteValue(value, quoteType) {
  if (quoteType === "'") {
    return `'${value.replaceAll("'", "''")}'`;
  }

  const escaped = value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
  return `"${escaped}"`;
}

function translateScalarValue(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return value;
  }

  if (trimmed === "|" || trimmed === ">" || /^[|>][-+0-9]*$/.test(trimmed)) {
    return value;
  }

  const singleQuoted = trimmed.startsWith("'") && trimmed.endsWith("'");
  const doubleQuoted = trimmed.startsWith('"') && trimmed.endsWith('"');

  if (singleQuoted || doubleQuoted) {
    const quoteType = singleQuoted ? "'" : '"';
    const inner = trimmed.slice(1, -1);
    const translatedInner = translateTextSegment(inner);
    return quoteValue(translatedInner, quoteType);
  }

  if (isSimpleConstant(trimmed)) {
    return trimmed;
  }

  const translated = translateTextSegment(trimmed);
  if (/[:#\n\r]/.test(translated) || /^\s/.test(translated) || /\s$/.test(translated)) {
    return quoteValue(translated, '"');
  }

  return translated;
}

function translateYamlCodeSegment(segment) {
  const listMatch = segment.match(/^(\s*-\s+)(.*)$/);
  if (listMatch) {
    return `${listMatch[1]}${translateYamlCodeSegment(listMatch[2])}`;
  }

  const colonIndex = findTopLevelColon(segment);
  if (colonIndex === -1) {
    return translateScalarValue(segment);
  }

  const before = segment.slice(0, colonIndex);
  const after = segment.slice(colonIndex + 1);
  const trimmedAfter = after.trim();

  if (!trimmedAfter) {
    return segment;
  }

  if (trimmedAfter === "|" || trimmedAfter === ">" || /^[|>][-+0-9]*$/.test(trimmedAfter)) {
    return segment;
  }

  const translatedAfter = translateScalarValue(trimmedAfter);
  const spacing = after.slice(0, after.length - after.trimStart().length);
  return `${before}:${spacing}${translatedAfter}`;
}

function translateYamlLine(line, blockState) {
  if (blockState.active) {
    const indent = line.match(/^\s*/)?.[0].length ?? 0;

    if (!line.trim()) {
      return line;
    }

    if (indent > blockState.indent) {
      return `${line.slice(0, indent)}${translateTextSegment(line.slice(indent))}`;
    }

    blockState.active = false;
  }

  if (!line.trim() || line.trimStart().startsWith("#")) {
    return line;
  }

  const { code, comment } = splitInlineComment(line);
  const translatedCode = translateYamlCodeSegment(code);
  const trimmedCode = code.trim();

  if (trimmedCode) {
    const colonIndex = findTopLevelColon(code);
    if (colonIndex !== -1) {
      const after = code.slice(colonIndex + 1).trim();
      if (after === "|" || after === ">" || /^[|>][-+0-9]*$/.test(after)) {
        blockState.active = true;
        blockState.indent = code.match(/^\s*/)?.[0].length ?? 0;
      }
    }
  }

  return `${translatedCode}${comment}`;
}

function validateYamlSyntax(yamlText) {
  if (!window.jsyaml?.load) {
    return { valid: true };
  }

  try {
    window.jsyaml.load(yamlText);
    return { valid: true };
  } catch (error) {
    return { valid: false, error };
  }
}

function translateYamlDocument(sourceText) {
  const validation = validateYamlSyntax(sourceText);
  if (!validation.valid) {
    const error = validation.error;
    const lineInfo = error?.mark?.line != null ? ` Dòng ${error.mark.line + 1}.` : "";
    return {
      ok: false,
      output: "",
      message: `YAML không hợp lệ.${lineInfo} ${error?.message || ""}`.trim()
    };
  }

  const lines = sourceText.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const blockState = { active: false, indent: 0 };
  const translated = lines.map((line) => translateYamlLine(line, blockState)).join("\n");

  return {
    ok: true,
    output: translated,
    message: "Đã dịch xong."
  };
}

function updateYamlSourcePreview() {
  if (!yamlInput || !yamlSourcePreview) {
    return;
  }

  highlightYaml(yamlSourcePreview, yamlInput.value);
}

function setYamlStatus(message, isError = false) {
  if (!yamlStatus) {
    return;
  }

  yamlStatus.textContent = message;
  yamlStatus.classList.toggle("is-error", isError);
}

let latestYamlOutput = "";

function renderYamlOutput(text) {
  latestYamlOutput = text;
  if (yamlOutputPreview) {
    highlightYaml(yamlOutputPreview, text);
  }
}

function runYamlTranslation() {
  if (!yamlInput) {
    return;
  }

  const result = translateYamlDocument(yamlInput.value);
  if (!result.ok) {
    renderYamlOutput("");
    setYamlStatus(result.message, true);
    return;
  }

  renderYamlOutput(result.output);
  setYamlStatus(result.message, false);
}

function downloadYaml() {
  if (!latestYamlOutput) {
    setYamlStatus("Chưa có nội dung để download.", true);
    return;
  }

  const blob = new Blob([latestYamlOutput], { type: "text/yaml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "translated.yaml";
  anchor.click();
  URL.revokeObjectURL(url);
  setYamlStatus("Đã tải file.");
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

yamlInput?.addEventListener("input", updateYamlSourcePreview);
yamlFileInput?.addEventListener("change", () => {
  const file = yamlFileInput.files?.[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    if (yamlInput) {
      yamlInput.value = String(reader.result || "");
      updateYamlSourcePreview();
      setYamlStatus(`Đã tải ${file.name}. Bấm Translate để dịch.`);
    }
  };
  reader.readAsText(file, "utf-8");
});

translateButton?.addEventListener("click", runYamlTranslation);
copyYamlButton?.addEventListener("click", async () => {
  await copyText(latestYamlOutput || "", yamlStatus);
});
downloadYamlButton?.addEventListener("click", downloadYaml);

updateSmallCaps();
updateLeatherConverter();
updateYamlSourcePreview();
runYamlTranslation();

const initialPage = location.hash.replace("#", "");
openPage(isPageName(initialPage) ? initialPage : "home", { scroll: false, updateHash: false });

// DeluxeMenus GUI Designer
const dmMenuTitleInput = document.querySelector("#dmMenuTitle");
const dmBorderMaterialSelect = document.querySelector("#dmBorderMaterial");
const dmFillBorderButton = document.querySelector("#dmFillBorder");
const dmFillSelectionButton = document.querySelector("#dmFillSelection");
const dmPasteClipboardButton = document.querySelector("#dmPasteClipboard");
const dmUndoButton = document.querySelector("#dmUndo");
const dmRedoButton = document.querySelector("#dmRedo");
const dmExportCopyButton = document.querySelector("#dmExportCopy");
const dmExportDownloadButton = document.querySelector("#dmExportDownload");
const dmImportInput = document.querySelector("#dmImport");
const dmSizeButtons = Array.from(document.querySelectorAll("[data-size]"));
const dmGrid = document.querySelector("#dmGrid");
const dmStageTitle = document.querySelector("#dmStageTitle");
const dmSearchInput = document.querySelector("#dmSearch");
const dmSearchResults = document.querySelector("#dmSearchResults");
const dmInspectorTitle = document.querySelector("#dmInspectorTitle");
const dmSelectionCount = document.querySelector("#dmSelectionCount");
const dmMaterialInput = document.querySelector("#dmMaterial");
const dmNameInput = document.querySelector("#dmName");
const dmLoreInput = document.querySelector("#dmLore");
const dmCustomModelDataInput = document.querySelector("#dmCustomModelData");
const dmAmountInput = document.querySelector("#dmAmount");
const dmGlowInput = document.querySelector("#dmGlow");
const dmSkullUrlInput = document.querySelector("#dmSkullUrl");
const dmItemsAdderIdInput = document.querySelector("#dmItemsAdderId");
const dmMmoItemsIdInput = document.querySelector("#dmMmoItemsId");
const dmPermissionInput = document.querySelector("#dmPermission");
const dmCommandInput = document.querySelector("#dmCommand");
const dmSoundInput = document.querySelector("#dmSound");
const dmClickTypeInput = document.querySelector("#dmClickType");
const dmCloseMenuInput = document.querySelector("#dmCloseMenu");
const dmOpenMenuInput = document.querySelector("#dmOpenMenu");
const dmPlaceholderInput = document.querySelector("#dmPlaceholder");
const dmRequirementsInput = document.querySelector("#dmRequirements");
const dmItemPreview = document.querySelector("#dmItemPreview");
const dmYamlPreview = document.querySelector("#dmYamlPreview");
const dmStatus = document.querySelector("#dmStatus");
const dmMaterialSuggestions = document.querySelector("#dmMaterialSuggestions");

const DM_STORAGE_KEY = "minetoolskai-deluxemenus-designer-v1";
const DM_SLOT_SIZE = 9;
const DM_SIZES = [9, 18, 27, 36, 45, 54];
const DM_DEFAULT_TITLE = "&8&lExample Menu";
const DM_DEFAULT_BORDER = "GRAY_STAINED_GLASS_PANE";

const DM_LIBRARY = [
  { material: "STONE", label: "Stone", icon: "⬛", aliases: ["rock", "stone"] },
  { material: "DIAMOND_SWORD", label: "Diamond Sword", icon: "⚔", aliases: ["diamond", "sword"] },
  { material: "DIAMOND_PICKAXE", label: "Diamond Pickaxe", icon: "⛏", aliases: ["diamond", "pickaxe"] },
  { material: "DIAMOND_HELMET", label: "Diamond Helmet", icon: "⛨", aliases: ["helmet"] },
  { material: "DIAMOND_CHESTPLATE", label: "Diamond Chestplate", icon: "🛡", aliases: ["chestplate"] },
  { material: "DIAMOND_LEGGINGS", label: "Diamond Leggings", icon: "▤", aliases: ["leggings"] },
  { material: "DIAMOND_BOOTS", label: "Diamond Boots", icon: "👢", aliases: ["boots"] },
  { material: "PLAYER_HEAD", label: "Player Head", icon: "◉", aliases: ["head", "skull"] },
  { material: "GRAY_STAINED_GLASS_PANE", label: "Gray Glass Pane", icon: "▣", aliases: ["glass", "border"] },
  { material: "BLACK_STAINED_GLASS_PANE", label: "Black Glass Pane", icon: "▣", aliases: ["glass", "border"] },
  { material: "RED_STAINED_GLASS_PANE", label: "Red Glass Pane", icon: "▣", aliases: ["glass", "border"] },
  { material: "BLUE_STAINED_GLASS_PANE", label: "Blue Glass Pane", icon: "▣", aliases: ["glass", "border"] },
  { material: "GREEN_STAINED_GLASS_PANE", label: "Green Glass Pane", icon: "▣", aliases: ["glass", "border"] },
  { material: "WHITE_STAINED_GLASS_PANE", label: "White Glass Pane", icon: "▣", aliases: ["glass", "border"] },
  { material: "GOLD_INGOT", label: "Gold Ingot", icon: "⬟", aliases: ["gold"] },
  { material: "IRON_INGOT", label: "Iron Ingot", icon: "⬢", aliases: ["iron"] },
  { material: "EMERALD", label: "Emerald", icon: "◆", aliases: ["gem"] },
  { material: "NETHER_STAR", label: "Nether Star", icon: "✦", aliases: ["star"] },
  { material: "CHEST", label: "Chest", icon: "▣", aliases: ["container"] },
  { material: "ENDER_CHEST", label: "Ender Chest", icon: "✧", aliases: ["ender"] },
  { material: "BOOK", label: "Book", icon: "📘", aliases: ["lore"] },
  { material: "PAPER", label: "Paper", icon: "▭", aliases: ["document"] },
  { material: "BARRIER", label: "Barrier", icon: "⛔", aliases: ["block"] },
  { material: "ANVIL", label: "Anvil", icon: "⚒", aliases: ["forge"] },
  { material: "BOW", label: "Bow", icon: "➶", aliases: ["bow"] },
  { material: "SHIELD", label: "Shield", icon: "🛡", aliases: ["shield"] }
];

const DM_COLOR_MAP = {
  "0": "#000000",
  "1": "#0000AA",
  "2": "#00AA00",
  "3": "#00AAAA",
  "4": "#AA0000",
  "5": "#AA00AA",
  "6": "#FFAA00",
  "7": "#AAAAAA",
  "8": "#555555",
  "9": "#5555FF",
  a: "#55FF55",
  b: "#55FFFF",
  c: "#FF5555",
  d: "#FF55FF",
  e: "#FFFF55",
  f: "#FFFFFF"
};

function createEmptyDMItem(slot) {
  return {
    slot,
    material: "",
    name: "",
    lore: "",
    customModelData: "",
    amount: 1,
    glow: false,
    skullUrl: "",
    itemsAdderId: "",
    mmoItemsId: "",
    permission: "",
    command: "",
    sound: "",
    clickType: "LEFT",
    closeMenu: false,
    openMenu: "",
    placeholder: "",
    requirements: ""
  };
}

function createDMState(size = 27) {
  return {
    menuTitle: DM_DEFAULT_TITLE,
    size,
    borderMaterial: DM_DEFAULT_BORDER,
    slots: Array.from({ length: size }, (_, slot) => createEmptyDMItem(slot)),
    selectedSlots: [0],
    clipboard: null
  };
}

function cloneDMItem(item) {
  return JSON.parse(JSON.stringify(item));
}

function cloneDMState(state) {
  return JSON.parse(JSON.stringify(state));
}

function loadDMState() {
  try {
    const raw = localStorage.getItem(DM_STORAGE_KEY);
    if (!raw) {
      return createDMState();
    }

    const parsed = JSON.parse(raw);
    const size = DM_SIZES.includes(parsed.size) ? parsed.size : 27;
    const state = createDMState(size);
    state.menuTitle = typeof parsed.menuTitle === "string" ? parsed.menuTitle : DM_DEFAULT_TITLE;
    state.borderMaterial = typeof parsed.borderMaterial === "string" ? parsed.borderMaterial : DM_DEFAULT_BORDER;
    state.clipboard = parsed.clipboard ? cloneDMItem(parsed.clipboard) : null;

    if (Array.isArray(parsed.slots)) {
      parsed.slots.forEach((item) => {
        const slot = Number(item.slot);
        if (Number.isInteger(slot) && slot >= 0 && slot < size) {
          state.slots[slot] = {
            ...createEmptyDMItem(slot),
            ...item,
            slot
          };
        }
      });
    }

    if (Array.isArray(parsed.selectedSlots) && parsed.selectedSlots.length) {
      state.selectedSlots = parsed.selectedSlots.filter((slot) => Number.isInteger(slot) && slot >= 0 && slot < size);
    }

    return state;
  } catch {
    return createDMState();
  }
}

let dmState = loadDMState();
let dmHistory = [cloneDMState(dmState)];
let dmHistoryIndex = 0;
let dmClipboard = dmState.clipboard ? cloneDMItem(dmState.clipboard) : null;
let dmDragAnchor = null;
let dmDragPreview = [];
let dmIsRestoringHistory = false;
let dmSaveTimer = null;

function saveDMState() {
  const payload = {
    menuTitle: dmState.menuTitle,
    size: dmState.size,
    borderMaterial: dmState.borderMaterial,
    slots: dmState.slots,
    selectedSlots: dmState.selectedSlots,
    clipboard: dmClipboard
  };
  localStorage.setItem(DM_STORAGE_KEY, JSON.stringify(payload));
}

function scheduleDMSave() {
  clearTimeout(dmSaveTimer);
  dmSaveTimer = setTimeout(saveDMState, 120);
}

function pushDMHistory() {
  if (dmIsRestoringHistory) {
    return;
  }

  const snapshot = JSON.stringify({
    menuTitle: dmState.menuTitle,
    size: dmState.size,
    borderMaterial: dmState.borderMaterial,
    slots: dmState.slots,
    selectedSlots: dmState.selectedSlots,
    clipboard: dmClipboard
  });

  const current = JSON.stringify(dmHistory[dmHistoryIndex]);
  if (snapshot === current) {
    return;
  }

  dmHistory = dmHistory.slice(0, dmHistoryIndex + 1);
  dmHistory.push(JSON.parse(snapshot));
  if (dmHistory.length > 80) {
    dmHistory.shift();
  } else {
    dmHistoryIndex += 1;
  }
  if (dmHistory.length > 80) {
    dmHistoryIndex = dmHistory.length - 1;
  }
  scheduleDMSave();
}

function restoreDMHistory(index) {
  if (index < 0 || index >= dmHistory.length) {
    return;
  }

  dmIsRestoringHistory = true;
  const snapshot = cloneDMState(dmHistory[index]);
  dmState = {
    ...createDMState(snapshot.size),
    ...snapshot,
    slots: snapshot.slots.map((item, slot) => ({ ...createEmptyDMItem(slot), ...item, slot })),
    selectedSlots: snapshot.selectedSlots || [0]
  };
  dmClipboard = snapshot.clipboard ? cloneDMItem(snapshot.clipboard) : null;
  dmHistoryIndex = index;
  dmIsRestoringHistory = false;
  renderDeluxeMenusDesigner();
  scheduleDMSave();
}

function getDMActiveSlots() {
  const unique = Array.from(new Set((dmState.selectedSlots || [0]).filter((slot) => slot >= 0 && slot < dmState.size)));
  return unique.length ? unique : [0];
}

function setDMSelection(indices, { preserveAnchor = false } = {}) {
  const unique = Array.from(new Set(indices.filter((slot) => slot >= 0 && slot < dmState.size))).sort((a, b) => a - b);
  dmState.selectedSlots = unique.length ? unique : [0];
  if (!preserveAnchor) {
    dmDragAnchor = dmState.selectedSlots[0];
  }
  syncDMInspectorFromSelection();
  renderDeluxeMenusDesigner({ keepPreview: true });
  scheduleDMSave();
}

function updateDMSize(size) {
  const nextSize = DM_SIZES.includes(size) ? size : 27;
  const nextSlots = Array.from({ length: nextSize }, (_, slot) => {
    const existing = dmState.slots[slot];
    return existing ? { ...createEmptyDMItem(slot), ...existing, slot } : createEmptyDMItem(slot);
  });
  dmState.size = nextSize;
  dmState.slots = nextSlots;
  dmState.selectedSlots = [Math.min(dmState.selectedSlots[0] || 0, nextSize - 1)];
  syncDMSizeButtons();
  syncDMInspectorFromSelection();
  renderDeluxeMenusDesigner();
  pushDMHistory();
  scheduleDMSave();
}

function syncDMSizeButtons() {
  dmSizeButtons.forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.size) === dmState.size);
  });
}

function getMaterialMeta(material) {
  const normalized = String(material || "").toUpperCase();
  return DM_LIBRARY.find((entry) => entry.material === normalized) || {
    material: normalized || "AIR",
    label: normalized || "Empty",
    icon: normalized ? "■" : "+",
    aliases: []
  };
}

function getDMItemKind(item) {
  const material = String(item?.material || "").toUpperCase();
  if (item?.skullUrl || material === "PLAYER_HEAD" || material.endsWith("_HEAD") || material.endsWith("_SKULL")) {
    return "head";
  }
  if (item?.itemsAdderId) {
    return "itemsadder";
  }
  if (item?.mmoItemsId) {
    return "mmoitems";
  }
  if (/STAINED_GLASS|GLASS_PANE|GLASS/i.test(material)) {
    return "glass";
  }
  if (/(SWORD|AXE|PICKAXE|HOE|SHOVEL|HELMET|CHESTPLATE|LEGGINGS|BOOTS|BOW|CROSSBOW|SHIELD|TRIDENT|ROD)/i.test(material)) {
    return "gear";
  }
  if (/(ORE|BLOCK|STONE|COBBLE|BRICK|DEEPSLATE|NETHERRACK|CONCRETE|TERRACOTTA|PLANKS|LOG|WOOD|DIRT|SAND|GRAVEL|CLAY|ICE|SNOW|PRISMARINE|SEA_LANTERN|OBSIDIAN|QUARTZ|DIAMOND|EMERALD|GOLD|IRON|COPPER|REDSTONE|LAPIS|AMETHYST|NETHERITE|MANGROVE|BAMBOO|CHERRY|MUSHROOM|MUD|SCULK|TUFF)/i.test(material)) {
    return "block";
  }
  return "item";
}

function getDMColorAccent(material) {
  const normalized = String(material || "").toUpperCase();
  const colorEntries = [
    ["LIGHT_BLUE", "#7ccfff"],
    ["LIGHT_GRAY", "#c9ced6"],
    ["BLACK", "#4d5157"],
    ["GRAY", "#9fa4ab"],
    ["WHITE", "#e8edf3"],
    ["RED", "#ff6868"],
    ["BLUE", "#6a86ff"],
    ["GREEN", "#67e37b"],
    ["LIME", "#9cff64"],
    ["YELLOW", "#ffe05a"],
    ["ORANGE", "#ffb05e"],
    ["PINK", "#ff88cf"],
    ["PURPLE", "#c48cff"],
    ["MAGENTA", "#ff75e0"],
    ["CYAN", "#65ebff"],
    ["BROWN", "#a67147"]
  ];

  for (const [key, value] of colorEntries) {
    if (normalized.startsWith(key) || normalized.includes(`_${key}_`) || normalized.endsWith(`_${key}`)) {
      return value;
    }
  }

  return null;
}

function getDMMaterialTheme(item) {
  const material = String(item?.material || "").toUpperCase();
  const kind = getDMItemKind(item);

  if (kind === "head") {
    return { kind, accent: "#f4c88f", highlight: "#ffe8bd", shadow: "#6d4425" };
  }

  if (kind === "itemsadder") {
    return { kind, accent: "#7defff", highlight: "#f7ffff", shadow: "#0f566d" };
  }

  if (kind === "mmoitems") {
    return { kind, accent: "#dafc6a", highlight: "#ffffff", shadow: "#425700" };
  }

  if (kind === "glass") {
    const accent = getDMColorAccent(material) || "#dbe5f2";
    return { kind, accent, highlight: "#ffffff", shadow: "rgba(20, 24, 30, 0.9)" };
  }

  if (kind === "gear") {
    if (/(DIAMOND|EMERALD|PRISMARINE|AMETHYST)/i.test(material)) {
      return { kind, accent: "#71f0dc", highlight: "#ffffff", shadow: "#12505a" };
    }
    if (/(GOLD|NETHERITE|IRON|COPPER|CHAIN)/i.test(material)) {
      return { kind, accent: "#c9d1d8", highlight: "#ffffff", shadow: "#515b65" };
    }
    return { kind, accent: "#d7dce2", highlight: "#ffffff", shadow: "#58616b" };
  }

  if (kind === "block") {
    if (/(DIAMOND|EMERALD|PRISMARINE|SEA_LANTERN|SCULK)/i.test(material)) {
      return { kind, accent: "#6af0dd", highlight: "#efffff", shadow: "#114f5e" };
    }
    if (/(NETHER|REDSTONE|MAGMA|BLAZE|SOUL|OBSIDIAN|BLACKSTONE)/i.test(material)) {
      return { kind, accent: "#ff7b72", highlight: "#ffe2db", shadow: "#551214" };
    }
    if (/(WOOD|LOG|PLANK|BAMBOO|CHERRY|MANGROVE|OAK|SPRUCE|BIRCH|JUNGLE|ACACIA|DARK_OAK)/i.test(material)) {
      return { kind, accent: "#c78a57", highlight: "#ffe1bf", shadow: "#6c4124" };
    }
    if (/(STONE|COBBLE|DEEPSLATE|TUFF|ANDESITE|GRANITE|DIORITE|BRICK|QUARTZ|TERRACOTTA|CONCRETE|CLAY|SAND|DIRT|GRAVEL)/i.test(material)) {
      return { kind, accent: "#9fa4aa", highlight: "#f2f5f7", shadow: "#464b50" };
    }
    if (/(GOLD|IRON|COPPER)/i.test(material)) {
      return { kind, accent: "#e0c081", highlight: "#fff1cc", shadow: "#766033" };
    }
    return { kind, accent: "#aab1b9", highlight: "#f4f7fa", shadow: "#4b5259" };
  }

  return { kind, accent: "#b9c1ca", highlight: "#ffffff", shadow: "#50565f" };
}

function getDMVisualStyle(item) {
  const theme = getDMMaterialTheme(item);
  return `--dm-accent:${theme.accent};--dm-highlight:${theme.highlight};--dm-shadow:${theme.shadow};`;
}

function renderLegacyHtml(text) {
  if (!text) {
    return "";
  }

  let html = "";
  let buffer = "";
  let currentColor = null;

  const flush = () => {
    if (!buffer) {
      return;
    }
    const escaped = escapeHtml(buffer).replace(/\n/g, "<br>");
    html += currentColor ? `<span style="color:${currentColor}">${escaped}</span>` : escaped;
    buffer = "";
  };

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === "&" && index + 1 < text.length) {
      const next = text[index + 1];
      const hex = text.slice(index + 2, index + 8);
      if (next === "#" && /^[0-9A-Fa-f]{6}$/.test(hex)) {
        flush();
        currentColor = `#${hex}`;
        index += 7;
        continue;
      }

      const code = next.toLowerCase();
      if (code === "r") {
        flush();
        currentColor = null;
        index += 1;
        continue;
      }

      if (DM_COLOR_MAP[code]) {
        flush();
        currentColor = DM_COLOR_MAP[code];
        index += 1;
        continue;
      }
    }

    buffer += char;
  }

  flush();
  return html || "&nbsp;";
}

function getDMItemLabel(item) {
  if (!item) {
    return "Empty";
  }

  if (item.name && item.name.trim()) {
    return item.name.trim();
  }

  if (item.material) {
    return item.material.replace(/_/g, " ");
  }

  if (item.itemsAdderId) {
    return item.itemsAdderId;
  }

  return "Empty";
}

function getDMItemIcon(item) {
  if (!item) {
    return "+";
  }

  if (item.skullUrl) {
    return "◉";
  }

  if (item.itemsAdderId) {
    return "IA";
  }

  if (item.mmoItemsId) {
    return "MM";
  }

  const kind = getDMItemKind(item);
  if (kind === "glass") {
    return "▣";
  }
  if (kind === "head") {
    return "◉";
  }
  if (kind === "itemsadder") {
    return "IA";
  }
  if (kind === "mmoitems") {
    return "MM";
  }

  const meta = getMaterialMeta(item.material);
  return meta.icon || "■";
}

function isDMBorderSlot(slot, size = dmState.size) {
  const row = Math.floor(slot / DM_SLOT_SIZE);
  const col = slot % DM_SLOT_SIZE;
  const rows = size / DM_SLOT_SIZE;
  return row === 0 || row === rows - 1 || col === 0 || col === DM_SLOT_SIZE - 1;
}

function buildDMYaml() {
  const lines = [];
  lines.push(`menu_title: ${yamlQuote(dmState.menuTitle)}`);
  lines.push(`size: ${dmState.size}`);
  lines.push("open_command:");
  lines.push("  - menu");
  lines.push("items:");

  const filledItems = dmState.slots.filter((item) => item.material || item.name || item.lore || item.skullUrl || item.itemsAdderId || item.mmoItemsId || item.permission || item.command || item.sound || item.placeholder || item.requirements);
  if (!filledItems.length) {
    lines.push("  {}");
    return lines.join("\n");
  }

  filledItems.forEach((item) => {
    const key = `slot_${item.slot}`;
    lines.push(`  ${key}:`);
    lines.push(`    material: ${item.material || "STONE"}`);
    lines.push(`    slot: ${item.slot}`);
    if (item.name) lines.push(`    display_name: ${yamlQuote(item.name)}`);
    if (item.lore) {
      const loreLines = String(item.lore).split("\n").filter(Boolean);
      if (loreLines.length) {
        lines.push("    lore:");
        loreLines.forEach((line) => lines.push(`      - ${yamlQuote(line)}`));
      }
    }
    if (item.amount && Number(item.amount) !== 1) lines.push(`    amount: ${Number(item.amount)}`);
    if (item.customModelData) lines.push(`    custom_model_data: ${Number(item.customModelData)}`);
    if (item.glow) lines.push("    glow: true");
    if (item.skullUrl) lines.push(`    skull_url: ${yamlQuote(item.skullUrl)}`);
    if (item.itemsAdderId) lines.push(`    itemsadder_id: ${yamlQuote(item.itemsAdderId)}`);
    if (item.mmoItemsId) lines.push(`    mmoitems_id: ${yamlQuote(item.mmoItemsId)}`);
    if (item.permission) lines.push(`    permission: ${yamlQuote(item.permission)}`);
    if (item.command) {
      lines.push("    commands:");
      String(item.command).split("\n").filter(Boolean).forEach((cmd) => lines.push(`      - ${yamlQuote(cmd)}`));
    }
    if (item.sound) lines.push(`    sound: ${yamlQuote(item.sound)}`);
    if (item.clickType) lines.push(`    click_type: ${yamlQuote(item.clickType)}`);
    if (item.closeMenu) lines.push("    close_menu: true");
    if (item.openMenu) lines.push(`    open_menu: ${yamlQuote(item.openMenu)}`);
    if (item.placeholder) lines.push(`    placeholder: ${yamlQuote(item.placeholder)}`);
    if (item.requirements) {
      lines.push("    requirements:");
      String(item.requirements).split("\n").filter(Boolean).forEach((req) => lines.push(`      - ${yamlQuote(req)}`));
    }
  });

  return lines.join("\n");
}

function yamlQuote(value) {
  const text = String(value);
  if (!text.length) {
    return "''";
  }
  if (/^[A-Za-z0-9_:-]+$/.test(text) && !/^(true|false|null|~|\d+(\.\d+)?)$/i.test(text)) {
    return text;
  }
  return `'${text.replaceAll("'", "''")}'`;
}

function parseDMYaml(yamlText) {
  const root = window.jsyaml?.load ? window.jsyaml.load(yamlText) : null;
  if (!root || typeof root !== "object") {
    throw new Error("YAML không hợp lệ.");
  }

  const size = DM_SIZES.includes(Number(root.size)) ? Number(root.size) : 27;
  const nextState = createDMState(size);
  nextState.menuTitle = typeof root.menu_title === "string" ? root.menu_title : DM_DEFAULT_TITLE;
  nextState.borderMaterial = typeof root.border_material === "string" ? root.border_material : DM_DEFAULT_BORDER;

  const items = root.items || {};
  if (items && typeof items === "object") {
    Object.entries(items).forEach(([key, item]) => {
      if (!item || typeof item !== "object") {
        return;
      }

      const slot = Number.isInteger(item.slot) ? item.slot : Number(String(key).replace(/\D/g, ""));
      if (!Number.isInteger(slot) || slot < 0 || slot >= size) {
        return;
      }

      const lore = Array.isArray(item.lore) ? item.lore.join("\n") : (item.lore || "");
      const commands = Array.isArray(item.commands) ? item.commands.join("\n") : (item.command || item.left_click_commands || item.right_click_commands || "");
      nextState.slots[slot] = {
        ...createEmptyDMItem(slot),
        slot,
        material: item.material || "",
        name: item.display_name || item.name || "",
        lore,
        customModelData: item.custom_model_data || item.custommodeldata || "",
        amount: item.amount || 1,
        glow: Boolean(item.glow),
        skullUrl: item.skull_url || item.skull || "",
        itemsAdderId: item.itemsadder_id || "",
        mmoItemsId: item.mmoitems_id || "",
        permission: item.permission || "",
        command: commands,
        sound: item.sound || "",
        clickType: item.click_type || "LEFT",
        closeMenu: Boolean(item.close_menu),
        openMenu: item.open_menu || "",
        placeholder: item.placeholder || "",
        requirements: Array.isArray(item.requirements) ? item.requirements.join("\n") : (item.requirements || "")
      };
    });
  }

  return nextState;
}

function syncDMInspectorFromSelection() {
  const activeIndex = getDMActiveSlots()[0] || 0;
  const item = dmState.slots[activeIndex] || createEmptyDMItem(activeIndex);
  const selectionCount = getDMActiveSlots().length;

  if (dmStageTitle) {
    dmStageTitle.textContent = renderTitleText(dmState.menuTitle || "Menu preview");
  }
  if (dmInspectorTitle) {
    dmInspectorTitle.textContent = selectionCount > 1 ? `${selectionCount} slots selected` : `Slot ${activeIndex + 1}`;
  }
  if (dmSelectionCount) {
    dmSelectionCount.textContent = `${selectionCount} selected`;
  }

  if (dmMenuTitleInput) dmMenuTitleInput.value = dmState.menuTitle;
  if (dmBorderMaterialSelect) dmBorderMaterialSelect.value = dmState.borderMaterial;
  if (dmMaterialInput) dmMaterialInput.value = item.material || "";
  if (dmNameInput) dmNameInput.value = item.name || "";
  if (dmLoreInput) dmLoreInput.value = item.lore || "";
  if (dmCustomModelDataInput) dmCustomModelDataInput.value = item.customModelData || "";
  if (dmAmountInput) dmAmountInput.value = item.amount || 1;
  if (dmGlowInput) dmGlowInput.checked = Boolean(item.glow);
  if (dmSkullUrlInput) dmSkullUrlInput.value = item.skullUrl || "";
  if (dmItemsAdderIdInput) dmItemsAdderIdInput.value = item.itemsAdderId || "";
  if (dmMmoItemsIdInput) dmMmoItemsIdInput.value = item.mmoItemsId || "";
  if (dmPermissionInput) dmPermissionInput.value = item.permission || "";
  if (dmCommandInput) dmCommandInput.value = item.command || "";
  if (dmSoundInput) dmSoundInput.value = item.sound || "";
  if (dmClickTypeInput) dmClickTypeInput.value = item.clickType || "LEFT";
  if (dmCloseMenuInput) dmCloseMenuInput.checked = Boolean(item.closeMenu);
  if (dmOpenMenuInput) dmOpenMenuInput.value = item.openMenu || "";
  if (dmPlaceholderInput) dmPlaceholderInput.value = item.placeholder || "";
  if (dmRequirementsInput) dmRequirementsInput.value = item.requirements || "";

  renderDMItemPreview(item);
  renderDMSearch(dmSearchInput?.value || "");
}

function renderTitleText(text) {
  return text.replace(/&[0-9a-fk-or]/gi, "").replace(/&#[0-9A-Fa-f]{6}/g, "");
}

function renderDMItemPreview(item) {
  if (!dmItemPreview) {
    return;
  }

  const meta = getMaterialMeta(item.material);
  const icon = getDMItemIcon(item);
  const themeStyle = getDMVisualStyle(item);
  const kind = getDMItemKind(item);
  const titleHtml = renderLegacyHtml(item.name || meta.label || item.material || "Empty");
  const lorePreview = (item.lore || "").split("\n").filter(Boolean).slice(0, 3).map((line) => `<div>${renderLegacyHtml(line)}</div>`).join("");
  dmItemPreview.classList.toggle("item-preview--glow", Boolean(item.glow));
  dmItemPreview.classList.toggle("item-preview--head", Boolean(item.skullUrl));
  dmItemPreview.innerHTML = `
    <div class="item-preview-figure item-preview-figure--${kind}" style="${themeStyle}">
      <span class="item-preview-figure-icon">${escapeHtml(icon)}</span>
    </div>
    <strong>${titleHtml || "Empty"}</strong>
    <em>${escapeHtml(item.material || meta.label || "AIR")}${item.customModelData ? ` · CMD ${escapeHtml(String(item.customModelData))}` : ""}${item.amount ? ` · x${escapeHtml(String(item.amount))}` : ""}</em>
    <div class="item-preview-lore">${lorePreview || "<div>No lore</div>"}</div>
  `;
}

function applyDMField(key, value, { silent = false } = {}) {
  if (key === "menuTitle") {
    dmState.menuTitle = String(value || "");
    if (!silent) {
      pushDMHistory();
    }
    renderDeluxeMenusDesigner({ keepPreview: true });
    return;
  }

  const selected = getDMActiveSlots();
  selected.forEach((slot) => {
    const item = dmState.slots[slot] || createEmptyDMItem(slot);
    item.slot = slot;
    item[key] = value;
    dmState.slots[slot] = item;
  });

  if (!silent) {
    pushDMHistory();
  }

  renderDeluxeMenusDesigner({ keepPreview: true });
}

function updateDMSearchResults(query) {
  if (!dmSearchResults) {
    return;
  }

  const q = query.trim().toLowerCase();
  const results = DM_LIBRARY.filter((entry) => {
    const haystack = [entry.material, entry.label, ...(entry.aliases || [])].join(" ").toLowerCase();
    return !q || haystack.includes(q);
  }).slice(0, 8);

  dmSearchResults.innerHTML = results.map((entry) => `
    <button type="button" class="search-result" data-material="${escapeHtml(entry.material)}">
      <span>${escapeHtml(entry.icon)}</span>
      <strong>${escapeHtml(entry.label)}</strong>
      <small>${escapeHtml(entry.material)}</small>
    </button>
  `).join("");

  dmSearchResults.querySelectorAll("[data-material]").forEach((button) => {
    button.addEventListener("click", () => {
      const material = button.dataset.material || "";
      applyDMField("material", material);
      if (dmMaterialInput) {
        dmMaterialInput.value = material;
      }
      setDMStatus(`Đã chọn ${material}.`);
    });
  });
}

function renderDMSearch(query) {
  updateDMSearchResults(query);
}

function renderDMGrid() {
  if (!dmGrid) {
    return;
  }

  dmGrid.innerHTML = "";
  dmGrid.style.gridTemplateRows = `repeat(${dmState.size / DM_SLOT_SIZE}, minmax(0, 1fr))`;

  for (let slot = 0; slot < dmState.size; slot += 1) {
    const item = dmState.slots[slot] || createEmptyDMItem(slot);
    const meta = getMaterialMeta(item.material);
    const kind = getDMItemKind(item);
    const visualStyle = getDMVisualStyle(item);
    const selected = getDMActiveSlots().includes(slot);
    const isClipboard = Boolean(dmClipboard && dmClipboard.slot === slot);
    const isBorder = isDMBorderSlot(slot);
    const slotButton = document.createElement("button");
    slotButton.type = "button";
    slotButton.className = `slot${selected ? " is-selected" : ""}${isClipboard ? " is-clipboard" : ""}${isBorder ? " is-border" : ""}${!item.material && !item.name ? " slot-empty" : ""}`;
    slotButton.draggable = true;
    slotButton.dataset.slot = String(slot);
    slotButton.innerHTML = `
      <div class="slot-inner">
        <div class="slot-icon slot-icon--${kind}" data-kind="${kind}" style="${visualStyle}">
          <span class="slot-icon-glyph">${escapeHtml(getDMItemIcon(item))}</span>
        </div>
        <div class="slot-name">${renderLegacyHtml(getDMItemLabel(item))}</div>
      </div>
      ${item.amount > 1 ? `<span class="slot-amount">${escapeHtml(String(item.amount))}</span>` : ""}
      <span class="slot-index">${slot + 1}</span>
    `;

    slotButton.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey) {
        const next = new Set(getDMActiveSlots());
        if (next.has(slot)) {
          next.delete(slot);
        } else {
          next.add(slot);
        }
        setDMSelection(Array.from(next));
        return;
      }

      if (event.shiftKey && dmDragAnchor != null) {
        setDMSelection(buildDMRange(dmDragAnchor, slot));
        return;
      }

      setDMSelection([slot]);
    });

    slotButton.addEventListener("mousedown", (event) => {
      if (event.button !== 0) {
        return;
      }
      dmDragAnchor = slot;
      dmDragPreview = [slot];
    });

    slotButton.addEventListener("mouseenter", () => {
      if (dmDragAnchor == null) {
        return;
      }
      dmDragPreview = buildDMRange(dmDragAnchor, slot);
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
      }
      setDMSelection(dmDragPreview, { preserveAnchor: true });
    });

    slotButton.addEventListener("dragstart", (event) => {
      event.dataTransfer?.setData("text/plain", String(slot));
      dmDragAnchor = slot;
      event.dataTransfer.effectAllowed = "move";
    });

    slotButton.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    slotButton.addEventListener("drop", (event) => {
      event.preventDefault();
      const fromSlot = Number(event.dataTransfer?.getData("text/plain"));
      if (!Number.isInteger(fromSlot) || fromSlot === slot) {
        return;
      }
      const moved = cloneDMItem(dmState.slots[fromSlot] || createEmptyDMItem(fromSlot));
      moved.slot = slot;
      dmState.slots[slot] = { ...moved, slot };
      dmState.slots[fromSlot] = createEmptyDMItem(fromSlot);
      setDMSelection([slot]);
      pushDMHistory();
      renderDeluxeMenusDesigner();
    });

    slotButton.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      dmClipboard = cloneDMItem(dmState.slots[slot] || createEmptyDMItem(slot));
      setDMStatus(`Đã copy slot ${slot + 1}.`);
      renderDeluxeMenusDesigner({ keepPreview: true });
      scheduleDMSave();
    });

    dmGrid.appendChild(slotButton);
  }
}

function buildDMRange(start, end) {
  const startRow = Math.floor(start / DM_SLOT_SIZE);
  const startCol = start % DM_SLOT_SIZE;
  const endRow = Math.floor(end / DM_SLOT_SIZE);
  const endCol = end % DM_SLOT_SIZE;
  const minRow = Math.min(startRow, endRow);
  const maxRow = Math.max(startRow, endRow);
  const minCol = Math.min(startCol, endCol);
  const maxCol = Math.max(startCol, endCol);
  const slots = [];

  for (let row = minRow; row <= maxRow; row += 1) {
    for (let col = minCol; col <= maxCol; col += 1) {
      const slot = row * DM_SLOT_SIZE + col;
      if (slot < dmState.size) {
        slots.push(slot);
      }
    }
  }

  return slots;
}

function setDMStatus(message) {
  if (dmStatus) {
    dmStatus.textContent = message;
  }
}

function fillDMBorder() {
  const material = dmBorderMaterialSelect?.value || DM_DEFAULT_BORDER;
  const borderSlots = [];
  for (let slot = 0; slot < dmState.size; slot += 1) {
    if (isDMBorderSlot(slot)) {
      borderSlots.push(slot);
      dmState.slots[slot] = {
        ...createEmptyDMItem(slot),
        slot,
        material,
        amount: 1,
        name: "",
        lore: "",
        glow: false
      };
    }
  }
  setDMSelection(borderSlots.length ? borderSlots : [0]);
  pushDMHistory();
  renderDeluxeMenusDesigner();
  setDMStatus(`Đã tạo viền bằng ${material}.`);
}

function fillDMSelection() {
  const selected = getDMActiveSlots();
  const values = readDMInspectorValues();
  selected.forEach((slot) => {
    dmState.slots[slot] = {
      ...createEmptyDMItem(slot),
      ...values,
      slot
    };
  });
  pushDMHistory();
  renderDeluxeMenusDesigner({ keepPreview: true });
  setDMStatus(`Đã áp dụng cho ${selected.length} slot.`);
}

function pasteDMClipboard() {
  if (!dmClipboard) {
    setDMStatus("Chưa có item trong clipboard.");
    return;
  }

  getDMActiveSlots().forEach((slot) => {
    dmState.slots[slot] = { ...cloneDMItem(dmClipboard), slot };
  });
  pushDMHistory();
  renderDeluxeMenusDesigner();
  setDMStatus("Đã paste item.");
}

function readDMInspectorValues() {
  return {
    material: dmMaterialInput?.value.trim().toUpperCase() || "",
    name: dmNameInput?.value || "",
    lore: dmLoreInput?.value || "",
    customModelData: dmCustomModelDataInput?.value || "",
    amount: Number(dmAmountInput?.value || 1),
    glow: Boolean(dmGlowInput?.checked),
    skullUrl: dmSkullUrlInput?.value || "",
    itemsAdderId: dmItemsAdderIdInput?.value || "",
    mmoItemsId: dmMmoItemsIdInput?.value || "",
    permission: dmPermissionInput?.value || "",
    command: dmCommandInput?.value || "",
    sound: dmSoundInput?.value || "",
    clickType: dmClickTypeInput?.value || "LEFT",
    closeMenu: Boolean(dmCloseMenuInput?.checked),
    openMenu: dmOpenMenuInput?.value || "",
    placeholder: dmPlaceholderInput?.value || "",
    requirements: dmRequirementsInput?.value || ""
  };
}

function bindDMInspector() {
  const bind = (element, key, transform = (value) => value, eventName = "input") => {
    element?.addEventListener(eventName, () => {
      applyDMField(key, transform(element.type === "checkbox" ? element.checked : element.value), { silent: true });
      pushDMHistory();
      scheduleDMSave();
    });
  };

  dmMenuTitleInput?.addEventListener("input", () => {
    dmState.menuTitle = dmMenuTitleInput.value;
    pushDMHistory();
    renderDeluxeMenusDesigner({ keepPreview: true });
    scheduleDMSave();
  });

  dmBorderMaterialSelect?.addEventListener("change", () => {
    dmState.borderMaterial = dmBorderMaterialSelect.value;
    pushDMHistory();
    renderDeluxeMenusDesigner({ keepPreview: true });
    scheduleDMSave();
  });

  bind(dmMaterialInput, "material", (value) => String(value || "").trim().toUpperCase());
  bind(dmNameInput, "name");
  bind(dmLoreInput, "lore");
  bind(dmCustomModelDataInput, "customModelData");
  bind(dmAmountInput, "amount", (value) => Number(value || 1));
  bind(dmGlowInput, "glow", (value) => Boolean(value));
  bind(dmSkullUrlInput, "skullUrl");
  bind(dmItemsAdderIdInput, "itemsAdderId");
  bind(dmMmoItemsIdInput, "mmoItemsId");
  bind(dmPermissionInput, "permission");
  bind(dmCommandInput, "command");
  bind(dmSoundInput, "sound");
  bind(dmClickTypeInput, "clickType", (value) => value, "change");
  bind(dmCloseMenuInput, "closeMenu", (value) => Boolean(value));
  bind(dmOpenMenuInput, "openMenu");
  bind(dmPlaceholderInput, "placeholder");
  bind(dmRequirementsInput, "requirements");
}

function renderDeluxeMenusDesigner({ keepPreview = false } = {}) {
  if (dmMenuTitleInput && !keepPreview) {
    dmMenuTitleInput.value = dmState.menuTitle;
  }

  syncDMSizeButtons();
  renderDMGrid();
  syncDMInspectorFromSelection();
  const yaml = buildDMYaml();
  if (dmYamlPreview) {
    highlightYaml(dmYamlPreview, yaml);
  }
  if (dmStageTitle) {
    dmStageTitle.textContent = renderTitleText(dmState.menuTitle || "Menu preview");
  }
}

function renderDMMaterialLibrary() {
  if (!dmMaterialSuggestions) {
    return;
  }

  dmMaterialSuggestions.innerHTML = DM_LIBRARY.map((entry) => `<option value="${escapeHtml(entry.material)}">${escapeHtml(entry.label)}</option>`).join("");
}

function exportDMYaml() {
  return buildDMYaml();
}

function importDMYamlText(text) {
  const imported = parseDMYaml(text);
  dmState = imported;
  dmClipboard = imported.clipboard ? cloneDMItem(imported.clipboard) : null;
  dmState.selectedSlots = imported.selectedSlots?.length ? imported.selectedSlots : [0];
  dmHistory = [cloneDMState(dmState)];
  dmHistoryIndex = 0;
  syncDMInspectorFromSelection();
  renderDeluxeMenusDesigner();
  saveDMState();
  setDMStatus("Đã nhập YAML.");
}

function handleDMImportFile(file) {
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      importDMYamlText(String(reader.result || ""));
    } catch (error) {
      setDMStatus(error.message || "Không thể đọc YAML.", true);
    }
  };
  reader.readAsText(file, "utf-8");
}

function updateDMSearchField() {
  renderDMSearch(dmSearchInput?.value || "");
}

dmSizeButtons.forEach((button) => {
  button.addEventListener("click", () => updateDMSize(Number(button.dataset.size)));
});

dmFillBorderButton?.addEventListener("click", fillDMBorder);
dmFillSelectionButton?.addEventListener("click", fillDMSelection);
dmPasteClipboardButton?.addEventListener("click", pasteDMClipboard);
dmUndoButton?.addEventListener("click", () => restoreDMHistory(dmHistoryIndex - 1));
dmRedoButton?.addEventListener("click", () => restoreDMHistory(dmHistoryIndex + 1));
dmExportCopyButton?.addEventListener("click", async () => {
  await copyText(exportDMYaml(), dmStatus);
  setDMStatus("Đã copy YAML.");
});
dmExportDownloadButton?.addEventListener("click", () => {
  const blob = new Blob([exportDMYaml()], { type: "text/yaml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "deluxemenus-menu.yml";
  anchor.click();
  URL.revokeObjectURL(url);
  setDMStatus("Đã download YAML.");
});
dmImportInput?.addEventListener("change", () => handleDMImportFile(dmImportInput.files?.[0]));
dmSearchInput?.addEventListener("input", updateDMSearchField);

bindDMInspector();
renderDMMaterialLibrary();
renderDeluxeMenusDesigner();
saveDMState();

document.addEventListener("keydown", (event) => {
  const active = document.querySelector('[data-page-panel="deluxemenus-designer"].is-active');
  if (!active) {
    return;
  }

  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
    event.preventDefault();
    if (event.shiftKey) {
      restoreDMHistory(dmHistoryIndex + 1);
    } else {
      restoreDMHistory(dmHistoryIndex - 1);
    }
  }

  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "y") {
    event.preventDefault();
    restoreDMHistory(dmHistoryIndex + 1);
  }
});
