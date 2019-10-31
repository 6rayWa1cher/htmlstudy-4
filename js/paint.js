"use strict";
const paintfield = document.getElementById('paintfield');
let currColor = "red";

function changeHandler(event) {
  console.log(this);
  currColor = this.value;
}

let colorPicker = document.querySelectorAll(".color-picker input[type=radio]");
for (var i = 0; i < colorPicker.length; i++) {
  let inp = colorPicker[i];
  inp.addEventListener('change', changeHandler);
}

console.log(paintfield);
console.log(paintfield.offsetHeight);
console.log(paintfield.offsetWidth);
const table = document.getElementById('canvtable');
let metaPxWidth = parseInt(paintfield.offsetWidth / 20) - 1;
let metaPxHeight = parseInt(paintfield.offsetHeight / 20) - 1;
console.log(metaPxWidth);
console.log(metaPxHeight);
for (var i = 0; i < metaPxHeight; i++) {
  let tr = document.createElement('tr');
  table.append(tr);
  for (var j = 0; j < metaPxWidth; j++) {
    let td = document.createElement('td');
    // td.style.backgroundColor = (i + j) % 2 == 0 ? "red" : "blue";
    td.style.backgroundColor = "white";
    td.onmouseover = function(event) {
      let target = event.target;
      target.style.backgroundColor = currColor;
    };
    tr.append(td);
  }
}
