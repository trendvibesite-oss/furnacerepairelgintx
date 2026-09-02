/**
 * Elgin, TX Local HVAC Website - Client Scripts
 * Lightweight, zero-dependency, WCAG-accessible
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const navDrawer = document.querySelector('.mobile-nav-drawer');

  if (navToggle && navDrawer) {
    navToggle.addEventListener('click', () => {
      const isOpen = navDrawer.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // FAQ Accordion Interaction
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;

      const isActive = item.classList.contains('is-active');

      // Close other open items in the same accordion
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.faq-item.is-active').forEach(openItem => {
          if (openItem !== item) {
            openItem.classList.remove('is-active');
            const q = openItem.querySelector('.faq-question');
            if (q) q.setAttribute('aria-expanded', 'false');
          }
        });
      }

      item.classList.toggle('is-active', !isActive);
      btn.setAttribute('aria-expanded', !isActive ? 'true' : 'false');
    });
  });

  // Contact Form Mockup Submission Handler
  const inquiryForms = document.querySelectorAll('.inquiry-form');
  inquiryForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-btn');
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = 'Request Received! Calling you shortly...';
        btn.style.backgroundColor = '#2e7d32';
        btn.disabled = true;

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.disabled = false;
          form.reset();
          alert('Thank you! Your HVAC service request has been received. A dispatch technician will contact you shortly, or you can call us directly at (877) 361-0428.');
        }, 1200);
      }
    });
  });

  // Telephone Click Tracking Event Dispatcher
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'phone_call_click', {
          event_category: 'Lead',
          event_label: link.getAttribute('href')
        });
      }
    });
  });
});
