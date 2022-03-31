const btn_on = document.querySelector(".button_top");
const btn_off = document.querySelector(".btn__off");
const rows = document.querySelector(".row__grid").value;
const column = document.querySelector(".colum__grid").value;

console.log("1 rows:", rows);
// var rows = 50;
// var columns = 50;

submit.onclick = () => {
  gridContainer.style.backgroundColor = grid__color.value;
  snakeContainer.style.backgroundColor = snake__color.value;
  foodContainer.style.backgroundColor = food__color.value;
  console.log("2 rows:", rows);
  // rows = snake__color.value;
  // columns = food__color.value;
};

btn_on.addEventListener("click", function () {
  document.getElementById("overlay").style.display = "block";
});

gridContainer = document.getElementById("gridContainer");
for (let rowNumber = 0; rowNumber < rows; rowNumber++) {
  var row = document.createElement("div");
  row.classList.add("row");
  gridContainer.appendChild(row);

  for (let colNumber = 0; colNumber < columns; colNumber++) {
    var gridItem = document.createElement("div");
    row.appendChild(gridItem);
    gridItem.classList.add("gridItem");
    gridItem.id = `${rowNumber}-${colNumber}`;
  }
}

// function MudarTamanho() { };
// rows.addEventListener("input", MudarTamanho);
// column.addEventListener("input", MudarTamanho);
// MudarTamanho();

let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      break;

    case "ArrowDown":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      break;

    case "ArrowLeft":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;

    case "ArrowRight":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
  }
});

btn_off.addEventListener("click", function () {
  document.getElementById("overlay").style.display = "none";
});
