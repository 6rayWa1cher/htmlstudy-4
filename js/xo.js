"use strict";
// alert("Hello world!");
let isXNow = true;
let exited = false;
let field = "000|000|000";
const regex = /^cell_(\d)_(\d)$/m;

function getCurrCharacter() {
  return 1 + isXNow;
}

function alertWinner() {
  alert(isXNow ? "Крестики выиграли" : "Нолики выиграли");
}

function checkWinCondition() {
  let currCharacter = getCurrCharacter();
  const rowRegex = new RegExp(`(${currCharacter})\\1\\1`, 'm');
  if (rowRegex.exec(field) !== null) {
    const pos = rowRegex.exec(field).index;
    document.querySelectorAll(".row_" + (parseInt(pos / 4) + 1)).forEach(elem => {
      elem.style.backgroundColor = "yellow";
    });
    exited = true;
    alertWinner()
    return;
  }
  const colRegex = new RegExp(
    `^(${currCharacter})..\\|\\1..\\|\\1..$|^.(${currCharacter}).\\|.\\2.\\|.\\2.$|^..(${currCharacter})\\|..\\3\\|..\\3`, 'm')
  if (colRegex.exec(field) !== null) {
    let m = colRegex.exec(field);
    let pos;
    if (m['1'] !== undefined) {
      pos = 1;
    } else if (m['2'] !== undefined) {
      pos = 2;
    } else {
      pos = 3;
    }
    document.querySelectorAll(".col_" + pos).forEach(elem => {
      elem.style.backgroundColor = "yellow";
    });
    exited = true;
    alertWinner()
    return;
  }
  if (field[0] == currCharacter && field[5] == currCharacter && field[10] == currCharacter) {
    document.getElementById("cell_1_1").style.backgroundColor = "yellow";
    document.getElementById("cell_2_2").style.backgroundColor = "yellow";
    document.getElementById("cell_3_3").style.backgroundColor = "yellow";
    exited = true;
    alertWinner()
    return;
  }
  if (field[2] == currCharacter && field[5] == currCharacter && field[8] == currCharacter) {
    document.getElementById("cell_1_3").style.backgroundColor = "yellow";
    document.getElementById("cell_2_2").style.backgroundColor = "yellow";
    document.getElementById("cell_3_1").style.backgroundColor = "yellow";
    exited = true;
    alertWinner()
    return;
  }
  if (!field.includes("0")) {
    exited = true;
    alert("Draw!");
    return;
  }
}

function onClick(buttonId, buttonElem) {
  buttonElem.innerHTML = '';
  let active = true;
  const m = regex.exec(buttonId);
  const yPosition = parseInt(m[1]) - 1;
  const xPosition = parseInt(m[2]) - 1;
  const strPosition = (yPosition) * 4 + xPosition;

  function innerFunc() {
    if (!active || exited) {
      return;
    }
    field = field.substring(0, strPosition) + String(getCurrCharacter()) +
      field.substring(strPosition + 1);
    console.log(field);
    buttonElem.innerHTML = isXNow ? 'X' : 'O';
    checkWinCondition();
    isXNow = !isXNow;
    active = false;
  }
  return innerFunc;
}

let buttons = document.getElementsByTagName('td');
for (var i = 0; i < buttons.length; i++) {
  const buttonId = buttons[i].id;
  buttons[i].addEventListener('click', onClick(buttonId, buttons[i]));
}
