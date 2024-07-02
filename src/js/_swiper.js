
 const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    loop: true,
    centerSlide: true,
    fade: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
  
    breakpoints: {
        0: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 1,
        },
        1250: {
          slidesPerView: 1,
        }     
    },
  });

  

