const nameText = document.getElementById('nameText');
const cursor = document.getElementById('cursor');
const mainContent = document.getElementById('mainContent');
const typingText = document.getElementById('typing-text');
const nav = document.getElementById('nav');
const subtitle = document.getElementById('subtitle');
<<<<<<< HEAD
const navShop = document.querySelector('.nav-shop');
const navAbout = document.querySelector('.nav-about');
const carousel = document.querySelector('.circle');
const aboutUs = document.querySelector('.about-us');
const nameHeading = document.getElementById('nameHeading');

nameHeading.onclick = () => {
    window.location.reload();
};

function typeHeading() {
    const fullText = "Fuji Kitchen";
    const typingSpeed = 40;
    let currentIndex = -10;
=======

function typeHeading() {
    const fullText = "Fuji Kitchen";
    const typingSpeed = 75;
    let currentIndex = 0;
>>>>>>> 185d90e5444b1186c5c0857e08815eb939fa2446

    const typeInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
            nameText.textContent = fullText.substring(0, currentIndex + 1);
            currentIndex++;
        } else {
            clearInterval(typeInterval);

            setTimeout(() => {
                setTimeout(() => {
                    nav.classList.add('visible');
                }, 100);

                setTimeout(() => {
                    mainContent.classList.add('visible');
                }, 300);

                setTimeout(() => {
                    subtitle.classList.add('visible');
                    startSubtitleTyping();
                }, 500);
            }, 300);
        }
    }, typingSpeed);
}

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

typeHeading();

<<<<<<< HEAD
=======
// carousel func from youtube
>>>>>>> 185d90e5444b1186c5c0857e08815eb939fa2446
let circle = document.querySelector('.circle');
let slider = document.querySelector('.slider');
let list = document.querySelector('.list');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let items = document.querySelectorAll('.list .item');
let count = items.length;
let active = 1;
let leftTransform = 0;
let width_item = 0;

window.addEventListener('load', () => {
    runCarousel();
});

next.onclick = () => {
    active = active >= count - 1 ? count - 1 : active + 1;
    runCarousel();
}

prev.onclick = () => {
    active = active <= 0 ? active : active - 1;
    runCarousel();
}

function runCarousel() {
    width_item = items[active].offsetWidth;
<<<<<<< HEAD

=======
    
>>>>>>> 185d90e5444b1186c5c0857e08815eb939fa2446
    prev.style.display = (active == 0) ? 'none' : 'block';
    next.style.display = (active == count - 1) ? 'none' : 'block';

    let old_active = document.querySelector('.item.active');
<<<<<<< HEAD
    if (old_active) old_active.classList.remove('active');
=======
    if(old_active) old_active.classList.remove('active');
>>>>>>> 185d90e5444b1186c5c0857e08815eb939fa2446
    items[active].classList.add('active');

    leftTransform = width_item * (active - 1) * -1;
    list.style.transform = `translateX(${leftTransform}px)`;
}

let textCircle = circle.innerText.split('');
circle.innerText = '';
textCircle.forEach((value, key) => {
    let newSpan = document.createElement("span");
    newSpan.innerText = value;
    let rotateThisSpan = (360 / textCircle.length) * (key + 1);
    newSpan.style.setProperty('--rotate', rotateThisSpan + 'deg');
<<<<<<< HEAD
    circle.appendChild(newSpan);
});

navShop.onclick = () => {
    carousel.scrollIntoView({
        behavior: 'smooth',
        block: "center",
        inline: "nearest"
    });
}

navAbout.onclick = () => {
    aboutUs.scrollIntoView({
        behavior: 'smooth',
        block: "center",
        inline: "nearest"
    });
}
=======
    circle.appendChild(newSpan); 
});
>>>>>>> 185d90e5444b1186c5c0857e08815eb939fa2446
