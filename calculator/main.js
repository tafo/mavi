(() => {
  const keyboard = document.querySelector(".keyboard");
  const resultPanel = document.querySelector(".result");
  const historyPanel = document.querySelector(".history");

  let previousOperator = null;
  let previousResult = 0;
  let operatorFlag = false;

  const onNumberClick = (value) => {
    if (resultPanel.innerHTML === "0") {
      resultPanel.innerHTML = value;
    } else if (operatorFlag) {
      resultPanel.innerHTML = value;
      operatorFlag = false;
    } else {
      resultPanel.innerHTML += value;
    }
  };

  const CalculateResult = () => {
    switch (previousOperator) {
      case null:
        previousResult = new Number(resultPanel.innerHTML);
        break;
      case "/":
        previousResult /= new Number(resultPanel.innerHTML);
        break;
      case "X":
        previousResult *= new Number(resultPanel.innerHTML);
        break;
      case "-":
        previousResult -= new Number(resultPanel.innerHTML);
        break;
      case "+":
        previousResult += new Number(resultPanel.innerHTML);
        break;
    }
  };

  const setState = (operator) => {
    CalculateResult();
    operatorFlag = true;
    previousOperator = operator;
    historyPanel.innerHTML = previousResult + previousOperator;
    resultPanel.innerHTML = previousResult;
  };

  const onOperatorClick = (operator) => {
    switch (operator) {
      case "C":
        previousResult = 0;
        break;
      case "=":
        CalculateResult();
        historyPanel.innerHTML += resultPanel.innerHTML + "=";
        resultPanel.innerHTML = previousResult;
        previousOperator = null;
        previousResult = 0;
        break;
      case "/":
      case "X":
      case "-":
      case "+":
        setState(operator);
        break;
    }
  };

  const onButtonClick = (symbol) => {
    if (isNaN(parseInt(symbol))) {
      onOperatorClick(symbol);
    } else {
      onNumberClick(symbol);
    }
    // onRefreshResult();
  };

  const onClick = (event) => {
    onButtonClick(event.target.innerHTML);
  };

  keyboard.addEventListener("click", onClick);
})();
// let currentTotal = 0;
// let buffer = "0"; //what's on display

// let previousOperator = null;

// const calcScreen = document.querySelector(".calc-numbers");

// function handleSymbol(value){
//     switch (value){
//         case "C":
//             buffer = "0";
//             currentTotal = 0;
//             previousOperator = null;
//             break;
//         case "=":
//             if(previousOperator === null){ //this would mean that there is nothing to be calculated yet
//                 return;
//             }
//             flushOperation(parseInt(buffer));
//             buffer = "" + currentTotal;
//             previousOperator = null;
//             currentTotal = 0;
//             break;
//         case "←":
//             if(buffer.length === 1){ //if the screen is any single number, always turn it to 0 when deleting
//                 buffer = "0";
//             }
//             else{
//                 buffer = buffer.substring(0,buffer.length-1); //delete the numbers one by one
//             }
//             break;
//         default:
//             handleMath(value);
//             break;
//     }
// }

// function handleNumber(value){
//     if(buffer === "0"){
//         buffer = value;
//     }else{
//         buffer += value;
//     }
// }

// function handleMath(value){
//     const internalBuffer = parseInt(buffer);

//     if (currentTotal === 0){
//         currentTotal = internalBuffer;
//     }else{
//         flushOperation(internalBuffer);
//     }

//     previousOperator = value;

//     buffer = "0";
// }

// function flushOperation(internalBuffer){
//     if(previousOperator === "+"){
//         currentTotal += internalBuffer;
//     }else if(previousOperator === "-"){
//         currentTotal -= internalBuffer;
//     }else if(previousOperator === "x"){
//         currentTotal *= internalBuffer;
//     }else{
//         currentTotal /= internalBuffer;
//     }
// }

// function rerenderScreen(){
//     calcScreen.value = buffer;
// }
