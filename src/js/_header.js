
const headerJS = document.getElementById("header")
window.addEventListener("scroll", function(){
     const scroll = window.scrollY

     if (scroll > 90){
        headerJS.classList.add('header__scroll')
     }else{
      headerJS.classList.remove('header__scroll')
     }
});

const observer = new IntersectionObserver((entries) => {
   console.log(entries);
   entries.forEach((entry) => {
     if (entry.isIntersecting) {
       document.querySelectorAll('.nav__link').forEach((link) => {
         let id = link.getAttribute('href').replace('#', '');
         if (id === entry.target.id) {
           link.classList.add('nav__link-active');
         } else {
           link.classList.remove('nav__link-active');
         }
       });
     }
   });
 }, {
   threshold: 0.5
 });
 
 document.querySelectorAll('.section').forEach(section => { observer.observe(section)} );

document.querySelectorAll('.nav__link').forEach(link => {
   link.addEventListener("click", event => {
       event.preventDefault();
       
       const targetId = link.getAttribute("href").substr(1);
       const targetElement = document.getElementById(targetId);
       const scrollPos = targetElement.offsetTop;
       
       document.querySelector(".header").classList.remove("open");
       
       window.scrollTo({
           top: scrollPos,
           behavior: "smooth"
       });
   });
});
