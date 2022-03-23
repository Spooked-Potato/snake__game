const btn_on = document.querySelector(".button_top");
const btn_off = document.querySelector(".btn__off");


btn_on.addEventListener("click", function () {
    document.getElementById("overlay").style.display = "block";
    console.log("hey");
})

var rows = 11;
var columns = 11;

gridContainer = document.getElementById('gridContainer');
for (let rowNumber = 0; rowNumber < rows; rowNumber++) {

    console.log("ola");
    var row = document.createElement('div');
    row.classList.add('row');
    gridContainer.appendChild(row);

    for (let colNumber = 0; colNumber < columns; colNumber++) {
        var gridItem = document.createElement('div');
        row.appendChild(gridItem);
        gridItem.classList.add('gridItem');
        gridItem.id = `${rowNumber}-${colNumber}`;
    }
}

btn_off.addEventListener("click", function () {
    document.getElementById("overlay").style.display = "none";
    console.log("Goodbye");
})



