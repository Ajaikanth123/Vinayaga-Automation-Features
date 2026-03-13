document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.getElementById('scroll-container');
    const cards = document.querySelectorAll('.phase-card');
    const markers = document.querySelectorAll('.marker');
    const timelineProgress = document.getElementById('timeline-progress');
    
    // Smooth scrolling to a specific card
    const scrollToCard = (index) => {
        const targetCard = cards[index];
        if (!targetCard) return;

        // Calculate the scroll position to center the card
        const scrollLeft = targetCard.offsetLeft - (scrollContainer.clientWidth / 2) + (targetCard.clientWidth / 2);
        
        scrollContainer.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    };

    // Update the active state of cards, markers, and progress bar
    const updateActiveState = () => {
        const containerCenter = scrollContainer.scrollLeft + (scrollContainer.clientWidth / 2);
        
        let closestIndex = 0;
        let minDistance = Infinity;

        cards.forEach((card, index) => {
            const cardCenter = card.offsetLeft + (card.clientWidth / 2);
            const distance = Math.abs(containerCenter - cardCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        // Set active classes
        cards.forEach((card, index) => {
            if (index === closestIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        markers.forEach((marker, index) => {
            if (index <= closestIndex) {
                marker.classList.add('active'); // Fill past dots
            } else {
                marker.classList.remove('active');
            }
        });

        // Calculate Progress Line width
        // The width should go from 0 to the current active marker correctly
        // Since there are N markers, N-1 intervals
        const progressPercentage = (closestIndex / (markers.length - 1)) * 100;
        timelineProgress.style.width = `${progressPercentage}%`;
    };

    const adminTrigger = document.getElementById('invisible-admin-btn');
    let isAdminMode = false;

    // --- Admin Toggle Logic ---
    // Instant Single Click toggle
    adminTrigger.addEventListener('click', () => {
        toggleAdminMode();
    });

    const toggleAdminMode = () => {
        isAdminMode = !isAdminMode;
        if (isAdminMode) {
            document.body.classList.add('admin-mode');
        } else {
            document.body.classList.remove('admin-mode');
        }
        updateCheckboxInteractability(); // Enforce the strict disabled logic
    };

    // --- Progress & Save Logic ---
    
    // Check if phase is complete
    const checkPhaseCompletion = (phaseIndex) => {
        const card = document.getElementById(`card-${phaseIndex}`);
        const checkboxes = card.querySelectorAll('input[type="checkbox"]');
        let allChecked = true;
        
        checkboxes.forEach(cb => {
            if (!cb.checked) allChecked = false;
        });

        // Toggle completed class
        if (allChecked && checkboxes.length > 0) {
            card.classList.add('completed');
            
            // Strike through the text items
            const listItems = card.querySelectorAll('.features-list li');
            listItems.forEach(li => li.classList.add('completed'));

            // Unlock next phase
            if (phaseIndex < 3) { // Maximum 4 phases (0 to 3)
                const nextCard = document.getElementById(`card-${phaseIndex + 1}`);
                if (nextCard) {
                    nextCard.classList.remove('locked');
                    const nextCheckboxes = nextCard.querySelectorAll('input[type="checkbox"]');
                    nextCheckboxes.forEach(cb => {
                        cb.disabled = false;
                    });
                }
            }
        } else {
            card.classList.remove('completed');
            
            // Remove Strike through
            const listItems = card.querySelectorAll('.features-list li');
            listItems.forEach(li => li.classList.remove('completed'));

            // Lock next phases cascading down
            for(let i = phaseIndex + 1; i < 4; i++){
                const futureCard = document.getElementById(`card-${i}`);
                if (futureCard) {
                    futureCard.classList.add('locked');
                    futureCard.classList.remove('completed');
                    
                    const futureListItems = futureCard.querySelectorAll('.features-list li');
                    futureListItems.forEach(li => li.classList.remove('completed'));

                    const futureCheckboxes = futureCard.querySelectorAll('input[type="checkbox"]');
                    futureCheckboxes.forEach(cb => {
                        cb.checked = false;
                        // Keep them logically unlocked in DOM if needed, but visually locked.
                        // We manage actual clickability via adminMode now, but strictly disable future ones
                        cb.disabled = true;
                    });
                }
            }
        }
    };

    // Update checkbox interactability based on Admin Mode
    const updateCheckboxInteractability = () => {
        const allCards = document.querySelectorAll('.phase-card');
        
        allCards.forEach(card => {
            const isCardLocked = card.classList.contains('locked');
            const checkboxes = card.querySelectorAll('input[type="checkbox"]');
            
            checkboxes.forEach(cb => {
                if (!isAdminMode) {
                    // Always disabled in View Mode
                    cb.disabled = true;
                } else {
                    // In Admin mode: Enable only if the card is NOT locked
                    cb.disabled = isCardLocked;
                }
            });
        });
    };

    // Save state to localStorage
    const saveState = () => {
        const state = {};
        const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
        allCheckboxes.forEach(cb => {
            state[cb.id] = cb.checked;
        });
        localStorage.setItem('dicomRoadmapState', JSON.stringify(state));
    };

    // Load state from localStorage
    const loadState = () => {
        const savedState = localStorage.getItem('dicomRoadmapState');
        if (savedState) {
            const state = JSON.parse(savedState);
            const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
            
            allCheckboxes.forEach(cb => {
                if (state[cb.id]) {
                    cb.checked = true;
                }
            });

            // Re-evaluate completions after loading all states
            // We check them sequentially starting from phase 0 to trigger cascades
            for (let i = 0; i < 4; i++) {
                checkPhaseCompletion(i);
            }
            
            // Re-evaluate active card based on scroll after loading
            updateActiveState();
        }
        
        // Ensure checkboxes are initialized to the correct interactability state
        updateCheckboxInteractability();
    };

    // Handle Checkbox Clicks
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            // Find which phase card this checkbox belongs to
            const phaseCard = e.target.closest('.phase-card');
            const phaseIndex = Array.from(cards).indexOf(phaseCard);
            
            checkPhaseCompletion(phaseIndex);
            saveState();
        });
    });

    let isScrolling;
    scrollContainer.addEventListener('scroll', () => {
        window.cancelAnimationFrame(isScrolling);
        isScrolling = window.requestAnimationFrame(updateActiveState);
    });

    // Event listeners for marker clicks
    markers.forEach((marker, index) => {
        marker.addEventListener('click', () => {
            scrollToCard(index);
        });
    });

    // Handle scroll indicator visibility
    const scrollIndicator = document.getElementById('scroll-indicator');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    });

    // Initialize the state once on load
    loadState();
    
    // Ensure the first card is centered immediately (optional depending on design preference)
    scrollToCard(0);

    // --- Vertical Features Animation (Slide In) ---
    const featureObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, {
        threshold: 0.15 // Trigger when 15% is visible
    });

    // --- Vertical Features Glow (Active Focus in Center) ---
    const activeFeatureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        // Triggers when the item is roughly in the middle 30% of the screen height
        rootMargin: "-35% 0px -35% 0px"
    });

    const featureRows = document.querySelectorAll('.v-feature-row');
    featureRows.forEach(row => {
        featureObserver.observe(row);
        activeFeatureObserver.observe(row);
    });
});
