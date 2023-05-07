const gridContainer = document.getElementById("grid-container");
// gridContainer.appendChild(square);
let count = 0;
const lineCount = 16;
for (let i = 0; i < lineCount; i++) {
  for (let j = 0; j < lineCount; j++) {
    count ++;
    const square = document.createElement("div");
    square.className += "square";
    gridContainer.appendChild(square);
    square.innerText = count;
  }
}

let squares = document.querySelectorAll(".square");

squares.forEach((square) => {
  square.addEventListener("mouseover", () => {
    square.classList.add("active");
  });
});