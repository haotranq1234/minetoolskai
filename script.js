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

const inputText = document.querySelector("#inputText");
const outputText = document.querySelector("#outputText");
const copyButton = document.querySelector("#copyButton");
const statusText = document.querySelector("#status");

function convertToSmallCaps(text) {
  return text.replace(/[A-Za-z]/g, (letter) => smallCapsMap[letter.toLowerCase()] || letter);
}

function updateOutput() {
  outputText.value = convertToSmallCaps(inputText.value);
  statusText.textContent = "";
}

async function copyOutput() {
  const value = outputText.value;

  if (!value) {
    statusText.textContent = "Chưa có nội dung để copy.";
    return;
  }

  try {
    await navigator.clipboard.writeText(value);
    statusText.textContent = "Đã copy vào clipboard.";
  } catch {
    outputText.select();
    document.execCommand("copy");
    statusText.textContent = "Đã copy vào clipboard.";
  }
}

inputText.addEventListener("input", updateOutput);
copyButton.addEventListener("click", copyOutput);

updateOutput();
