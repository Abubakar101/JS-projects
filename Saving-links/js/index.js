const body = document.body;
const Input = document.querySelector(".new");
const backgroundImage = document.querySelector(".background-image");
const box = document.querySelector(".box");

const inputBox = document.querySelector(".text");
const button = document.querySelector(".btn");
const bookmarkList = document.querySelector(".bookmarkList");
let dataStorage = [];

var state = {
  inputActive: false
};

function addInput1() {
  Input.classList.add("inputClass");
  backgroundImage.style.opacity = "0.3";
  backgroundImage.style.filter = "grayscale(50%)";

  box.classList.add("newBox");
  inputBox.classList.add("newText");
  button.classList.add("newButton");

  state.inputActive = true;

  if (document.querySelectorAll(".bookmark").length >= 0) {
    let bookmark = document.querySelectorAll(".bookmark");
    let close = document.querySelectorAll(".close");
    for (var i = 0; i < bookmark.length; i++) {
      bookmark[i].style.color = "#D3D3D3";
      close[i].style.color = "#D3D3D3";
    }
  }
}

function removeInput1() {
  if (state.inputActive) {
    Input.classList.remove("inputClass");
    backgroundImage.style.opacity = "1";
    backgroundImage.style.filter = "grayscale(0%)";

    box.classList.remove("newBox");
    inputBox.classList.remove("newText");
    button.classList.remove("newButton");

    state.inputActive = false;

    if (document.querySelectorAll(".bookmark").length >= 0) {
      let bookmark = document.querySelectorAll(".bookmark");
      let close = document.querySelectorAll(".close");
      for (var i = 0; i < bookmark.length; i++) {
        bookmark[i].style.color = "red";
        close[i].style.color = "";
      }
    }
  }
}

Input.addEventListener("focusin", addInput1);
Input.addEventListener("focusout", removeInput1);

//=============================================================
// Creating a NEW DIV for INPUT
//=============================================================
function addItemToHTML(item) {
  let crossButton = document.createElement("BUTTON");
  let temp_div = document.createElement("div");
  let link = document.createElement("a");
  

  temp_div.className = "bookmark";
  link.innerText = item.title;
  link.target = "_blank";
  link.href = "http://" + item.title;
  temp_div.appendChild(link);
  temp_div.style.textDecoration = "none";

  crossButton.className = "close";
  crossButton.innerHTML = "&times;";

  temp_div.appendChild(crossButton);
  bookmarkList.insertBefore(temp_div, bookmarkList.childNodes[0]);

  crossButton.addEventListener("click", function () {
    bookmarkList.removeChild(temp_div);
    dataStorage = dataStorage.filter(function (x) {
      return x !== item;
    });
    updateLocalStorage();
  });
}

function dataSubmit(e) {
  e.preventDefault();
  if (inputBox.value.trim() !== "") {
    let input_text = inputBox.value;
    inputBox.value = "";

    let item = {
      title: input_text
    };

    addItemToHTML(item);
    dataStorage.push(item);
    updateLocalStorage();
  } else {
    removeInput1();
  }
}

function updateLocalStorage() {
  localStorage.setItem("bookmarks", JSON.stringify({
    items: dataStorage
  }));
}
button.addEventListener("click", dataSubmit);

//=============================================================
// Data
//=============================================================

var local_str = localStorage.getItem("bookmarks");
dataStorage = (JSON.parse(local_str) || {}).items || [];

dataStorage.forEach(x => addItemToHTML(x));
