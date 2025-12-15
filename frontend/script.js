// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    // Counter functionality
    let count = 0;
    const countElement = document.getElementById('count');
    const incrementBtn = document.getElementById('increment-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // Increment counter
    incrementBtn.addEventListener('click', function() {
        count++;
        countElement.textContent = count;
        
        // Add visual feedback
        countElement.style.transform = 'scale(1.3)';
        setTimeout(() => {
            countElement.style.transform = 'scale(1)';
        }, 200);
        
        // Fun color change
        const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];
        countElement.style.color = colors[count % colors.length];
    });
    
    // Reset counter
    resetBtn.addEventListener('click', function() {
        count = 0;
        countElement.textContent = count;
        countElement.style.color = '#3b82f6';
        
        // Add confirmation
        alert('Counter reset to zero!');
    });
    
    // Smooth scroll for navigation links
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
    
    // Add fun hover effect to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.15)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        });
    });
    
    // Console welcome message
    console.log('🚀 Static site loaded successfully!');
    console.log('Try clicking the counter buttons!');
});