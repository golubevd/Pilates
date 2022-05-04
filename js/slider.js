const leftSlideArrow = document.querySelector('#left');
const rigthSlideArrow = document.querySelector('#right');
const slides = document.querySelectorAll('.slide');
const sliderWrapper= document.querySelector('.slider-wrapper');
const btnShowTarifs = document.querySelector('.btn-main');
const radioDots = document.querySelectorAll('.radio');
const closeFormBtn = document.querySelector('.close-form-btn');
const formModal = document.querySelector('.form-wrapper');
const tarifsBtn = document.querySelectorAll('.btn-tarifs');
const tarifsBtnNav =document.querySelector('#tarifs-link');
const reviewsSlideBtn =document.querySelector('#reviews-link');
const formContainer = document.querySelector('.callback-form');
const inputs = formContainer.querySelectorAll('input');
console.log(inputs);

let activeSlide = 0;
let width;

function init(){
  width = document.querySelector('.slider').offsetWidth;
  sliderWrapper.style.width = width*slides.length + 'px';
  slides.forEach(item => {
    item.style.width = width + 'px';
    item.style.height = 'auto';
  });
  rollSlider();
}

window.addEventListener('resize', init);
init();


rigthSlideArrow.addEventListener("click", () => {
  activeSlide++;

  if (activeSlide > slides.length - 1) {
    activeSlide = 0;
  }
  
  setActiveSlide(activeSlide);
  setActiveDots(activeSlide);
  rollSlider();
});

leftSlideArrow.addEventListener("click", () => {
  activeSlide--;

  if (activeSlide < 0) {
    activeSlide = slides.length - 1;
  }

  setActiveSlide(activeSlide);
  setActiveDots(activeSlide);
  rollSlider();
});

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

function rollSlider(){
  sliderWrapper.style.transform = 'translate(-'+activeSlide*width+ 'px';
}

radioDots.forEach((item, indexDot) => {
  item.addEventListener('click', ()=>{
    activeSlide = indexDot;
    setActiveSlide(activeSlide);
    setActiveDots(activeSlide);
  })
  
})

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

slideToBlock(btnShowTarifs);
slideToBlock(tarifsBtnNav);
slideToBlock(reviewsSlideBtn);

closeForm();