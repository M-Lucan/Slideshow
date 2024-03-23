function bgColor() { // generate colors
    return "#" + (Math.round(Math.random() * 16777215)).toString(16);
}

let slideIndex = Number(localStorage.getItem("slideIndex"));
if (slideIndex === null) {
    slideIndex = 1;
}

let slideCount = localStorage.getItem("slideCount");
if (slideCount === null) {
    slideCount = 3;
}

$(window).on("load", function() {
    const isDark = localStorage.getItem("dark");
    if (isDark === "true") {
        $("body").addClass("dark-mode");
    } else {
        $("body").removeClass("dark-mode");
    }
});

const navMenu = $("#navigation");
navMenu.css("display", "none");

for (let i = 1; i <= slideCount; i++) { // create first three slides
    if (i == slideIndex) {
        createSlides(i, bgColor(), true);
        continue;
    }
    createSlides(i, bgColor(), false);
}

function createSlides(text, backgroundcolor, isActive) {
    const slide = $("<div>").css("background", backgroundcolor).addClass("styledSlide");
    const num = $("<div>").addClass("number").html(text);
    slide.append(num);
    if (isActive) {
        slide.addClass("active");
    }
    $("#wrapSlide").append(slide);
}

function deleteSlides() { // delete all slides
    $(".styledSlide").remove();
}

function resetSlideShow() { // resetting, and creating 3 slides
    slideCount = 3;
    slideIndex = 1;
    for (let i = 1; i <= slideCount; i++) {
        if (i == slideIndex) {
            createSlides(i, bgColor(), true);
            continue;
        }
        createSlides(i, bgColor(), false);
    }
}

function changeSlide(n) { // change slide
    showSlide(slideIndex += n);
}

function showSlide(n) { // function to set active slide, carousel
    let slides = $(".styledSlide");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    slides.removeClass("active");
    slides.eq(slideIndex - 1).addClass("active");
    localStorage.setItem("slideIndex", slideIndex);
}

$("#next").on("click", function() { // click Next
    changeSlide(+1);
});

$("#previous").on("click", function() { // click Previous
    changeSlide(-1);
});

$("#add").on("click", function() { // add slide and set active
    let slides = $(".styledSlide");
    createSlides(slides.length + 1, bgColor(), true);
    slides = $(".styledSlide");
    slides.removeClass("active");
    slides.last().addClass("active");
    slideIndex = slides.length;
    localStorage.setItem("slideIndex", slideIndex);
    slideCount++;
    localStorage.setItem("slideCount", slideCount);
});

$("#mode").on("click", function() { // dark mode
    const isDark = $("body").toggleClass("dark-mode").hasClass("dark-mode");
    localStorage.setItem("dark", isDark);
});

$("#swap").on("click", function() { // reset
    deleteSlides();
    resetSlideShow();
    slideCount = 3;
    slideIndex = 1;
    localStorage.setItem("slideIndex", 1);
    localStorage.setItem("slideCount", 3);
});

$("#menu").on("click", function() {
    $("#navigation").toggle();
});

$("#close").on("click", function() {
    $("#navigation").toggle();
});
