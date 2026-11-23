const container = document.getElementById("root");
const gridSize = document.getElementById("grid-size");
const sizeCount = document.getElementById("size-count");
const applyBtn = document.getElementById("apply");
const clearBtn = document.getElementById("gridClear");
const customGridBtn = document.getElementById("custom-grid");
const randomColorCheckbox = document.getElementById("random-color");
const shadingModeCheckbox = document.getElementById("shading-mode");

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function populateGrid() {
  container.innerHTML = "";
  const size = Number(gridSize.value);
  const squaresCount = size * size;

  for (let i = 0; i < squaresCount; i++) {
    const pixel = document.createElement("div");
    pixel.style.width = `calc(100% / ${size})`;
    pixel.classList.add("pixel");
    pixel.dataset.count = "0";
    container.appendChild(pixel);
  }
}

function setCustomGrid() {
  const customValue = Number(prompt("Enter grid size (2–100):"));
  if (Number.isInteger(customValue) && customValue >= 2 && customValue <= 100) {
    gridSize.value = customValue;
    sizeCount.textContent = customValue;
    populateGrid();
  }
}

function paintSquare(e) {
  if (e.target === e.currentTarget) return;

  if (shadingModeCheckbox.checked) {
    const currentCount = Number(e.target.dataset.count);
    const nextCount = Math.min(currentCount + 1, 10);
    e.target.dataset.count = nextCount;
    e.target.style.opacity = nextCount / 10;
  } else {
    e.target.dataset.count = "0";
    e.target.style.opacity = "";
  }

  e.target.style.background = randomColorCheckbox.checked
    ? getRandomColor()
    : "black";
}

function clearGrid() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.style.background = "";
    pixel.style.opacity = "";
    pixel.dataset.count = "0";
  });
}

// Event Listeners
gridSize.addEventListener("input", (e) => {
  sizeCount.textContent = e.target.value;
});

applyBtn.addEventListener("click", populateGrid);
customGridBtn.addEventListener("click", setCustomGrid);
clearBtn.addEventListener("click", clearGrid);
container.addEventListener("mouseover", paintSquare);
container.addEventListener("dragstart", (e) => e.preventDefault());

// Init
populateGrid();
