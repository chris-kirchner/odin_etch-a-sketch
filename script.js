const gridContainer = document.getElementById("grid-container");
const bgContainer = document.getElementById("bg-container");
let bgSquare = document.getElementsByClassName("bg-square");
let titleContainer = document.getElementById("title-container");
let titleBevel = document.getElementsByClassName("title-bevel");
const button = document.getElementById("button");
const buttonReset = document.getElementById("button-reset");
const buttonGridResize = document.getElementById("button-grid-resize");
const slider = document.getElementById("slider");
const sliderValue = document.getElementsByClassName("slider-value");
let buttonContainer = document.getElementsByClassName("button-container");
let buttonBevelContainer = document.getElementById("button-bevel-container");
let inputValue = document.getElementById("input-value");
let currentGridSize = document.getElementById("current-grid-size");
let inputGridSize = document.getElementById("input-grid-size");
let currentGridSizeText = document.getElementById("current-grid-size-text");
let gridContainerStyle = getComputedStyle(gridContainer);
let gridWidth = parseInt(gridContainerStyle.width.replace(/\D/g, ""));
let squaresPerLine = 50;

/* Mouse enter/leave listeners for title container */
titleContainer.addEventListener("mouseenter", bevelShadowOff);
titleContainer.addEventListener("mouseleave", bevelShadowOn);

/* Adds className to title bevel container changing css style of drop shadow */
function bevelShadowOff() {
  titleBevel[0].className = "title-bevel title-hover";
};

/* Returns className of title bevel container to default css style */
function bevelShadowOn() {
  titleBevel[0].className = "title-bevel";
};

/* Event listeners for changing button color on mouse enter and leave */
for (let i = 0; i < buttonContainer.length; i++) {
  buttonContainer[i].addEventListener("mouseenter", buttonHighlight);
  buttonContainer[i].addEventListener("mouseleave", buttonFade);
};

/* Event listener setup for buttonContainer[0] and the input field
that exists on top of it */
buttonContainer[0].addEventListener("mouseenter", inputScaleMouseEnter);
buttonContainer[0].addEventListener("mouseleave", inputScaleMouseLeave);
buttonContainer[0].addEventListener("mouseup", inputScaleMouseUp);
buttonContainer[0].addEventListener("mousedown", inputScaleMouseDown);
inputGridSize.addEventListener("mouseenter", inputMouseEnter);
inputGridSize.addEventListener("mouseleave", inputMouseLeave);

/* On mouse enter, handles the style to scale the input field
and position it correctly */
function inputScaleMouseEnter() {
  inputGridSize.style.transform = "scale(1.02)";
  inputGridSize.style.transition = "transform 0.4s, left 0.3s";
  inputGridSize.style.left = "178.6px";
};

/* On mouse leave, scales and positions the input field */
function inputScaleMouseLeave() {
  inputGridSize.style.transform = "scale(1.0)";
  inputGridSize.style.transition = "transform 0.4s ease-out, left 0.3s ease-out";
  inputGridSize.style.left = "177px";
};

/* On mouse up, scales and positions the input field */
function inputScaleMouseUp() {
  inputGridSize.style.transform = "scale(1.02)";
  inputGridSize.style.transition = "transform 0.3s, left 0.2s";
  inputGridSize.style.left = "178.3px";
};

/* On mouse down, scales and positions the input field */
function inputScaleMouseDown() {
  inputGridSize.style.transform = "scale(1.0)";
  inputGridSize.style.left = "177px";
  inputGridSize.style.transition = "transform 0.15s, left 0.15s";
};

/* On mouse enter, maintains the correct scaling and position for
the input field and keeps the button the correct scale */
function inputMouseEnter() {
  inputGridSize.style.transform = "scale(1.02)";
  inputGridSize.style.left = "178.3px";
  buttonContainer[0].style.transform = "scale(1.02)";
};

/* On mouse leave, removes transform style from buttonContainer[0] */
function inputMouseLeave() {
  buttonContainer[0].style.transform = "";
};

/* Adds a hover and highlight class to trigger color change in css */
function buttonHighlight(e) {
  e.target.className = "button-container btn-hover btn-bevel-highlight";
};

/* Removes hover and highlight class to trigger color change in css */
function buttonFade(e) {
  e.target.className = "button-container";
};

/* Takes values and formats them for display in the 
#current-grid-size html <span> element */
currentGridSize.innerText = inputGridSize.value + " x " + inputGridSize.value;

/* Changes the string value on the grid size change button 
to the right of the input field */
inputValue.innerText = " x " + inputGridSize.value;

/* Event listener for any input in the input field*/
inputGridSize.addEventListener("input", inputGridSizeField);

/* Mouse enter event listener for the input field */
inputGridSize.addEventListener("mouseenter", buttonHighlight2);

/* Adds class names specifically to buttonContainer[0] giving it a hover style */
function buttonHighlight2() {
  buttonContainer[0].className = "button-container btn-hover btn-bevel-highlight";
};

/* Limits the user input field to 2 characters (which is restricted to numbers only via html),
checks and enforces a minimum input value of 20 and maximum of 80 */
function inputGridSizeField(e) {
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
};

/* Click event listener for the grid size change button */
buttonGridResize.addEventListener("click", changeGridSize);

/* Sets up a new grid based on the value in the user input field
as long as it is not the same value as previously entered.
Will also call the function to change the current grid size text value. */
function changeGridSize() {
  let value = parseInt(inputGridSize.value);
  if (value !== squaresPerLine && value >= 20 && value <= 80) {
    currentGridSizeHighlight();
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
};

/* Adds text-highlight class to currentGridSize then delays the call
to remove the class, giving the effect of text changing color briefly,
then returning to the original color */
function currentGridSizeHighlight() {
  currentGridSize.className = "text-highlight";
  setTimeout(currentGridSizeFade, 500);
}

/* Removes text-highlight class */
function currentGridSizeFade() {
  currentGridSize.className = "";
}

/* Click event listener for the "erase and start over" button */
buttonReset.addEventListener("click", gridReset);

/* Removes all child nodes of gridContainer then sets up the same
number of squares per line giving the effect of "erasing" the grid */
function gridReset() {
  removeAllChildNodes(gridContainer);
  squareSetup(squaresPerLine);
};

/* Removes all children of a parent container */
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

/* Populates gridContainer with squares that scale to fit within
the max width of the gridContainer */
function squareSetup(lineCount) {
  squaresPerLine = parseInt(lineCount);
  const containerSize = gridWidth / lineCount;
  for (let i = 0; i < lineCount; i++) {
    for (let j = 0; j < lineCount; j++) {
      const square = document.createElement("div");
      square.className += "square";
      square.style.height = containerSize + "px";
      square.style.width = containerSize + "px";
      gridContainer.appendChild(square);
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
        let rgbArray = bgColor.match(numRegex);
        for (let i = 0; i < rgbArray.length; i++) {
          parseInt(rgbArray[i]);
          if ((rgbArray[i] - colorChange) >= 0) {
            rgbArray[i] -= colorChange;
          }
          else {
            rgbArray[i] = 0;
          }
        }
        square.style.backgroundColor = "rgb(" + rgbArray[0] + ", " + rgbArray[1] + ", " + rgbArray[2] + ")";
      }
    });
  });
};

/* Setup function for the background: creates squares and randomizes
opacity values for each square, then calls the grid setup (squareSetup) function */
function bgSquareSetup(num) {
  squaresPerLine = parseInt(num);
  const containerSize = window.innerWidth / num;
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      const square = document.createElement("div");
      square.className += "bg-square";
      square.style.height = containerSize + "px";
      square.style.width = containerSize + "px";
      bgContainer.appendChild(square);
    }
  }
  for (let i = 0; i < bgSquare.length; i++) {
    bgSquare[i].style.opacity = Math.round(Math.random() * 10) / 10;
  }
  squareSetup(50);
};

bgSquareSetup(2);