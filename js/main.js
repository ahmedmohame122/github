/*===========================================================

   Template Name: Profily - Personal Portfolio Template
   Author: Rabea Alsabbagh
   Template URL: 
   Author URL: https://picalica.com/u/rabea_alsabbagh
   File Description : Main JS file of the template
===========================================================*/
/*------------------------------------
    Start Preloader
-------------------------------------- */
$(window).on('load', function () {
  $('.lds-ellipsis').fadeOut(); // will first fade out the loading animation
  $('.preloader').delay(333).fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').delay(333);
});

/*------------------------------------
    Start Fixed Header
-------------------------------------- */
window.onscroll = function () { fixedHeader() };

var header = document.querySelector("header");
var sticky = document.querySelector(".about").offsetTop;

function fixedHeader() {
  if (window.pageYOffset > sticky - 200) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}


/*------------------------------------
    Start Nav Menu
-------------------------------------- */
var ul = document.querySelector(".nav");
function nav() {
  if (ul.style.display === "flex") {
    header.style.background = "rgba(0, 0, 0, 0)";
    ul.style.top = "-100vh";
    setTimeout(() => { ul.style.display = "none"; }, 100);
    document.getElementById("menu-icon").classList.toggle('closed');
  } else {
    header.style.background = "rgba(0, 0, 0, 0.70)"
    ul.style.display = "flex";
    setTimeout(() => { ul.style.top = "72px"; }, 100);
    document.getElementById("menu-icon").classList.toggle('closed');
  }
}

var x = window.matchMedia("(max-width: 767px)")
function closeNav() {
  if (x.matches) { // If media query matches
    header.style.background = "rgba(0, 0, 0, 0)";
    ul.style.top = "-100vh";
    setTimeout(() => { ul.style.display = "none"; }, 100);
    document.getElementById("menu-icon").classList.toggle('closed');
  }
}
//****************************************
$(document).ready(function () {
  $('.filter li').click(function () {
    $('.filter li').removeClass('active');
    $(this).addClass('active');
  });
  var filterizd = $('.filtr-container').filterizr();
});
//****************************************

/*------------------------------------
    Start Highlight Navigation on scroll
-------------------------------------- */
var $navigationLinks = $('header ul li a');
var $navigationLists = $('header ul li');
// cache (in reversed order) the sections
var $sections = $($("section").get().reverse());

// map each section id to their corresponding navigation link
var sectionIdTonavigationLink = {};
$sections.each(function () {
  var id = $(this).attr('id');
  sectionIdTonavigationLink[id] = $('header ul li a[href=\\#' + id + ']');
});

// throttle function, enforces a minimum time interval
function throttle(fn, interval) {
  var lastCall, timeoutId;
  return function () {
    var now = new Date().getTime();
    if (lastCall && now < (lastCall + interval)) {
      // if we are inside the interval we wait
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        lastCall = now;
        fn.call();
      }, interval - (now - lastCall));
    } else {
      // otherwise, we directly call the function 
      lastCall = now;
      fn.call();
    }
  };
}

function highlightNavigation() {
  // get the current vertical position of the scroll bar
  var scrollPosition = $(window).scrollTop();

  // iterate the sections
  $sections.each(function () {
    var currentSection = $(this);
    // get the position of the section
    var sectionTop = currentSection.offset().top;

    // if the user has scrolled over the top of the section  
    if (scrollPosition >= sectionTop - 110) {
      // get the section id
      var id = currentSection.attr('id');
      // get the corresponding navigation link
      var $navigationLink = sectionIdTonavigationLink[id];
      // if the link is not active
      if (!$navigationLink.hasClass('active')) {
        // remove .active class from all the links
        $navigationLinks.removeClass('active');
        // add .active class to the current link
        $navigationLink.addClass('active');
      }
      // we have found our section, so we return false to exit the each loop
      return false;
    }
  });
}
$(window).scroll(throttle(highlightNavigation, 100));