(() => {
  const keyboard = document.querySelector(".keyboard");
  const resultPanel = document.querySelector(".result");
  const historyPanel = document.querySelector(".history");

  let previousOperator = null;
  let previousNumber = 0;
  let operatorFlag = false;
  let currentNumber = "0";

  const onNumberClick = (value) => {
    if (currentNumber === "0") {
      currentNumber = value;
    } else if (operatorFlag) {
      currentNumber = value;
      operatorFlag = false;
    } else if (currentNumber.length < 9) {
      currentNumber += value;
    }
  };

  const calculatePreviousResult = () => {
    const result = new Number(resultPanel.innerText);
    switch (previousOperator) {
      case null:
        previousNumber = result;
        break;
      case "/":
        previousNumber /= result;
        break;
      case "X":
        previousNumber *= result;
        break;
      case "-":
        previousNumber -= result;
        break;
      case "+":
        previousNumber += result;
        break;
    }
  };

  const onOperatorClick = (operator) => {
    switch (operator) {
      case "C":
        previousOperator = null;
        previousNumber = 0;
        operatorFlag = false;
        currentNumber = "0";
        break;
      case "CE":
        if (currentNumber === "0") {
          return;
        } else if (currentNumber.length === 1) {
          currentNumber = "0";
        } else {
          currentNumber = currentNumber.substring(0, currentNumber.length - 1);
        }
        break;
      case "=":
        calculatePreviousResult();
        previousOperator = null;
        break;
      case "/":
      case "X":
      case "-":
      case "+":
        calculatePreviousResult();
        operatorFlag = true;
        previousOperator = operator;
        break;
    }
  };

  const onRenderPanel = (symbol) => {
    if (symbol === "=") {
      historyPanel.innerHTML += currentNumber + "=";
      resultPanel.innerHTML = previousNumber;
      previousNumber = 0;
      currentNumber = 0;
    } else if (previousNumber === 0) {
      resultPanel.innerText = currentNumber;
    } else {
      historyPanel.innerText = previousNumber + previousOperator;
      resultPanel.innerText = currentNumber;
    }
  };

  const onButtonClick = (symbol) => {
    if (isNaN(parseInt(symbol))) {
      onOperatorClick(symbol);
    } else {
      onNumberClick(symbol);
    }
    onRenderPanel(symbol);
  };

  const onClick = (event) => {
    onButtonClick(event.target.innerText);
  };

  keyboard.addEventListener("click", onClick);
})();
