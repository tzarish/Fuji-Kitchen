const contactForm = document.getElementById('contactForm');
const contactNotification = document.getElementById('contactNotification');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        subject: document.getElementById('contact-subject').value,
        message: document.getElementById('contact-message').value
    };

    // Add loading state
    const submitBtn = contactForm.querySelector('.contact-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    // Simulate processing
    setTimeout(() => {
        showContactNotification();
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1000);

    console.log('Contact form submitted:', formData);
});

function showContactNotification() {
    contactNotification.classList.add('show');

    setTimeout(() => {
        contactNotification.classList.remove('show');
    }, 4500);
}

// Add input animations
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'translateY(-2px)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Ensure phone/tablet bottom nav appears on Contact page
(function ensureBottomNavOnContact() {
    function createPhoneBottomNav() {
        if (document.querySelector('.phone-bottom-nav')) return;
        const wrapper = document.createElement('nav');
        wrapper.className = 'phone-bottom-nav';
        wrapper.innerHTML = `
          <a href="index.html" aria-label="Home"><span class="icon">🏠</span><span class="label">Home</span></a>
          <a href="about.html" aria-label="About"><span class="icon">ℹ️</span><span class="label">About</span></a>
          <a href="contact.html" aria-label="Contact"><span class="icon">✉️</span><span class="label">Contact</span></a>
        `;
        document.body.appendChild(wrapper);

        const path = location.pathname.split('/').pop() || 'index.html';
        wrapper.querySelectorAll('a').forEach(a => {
            const href = a.getAttribute('href');
            if (href === path) a.classList.add('active');
        });
    }

    function maybeCreateOrRemove() {
        if (window.matchMedia('(max-width: 900px)').matches) createPhoneBottomNav();
        else {
            const existing = document.querySelector('.phone-bottom-nav');
            if (existing) existing.remove();
        }
    }

    maybeCreateOrRemove();
    window.addEventListener('resize', maybeCreateOrRemove);
})();

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

    const path = location.pathname.split('/').pop() || 'contact.html';
    wrapper.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path) a.classList.add('active');
    });
  }
