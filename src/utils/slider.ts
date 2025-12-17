export function createMobileSlider(
  cards: NodeListOf<HTMLElement>,
  bars: NodeListOf<HTMLElement>
) {
  // Check if the device is a mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  // If the device is not a mobile device, return without doing anything
  if (!isMobile) return;
  
  // Set the initial active index
  let activeIndex = 0;
  // Variables for touch handling
  let startX: number;
  let endX: number;
  let isAnimating = false;
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .slider-card-exit-left {
      animation: slideOutLeft 0.3s ease-out forwards;
    }
    .slider-card-exit-right {
      animation: slideOutRight 0.3s ease-out forwards;
    }
    .slider-card-enter-left {
      animation: slideInLeft 0.3s ease-out forwards;
    }
    .slider-card-enter-right {
      animation: slideInRight 0.3s ease-out forwards;
    }
    
    @keyframes slideOutLeft {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(-100%);
        opacity: 0;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
    
    @keyframes slideInLeft {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Function to update the active card and control bar
  function updateActiveCard(direction: 'left' | 'right' | null = null) {
    if (isAnimating) return;
    isAnimating = true;
    
    const previousIndex = cards.length > 0 ? 
      Array.from(cards).findIndex(card => card.style.display === 'block') : 
      -1;
    
    if (direction && previousIndex !== -1) {
      const exitCard = cards[previousIndex];
      const enterCard = cards[activeIndex];
      const exitClass = direction === 'left' ? 'slider-card-exit-left' : 'slider-card-exit-right';
      const enterClass = direction === 'left' ? 'slider-card-enter-right' : 'slider-card-enter-left';

      // Apply exit animation
      exitCard.classList.add(exitClass);
      
      // Prepare enter card
      enterCard.style.display = 'block';
      enterCard.classList.add(enterClass);
      
      // Clean up after animation
      setTimeout(() => {
        exitCard.style.display = 'none';
        exitCard.classList.remove('slider-card-exit-left', 'slider-card-exit-right');
        enterCard.classList.remove('slider-card-enter-left', 'slider-card-enter-right');
        isAnimating = false;
      }, 300);
    } else {
      // No animation (initial load or bar click)
      cards.forEach((card) => {
        card.style.display = 'none';
        card.classList.remove('slider-card-exit-left', 'slider-card-exit-right', 
          'slider-card-enter-left', 'slider-card-enter-right');
      });
      cards[activeIndex].style.display = 'block';
      isAnimating = false;
    }
    
    // Update the active control bar
    bars.forEach((bar) => {
      bar.classList.remove('active');
    });
    bars[activeIndex].classList.add('active');
  }
  
  // Function to handle click events on the control bars
  function handleBarClick(index: number) {
    if (isAnimating) return;
    activeIndex = index;
    updateActiveCard();
  }
  
  // Function to handle touch start event
  function handleTouchStart(event: TouchEvent) {
    startX = event.touches[0].clientX;
  }
  
  // Function to handle touch move event
  function handleTouchMove(event: TouchEvent) {
    endX = event.touches[0].clientX;
  }
  
  // Function to handle touch end event
  function handleTouchEnd() {
    if (isAnimating) return;
    
    if (startX > endX + 50) {
      // Swipe left (next card)
      const newIndex = (activeIndex + 1) % cards.length;
      activeIndex = newIndex;
      updateActiveCard('left');
    } else if (startX < endX - 50) {
      // Swipe right (previous card)
      const newIndex = (activeIndex - 1 + cards.length) % cards.length;
      activeIndex = newIndex;
      updateActiveCard('right');
    }
  }
  
  // Add touch event listeners to each card
  cards.forEach((card) => {
    card.addEventListener('touchstart', handleTouchStart);
    card.addEventListener('touchmove', handleTouchMove);
    card.addEventListener('touchend', handleTouchEnd);
  });
  
  // Add click event listeners to the control bars
  bars.forEach((bar, index) => {
    bar.addEventListener('click', () => handleBarClick(index));
  });
  
  // Initialize the slider by showing the first card and highlighting the first control bar
  updateActiveCard();
}