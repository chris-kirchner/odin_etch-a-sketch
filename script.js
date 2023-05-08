const gridContainer = document.getElementById("grid-container");
const button = document.getElementById("button");
let gridContainerStyle = getComputedStyle(gridContainer);
let gridWidth = parseInt(gridContainerStyle.width.replace(/\D/g, ""));
// let lineCount = 50;
let count = 0;

function changeLineCount() {
  lineCount = prompt("Number of squares per line (1 - 100):", "");
  if (lineCount > 0 && lineCount < 101) {
    removeAllChildNodes(gridContainer);
    count = 0;
    squareSetup(lineCount);
  }
  else {
    changeLineCount();
    // alert("Please enter a number between 1 and 100");
  }
};

button.addEventListener("click", changeLineCount);

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

function squareSetup(lineCount) {
  const containerSize = gridWidth / lineCount;
  for (let i = 0; i < lineCount; i++) {
    for (let j = 0; j < lineCount; j++) {
      count ++;
      const square = document.createElement("div");
      square.className += "square";
      square.style.height = containerSize + "px";
      square.style.width = containerSize + "px";
      gridContainer.appendChild(square);
      square.innerText = count;
      square.style.fontSize = "8px";
      square.style.textAlign = "center";
    }
  }
  let squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.addEventListener("mouseover", () => {
      square.classList.add("active");
    })
  })
};

squareSetup(20);