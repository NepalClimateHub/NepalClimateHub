export function slider(cards: NodeListOf<HTMLElement>, slideControlButtons: NodeListOf<HTMLElement>) {
    let currentIndex = 0;
    const totalCards = cards.length;

  // for dragging feature in mobile devices
  let touchStartX = 0;
  let touchEndX = 0;

  // find the current screen width
  const currentWidth = window.innerWidth;

  // controls the slides
  function showSlide(index: number) {
    const offset = index * -100;
    cards.forEach((card) => {
      card.style.transform = `translateX(${offset}%)`;
    });

    // remove active class from all slideControlButtons
    slideControlButtons.forEach((button) => {
      button.classList.remove("active");
    });

    // add active class to the button corresponding to the current slide
    slideControlButtons[index].classList.add("active");
  }

  // event listeners for manual control
  slideControlButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  // initially show the first slide
  showSlide(currentIndex);

  // function to change slides automatically every four seconds for mobile devices
  // function autoChangeSlide() {
  //   currentIndex = (currentIndex + 1) % totalCards;
  //   showSlide(currentIndex);
  // }

  // if it's a mobile device, trigger the automatic slide change function
  if (currentWidth <= 768) {
    // setInterval(autoChangeSlide, 4000);

    // touch event listeners for swipe gesture
    document.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    });

    document.addEventListener("touchmove", (e) => {
      touchEndX = e.touches[0].clientX;
    });

    document.addEventListener("touchend", () => {
      if (touchEndX < touchStartX - 50) {
        // swipe left, show next slide
        currentIndex = (currentIndex + 1) % totalCards;
        showSlide(currentIndex);
      } else if (touchEndX > touchStartX + 50) {
        // swipe right, show previous slide
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        showSlide(currentIndex);
      }
    });
  }
}