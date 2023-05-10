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
      // square.innerText = count;
      square.style.fontSize = "8px";
      square.style.textAlign = "center";
    }
  }
  squareEvent();
};

squareSetup(20);

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
        square.style.backgroundColor = "rgb(255, 0, 0)";
      }
      else {
        let colorChange = 20;
        let regex = /\d+/g;
        let rgbArr = bgColor.match(regex);
        for (let i = 0; i < rgbArr.length; i++) {
          parseInt(rgbArr[i]);
          if ((rgbArr[i] - colorChange) >= 0) {
            rgbArr[i] -= colorChange;
          }
          else {
            rgbArr[i] = 0;
          }
        }
        square.style.backgroundColor = "rgb("+rgbArr[0]+", "+rgbArr[1]+", "+rgbArr[2]+")";
      }
    });
  });
};

// let regex = /\d+/g;
// let str = "rgb(255,0,0)";
// let x = str.match(regex);
// console.log(parseInt(x[1]));