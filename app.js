function bgColor() {    // generate colors
    return "#" + (Math.round(Math.random() * 16777215)).toString(16); }

    //let slideIndex = 1;
let slideIndex = Number(localStorage.getItem("slideIndex"));
    if(slideIndex === null){
        slideIndex = 1;
}

let slideCount = localStorage.getItem("slideCount");
if(slideCount === null){
    slideCount = 3;
}

window.addEventListener("load", () => {
    const isDark = localStorage.getItem("dark");
    if (isDark === "true"){
        document.body.classList.add("dark-mode");
    } 
    else{
        document.body.classList.remove("dark-mode");
    }})

const navMenu = document.getElementById("navigation");
navMenu.style.display = "none";

for(let i=1; i<= slideCount; i++){ // create first three slides
    if(i == slideIndex){
        createSlides(i, bgColor(), true);
        continue; } 
    createSlides(i, bgColor(), false);
}

function createSlides(text, backgroundcolor, isActive){
    const slide = document.createElement("div");
    slide.style.background = backgroundcolor;
    slide.classList.add("styledSlide");
    const num = document.createElement("div");
    num.classList.add("number");
    num.innerHTML = text;
    slide.appendChild(num);
        if(isActive){
            slide.classList.add("active");
    }
    document.getElementById("wrapSlide").appendChild(slide);
    }

function deleteSlides(){ // delete all slides
    document.querySelectorAll('.styledSlide').forEach(slides => slides.remove());
}

function resetSlideShow(){ // resetting, and creating 3 slides
    slideCount = 3;
    slideIndex = 1;
    for(let i=1; i<=slideCount; i++){ 
        if(i == slideIndex){
    createSlides(i, bgColor(), true);
        continue; } 
    createSlides(i, bgColor(), false);
}}

function changeSlide(n){ // change slide
    showSlide(slideIndex += n);
}

function showSlide(n){  // function to set active slide, carousel
    let slides = document.getElementsByClassName("styledSlide");
    if (n > slides.length){
        slideIndex = 1; 
    }
    if (n < 1){
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
          }
          
    slides[slideIndex-1].classList.add("active");
    localStorage.setItem("slideIndex", slideIndex); 
        }

document.getElementById("next").addEventListener("click", ()=>{  // click Next
    changeSlide(+1);
})

document.getElementById("previous").addEventListener("click", ()=>{ // click Previous
    changeSlide(-1);
})

document.getElementById("add").addEventListener("click", ()=>{ // add slide and set active
    let slides = document.getElementsByClassName("styledSlide");
    createSlides(slides.length+1, bgColor(), false);
    for (i = 0; i < slides.length; i++){
        slides[i].classList.remove("active");
  }
    slides[slides.length-1].classList.add("active");
    slideIndex = slides.length;
    localStorage.setItem("slideIndex", slideIndex);
    ++slideCount;
    localStorage.setItem("slideCount", slideCount);
})

document.getElementById("mode").addEventListener("click", ()=>{ // dark mode
    const isDark= document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark", isDark);
})

document.getElementById("swap").addEventListener("click", ()=>{ // reset
      deleteSlides();
      resetSlideShow();
      slideCount = 3;
      slideIndex = 1;
      localStorage.setItem("slideIndex", 1);
      localStorage.setItem("slideCount", 3);
})

document.getElementById("menu").addEventListener("click", ()=>{
    const element = document.getElementById("navigation");
    if(element.style.display === "flex"){
        element.style.display = "none";
    }
    else{
        element.style.display = "flex";
    }
})

document.getElementById("close").addEventListener("click", ()=>{
    const menu = document.getElementById("navigation");
    if(menu.style.display === "none"){
    menu.style.display = "flex";
    }
    else{
    menu.style.display = "none";
    }
})

