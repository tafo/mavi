(() => {
  const keyboard = document.querySelector(".keyboard");
  const resultPanel = document.querySelector(".result");
  const historyPanel = document.querySelector(".history");

  let previousOperator = null;
  let previousResult = 0;
  let operatorFlag = false;

  const onNumberClick = (value) => {
    if (resultPanel.innerText === "0") {
      resultPanel.innerText = value;
    } else if (operatorFlag) {
      resultPanel.innerText = value;
      operatorFlag = false;
    } else if (resultPanel.innerText.length < 9) {
      resultPanel.innerText += value;
    }
  };

  const CalculateResult = () => {
    switch (previousOperator) {
      case null:
        previousResult = new Number(resultPanel.innerText);
        break;
      case "/":
        previousResult /= new Number(resultPanel.innerText);
        break;
      case "X":
        previousResult *= new Number(resultPanel.innerText);
        break;
      case "-":
        previousResult -= new Number(resultPanel.innerText);
        break;
      case "+":
        previousResult += new Number(resultPanel.innerText);
        break;
    }
  };

  const setState = (operator) => {
    CalculateResult();
    operatorFlag = true;
    previousOperator = operator;
    historyPanel.innerText = previousResult + previousOperator;
    resultPanel.innerText = previousResult;
  };

  const onOperatorClick = (operator) => {
    switch (operator) {
      case "C":
        previousOperator = null;
        previousResult = 0;
        operatorFlag = false;
        historyPanel.innerText = "";
        resultPanel.innerText = "0";
        break;
      case "CE":
        if (resultPanel.innerText === "0") {
          return;
        } else if (resultPanel.innerText.length === 1) {
          resultPanel.innerText = "0";
        } else {
          const result = resultPanel.innerText;
          resultPanel.innerText = result.substring(0, result.length - 1);
        }
        break;
      case "=":
        CalculateResult();
        historyPanel.innerText += resultPanel.innerText + "=";
        resultPanel.innerText = previousResult;
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
    onButtonClick(event.target.innerText);
  };

  keyboard.addEventListener("click", onClick);
})();
