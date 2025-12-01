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
        price: 25
    },
    {
        id: 2,
        name: 'RAMEN',
        image: '2.png',
        price: 10
    },
    {
        id: 3,
        name: 'TEMPURA',
        image: '3.png',
        price: 20
    },
    {
        id: 4,
        name: 'TERIYAKI',
        image: '4.png',
        price: 15
    },
    {
        id: 5,
        name: 'SASHIMI',
        image: '5.png',
        price: 25
    },
    {
        id: 6,
        name: 'KATSU',
        image: '6.png',
        price: 20
    },
    {
        id: 7,
        name: 'UDON',
        image: '7.png',
        price: 30
    },
    {
        id: 8,
        name: 'ONIGIRI',
        image: '8.png',
        price: 10
    },
    {
        id: 9,
        name: 'MOCHI',
        image: '9.png',
        price: "30"
    },
    {
        id: 10,
        name: 'TAKOYAKI',
        image: '10.png',
        price: 20
    },
    {
        id: 11,
        name: 'SHABU-SHABU',
        image: '11.png',
        price: 67
    },
    {
        id: 12,
        name: 'KAISEKI',
        image: '12.png',
        price: 120
    }
];
let listCards = [];

// Function to show notification
function showNotification() {
    // Create notification element
    let notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Added to cart!';
    
    // Add to body
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
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
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

function typeHeadingMenu() {
    const nameTextMenu = document.getElementById('nameTextMenu');
    const mainContent = document.getElementById('mainContent');

    const fullText = "Fuji Kitchen Menu";
    const typingSpeed = 40;
    let currentIndex = -10;

    const typeInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
            nameTextMenu.textContent = fullText.substring(0, currentIndex + 1);
            currentIndex++;
        } else {
            clearInterval(typeInterval);

            setTimeout(() => {
                mainContent.classList.add('visible');
                renderMenu();
            }, 300);
        }
    }, typingSpeed);
}

const nameHeading = document.getElementById('nameHeading');
if (nameHeading) {
    nameHeading.onclick = () => {
        window.location.href = 'index.html';
    };
}

typeHeadingMenu();