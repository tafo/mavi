(() => {
  const keyboard = document.querySelector(".keyboard");
  const resultPanel = document.querySelector(".result");
  const historyPanel = document.querySelector(".history");

  let previousOperator = null;
  let previousResult = 0;
  let operatorFlag = false;

  const onNumberClick = (value) => {
    if (resultPanel.textContent === "0") {
      resultPanel.textContent = value;
    } else if (operatorFlag) {
      resultPanel.textContent = value;
      operatorFlag = false;
    } else if (resultPanel.textContent.length < 9) {
      resultPanel.textContent += value;
    }
  };

  const CalculateResult = () => {
    switch (previousOperator) {
      case null:
        previousResult = new Number(resultPanel.textContent);
        break;
      case "/":
        previousResult /= new Number(resultPanel.textContent);
        break;
      case "X":
        previousResult *= new Number(resultPanel.textContent);
        break;
      case "-":
        previousResult -= new Number(resultPanel.textContent);
        break;
      case "+":
        previousResult += new Number(resultPanel.textContent);
        break;
    }
  };

  const setState = (operator) => {
    CalculateResult();
    operatorFlag = true;
    previousOperator = operator;
    historyPanel.textContent = previousResult + previousOperator;
    resultPanel.textContent = previousResult;
  };

  const onOperatorClick = (operator) => {
    switch (operator) {
      case "C":
        previousOperator = null;
        previousResult = 0;
        operatorFlag = false;
        historyPanel.textContent = "";
        resultPanel.textContent = "0";
        break;
      case "CE":
        if (resultPanel.textContent === "0") {
          return;
        } else if (resultPanel.textContent.length === 1) {
          resultPanel.textContent = "0";
        } else {
          const result = resultPanel.textContent;
          resultPanel.textContent = result.substring(0, result.length - 1);
        }
        break;
      case "=":
        CalculateResult();
        historyPanel.textContent += resultPanel.textContent + "=";
        resultPanel.textContent = previousResult;
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
  };

  const onClick = (event) => {
    onButtonClick(event.target.textContent);
  };

  keyboard.addEventListener("click", onClick);
})();
