const btn_on = document.queryselector(".btn__on");
const btn_off = document.queryselector(".btn__off");



//alert("Hello world!");

// function off() {
//     document.getElementById("overlay").style.display = "none";
// }

btn_on.addEventListener("click", function () {
    document.getElementById("overlay").style.display = "block";
    console.log("hey");
})

btn_off.addEventListener("click", function () {
    document.getElementById("overlay").style.display = "none";
    console.log("Goodbye");
})  