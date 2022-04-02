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
