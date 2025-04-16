if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add("dark");
}

// Function to load content dynamically into carousel items
const loadPartial = async (id, file) => {
  const res = await fetch(`partials/${file}`);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
};

// Initialize carousel and dots
const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const dotsContainer = document.querySelector('.carousel-dots');
let currentIndex = 0;

// Function to create and add dots dynamically
function createDots() {
  carouselItems.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('carousel-dot');
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });
}

// Function to update the carousel and dots
function updateCarousel() {
  const offset = -currentIndex * 100;  // 100% width per item
  carousel.style.transform = `translateX(${offset}%)`;
  updateDots();
}

// Function to update active dots
function updateDots() {
  const dots = document.querySelectorAll('.carousel-dot');
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

// Swipe functionality for mobile
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;  // Capture touch start position
});

carousel.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;  // Capture touch end position

  if (touchEndX < touchStartX - 50) {  // Swiped left
    nextSlide();
  }

  if (touchEndX > touchStartX + 50) {  // Swiped right
    prevSlide();
  }
});

// Next and previous slide functions
function nextSlide() {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel();
}

// Load content for header, about, etc.
window.onload = () => {
  loadPartial('carousel-about', 'about.html');
  loadPartial('carousel-experience', 'experience.html');
  //loadExperience('carousel-experience');
  loadPartial('carousel-certifications', 'certifications.html');
  // loadPartial('carousel-extras', 'extras.html');
  createDots();
  updateCarousel();
};


