// SVG Arched text setup with enhanced animations
const text = "Fuji Kitchen";
const svgArchContainer = document.getElementById("fujiArch");

// Create SVG with shallow arch path
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("viewBox", "0 0 1200 400");
svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

// Define enhanced gradient with more color stops
const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
gradient.setAttribute("id", "textGradient");
gradient.setAttribute("x1", "0%");
gradient.setAttribute("y1", "0%");
gradient.setAttribute("x2", "100%");
gradient.setAttribute("y2", "0%");

const stops = [
  { offset: "0%", color: "#ffffff" },
  { offset: "15%", color: "#ffd9c8" },
  { offset: "30%", color: "#ffc9b0" },
  { offset: "50%", color: "#ffa989" },
  { offset: "70%", color: "#f5926f" },
  { offset: "100%", color: "#e88968" },
];

stops.forEach((s) => {
  const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop.setAttribute("offset", s.offset);
  stop.setAttribute("stop-color", s.color);
  gradient.appendChild(stop);
});

defs.appendChild(gradient);
svg.appendChild(defs);

// Create shallow arch path
const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("id", "archPath");
path.setAttribute("d", "M 150 280 Q 600 300 1050 280");
path.setAttribute("fill", "none");

svg.appendChild(path);

// Create individual text elements for each letter with stagger effect
const letters = text.split("");
const letterElements = [];
const pathLength = 900;
const letterSpacing = 8;

letters.forEach((char, index) => {
  const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
  textElement.setAttribute("font-size", "10rem");
  textElement.setAttribute("font-family", "Quintessential, serif");
  textElement.setAttribute("font-weight", "900");
  textElement.setAttribute("fill", "url(#textGradient)");
  textElement.setAttribute("text-anchor", "middle");
  textElement.style.filter = "drop-shadow(0 12px 55px rgba(240, 110, 170, 0.35)) drop-shadow(0 5px 20px rgba(255, 169, 137, 0.3))";
  textElement.style.transition = "all 0.3s ease";

  const textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
  textPath.setAttribute("href", "#archPath");
  const offset = index * letterSpacing + 10;
  textPath.setAttribute("startOffset", offset + "%");
  textPath.textContent = char;

  textElement.appendChild(textPath);
  svg.appendChild(textElement);
  letterElements.push({
    element: textElement,
    textPath: textPath,
    baseOffset: offset,
    index: index
  });
});

svgArchContainer.appendChild(svg);

// Add hover effect to letters
letterElements.forEach((letter) => {
  letter.element.addEventListener('mouseenter', () => {
    letter.element.style.filter = "drop-shadow(0 15px 65px rgba(240, 110, 170, 0.5)) drop-shadow(0 8px 30px rgba(255, 169, 137, 0.5))";
  });
  
  letter.element.addEventListener('mouseleave', () => {
    letter.element.style.filter = "drop-shadow(0 12px 55px rgba(240, 110, 170, 0.35)) drop-shadow(0 5px 20px rgba(255, 169, 137, 0.3))";
  });
});

// Subtitle typing animation with enhanced effects
const subtitleSection = document.getElementById("subtitleSection");
const typingText = document.getElementById("typing-text");

setTimeout(() => {
  subtitleSection.classList.add("visible");
  startSubtitleTyping();
}, 1000);

function startSubtitleTyping() {
  const textArray = [
    "sushi?",
    "ramen?",
    "tempura?",
    "teriyaki?",
    "sashimi?",
    "katsu?",
    "udon?",
    "onigiri?",
    "mochi?",
    "takoyaki?",
    "shabu-shabu?",
    "kaiseki?",
  ];

  let loopNum = 0;
  let isDeleting = false;
  let text = "";

  function type() {
    const current = loopNum % textArray.length;
    const fullText = textArray[current];

    if (!isDeleting) {
      text = fullText.substring(0, text.length + 1);
      typingText.textContent = text;

      if (text === fullText) {
        setTimeout(() => {
          isDeleting = true;
          type();
        }, 1800);
        return;
      }
    } else {
      text = fullText.substring(0, text.length - 1);
      typingText.textContent = text;

      if (text === "") {
        isDeleting = false;
        loopNum++;
      }
    }
    setTimeout(type, isDeleting ? 30 : 50);
  }

  type();
}

// NAV TOGGLE + SMOOTH SCROLL + ACCESSIBILITY
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close nav on link click (mobile)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Mobile overlay handling and phone bottom nav injection
(function setupMobileExtras(){
  // create overlay element
  let overlay = document.querySelector('.mobile-nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    document.body.appendChild(overlay);
  }

  function openCloseOverlay(isOpen){
    if (isOpen) overlay.classList.add('visible'); else overlay.classList.remove('visible');
  }

  // sync overlay visibility when nav opens/closes
  if (navToggle && navLinks) {
    const origHandler = navToggle.onclick;
    // add observer: toggle overlay when class 'open' changes
    const observer = new MutationObserver(() => {
      const isOpen = navLinks.classList.contains('open');
      openCloseOverlay(isOpen);
    });
    observer.observe(navLinks, { attributes: true, attributeFilter: ['class'] });

    // close on overlay click
    overlay.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        openCloseOverlay(false);
      }
    });
  }

  // Inject a small bottom nav on phones for quick access
  function createPhoneBottomNav(){
    if (document.querySelector('.phone-bottom-nav')) return;
    const wrapper = document.createElement('nav');
    wrapper.className = 'phone-bottom-nav';
    wrapper.innerHTML = `
      <a href="index.html" aria-label="Home"><span class="icon">🏠</span><span class="label">Home</span></a>
      <a href="about.html" aria-label="About"><span class="icon">ℹ️</span><span class="label">About</span></a>
      <a href="contact.html" aria-label="Contact"><span class="icon">✉️</span><span class="label">Contact</span></a>
    `;
    document.body.appendChild(wrapper);

    // mark active based on current path
    const path = location.pathname.split('/').pop() || 'index.html';
    wrapper.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path) a.classList.add('active');
    });
  }

  function maybeCreateBottomNav(){
    if (window.matchMedia('(max-width: 900px)').matches) createPhoneBottomNav();
    else {
      const existing = document.querySelector('.phone-bottom-nav');
      if (existing) existing.remove();
    }
  }

  maybeCreateBottomNav();
  window.addEventListener('resize', maybeCreateBottomNav);
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1 && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.focus({ preventScroll: true });
        return;
      }
    }
  });
});

// Close mobile nav on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (navLinks && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  }
});

// Enhanced Carousel functionality
let circle = document.querySelector(".circle");
let slider = document.querySelector(".slider");
let list = document.querySelector(".list");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let items = document.querySelectorAll(".list .item");
let count = items.length;
let active = 1;
let leftTransform = 0;
let width_item = 0;
let autoPlayInterval;
let isAnimating = false;

window.addEventListener("load", () => {
  runCarousel();
  startAutoPlay();
});

next.onclick = () => {
  if (isAnimating) return;
  if (active < count - 1) {
    active++;
    runCarousel();
    resetAutoPlay();
  }
};

prev.onclick = () => {
  if (isAnimating) return;
  if (active > 0) {
    active--;
    runCarousel();
    resetAutoPlay();
  }
};

function runCarousel() {
  isAnimating = true;
  
  width_item = items[0].offsetWidth;

  // Update button visibility
  prev.style.display = active == 0 ? "none" : "block";
  next.style.display = active == count - 1 ? "none" : "block";

  // Remove active class from all items
  items.forEach(item => item.classList.remove("active"));
  
  // Add active class to current item
  items[active].classList.add("active");

  // Calculate transform based on current active item
  leftTransform = width_item * (active - 1) * -1;
  list.style.transform = `translateX(${leftTransform}px)`;
  
  // Reset animation lock after transition
  setTimeout(() => {
    isAnimating = false;
  }, 1000);
}

// Auto-play carousel
function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    if (!isAnimating) {
      if (active < count - 1) {
        active++;
        runCarousel();
      } else {
        // Reset to beginning
        active = 0;
        runCarousel();
      }
    }
  }, 4000);
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  startAutoPlay();
}

// Pause auto-play on hover
slider.addEventListener('mouseenter', () => {
  clearInterval(autoPlayInterval);
});

slider.addEventListener('mouseleave', () => {
  startAutoPlay();
});

// Enhanced circle text animation
let textCircle = circle.innerText.split("");
circle.innerText = "";
textCircle.forEach((value, key) => {
  let newSpan = document.createElement("span");
  newSpan.innerText = value;
  let rotateThisSpan = (360 / textCircle.length) * (key + 1);
  newSpan.style.setProperty("--rotate", rotateThisSpan + "deg");
  circle.appendChild(newSpan);
});

// Enhanced Parallax scroll effect with easing
let listBg = document.querySelectorAll(".bg");
let parallaxTextLayer = document.getElementById("parallaxTextLayer");
let archContainer = document.querySelector(".arch-container");
const scrollSpeed = 0.9;
let minScrollValue = 0;
let ticking = false;

window.addEventListener("wheel", function (event) {
    event.preventDefault();
    let scrollValue = window.scrollY + (event.deltaY / 2) * scrollSpeed;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollValue = Math.max(minScrollValue, Math.min(scrollValue, maxScroll));

    window.scrollTo(0, scrollValue);

    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax(scrollValue);
        ticking = false;
      });
      ticking = true;
    }
  },
  { passive: false }
);

function updateParallax(top) {
  if (archContainer) {
    // Enhanced letter rotation with wave effect
    letterElements.forEach((letter, index) => {
      const rotationPerLetter = top * 0.35;
      const cycleLength = 300;
      const textLength = 100;
      const waveOffset = Math.sin(top * 0.01 + index * 0.5) * 5;
      const newOffset = (letter.baseOffset + rotationPerLetter + waveOffset) % cycleLength;

      if (newOffset <= textLength) {
        letter.element.style.opacity = "1";
        letter.textPath.setAttribute("startOffset", newOffset + "%");
      } else {
        letter.element.style.opacity = "0";
      }
    });
  }

  listBg.forEach((bg, index) => {
    if (index != 0 && index != 1) {
      const parallaxSpeed = index * 1.2;
      bg.animate(
        {
          transform: `translateY(${-top * parallaxSpeed}px)`,
        },
        { duration: 1000, fill: "forwards", easing: "ease-out" }
      );
    }
  });

  updateScrollProgress();
}

// Scroll progress bar
function updateScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  progressBar.style.width = scrolled + '%';
}

// Back to top button with smooth animation
function setupBackToTop() {
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  
  backToTop.addEventListener('click', () => {
    const scrollDuration = 800;
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  });
}

// Enhanced Reservation form handling
const reservationForm = document.getElementById('reservationForm');
const reservationNotification = document.getElementById('reservationNotification');

reservationForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    guests: document.getElementById('guests').value
  };
  
  // Add loading state
  const submitBtn = reservationForm.querySelector('.reservation-btn');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span>Processing...</span>';
  submitBtn.disabled = true;
  
  // Simulate processing
  setTimeout(() => {
    showReservationNotification();
    reservationForm.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 1000);
  
  console.log('Reservation submitted:', formData);
});

function showReservationNotification() {
  reservationNotification.classList.add('show');
  
  setTimeout(() => {
    reservationNotification.classList.remove('show');
  }, 4500);
}

// Set minimum date to today for date input
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Add input animations
const formInputs = document.querySelectorAll('#reservationForm input');
formInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'translateY(-2px)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'translateY(0)';
  });
});

// Initialize features
setupBackToTop();

// Update scroll progress on regular scroll events too
window.addEventListener('scroll', updateScrollProgress);

// Add keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
  if (isAnimating) return;
  
  if (e.key === 'ArrowLeft' && active > 0) {
    active--;
    runCarousel();
    resetAutoPlay();
  } else if (e.key === 'ArrowRight' && active < count - 1) {
    active++;
    runCarousel();
    resetAutoPlay();
  }
});

// Add touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  if (isAnimating) return;
  
  if (touchEndX < touchStartX - 50 && active < count - 1) {
    active++;
    runCarousel();
    resetAutoPlay();
  }
  if (touchEndX > touchStartX + 50 && active > 0) {
    active--;
    runCarousel();
    resetAutoPlay();
  }
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe reservation section
const reservationSection = document.querySelector('.reservation');
if (reservationSection) {
  observer.observe(reservationSection);
}

// Page transition: smooth exit animation before navigating to another page
document.addEventListener('DOMContentLoaded', () => {
  // run enter animation
  document.body.classList.add('page-enter');
  requestAnimationFrame(() => {
    document.body.classList.add('page-enter-active');
  });
  // clean up enter classes after animation
  setTimeout(() => {
    document.body.classList.remove('page-enter');
    document.body.classList.remove('page-enter-active');
  }, 520);

  // intercept link clicks for smooth page-exit animation
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href) return;

    // ignore hash-only, mailto, tel and external links or js handlers
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
    if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;

    // only intercept same-origin navigations
    try {
      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return;
    } catch (err) {
      return;
    }

    e.preventDefault();
    // start exit animation
    document.body.classList.add('page-exit');
    requestAnimationFrame(() => {
      document.body.classList.add('page-exit-active');
    });

    // navigate after animation completes
    setTimeout(() => {
      window.location.href = href;
    }, 460);
  }, false);
});