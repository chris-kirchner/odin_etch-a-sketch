const gridContainer = document.getElementById("grid-container");
let gridContainerStyle = getComputedStyle(gridContainer);
let gridWidth = parseInt(gridContainerStyle.width.replace(/\D/g, ""));
const lineCount = 50;
const containerSize = gridWidth / lineCount;
// let count = 0;

for (let i = 0; i < lineCount; i++) {
  for (let j = 0; j < lineCount; j++) {
    // count ++;
    const square = document.createElement("div");
    square.className += "square";
    square.style.height = containerSize + "px";
    square.style.width = containerSize + "px";
    gridContainer.appendChild(square);
    // square.innerText = count;
  };
};

let squares = document.querySelectorAll(".square");

squares.forEach((square) => {
  square.addEventListener("mouseover", () => {
    square.classList.add("active");
  });
});