export function createMobileSlider(
	cards: NodeListOf<HTMLElement>,
	cardControlsElement: HTMLElement,
	bars: NodeListOf<HTMLElement>,
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

	// Function to update the active card and control bar
	function updateActiveCard() {
		// Hide all cards
		cards.forEach((card) => {
			card.style.display = "none";
		});

		// Show the active card
		cards[activeIndex].style.display = "block";

		// Update the active control bar
		bars.forEach((bar) => {
			bar.classList.remove("active");
		});
		bars[activeIndex].classList.add("active");
	}

	// Function to handle click events on the control bars
	function handleBarClick(index: number) {
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
		if (startX > endX + 50) {
			// Swipe left
			activeIndex = (activeIndex + 1) % cards.length;
		} else if (startX < endX - 50) {
			// Swipe right
			activeIndex = (activeIndex - 1 + cards.length) % cards.length;
		}
		updateActiveCard();
	}

	// Add touch event listeners to each card
	cards.forEach((card) => {
		card.addEventListener("touchstart", handleTouchStart);
		card.addEventListener("touchmove", handleTouchMove);
		card.addEventListener("touchend", handleTouchEnd);
	});

	// Add click event listeners to the control bars
	bars.forEach((bar, index) => {
		bar.addEventListener("click", () => handleBarClick(index));
	});

	// Initialize the slider by showing the first card and highlighting the first control bar
	updateActiveCard();
}
