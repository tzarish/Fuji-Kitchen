// SVG Arched text setup
const text = "Fuji Kitchen";
const svgArchContainer = document.getElementById("fujiArch");

// Create SVG with shallow arch path
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("viewBox", "0 0 1200 400");
svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

// Define gradient
const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
const gradient = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "linearGradient"
);
gradient.setAttribute("id", "textGradient");
gradient.setAttribute("x1", "0%");
gradient.setAttribute("y1", "0%");
gradient.setAttribute("x2", "100%");
gradient.setAttribute("y2", "0%");

const stops = [
  { offset: "8%", color: "#ffffff" },
  { offset: "26%", color: "#ffc9b0" },
  { offset: "56%", color: "#ffa989" },
  { offset: "92%", color: "#e88968" },
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

// Create individual text elements for each letter
const letters = text.split("");
const letterElements = [];
const pathLength = 900;
const letterSpacing = 8;

letters.forEach((char, index) => {
  const textElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  textElement.setAttribute("font-size", "10rem");
  textElement.setAttribute("font-family", "Quintessential, serif");
  textElement.setAttribute("font-weight", "900");
  textElement.setAttribute("fill", "url(#textGradient)");
  textElement.setAttribute("text-anchor", "middle");
  textElement.style.filter =
    "drop-shadow(0 10px 48px rgba(240, 110, 170, 0.28))";

  const textPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "textPath"
  );
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
  });
});

svgArchContainer.appendChild(svg);

// Subtitle typing animation
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
        }, 1500);
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
    setTimeout(type, isDeleting ? 25 : 40);
  }

  type();
}

// Carousel functionality
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

window.addEventListener("load", () => {
  runCarousel();
});

next.onclick = () => {
  active = active >= count - 1 ? count - 1 : active + 1;
  runCarousel();
};

prev.onclick = () => {
  active = active <= 0 ? active : active - 1;
  runCarousel();
};

function runCarousel() {
  width_item = items[active].offsetWidth;

  prev.style.display = active == 0 ? "none" : "block";
  next.style.display = active == count - 1 ? "none" : "block";

  let old_active = document.querySelector(".item.active");
  if (old_active) old_active.classList.remove("active");
  items[active].classList.add("active");

  leftTransform = width_item * (active - 1) * -1;
  list.style.transform = `translateX(${leftTransform}px)`;
}

let textCircle = circle.innerText.split("");
circle.innerText = "";
textCircle.forEach((value, key) => {
  let newSpan = document.createElement("span");
  newSpan.innerText = value;
  let rotateThisSpan = (360 / textCircle.length) * (key + 1);
  newSpan.style.setProperty("--rotate", rotateThisSpan + "deg");
  circle.appendChild(newSpan);
});

// Parallax scroll effect
let listBg = document.querySelectorAll(".bg");
let parallaxTextLayer = document.getElementById("parallaxTextLayer");
let archContainer = document.querySelector(".arch-container");
const scrollSpeed = 0.6;
let minScrollValue = 0;

window.addEventListener(
  "wheel",
  function (event) {
    event.preventDefault();
    let scrollValue = window.scrollY + (event.deltaY / 2) * scrollSpeed;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    scrollValue = Math.max(minScrollValue, Math.min(scrollValue, maxScroll));

    window.scrollTo(0, scrollValue);

    let top = scrollValue;

    if (archContainer) {
      // Rotate each letter individually along the path with spacing between cycles
      letterElements.forEach((letter, index) => {
        const rotationPerLetter = top * 0.3;
        const cycleLength = 300; 
        const textLength = 100; 
        const newOffset = (letter.baseOffset + rotationPerLetter) % cycleLength;

        // Only show letters within the visible text range
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
        bg.animate(
          {
            transform: `translateY(${-top * index}px)`,
          },
          { duration: 1000, fill: "forwards" }
        );
      }
    });
  },
  { passive: false }
);
