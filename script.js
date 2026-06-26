const editor = document.getElementById("cropEditor");
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
  x: 50,
  y: 38,
  scale: 1.10
};

function getSavedCrop() {
  try {
    const saved = JSON.parse(localStorage.getItem("portraitCrop"));
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

function formatScale(value) {
  return Number(value).toFixed(2);
}

function makeCss(x, y, scale) {
  return `:root {
  --portrait-x: ${x}%;
  --portrait-y: ${y}%;
  --portrait-scale: ${formatScale(scale)};
}`;
}

function applyCrop(x, y, scale, save = true) {
  document.documentElement.style.setProperty("--portrait-x", `${x}%`);
  document.documentElement.style.setProperty("--portrait-y", `${y}%`);
  document.documentElement.style.setProperty("--portrait-scale", formatScale(scale));

  cropX.value = x;
  cropY.value = y;
  cropScale.value = formatScale(scale);

  cropXValue.textContent = `${x}%`;
  cropYValue.textContent = `${y}%`;
  cropScaleValue.textContent = formatScale(scale);

  output.value = makeCss(x, y, scale);

  if (save) {
    localStorage.setItem("portraitCrop", JSON.stringify({ x, y, scale: Number(scale) }));
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
  editor.classList.add("is-visible");
}

[cropX, cropY, cropScale].forEach((input) => {
  input.addEventListener("input", () => {
    const { x, y, scale } = currentCropValues();
    applyCrop(x, y, scale);
  });
});

resetButton.addEventListener("click", () => {
  localStorage.removeItem("portraitCrop");
  applyCrop(defaultCrop.x, defaultCrop.y, defaultCrop.scale, false);
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(output.value);
    copyButton.textContent = "Copied!";
    setTimeout(() => {
      copyButton.textContent = "Copy CSS";
    }, 1200);
  } catch {
    output.select();
    document.execCommand("copy");
  }
});

closeButton.addEventListener("click", () => {
  editor.classList.remove("is-visible");
});
