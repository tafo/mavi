const menuIcon = document.querySelector(".menu-icon");
const lines = document.querySelectorAll(".line");

const onMenuClick = () => {
  menuIcon.classList.toggle("active");
  lines.forEach((line) => line.classList.remove("initial"));
};

menuIcon.addEventListener("click", onMenuClick);
