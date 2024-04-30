const toggleElement = document.querySelector(".themes__toggle");
const toggleDarkTheme = () => {
  toggleElement.classList.toggle("themes__toggle--isActive");
};
const toggleDarkThemeWithEnter = (event) => {
  // event.key==="Enter" && toggleDarkTheme();
  if (event.key === "Enter") toggleDarkTheme();
};
// event.key==="Enter" && toggleDarkTheme
toggleElement.addEventListener("click", toggleDarkTheme);
toggleElement.addEventListener("keydown", toggleDarkThemeWithEnter);

// logic
let storedNumber = "";
let currentNumber = "";
let operation = "";

const resultElement = document.querySelector(".calc__result");
const keyElements = document.querySelectorAll("[data-type]");

const updateScreen = (value) => {
  resultElement.innerText = !value ? "0" : value;
};

const numberButtonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;

  currentNumber += value;
  updateScreen(currentNumber);
};

const resetButtonHandler = () => {
  currentNumber = "";
  storedNumber = "";
  operation = "";
  updateScreen(currentNumber);
};

const deleteButtonHandler=()=>{
  if (!currentNumber || currentNumber==="0") return;
  if(currentNumber.length===1) currentNumber="";
  else {
    currentNumber=currentNumber.substring(0,currentNumber.length-1)
  }
  updateScreen(currentNumber);
};

const executeOperation=()=>{
  if(currentNumber && storedNumber &&operation){
    switch(operation){
      case "+":
        storedNumber=parseFloat(storedNumber)+parseFloat(currentNumber);
        break;
      case "-":
        storedNumber=parseFloat(storedNumber)-parseFloat(currentNumber);
        break;
      case "*":
        storedNumber=parseFloat(storedNumber)*parseFloat(currentNumber);
        break;
      case "/":
        storedNumber=parseFloat(storedNumber)/parseFloat(currentNumber);
        break;
    }
    currentNumber="";
        updateScreen(storedNumber);
  }

};

const operationButtonHandler=(operationValue)=>{
  if(!currentNumber && !storedNumber)return;
  if (currentNumber && !storedNumber){
    storedNumber=currentNumber;
    currentNumber="";
    operation=operationValue;
  }
  else if (storedNumber){
    operation=operationValue;

    if (currentNumber) executeOperation();
  }
  console.log({currentNumber});
  console.log({storedNumber});
  console.log({operation});
};

const keyElmentsHandler = (element) => {
  element.addEventListener("click", () => {
    const type = element.dataset.type;
    if (type === "number") {
      numberButtonHandler(element.dataset.value);
    } else if (type === "operation") {
      switch (element.dataset.value) {
        case "c":
          resetButtonHandler();
          break;
        case "Backspace":
          deleteButtonHandler();
          break;
        case "Enter":
          executeOperation();
          break;
        default:
          operationButtonHandler(element.dataset.value)
      }
    }
  });
};

keyElements.forEach(keyElmentsHandler);

// Use keyboard as input source

const availableNumber=["0","1","2","3","4","5","6","7","8","9","."];
const availableOperation=["+","-","*","/"];
window.addEventListener("keydown",(event)=>{
  if(availableNumber.includes(event.key)){
    numberButtonHandler(event.key);
  }
  else if (availableOperation.includes(event.key)){
    operationButtonHandler(event.key);
  }
  else if (event.key==="backspace"){
  deleteButtonHandler();
  }
  else if (event.key==="Enter"){
    executeOperation();
  }

})
