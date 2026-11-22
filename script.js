const container = document.getElementById("root");

for (let i = 0; i < 256; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");
  container.appendChild(pixel);
}

function paintSquare(e) {
  if (e.target !== e.currentTarget) {
    e.target.style.background = "black";
  }
}

container.addEventListener("mouseover", paintSquare);

console.log(container);

console.log(container.children.length);
