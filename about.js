// Ensure phone/tablet bottom nav appears on About page as well
(function ensureBottomNavOnAbout(){
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

    const path = location.pathname.split('/').pop() || 'index.html';
    wrapper.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path) a.classList.add('active');
    });
  }

  function maybeCreateOrRemove(){
    if (window.matchMedia('(max-width: 900px)').matches) createPhoneBottomNav();
    else {
      const existing = document.querySelector('.phone-bottom-nav');
      if (existing) existing.remove();
    }
  }

  // Run once and on resize so About page mirrors index behavior
  maybeCreateOrRemove();
  window.addEventListener('resize', maybeCreateOrRemove);
})();
