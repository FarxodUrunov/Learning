'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const navLinks = document.querySelector('.nav__links');
const scrol1 = document.querySelector('.scrol-1');
const scrol2 = document.querySelector('.scrol-2');
const scrol3 = document.querySelector('.scrol-3');
const navLink = document.querySelectorAll('.nav__link');

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

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords.top);

  // console.log(e.target.getBoundingClientRect());

  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  console.log('Current scroll (X/Y)2', window.scrollY);

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth // border excludes, padding includes
  // );

  // Scrolling;
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  window.scrollTo({
    left: s1coords.left + window.scrollX,
    top: s1coords.top + window.scrollY,
    behavior: 'smooth',
  });

  // section1.scrollIntoView({ behavior: 'smooth' });
});

navLinks.addEventListener('click', function (e) {
  if (e.target.closest('.scrol-1') === scrol1) {
    const s1 = section1.getBoundingClientRect();
    window.scrollTo({
      left: s1.left + window.scrollX,
      top: s1.top + window.scrollY,
      behavior: 'smooth',
    });
  } else if (e.target.closest('.scrol-2') === scrol2) {
    const s2 = section2.getBoundingClientRect();
    window.scrollTo({
      left: s2.left + window.scrollX,
      top: s2.top + window.scrollY,
      behavior: 'smooth',
    });
  } else if (e.target.closest('.scrol-3') === scrol3) {
    const s3 = section3.getBoundingClientRect();
    window.scrollTo({
      left: s3.left + window.scrollX,
      top: s3.top + window.scrollY,
      behavior: 'smooth',
    });
  }
});

// nav hover

navLinks.addEventListener('mouseover', function (e) {
  const t = e.target;
  if (!t.closest('.nav__link')) return;

  navLink.forEach(i => {
    i.classList.add('opacityNav');
  });
  t.classList.remove('opacityNav');
});

navLinks.addEventListener('mouseout', function (e) {
  navLink.forEach(i => {
    i.classList.remove('opacityNav');
  });
});

// nav yurishi

const header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect().height;

let options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

function stickyNav(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}
const headerObserver = new IntersectionObserver(stickyNav, options);
headerObserver.observe(header);

//  sectionlarni kurinishi

const allSections = document.querySelectorAll('.section');

function revelSection(entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
}

const sectionObserver = new IntersectionObserver(revelSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Rsimlar bilan ishlash

const imgTargets = document.querySelectorAll('img[data-src]');

function loadImg(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// tab

const tabContainer = document.querySelector('.operations__tab-container');
const tab = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', e => {
  let clickT = e.target.closest('.operations__tab');

  if (!clickT) return;

  tab.forEach(t => t.classList.remove('operations__tab--active'));
  tabContent.forEach(c => c.classList.remove('operations__content--active'));

  clickT.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clickT.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  let curSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      return (s.style.transform = `translateX(${100 * (i - slide)}%)`);
    });
  };

  // next slide

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      // curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      // curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
};

slider();
