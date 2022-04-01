(function () {
  function setClock() {
    let date = new Date();

    let second = date.getSeconds();
    let secondDegree = (second / 60) * 360;
    const secondHand = document.querySelector(".secondhand");
    secondHand.style.transform = `rotate(${secondDegree}deg)`;

    let minute = date.getMinutes();
    let minuteDegree = (minute / 60) * 360 + (second / 60) * 6;
    const minuteHand = document.querySelector(".minutehand");
    minuteHand.style.transform = `rotate(${minuteDegree}deg)`;

    let hour = date.getHours();
    let hourDegree = (hour / 12) * 360 + (minute / 60) * 6;
    const hourHand = document.querySelector(".hourhand");
    hourHand.style.transform = `rotate(${hourDegree}deg)`;
  }
  setInterval(setClock, 1000);
  setClock();
})();
