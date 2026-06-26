const editor = document.getElementById("cropEditor");
const frame = document.getElementById("portraitFrame");
const image = document.getElementById("portraitImage");
const closeButton = document.getElementById("closeCropEditor");

const cropX = document.getElementById("cropX");
const cropY = document.getElementById("cropY");
const cropScale = document.getElementById("cropScale");

const cropXValue = document.getElementById("cropXValue");
const cropYValue = document.getElementById("cropYValue");
const cropScaleValue = document.getElementById("cropScaleValue");

const output = document.getElementById("cropCssOutput");
const copyButton = document.getElementById("copyCropCss");
const resetButton = document.getElementById("resetCrop");

const defaultCrop = {
  x: 0,
  y: 0,
  scale: 1.15
};

let isEditMode = false;
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let cropStart = { x: 0, y: 0 };

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatScale(value) {
  return Number(value).toFixed(2);
}

function makeCss(x, y, scale) {
  return `:root {
  --portrait-move-x: ${x}px;
  --portrait-move-y: ${y}px;
  --portrait-scale: ${formatScale(scale)};
}`;
}

function getSavedCrop() {
  try {
    const saved = JSON.parse(localStorage.getItem("portraitCropRealtime"));
    if (!saved) return defaultCrop;
    return {
      x: Number(saved.x ?? defaultCrop.x),
      y: Number(saved.y ?? defaultCrop.y),
      scale: Number(saved.scale ?? defaultCrop.scale)
    };
  } catch {
    return defaultCrop;
  }
}

function applyCrop(x, y, scale, save = true) {
  x = clamp(Math.round(Number(x)), -120, 120);
  y = clamp(Math.round(Number(y)), -120, 120);
  scale = clamp(Number(scale), 1, 2.5);

  document.documentElement.style.setProperty("--portrait-move-x", `${x}px`);
  document.documentElement.style.setProperty("--portrait-move-y", `${y}px`);
  document.documentElement.style.setProperty("--portrait-scale", formatScale(scale));

  cropX.value = x;
  cropY.value = y;
  cropScale.value = formatScale(scale);

  cropXValue.textContent = `${x}px`;
  cropYValue.textContent = `${y}px`;
  cropScaleValue.textContent = formatScale(scale);

  output.value = makeCss(x, y, scale);

  if (save) {
    localStorage.setItem("portraitCropRealtime", JSON.stringify({ x, y, scale: Number(scale) }));
  }
}

function currentCropValues() {
  return {
    x: Number(cropX.value),
    y: Number(cropY.value),
    scale: Number(cropScale.value)
  };
}

const savedCrop = getSavedCrop();
applyCrop(savedCrop.x, savedCrop.y, savedCrop.scale, false);

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("edit") === "1") {
  isEditMode = true;
  editor.classList.add("is-visible");
  frame.classList.add("editing");
}

[cropX, cropY, cropScale].forEach((input) => {
  input.addEventListener("input", () => {
    const { x, y, scale } = currentCropValues();
    applyCrop(x, y, scale);
  });
});

if (frame) {
  frame.addEventListener("pointerdown", (event) => {
    if (!isEditMode) return;

    isDragging = true;
    frame.setPointerCapture(event.pointerId);

    const { x, y } = currentCropValues();
    dragStart = { x: event.clientX, y: event.clientY };
    cropStart = { x, y };

    event.preventDefault();
  });

  frame.addEventListener("pointermove", (event) => {
    if (!isEditMode || !isDragging) return;

    const dx = event.clientX - dragStart.x;
    const dy = event.clientY - dragStart.y;
    const { scale } = currentCropValues();

    applyCrop(cropStart.x + dx, cropStart.y + dy, scale);
  });

  frame.addEventListener("pointerup", (event) => {
    if (!isEditMode) return;
    isDragging = false;
    try {
      frame.releasePointerCapture(event.pointerId);
    } catch {}
  });

  frame.addEventListener("pointercancel", () => {
    isDragging = false;
  });

  frame.addEventListener("wheel", (event) => {
    if (!isEditMode) return;

    event.preventDefault();
    const { x, y, scale } = currentCropValues();
    const nextScale = scale + (event.deltaY < 0 ? 0.03 : -0.03);
    applyCrop(x, y, nextScale);
  }, { passive: false });
}

resetButton.addEventListener("click", () => {
  localStorage.removeItem("portraitCropRealtime");
  applyCrop(defaultCrop.x, defaultCrop.y, defaultCrop.scale, false);
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(output.value);
    copyButton.textContent = "Copied!";
    setTimeout(() => {
      copyButton.textContent = "Copy final CSS";
    }, 1200);
  } catch {
    output.select();
    document.execCommand("copy");
  }
});

closeButton.addEventListener("click", () => {
  editor.classList.remove("is-visible");
  frame.classList.remove("editing");
  isEditMode = false;
});
