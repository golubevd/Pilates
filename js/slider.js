'use strict';
(function(){
const leftSlideArrow = document.querySelector('#left');
const rigthSlideArrow = document.querySelector('#right');
const slides = document.querySelectorAll('.slide');
const sliderWrapper= document.querySelector('.slider-wrapper');
const btnShowTarifs = document.querySelector('.btn-main');
const radioDots = document.querySelectorAll('.radio');
const closeFormBtn = document.querySelector('.close-form-btn');
const formModal = document.querySelector('.write-popup');
const tarifsBtn = document.querySelectorAll('.btn-tarifs');
const tarifsBtnNav =document.querySelector('#tarifs-link');
const reviewsSlideBtn =document.querySelector('#reviews-link');
const formContainer = document.querySelector('.callback-form');
const inputs = formContainer.querySelectorAll('input');
const showNavMenuBtn = document.querySelector('.burger-menu-btn');
const navigationPanel = document.querySelector('.site-navigation');
const btnClose = document.querySelector('.closeMenu');


let activeSlide = 0;
let width;

/*Инициализация слайдера*/

function init(){
  width = document.querySelector('.slider').offsetWidth;
  sliderWrapper.style.width = width*slides.length + 'px';
  slides.forEach(item => {
    item.style.width = width + 'px';
    item.style.height = 'auto';
  });
  rollSlider();
}

function rollSlider(){
  sliderWrapper.style.transform = 'translate(-'+activeSlide*width+ 'px';
}

function rollRight() {
  activeSlide++;

  if (activeSlide > slides.length - 1) {
    activeSlide = 0;
  }
  
  setActiveSlide(activeSlide);
  setActiveDots(activeSlide);
  rollSlider();
};

function rollLeft(){
  activeSlide--;

  if (activeSlide < 0) {
    activeSlide = slides.length - 1;
  }

  setActiveSlide(activeSlide);
  setActiveDots(activeSlide);
  rollSlider();
};

function setActiveSlide(n) {
  slides.forEach((slide) => {
    slide.classList.remove("slide--active");
  });
  slides[n].classList.add("slide--active");
}

function setActiveDots(n) {
  radioDots.forEach((dot) => {
    dot.classList.remove("slide--active");
  });
  radioDots[n].classList.add("slide--active");
  rollSlider();  
}

radioDots.forEach((item, indexDot) => {
  item.addEventListener('click', ()=>{
    activeSlide = indexDot;
    setActiveSlide(activeSlide);
    setActiveDots(activeSlide);
  })
  
})


rigthSlideArrow.addEventListener('click',rollRight);
leftSlideArrow.addEventListener('click',rollLeft);

/*Прокрутка к блоку при клике по ссылке */

function slideToBlock(item){
  item.addEventListener("click",(e)=>{
    e.preventDefault();
    const blockID = item.getAttribute('href');
    document.querySelector(" " + blockID).scrollIntoView({
      behavior:'smooth',
      block: 'start'
    })
    })
}

/*Модальное окно формы */

function showModal(e){
  e.preventDefault();
  if(formModal){
    formModal.classList.add('form-show');
  }
  else retutn;
}

tarifsBtn.forEach((button)=>{
button.addEventListener('click',showModal);
});

function closeForm(){
  closeFormBtn.addEventListener('click', ()=>{
    if(formModal.classList.contains('form-show')){
      formModal.classList.remove('form-show');
      resetInputs(inputs);
    }
    else return;
  })
}


function resetInputs(elements){
  elements.forEach((element)=>{
    element.value='';
  })
  return;
}

/*Показать меню навигации*/

function showMenu(){
  navigationPanel.classList.toggle('menu-show');
 }

btnClose.addEventListener('click',()=>{
  navigationPanel.classList.remove('menu-show');    
});

let navigationHeght = navigationPanel.offsetHeight;
  
window.addEventListener('scroll', function(){
  if(window.scrollY > navigationHeght + 500){
    navigationPanel.classList.remove('menu-show');  
   }
})


/*Вызов функций */

slideToBlock(btnShowTarifs);
slideToBlock(tarifsBtnNav);
slideToBlock(reviewsSlideBtn);
showNavMenuBtn.addEventListener('click', showMenu);

closeForm();
window.addEventListener('resize', init);
init();

})();