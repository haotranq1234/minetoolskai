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
