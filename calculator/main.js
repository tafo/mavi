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
    } else if (resultPanel.innerHTML.length < 9) {
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
        previousOperator = null;
        previousResult = 0;
        operatorFlag = false;
        historyPanel.innerHTML = "";
        resultPanel.innerHTML = "0";
        break;
      case "CE":
        if (resultPanel.innerHTML === "0") {
          return;
        } else if (resultPanel.innerHTML.length === 1) {
          resultPanel.innerHTML = "0";
        } else {
          const result = resultPanel.innerHTML;
          resultPanel.innerHTML = result.substring(0, result.length - 1);
        }
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
