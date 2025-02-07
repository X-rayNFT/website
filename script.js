document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const containers = document.querySelectorAll('.image-container');
    let currentIndex = 0;

    // Function to update navigation buttons
    const updateNavButtons = () => {
        // Always show both buttons unless at the ends
        nextButton.style.opacity = currentIndex >= containers.length - 1 ? '0.3' : '1';
        nextButton.style.pointerEvents = currentIndex >= containers.length - 1 ? 'none' : 'auto';
        
        prevButton.style.opacity = currentIndex <= 0 ? '0.3' : '1';
        prevButton.style.pointerEvents = currentIndex <= 0 ? 'none' : 'auto';
    };

    // Navigation buttons
    nextButton.addEventListener('click', () => {
        if (currentIndex < containers.length - 1) {
            currentIndex++;
            content.scrollTo({
                left: currentIndex * (400 + 40) - 400, // Adjust for initial offset
                behavior: 'smooth'
            });
            updateNavButtons();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            content.scrollTo({
                left: currentIndex * (400 + 40) - 400, // Adjust for initial offset
                behavior: 'smooth'
            });
            updateNavButtons();
        }
    });

    // Initial button state
    updateNavButtons();

    // Set up scroll handling for each container
    containers.forEach((container, index) => {
        const xrayCover = container.querySelector('.xray-cover');
        const xrayLine = container.querySelector('.xray-line');
        
        // Set initial position of xray line
        xrayLine.style.bottom = '0%';
    });

    // Scroll effect for currently visible container
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const totalHeight = document.body.scrollHeight - windowHeight;
        const windowScroll = window.pageYOffset;
        const scrolled = windowScroll / totalHeight;

        // Apply effect only to the currently visible container
        const visibleContainer = containers[currentIndex];
        const xrayCover = visibleContainer.querySelector('.xray-cover');
        const xrayLine = visibleContainer.querySelector('.xray-line');

        // Adjust the clip-path for the X-ray cover based on scroll progress
        const clipPathValue = `polygon(0 ${100 - (scrolled * 100)}%, 100% ${100 - (scrolled * 100)}%, 100% 100%, 0 100%)`;
        xrayCover.style.clipPath = clipPathValue;

        // Move the line upwards as we scroll
        const lineBottomPosition = scrolled * 100;
        xrayLine.style.bottom = `${lineBottomPosition}%`;
    });
});
