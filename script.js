// ========== TREASURE CHEST EXPAND CONTROLLER ==========
document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    TreasureExpander.init();
    console.log('🚢 One Piece Portfolio - Ready to Set Sail!');
});

function setCurrentYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

const TreasureExpander = (() => {
    let containers = [];
    let overlay = null;
    let activeContainer = null;
    let scrollPosition = 0; // Store scroll position

    function init() {
        // Get all treasure containers
        containers = document.querySelectorAll('.treasure-container');
        
        // Create or get overlay
        overlay = document.querySelector('.expanded-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'expanded-overlay';
            document.body.appendChild(overlay);
        }

        if (!containers.length) {
            console.warn('No treasure containers found!');
            return;
        }

        // Setup each container
        containers.forEach(container => {
            setupContainer(container);
        });

        // Setup global event listeners
        setupGlobalEvents();
        
        // Inject animations if needed
        injectAnimations();
    }

    function setupContainer(container) {
        const closedSection = container.querySelector('.treasure-closed');
        const closeBtn = container.querySelector('.close-treasure');
        const openSection = container.querySelector('.treasure-open');
        const scrollContent = container.querySelector('.treasure-content');

        // Click on closed section to expand
        if (closedSection) {
            closedSection.addEventListener('click', (e) => {
                if (!container.classList.contains('expanded')) {
                    openContainer(container);
                }
            });
        }

        // Close button click
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeContainer();
            });
        }

        // Scroll detection for close button
        if (scrollContent && closeBtn) {
            scrollContent.addEventListener('scroll', () => {
                updateCloseButtonVisibility(scrollContent, closeBtn);
            });
        }

        // Prevent clicks in open section from closing
        if (openSection) {
            openSection.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    function setupGlobalEvents() {
        // Close when clicking overlay
        overlay.addEventListener('click', closeContainer);

        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && activeContainer) {
                closeContainer();
            }
        });
    }

    function updateCloseButtonVisibility(scrollElement, closeBtn) {
        if (!scrollElement || !closeBtn) return;
        
        const scrollPosition = scrollElement.scrollTop;
        const maxScroll = scrollElement.scrollHeight - scrollElement.clientHeight;
        const isAtBottom = maxScroll - scrollPosition <= 10; // 10px threshold
        
        if (isAtBottom) {
            closeBtn.classList.add('show-close');
            closeBtn.classList.remove('hide-close');
        } else {
            closeBtn.classList.add('hide-close');
            closeBtn.classList.remove('show-close');
        }
    }

    function openContainer(container) {
        // If same container is already open, do nothing
        if (activeContainer === container) return;

        // Store current scroll position BEFORE modifying body styles
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        // Close any currently open container
        if (activeContainer) {
            closeContainer();
            // Small delay for smooth transition
            setTimeout(() => {
                performOpen(container);
            }, 100);
        } else {
            performOpen(container);
        }
    }

    function performOpen(container) {
        // Set as active
        activeContainer = container;
        
        // Hide all other containers' closed states and remove expanded class
        containers.forEach(c => {
            if (c !== container) {
                const closedEl = c.querySelector('.treasure-closed');
                if (closedEl) closedEl.style.display = 'flex';
                c.classList.remove('expanded');
            }
        });

        // Show expanded state
        container.classList.add('expanded');
        
        // Toggle visibility
        const closedEl = container.querySelector('.treasure-closed');
        const openEl = container.querySelector('.treasure-open');
        const closeBtn = container.querySelector('.close-treasure');
        
        if (closedEl) closedEl.style.display = 'none';
        if (openEl) openEl.style.display = 'flex';
        
        // Initialize close button as hidden
        if (closeBtn) {
            closeBtn.classList.add('hide-close');
            closeBtn.classList.remove('show-close');
        }
        
        // Show overlay
        overlay.classList.add('active');
        
        // Prevent body scrolling WITHOUT position: fixed
        document.body.style.overflow = 'hidden';
        // Add padding to prevent layout shift
        document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
        
        // Add opening animation
        container.style.animation = 'expandTreasure 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

        // Animate chest lid
        animateChestLid(container);

        // Check initial scroll position
        setTimeout(() => {
            const scrollContent = container.querySelector('.treasure-content');
            if (scrollContent && closeBtn) {
                updateCloseButtonVisibility(scrollContent, closeBtn);
            }
        }, 50);
    }

    function closeContainer() {
        if (!activeContainer) return;

        const container = activeContainer;
        
        // Add closing animation
        container.style.animation = 'treasureClose 0.4s ease-in-out forwards';

        // Animate closure
        setTimeout(() => {
            // Remove expanded state
            container.classList.remove('expanded');
            container.style.animation = '';
            
            // Reset visibility
            const closedEl = container.querySelector('.treasure-closed');
            const openEl = container.querySelector('.treasure-open');
            const closeBtn = container.querySelector('.close-treasure');
            
            if (closedEl) closedEl.style.display = 'flex';
            if (openEl) openEl.style.display = 'none';
            if (closeBtn) {
                closeBtn.classList.remove('show-close', 'hide-close');
            }
            
            // Hide overlay
            overlay.classList.remove('active');
            
            // Restore body scrolling and styles
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            
            // Restore scroll position AFTER a brief delay
            setTimeout(() => {
                window.scrollTo(0, scrollPosition);
            }, 10);
            
            // Clear active container
            activeContainer = null;
        }, 400);
    }

    function animateChestLid(container) {
        const lidIcon = container.querySelector('.chest-lid i');
        if (lidIcon) {
            lidIcon.style.animation = 'none';
            // Trigger reflow
            void lidIcon.offsetWidth;
            lidIcon.style.animation = 'lidOpen 1s ease-out';
        }
    }

    function injectAnimations() {
        if (document.getElementById('treasure-animations')) return;

        const style = document.createElement('style');
        style.id = 'treasure-animations';
        style.textContent = `
            @keyframes treasureClose {
                0% { 
                    transform: translate(-50%, -50%) scale(1); 
                    opacity: 1; 
                }
                50% { 
                    transform: translate(-50%, -50%) scale(1.05); 
                    opacity: 0.8; 
                }
                100% { 
                    transform: translate(-50%, -50%) scale(0.8); 
                    opacity: 0; 
                }
            }

            @keyframes lidOpen {
                0% { 
                    transform: translateY(-15px) rotateX(-45deg); 
                    opacity: 0; 
                }
                70% { 
                    transform: translateY(3px) rotateX(5deg); 
                    opacity: 1; 
                }
                100% { 
                    transform: translateY(0) rotateX(0); 
                    opacity: 1; 
                }
            }

            @keyframes expandTreasure {
                0% { 
                    transform: translate(-50%, -50%) scale(0.85); 
                    opacity: 0; 
                }
                100% { 
                    transform: translate(-50%, -50%) scale(1); 
                    opacity: 1; 
                }
            }

            /* Smooth transitions for close button */
            .close-treasure {
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            
            .close-treasure.show-close {
                opacity: 1;
                transform: translateY(0);
                pointer-events: auto;
            }
            
            .close-treasure.hide-close {
                opacity: 0;
                transform: translateY(10px);
                pointer-events: none;
            }
            
            /* Prevent body scroll when treasure is open */
            body.treasure-open {
                overflow: hidden;
                position: fixed;
                width: 100%;
                height: 100%;
            }
        `;
        document.head.appendChild(style);
    }

    // Public API
    return {
        init,
        open: (container) => openContainer(container),
        close: () => closeContainer(),
        isOpen: () => activeContainer !== null
    };
})();