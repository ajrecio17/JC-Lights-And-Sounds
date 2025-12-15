// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const eventDate = document.getElementById('event-date').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !message) {
                showFormMessage('Please fill in all required fields', 'error');
                return;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }

            // Create mailto link with form data
            const subject = `Event Inquiry - ${service || 'General'}`;
            const body = `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service: ${service || 'Not specified'}
Event Date: ${eventDate || 'Not specified'}

Message:
${message}
            `.trim();

            // For demonstration, show success message
            // In a real application, you would send this to a server
            showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // You could also send via email link:
            // window.location.href = `mailto:info@jclightsandsounds.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }

    // Show form message
    function showFormMessage(message, type) {
        const formMessage = document.getElementById('form-message');
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.classList.remove('hidden');
            formMessage.classList.add(type === 'success' ? 'bg-green-900/50 text-green-300 border border-green-600' : 'bg-red-900/50 text-red-300 border border-red-600');
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        }
    }

    // FAQ Accordion Toggle
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('span');
            
            // Close all other FAQs
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    const otherContent = otherToggle.nextElementSibling;
                    const otherIcon = otherToggle.querySelector('span');
                    otherContent.classList.add('hidden');
                    otherIcon.textContent = '+';
                }
            });
            
            // Toggle current FAQ
            content.classList.toggle('hidden');
            icon.textContent = content.classList.contains('hidden') ? '+' : '−';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Optional: Add fade-in animation to cards
    document.querySelectorAll('.border-red-600').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Navbar scroll effect (optional)
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }
    });
});

// Utility function for form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility function for phone validation
function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return phone === '' || re.test(phone);
}
