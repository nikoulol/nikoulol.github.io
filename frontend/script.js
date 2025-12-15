document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate skill bars on scroll
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-in-out';
                bar.style.width = width;
            }, 300);
        });
    };
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animated');
                if(entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Form submission (demo only)
    const contactForm = document.querySelector('.message-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message sent! (This is a demo - in a real site, this would connect to a backend)');
            this.reset();
        });
    }
    
    // Add parallax effect to smoke trails
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const smokeLeft = document.querySelector('.smoke-left');
        const smokeRight = document.querySelector('.smoke-right');
        
        if(smokeLeft && smokeRight) {
            smokeLeft.style.transform = `rotate(20deg) translateY(${scrolled * 0.1}px)`;
            smokeRight.style.transform = `rotate(-20deg) translateY(${scrolled * 0.15}px)`;
        }
    });
    
    // One Piece console message
    console.log(`
    ⚓ Welcome to the Grand Line of Code!
    ⛵ "I'm going to be the King of the Developers!" 
    `);
});