/// Ensure phone/tablet bottom nav appears on Menu page
(function ensureBottomNavOnContact(){
    function createPhoneBottomNav(){
        if (document.querySelector('.phone-bottom-nav')) return;
        const wrapper = document.createElement('nav');
        wrapper.className = 'phone-bottom-nav';
        wrapper.innerHTML = `
            <a href="index.html" aria-label="Home"><span class="icon">🏠</span><span class="label">Home</span></a>
            <a href="about.html" aria-label="About"><span class="icon">ℹ️</span><span class="label">About</span></a>
            <a href="contact.html" aria-label="Contact"><span class="icon">✉️</span><span class="label">Contact</span></a>
        `;
        // Append to body and ensure bare-minimum inline styles so nav is visible
        document.body.appendChild(wrapper);

        // Debug: log creation
        try { console.log('createPhoneBottomNav: created .phone-bottom-nav'); } catch(e){}

        // Apply essential inline styles in case CSS media queries aren't applied
        Object.assign(wrapper.style, {
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '12px',
            width: 'calc(100% - 80px)',
            maxWidth: '520px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '6px 12px',
            zIndex: '10001',
            background: 'linear-gradient(135deg, rgba(255,169,137,0.10), rgba(232,137,104,0.06))',
            borderRadius: '12px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.55)',
            border: '1px solid rgba(255,169,137,0.08)'
        });

        const path = location.pathname.split('/').pop() || 'index.html';
        wrapper.querySelectorAll('a').forEach(a => {
            const href = a.getAttribute('href');
            if (href === path) a.classList.add('active');
        });
    }

    function maybeCreateBottomNav(){
        const matches = window.matchMedia('(max-width: 900px)').matches;
        try { console.log('maybeCreateBottomNav matches:', matches); } catch(e){}
        if (matches) createPhoneBottomNav();
        else {
            const existing = document.querySelector('.phone-bottom-nav');
            if (existing) existing.remove();
        }
    }

    maybeCreateBottomNav();
    window.addEventListener('resize', maybeCreateBottomNav);
})();


// Contact form functionality
const contactForm = document.getElementById('contactForm');
const contactNotification = document.getElementById('contactNotification');

if (contactForm) {
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
}

function showContactNotification() {
  if (!contactNotification) return;
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
  // (Bottom nav is handled by the initBottomNav IIFE above.)

  