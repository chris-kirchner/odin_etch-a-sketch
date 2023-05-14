const gridContainer = document.getElementById("grid-container");
const button = document.getElementById("button");
const buttonReset = document.getElementById("button-reset");
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slider-value");
let gridContainerStyle = getComputedStyle(gridContainer);
let gridWidth = parseInt(gridContainerStyle.width.replace(/\D/g, ""));
let squaresPerLine = 50;
// let count = 0;

sliderValue.innerHTML = slider.value + "x" + slider.value;
slider.oninput = function() {
  sliderValue.innerHTML = this.value + "x" + this.value;
};

// Change number of squares per line based on user input
function changeLineCount() {
  let lineCount = prompt("Number of squares per line (1 - 100):", "");
  if (lineCount > 0 && lineCount < 101) {
    removeAllChildNodes(gridContainer);
    // count = 0;
    squareSetup(lineCount);
  }
  else {
    changeLineCount();
  }
};

/* Removes all squares then sets up the same number of squares per line
giving the effect of "erasing" the board */
function gridReset() {
  removeAllChildNodes(gridContainer);
  squareSetup(squaresPerLine);
};

button.addEventListener("click", changeLineCount);
buttonReset.addEventListener("click", gridReset);

// Removes all children of a parent container
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

/* Populates gridContainer with squares that scale to fit within
the max width of the container */
function squareSetup(lineCount) {
  squaresPerLine = parseInt(lineCount);
  const containerSize = gridWidth / lineCount;
  for (let i = 0; i < lineCount; i++) {
    for (let j = 0; j < lineCount; j++) {
      // count ++;
      const square = document.createElement("div");
      square.className += "square";
      square.style.height = containerSize + "px";
      square.style.width = containerSize + "px";
      gridContainer.appendChild(square);
      // square.innerText = count;
      // square.style.fontSize = "8px";
      // square.style.textAlign = "center";
    }
  }
  squareEvent();
};

/* Handles mouse listener events and color values for the line
created when moving the mouse over the grid */
function squareEvent() {
  let squares = document.querySelectorAll(".square");
  squares.forEach(square => {
    let bgColor = "";
    square.addEventListener("mouseenter", () => {
      bgColor = square.style.backgroundColor;
      square.classList.add("active");
      square.style.backgroundColor = "rgb(255, 165, 0)";
    })
    square.addEventListener("mouseleave", () => {
      if (bgColor === "") {
        square.style.backgroundColor = "rgb(200, 200, 200)";
      }
      else {
        let colorChange = 25;
        let numRegex = /\d+/g;
        let rgbArr = bgColor.match(numRegex);
        for (let i = 0; i < rgbArr.length; i++) {
          parseInt(rgbArr[i]);
          if ((rgbArr[i] - colorChange) >= 0) {
            rgbArr[i] -= colorChange;
          }
          else {
            rgbArr[i] = 0;
          }
        }
        square.style.backgroundColor = "rgb(" + rgbArr[0] + ", " + rgbArr[1] + ", " + rgbArr[2] + ")";
      }
    });
  });
};

squareSetup(squaresPerLine);