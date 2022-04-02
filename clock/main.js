(function () {
  function setClock() {
    const date = new Date();

    const second = date.getSeconds();
    const secondDegree = (second / 60) * 360;
    const secondHand = document.querySelector(".secondhand");
    secondHand.style.transform = `rotate(${secondDegree}deg)`;

    const minute = date.getMinutes();
    const minuteDegree = (minute / 60) * 360 + (second / 60) * 6;
    const minuteHand = document.querySelector(".minutehand");
    minuteHand.style.transform = `rotate(${minuteDegree}deg)`;

    const hour = date.getHours();
    const hourDegree = (hour / 12) * 360 + (minute / 60) * 6;
    const hourHand = document.querySelector(".hourhand");
    hourHand.style.transform = `rotate(${hourDegree}deg)`;
  }
  setInterval(setClock, 1000);
  setClock();
})();
