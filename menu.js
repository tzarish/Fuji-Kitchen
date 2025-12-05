let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'SUSHI',
        image: '1.png',
        price: 25,
        category: 'sushi'
    },
    {
        id: 2,
        name: 'RAMEN',
        image: '2.png',
        price: 10,
        category: 'noodles'
    },
    {
        id: 3,
        name: 'TEMPURA',
        image: '3.png',
        price: 20,
        category: 'sides'
    },
    {
        id: 4,
        name: 'TERIYAKI',
        image: '4.png',
        price: 15,
        category: 'special'
    },
    {
        id: 5,
        name: 'SASHIMI',
        image: '5.png',
        price: 25,
        category: 'sushi'
    },
    {
        id: 6,
        name: 'KATSU',
        image: '6.png',
        price: 20,
        category: 'special'
    },
    {
        id: 7,
        name: 'UDON',
        image: '7.png',
        price: 30,
        category: 'noodles'
    },
    {
        id: 8,
        name: 'ONIGIRI',
        image: '8.png',
        price: 10,
        category: 'sides'
    },
    {
        id: 9,
        name: 'MOCHI',
        image: '9.png',
        price: 30,
        category: 'sides'
    },
    {
        id: 10,
        name: 'TAKOYAKI',
        image: '10.png',
        price: 20,
        category: 'sides'
    },
    {
        id: 11,
        name: 'SHABU-SHABU',
        image: '11.png',
        price: 67,
        category: 'special'
    },
    {
        id: 12,
        name: 'KAISEKI',
        image: '12.png',
        price: 120,
        category: 'special'
    }
];

let listCards = [];
let currentFilter = 'all';

function showNotification() {
    let notification = document.getElementById('cartNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'cartNotification';
        notification.className = 'cart-notification';
        notification.textContent = 'Added to cart!';
        document.body.appendChild(notification);
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

function displayProducts(productsToShow) {
    list.innerHTML = '';
    productsToShow.forEach((value, key) => {
        let originalKey = products.findIndex(p => p.id === value.id);
        
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.setAttribute('data-category', value.category);
        newDiv.innerHTML = `
            <img src="img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${originalKey})">Add To Cart</button>`;
        list.appendChild(newDiv);
    });
}

function initApp() {
    displayProducts(products);
}
initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    showNotification();
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    let emptyCart = document.getElementById('emptyCart');
    
    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice = totalPrice + (value.price * value.quantity);
            count = count + value.quantity;
            
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>$${(value.price * value.quantity).toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    
    if (count === 0) {
        emptyCart.style.display = 'block';
    } else {
        emptyCart.style.display = 'none';
    }
    
    total.innerText = 'Your Total: $' + totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
    }
    reloadCard();
}

function typeHeadingMenu() {
    const nameTextMenu = document.getElementById('nameTextMenu');
    const mainContent = document.getElementById('mainContent');

    const fullText = "Fuji Kitchen";
    const typingSpeed = 100;
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
            nameTextMenu.textContent = fullText.substring(0, currentIndex + 1);
            currentIndex++;
        } else {
            clearInterval(typeInterval);
        }
    }, typingSpeed);
}

const nameHeading = document.getElementById('nameHeading');
if (nameHeading) {
    nameHeading.onclick = () => {
        window.location.href = 'index.html';
    };
}

function setupScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            currentFilter = filter;
            
            if (filter === 'all') {
                displayProducts(products);
            } else {
                const filteredProducts = products.filter(product => product.category === filter);
                displayProducts(filteredProducts);
            }
        });
    });
}

typeHeadingMenu();
setupScrollProgress();
setupBackToTop();
setupFilterButtons();