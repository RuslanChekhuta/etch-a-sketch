const container = document.getElementById("root");
const gridSize = document.getElementById("grid-size");
const sizeCount = document.getElementById("size-count");
const apply = document.getElementById("apply");
const btnClear = document.getElementById("gridClear");
const customGrid = document.getElementById("custom-grid");
const randomColor = document.getElementById("random-color");
const shadingMode = document.getElementById("shading-mode");

gridSize.addEventListener("change", (e) => {
  sizeCount.textContent = e.target.value;
});

function setCustomGrid() {
  let customValue = +prompt("Enter grid size (2–100)");
  if (Number.isInteger(customValue) && customValue >= 2 && customValue <= 100) {
    gridSize.value = customValue;
    sizeCount.textContent = customValue;

    populateGrid();
  }
}

customGrid.addEventListener("click", setCustomGrid);

function populateGrid() {
  container.innerHTML = "";
  let squaresCount = gridSize.value * gridSize.value;
  for (let i = 0; i < squaresCount; i++) {
    const pixel = document.createElement("div");
    pixel.style.width = `calc(100% / ${gridSize.value})`;
    pixel.classList.add("pixel");
    pixel.dataset.count = "0";
    container.appendChild(pixel);
  }
  console.log(container.children.length);
}

apply.addEventListener("click", populateGrid);

function paintSquare(e) {
  if (e.target !== e.currentTarget) {
    if (shadingMode.checked) {
      let count = Number(e.target.dataset.count);

      if (count < 10) {
        count++;
        e.target.dataset.count = count;
      }
      e.target.style.opacity = count / 10;
    } else {
      e.target.dataset.count = 0;
      e.target.style.opacity = "";
    }

    if (randomColor.checked) {
      e.target.style.background = getRandomColor();
    } else {
      e.target.style.background = "black";
    }
  }
}

function clear() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((e) => {
    e.style.background = "";
    e.dataset.count = 0;

    e.style.opacity = "";
  });
}

function getRandomColor() {
  return `rgb(${Math.floor(Math.random() * 256)} ${Math.floor(Math.random() * 256)} ${Math.floor(Math.random() * 256)})`;
}

btnClear.addEventListener("click", clear);

container.addEventListener("mouseover", paintSquare);

console.log(container);

populateGrid();

console.log(getRandomColor());
