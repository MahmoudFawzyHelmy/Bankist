'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll(".operations__tab")
const tabContainer = document.querySelector(".operations__tab-container")
const tabContent = document.querySelectorAll(".operations__content")
const nav = document.querySelector(".nav")
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// button scrolling

btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current Scroll (X,Y)', window.scrollX, window.scrollY);
  // console.log('Height / Width  ViewPort', document.documentElement.clientHeight, document.documentElement.clientWidth);

  //  Scrolling
  // window.scrollTo(s1coords.left + window.scrollX , s1coords.top + window.scrollY)

  // Scrolling Smothing
  //   window.scrollTo({
  //     left: s1coords.left + window.scrollX,
  //     top: s1coords.top + window.scrollY,
  //     behavior:"smooth"
  // })

  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

////////////////////////////////////////
// page navigation
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault()
//     const id = this.getAttribute('href')
//     document.querySelector(id).scrollIntoView({behavior:"smooth"})
//   })
// })

// best for navigation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {

  e.preventDefault();
  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// tabes component

 
tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest('.operations__tab')

  // Guard clause
  if (!clicked) return
  
  // Remove classes
  tabs.forEach(ts => ts.classList.remove("operations__tab--active"))
tabContent.forEach(tc=> tc.classList.remove("operations__content--active"))
  // Active tab
  clicked.classList.add('operations__tab--active')

  // Activate content are 
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active")
})


// Menu Fade
const handelHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target; 
    const siblings = link.closest(".nav").querySelectorAll(".nav__link")
    const logo = link.closest(".nav").querySelector("img")
    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this
    })
    logo.style.opacity= this
  }
}

nav.addEventListener("mouseover", handelHover.bind(0.5)
  )
nav.addEventListener("mouseout", handelHover.bind(1))

// sticky navigation
// const initalCoords = section1.getBoundingClientRect()
// window.addEventListener("scroll", function () {
//   if (this.window.scrollY >= initalCoords.top) {
//     nav.classList.add("sticky")
//   } else {
//     nav.classList.remove("sticky")
//   }
// })

const header = document.querySelector(".header")
const navHeight = nav.getBoundingClientRect().height;
const stickNav = function (entries) {
  const [enrty] = entries
  if (!enrty.isIntersecting) nav.classList.add("sticky")
  else nav.classList.remove("sticky")
  
}
const headerObserve = new IntersectionObserver(stickNav, {
  root: null, 
  threshold: 0, 
  rootMargin:`-${navHeight}px`
})
headerObserve.observe(header)

// Reval section
const allSection = document.querySelectorAll(".section")
const revalSection = function (entries, observer) {
  const [enrty] = entries
  if (!enrty.isIntersecting) return; 
  enrty.target.classList.remove("section--hidden")
observer.unobserv(enrty.target)
}
const sectionObserve = new IntersectionObserver(revalSection, {
  root: null, 
  threshold: 0.15, 
})
allSection.forEach(section => {
  sectionObserve.observe(section)
  section.classList.add("section--hidden")
})