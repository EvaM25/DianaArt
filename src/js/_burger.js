
const menuBurger = document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("burger").addEventListener("click", function () {
        document.querySelector("header").classList.toggle("open");
    });
  });
  
  document.getElementById("nav").addEventListener("click", event => {
    event._isClickWithInMenu = true;
  });
  
  document.getElementById("burger").addEventListener("click", event => {
    event._isClickWithInMenu = true;
  });
  
  const link = document.querySelector('.nav__link')
  link.addEventListener("click", event => {
    if (event._isClickWithInMenu) return;
    document.querySelector(".header").classList.remove("open")
    
  });

