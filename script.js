const gridContainer = document.getElementById("grid-container");
const button = document.getElementById("button");
const buttonReset = document.getElementById("button-reset");
const buttonGridResize = document.getElementById("button-grid-resize");
const slider = document.getElementById("slider");
const sliderValue = document.getElementsByClassName("slider-value");
let inputContainer = document.getElementById("input-container");
let buttonBevelContainer = document.getElementById("button-bevel-container");
// let btnBevel1 = document.getElementsByClassName("btn-bevel1");
// let btnBevel2 = document.getElementsByClassName("btn-bevel2");
let inputValue = document.getElementById("input-value");
let currentGridSize = document.getElementById("current-grid-size");
let inputGridSize = document.getElementById("input-grid-size");
let gridContainerStyle = getComputedStyle(gridContainer);
let gridWidth = parseInt(gridContainerStyle.width.replace(/\D/g, ""));
let squaresPerLine = 50;
// let count = 0;

inputContainer.addEventListener("mouseenter", buttonHighlight);
inputContainer.addEventListener("mouseleave", buttonFade);
function buttonHighlight() {
  inputContainer.className = "btn-hover btn-bevel-highlight";
};
function buttonFade() {
  inputContainer.className = "";
}

currentGridSize.innerText = inputGridSize.value + " x " + inputGridSize.value;
inputValue.innerText = " x " + inputGridSize.value;

inputGridSize.addEventListener("input", inputGridSizeField);
function inputGridSizeField(e) {
  // console.log(e.target.value);
  e.target.value = e.target.value.slice(0,2);
  if (e.target.value < 20) {
    inputValue.innerText = " x " + 20;
  }
  else if (e.target.value > 80) {
    inputValue.innerText = " x " + 80;
  }
  else {
    inputValue.innerText = " x " + e.target.value;
  }
}

// for (let i in sliderValue) {
//   sliderValue[i].innerText = " x " + slider.value;
// }
// sliderValue.innerText = slider.value + " x " + slider.value;
// function changeSliderText() {
  // sliderValue.innerText = slider.value + " x " + slider.value;
//   for (let i in sliderValue) {
//     sliderValue[i].innerText = slider.value + " x " + slider.value;
//   }
// };

// slider.addEventListener("input", changeSliderText);
// slider.addEventListener("mouseup", changeGridSizeSlider);
// slider.addEventListener("keyup", changeGridSizeSlider);
buttonGridResize.addEventListener("click", changeGridSize);

function changeGridSize() {
  // let value = parseInt(slider.value);
  let value = parseInt(inputGridSize.value);
  if (value !== squaresPerLine && value >= 20 && value <= 80) {
    removeAllChildNodes(gridContainer);
    squareSetup(value);
  }
  else if (value < 20) {
    removeAllChildNodes(gridContainer);
    squareSetup(20);
    inputGridSize.value = 20;
  }
  else if (value > 80) {
    removeAllChildNodes(gridContainer);
    squareSetup(80);
    inputGridSize.value = 80;
  }
  currentGridSize.innerText = inputGridSize.value + " x " + inputGridSize.value;
  // currentGridSize.innerText = slider.value + " x " + slider.value;
  
};

// Change number of squares per line based on user input
// function changeLineCount() {
//   let lineCount = prompt("Number of squares per line (1 - 100):", "");
//   if (lineCount > 0 && lineCount < 101) {
//     removeAllChildNodes(gridContainer);
//     // count = 0;
//     squareSetup(lineCount);
//   }
//   else {
//     changeLineCount();
//   }
// };

/* Removes all squares then sets up the same number of squares per line
giving the effect of "erasing" the board */
function gridReset() {
  removeAllChildNodes(gridContainer);
  squareSetup(squaresPerLine);
};

// button.addEventListener("click", changeLineCount);
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!
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